import { TestService } from './test.service';
import { Cat } from './interface/cat.interface';
export declare class TestController {
    private readonly testService;
    constructor(testService: TestService);
    findAll(): Promise<Cat[]>;
    findOne(username: string): Promise<any>;
    getBody(body: any): Promise<any>;
}
