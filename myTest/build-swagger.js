const SwaggerTs = require('swagger-ts-plugin');
const path = require('path');
const instance = new SwaggerTs({
    outputPath: path.resolve(__dirname),
    serverList:[
        'trialpartner-web',
        {
            serviceName: "tms-client",
            serviceUrl: "http://172.20.37.154:8200/api/",
        },
    ],
})

instance.build();