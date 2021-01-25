import { Controller,Get,Post,Body,Param,UseGuards,Query } from '@nestjs/common';
import {TestService} from './test.service';
import {Cat} from './interface/cat.interface';


@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService){}

    @Get()
    async findAll(): Promise<Cat[]>{
        return this.testService.findAll();
    }

    @Get(':username')
    async findOne(
        @Param('username') username: string,
        // @Query('key') key: string,
        // @Body('yyy') yyy: string,
    ){
       const user = await this.testService.findOne(username);
        return user;
    }
    @Post('username')
    async getBody(
        // @Param('id') id: number,
        // @Query('key') key: string,
        @Body() body: any,
    ){
        console.log(body);
        const user = await this.testService.findOne(body?.username);
        return user;
    }
}
