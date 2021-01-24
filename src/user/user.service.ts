import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../database/sequelize';
import {makeSalt,encryptPassword} from '../utils/cryptogram';

@Injectable()
export class UserService {

    async findOne(username: string): Promise<any | undefined> {
        const sql = `
      SELECT
        user_id userId, account_name username, real_name realName, passwd password,
        passwd_salt salt, mobile, role
      FROM
        admin_user
      WHERE
        account_name = '${username}'
    `; // 一段平淡无奇的 SQL 查询语句
        try {
            const user = (await sequelize.query(sql, {
                type: Sequelize.QueryTypes.SELECT, // 查询方式
                raw: true, // 是否使用数组组装的方式展示结果
                logging: true, // 是否将 SQL 语句打印到控制台
            }))[0];
            // 若查不到用户，则 user === undefined
            return user;
        } catch (error) {
            console.error(error);
            return void 0;
        }
    }

    async findAll(username: string) : Promise<any | undefined> {
        let sql = `
      SELECT
        *
      FROM
        admin_user
    `; // 一段平淡无奇的 SQL 查询语句
        if(username){
            sql += ` WHERE account_name LIKE '${username}'`
        }
        console.log(sql);
        try {
            const res = await sequelize.query(sql, {
                type: Sequelize.QueryTypes.SELECT, // 查询方式
                raw: true, // 是否使用数组组装的方式展示结果
                logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
            });
            const user = res; // 查出来的结果是一个数组，我们只取第一个。
            if (user) {
                return {
                    code: 200, // 返回状态码，可自定义
                    data: {
                        user,
                    },
                    msg: 'Success',
                };
            } else {
                return {
                    code: 600,
                    msg: '查无此人',
                };
            }
        } catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }

    async register(requestBody: any): Promise<any> {
        const { accountName, realName, password, repassword, mobile } = requestBody;
        if (password !== repassword) {
            return {
                code: 400,
                msg: '两次密码输入不一致',
            };
        }
        const user = await this.findOne(accountName);
        console.log(`------------user-----------`);
        console.log(user);
        if (user) {
            return {
                code: 400,
                msg: '用户已存在',
            };
        }
        const salt = makeSalt(); // 制作密码盐
        const hashPwd = encryptPassword(password, salt);  // 加密密码
        const registerSQL = `
      INSERT INTO admin_user
        (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES
        ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `;
        try {
            await sequelize.query(registerSQL, { logging: false });
            return {
                code: 200,
                msg: 'Success',
            };
        } catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }

}