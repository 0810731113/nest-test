import { Injectable } from '@nestjs/common';
import {Cat }from './interface/cat.interface';
import * as Sequelize from "sequelize";
import sequelize from "../database/sequelize";

@Injectable()
export class TestService {
    private readonly cats: Cat[] = [];
    create(cat: Cat){
       this.cats.push(cat);
    }

    findAll() : Cat[]{
        return this.cats;
    }

    async findOne(username: string): Promise<any | undefined> {
        const sql = `
        SELECT * FROM user where name = '${username}'
        `;
        try{
            const res = await sequelize.query(sql,{
                type: Sequelize.QueryTypes.SELECT,
                raw:true,
                logging:true,
            });
            const user = res[0];
            if(user){
                return {
                    code:200,
                    data:{
                        user,
                    }
                }
            }else{
                return {
                    code:600,
                    msg:'查无此人'
                }
            }
        }catch(error){
            return {
                code: 503,
                msg:`Service error: ${error}`,
            }
        }
    }
}
