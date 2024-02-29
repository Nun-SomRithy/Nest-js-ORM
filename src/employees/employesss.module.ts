import { Module } from "@nestjs/common";
import { EmployeesController } from "./employess.controller";
import EmployeesService from "./employess.service";


@Module({
    controllers:[EmployeesController],
    providers:[EmployeesService]
})

export class EmployeesModule{}