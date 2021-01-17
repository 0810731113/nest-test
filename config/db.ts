// config/db.ts
const productConfig = {
    mysql: {
        port: 23116,
        host: 'sh-cynosdbmysql-grp-myjlqut2.sql.tencentcdb.com',
        user: 'root',
        password: 'Libo@1234',
        database: 'test', // 库名
        connectionLimit: 20, // 连接限制
    },
};

const localConfig = {
    mysql: {
        port: 23116,
        host: 'sh-cynosdbmysql-grp-myjlqut2.sql.tencentcdb.com',
        user: 'root',
        password: 'Libo@1234',
        database: 'test', // 库名
        connectionLimit: 20, // 连接限制
    },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;
export default config;