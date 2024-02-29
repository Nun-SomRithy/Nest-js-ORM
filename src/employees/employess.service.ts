import { Injectable } from "@nestjs/common";
import { Employees } from "./interface/employess.interface";

@Injectable()
export default class EmployeesService{

    readonly employeess: Employees[] = []

    create(employee:Employees){
        this.employeess.push(employee)
    }

    findAll():Employees[]{
        return this.employeess;
    }
   
}