"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const Sequelize = tslib_1.__importStar(require("sequelize")); // 引入 Sequelize 库
const sequelize_1 = tslib_1.__importDefault(require("../database/sequelize"));
const cryptogram_1 = require("../utils/cryptogram");
let UserService = class UserService {
    async findOne(username) {
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
            const user = (await sequelize_1.default.query(sql, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: true,
            }))[0];
            // 若查不到用户，则 user === undefined
            return user;
        }
        catch (error) {
            console.error(error);
            return void 0;
        }
    }
    async findAll(username) {
        let sql = `
      SELECT
        *
      FROM
        admin_user
    `; // 一段平淡无奇的 SQL 查询语句
        if (username) {
            sql += ` WHERE account_name LIKE '${username}'`;
        }
        console.log(sql);
        try {
            const res = await sequelize_1.default.query(sql, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: true,
            });
            const user = res; // 查出来的结果是一个数组，我们只取第一个。
            if (user) {
                return {
                    code: 200,
                    data: {
                        user,
                    },
                    msg: 'Success',
                };
            }
            else {
                return {
                    code: 600,
                    msg: '查无此人',
                };
            }
        }
        catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }
    async register(requestBody) {
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
        const salt = cryptogram_1.makeSalt(); // 制作密码盐
        const hashPwd = cryptogram_1.encryptPassword(password, salt); // 加密密码
        const registerSQL = `
      INSERT INTO admin_user
        (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES
        ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `;
        try {
            await sequelize_1.default.query(registerSQL, { logging: false });
            return {
                code: 200,
                msg: 'Success',
            };
        }
        catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }
};
UserService = tslib_1.__decorate([
    common_1.Injectable()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map