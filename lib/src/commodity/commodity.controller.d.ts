import { CommodityService } from './commodity.service';
export declare class CommodityController {
    private readonly commodityService;
    constructor(commodityService: CommodityService);
    queryColumnList(body: any): Promise<any>;
    createCommodity(body: any, req: any): Promise<any>;
    updateCommodity(body: any, req: any): Promise<{
        code: number;
        msg: string;
    }>;
    deleteCommodity(body: any, req: any): Promise<{
        code: number;
        msg: string;
    }>;
}
