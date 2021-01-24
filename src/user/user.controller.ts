import {Body, Controller, Get, Param, Post,UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
// import {Cat} from "../test/interface/cat.interface";
import {AuthService} from '../logical/auth/auth.service';
import {AuthGuard} from '@nestjs/passport';

// @ts-ignore
@Controller('user')
export class UserController {
    constructor(private readonly authService: AuthService,private readonly userService: UserService){}

    // @Get()
    // async findAll(username: string): Promise<any[]>{
    //     return this.userService.findAll(username);
    // }

    @Get(':username')
    async findOne(
        @Param('username') username: string,
        // @Query('key') key: string,
        // @Body('yyy') yyy: string,
    ){
        const user = await this.userService.findOne(username);
        return user;
    }
    @Post('all')
    async getAll(
        // @Param('id') id: number,
        // @Query('key') key: string,
        @Body('username') username: string,
    ){
        console.log(username);
        const user = await this.userService.findAll(username);
        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('register')
    async register(@Body() body: any) {
        return await this.userService.register(body);
    }

    // JWT验证 - Step 1: 用户请求登录
    @Post('login')
    async login(@Body() loginParmas: any) {
        console.log('JWT验证 - Step 1: 用户请求登录');
        const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
        switch (authResult.code) {
            case 1:
                return this.authService.certificate(authResult.user);
            case 2:
                return {
                    code: 600,
                    msg: `账号或密码不正确`,
                };
            default:
                return {
                    code: 600,
                    msg: `查无此人`,
                };
        }
    }
}
