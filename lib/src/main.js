"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const util_1 = require("./utils/util");
const config_1 = require("@nestjs/config");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const logger_middleware_1 = require("./middleware/logger.middleware");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = tslib_1.__importStar(require("express"));
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(express.json()); // For parsing application/json
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    // app.useGlobalPipes(new ValidationPipe())
    // app.useGlobalInterceptors(new TransformInterceptor());
    // app.useGlobalFilters(new AllExceptionsFilter())
    // app.useGlobalFilters(new HttpExceptionFilter())
    // app.useStaticAssets(path.join('public'));
    // app.useStaticAssets(path.join('public'));
    // app.useStaticAssets(path.join('public'),{
    //   prefix: '/assets/',   //设置虚拟路径
    // });
    //app.setBaseViewsDir(path.join('views'));
    // app.setBaseViewsDir(path.join(__dirname, 'views'));
    //app.setViewEngine('hbs');
    const configService = app.get(config_1.ConfigService);
    console.log(`-------------configService--------------`);
    console.log(configService);
    // app.setGlobalPrefix(`nest`)
    app.setGlobalPrefix(configService.get('BASE'));
    app.use(logger_middleware_1.logger);
    const proxyMidware = http_proxy_middleware_1.createProxyMiddleware({
        target: configService.get('TARGET'),
        changeOrigin: true,
        ws: true,
    });
    if (process.env.NODE_ENV !== 'production') {
        app.use(configService.get('PUBLIC_PATH'), proxyMidware);
    }
    app.use(new RegExp(`^(?!${configService.get('BASE')}).+`), proxyMidware);
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Nest zero to one')
        .setDescription('The nest-zero-to-one API description')
        .setVersion('1.0')
        .addTag('test')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-doc', app, document);
    await app.listen(3333);
    console.log(`app is running on: ${await app.getUrl()}`);
    console.log(`app is running on: ${await util_1.getHost()}`);
}
bootstrap().catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map