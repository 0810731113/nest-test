"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// config/db.ts
const productConfig = {
    mysql: {
        port: 23116,
        host: 'sh-cynosdbmysql-grp-myjlqut2.sql.tencentcdb.com',
        user: 'root',
        password: 'Libo@1234',
        database: 'test',
        connectionLimit: 20,
    },
};
const localConfig = {
    mysql: {
        port: 23116,
        host: 'sh-cynosdbmysql-grp-myjlqut2.sql.tencentcdb.com',
        user: 'root',
        password: 'Libo@1234',
        database: 'test',
        connectionLimit: 20,
    },
};
// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;
exports.default = config;
//# sourceMappingURL=db.js.map