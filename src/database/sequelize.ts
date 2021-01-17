import {Sequelize} from 'sequelize-typescript';
import db from '../../config/db';

const sequelize = new Sequelize(db.mysql.database,db.mysql.user,db.mysql.password || null,{
    host: db.mysql.host,
    port: db.mysql.port,
    dialect:'mysql',
    pool:{
        max: db.mysql.connectionLimit,
        min:0,
        acquire: 30000,
        idle:10000,
    },
    timezone:'+08:00'
});

// 测试数据库链接
sequelize
    .authenticate()
    .then(() => {
        console.log('数据库连接成功');
    })
    .catch((err: any) => {
        // 数据库连接失败时打印输出
        console.error(err);
        throw err;
    });

export default sequelize;

