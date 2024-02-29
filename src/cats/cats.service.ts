import { Injectable } from "@nestjs/common";
import { Cat } from "./interface/cat.interface";


@Injectable()
export default class CatsService{

    readonly cats:Cat[] =[]

    create(cat:Cat){
        this.cats.push(cat);
    }

    findAll():Cat[]{
        return this.cats;
    }
}