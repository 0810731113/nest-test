export declare class CommodityService {
    /**
     * 查询商品列表
     * @param {*} body
     * @param {string} username
     * @returns {Promise<any>}
     * @memberof CommodityService
     */
    queryCommodityList(body: any): Promise<any>;
    /**
     * 创建商品
     *
     * @param {*} body
     * @param {string} username
     * @returns {Promise<any>}
     * @memberof CommodityService
     */
    createCommodity(body: any, username: string): Promise<any>;
    /**
     * 修改商品
     *
     * @param {*} body
     * @param {string} username
     * @returns
     * @memberof CommodityService
     */
    updateCommodity(body: any, username: string): Promise<{
        code: number;
        msg: string;
    }>;
    /**
     * 删除商品
     *
     * @param {*} body
     * @returns
     * @memberof CommodityService
     */
    deleteCommodity(body: any): Promise<{
        code: number;
        msg: string;
    }>;
}
