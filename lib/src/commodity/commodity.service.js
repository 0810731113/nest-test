"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommodityService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const Sequelize = tslib_1.__importStar(require("sequelize")); // 引入 Sequelize 库
const sequelize_1 = tslib_1.__importDefault(require("../database/sequelize")); // 引入 Sequelize 实例
let CommodityService = class CommodityService {
    /**
     * 查询商品列表
     * @param {*} body
     * @param {string} username
     * @returns {Promise<any>}
     * @memberof CommodityService
     */
    async queryCommodityList(body) {
        const { pageIndex = 1, pageSize = 10, keywords = '' } = body;
        // 分页查询条件
        const currentIndex = (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
        const queryCommodityListSQL = `
      SELECT
        id, ccolumn_id columnId, commodity_name name, commodity_desc description,
        sale_money saleMoney, market_price marketPrice,
        c_by createBy, DATE_FORMAT(c_time, '%Y-%m-%d %H:%i:%s') createTime,
        u_by updateBy, DATE_FORMAT(u_time, '%Y-%m-%d %H:%i:%s') updateTime
      FROM
        commodity
      WHERE
        commodity_name LIKE '%${keywords}%'
      ORDER BY
        id DESC
      LIMIT ${currentIndex}, ${pageSize}
    `;
        const commodityList = await sequelize_1.default.query(queryCommodityListSQL, {
            type: Sequelize.QueryTypes.SELECT,
            raw: true,
            logging: false,
        });
        // 统计数据条数
        const countCommodityListSQL = `
      SELECT
        COUNT(*) AS total
      FROM
        commodity
      WHERE
        commodity_name LIKE '%${keywords}%'
    `;
        const count = (await sequelize_1.default.query(countCommodityListSQL, {
            type: Sequelize.QueryTypes.SELECT,
            raw: true,
            logging: false,
        }))[0];
        return {
            code: 200,
            data: {
                commodityList,
                total: count.total,
            },
        };
    }
    /**
     * 创建商品
     *
     * @param {*} body
     * @param {string} username
     * @returns {Promise<any>}
     * @memberof CommodityService
     */
    async createCommodity(body, username) {
        const { columnId = 0, name, description = '', marketPrice = 0, saleMoney = 0 } = body;
        const createCommoditySQL = `
      INSERT INTO commodity
        (ccolumn_id, commodity_name, commodity_desc, market_price, sale_money, c_by)
      VALUES
        ('${columnId}', '${name}', '${description}', ${marketPrice}, ${saleMoney}, '${username}');
    `;
        await sequelize_1.default.query(createCommoditySQL, { logging: false });
        return {
            code: 200,
            msg: 'Success',
        };
    }
    /**
     * 修改商品
     *
     * @param {*} body
     * @param {string} username
     * @returns
     * @memberof CommodityService
     */
    async updateCommodity(body, username) {
        const { id, columnId, name, description, saleMoney, marketPrice } = body;
        const updateCommoditySQL = `
      UPDATE
        commodity
      SET
        ccolumn_id = ${columnId},
        commodity_name = '${name}',
        commodity_desc = '${description}',
        market_price = ${marketPrice},
        sale_money = ${saleMoney},
        u_by = '${username}'
      WHERE
        id = ${id}
    `;
        await sequelize_1.default.query(updateCommoditySQL, { logging: false });
        return {
            code: 200,
            msg: 'Success',
        };
    }
    /**
     * 删除商品
     *
     * @param {*} body
     * @returns
     * @memberof CommodityService
     */
    async deleteCommodity(body) {
        const { id } = body;
        const deleteCommoditySQL = `
      DELETE FROM
        commodity
      WHERE
        id = ${id}
    `;
        await sequelize_1.default.query(deleteCommoditySQL, { logging: false });
        return {
            code: 200,
            msg: 'Success',
        };
    }
};
CommodityService = tslib_1.__decorate([
    common_1.Injectable()
], CommodityService);
exports.CommodityService = CommodityService;
//# sourceMappingURL=commodity.service.js.map