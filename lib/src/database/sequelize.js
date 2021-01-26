"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const db_1 = tslib_1.__importDefault(require("../../config/db"));
const sequelize = new sequelize_typescript_1.Sequelize(db_1.default.mysql.database, db_1.default.mysql.user, db_1.default.mysql.password || null, {
    host: db_1.default.mysql.host,
    port: db_1.default.mysql.port,
    dialect: 'mysql',
    pool: {
        max: db_1.default.mysql.connectionLimit,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone: '+08:00'
});
// 测试数据库链接
sequelize
    .authenticate()
    .then(() => {
    console.log('数据库连接成功');
})
    .catch((err) => {
    // 数据库连接失败时打印输出
    console.error(err);
    throw err;
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map