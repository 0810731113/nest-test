export declare class UserService {
    findOne(username: string): Promise<any | undefined>;
    findAll(username: string): Promise<any | undefined>;
    register(requestBody: any): Promise<any>;
}
