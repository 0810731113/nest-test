import { Cat } from './interface/cat.interface';
export declare class TestService {
    private readonly cats;
    create(cat: Cat): void;
    findAll(): Cat[];
    findOne(username: string): Promise<any | undefined>;
}
