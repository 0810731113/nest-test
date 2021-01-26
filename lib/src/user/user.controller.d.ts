import { UserService } from "./user.service";
import { AuthService } from '../logical/auth/auth.service';
import { RegisterInfoDTO } from './user.dto';
export declare class UserController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    findOne(username: string): Promise<any>;
    getAll(username: string): Promise<any>;
    register(body: RegisterInfoDTO): Promise<any>;
    login(loginParmas: any): Promise<{
        code: number;
        data: {
            token: string;
        };
        msg: string;
    } | {
        code: number;
        msg: string;
        data?: undefined;
    }>;
}
