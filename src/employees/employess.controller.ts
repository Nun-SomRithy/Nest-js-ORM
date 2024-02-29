import { Controller, Get, Param, Post } from '@nestjs/common';
import EmployeesService from './employess.service';
import { Employees } from './interface/employess.interface';


@Controller('employees')
export class EmployeesController {

    constructor(private employeesService:EmployeesService) {}

    @Get()
    async findAll(): Promise<Employees[]> {
       return this.employeesService.findAll()
    }
    
    @Get(':id')
    findOne(@Param('id') id:string){
        return id;
    }

    @Post() 
    create(){
        return "Lol"
    }

}