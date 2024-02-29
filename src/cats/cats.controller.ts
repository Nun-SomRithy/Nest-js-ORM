import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import CatsService from "./cats.service"    
import { Cat } from './interface/cat.interface';

@Controller('cats')
export class CatsController {
    constructor(private catsService:CatsService){}

    @Post()
    // @HttpCode(204)
    async cteate(@Body() createCatDto:CreateCatDto){
        this.catsService.create(createCatDto)
    }

    @Get()
    async findAll() : Promise<Cat[]>{
        return this.catsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:string): string {
      return `This action returns a #${id} cat`;
    }

    
}
