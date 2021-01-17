import { Controller,Get,Post,Body,Param,UseGuards,Query } from '@nestjs/common';
import {TestService} from './test.service';
import {Cat} from './interface/cat.interface';


@Controller('test')
export class TestController {
    constructor(private readonly catsService: TestService){}

    @Get()
    async findAll(): Promise<Cat[]>{
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id') id: number,
        @Query('key') key: string,
        @Body('yyy') yyy: string,
    ){
        console.log(id);
        console.log(key);
        console.log(yyy);
        return id;
    }
    @Post(':id')
    getBody(
        @Param('id') id: number,
        @Query('key') key: string,
        @Body('yyy') yyy: Object,
    ){
        console.log(id);
        console.log(key);
        console.log(yyy);
        return id;
    }
}
