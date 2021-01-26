"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const Sequelize = tslib_1.__importStar(require("sequelize"));
const sequelize_1 = tslib_1.__importDefault(require("../database/sequelize"));
let TestService = class TestService {
    constructor() {
        this.cats = [];
    }
    create(cat) {
        this.cats.push(cat);
    }
    findAll() {
        return this.cats;
    }
    async findOne(username) {
        const sql = `
        SELECT * FROM user where name = '${username}'
        `;
        try {
            const res = await sequelize_1.default.query(sql, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: true,
            });
            const user = res[0];
            if (user) {
                return {
                    code: 200,
                    data: {
                        user,
                    }
                };
            }
            else {
                return {
                    code: 600,
                    msg: '查无此人'
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
};
TestService = tslib_1.__decorate([
    common_1.Injectable()
], TestService);
exports.TestService = TestService;
//# sourceMappingURL=test.service.js.map