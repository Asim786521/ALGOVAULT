import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Role } from "src/common/constants/roles.constant";
import { Roles } from "src/common/decorator/role.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { UsersService } from "src/users/user.service";
import { ProblemDTO } from "./dto/problem.dto";
import { AdminService } from "./admin.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";


@Controller('admin')
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {

    constructor(private readonly userSerivce: UsersService,private readonly adminService: AdminService) { }
 
    @Get('get/all/users')
    getUsers() {
        return this.userSerivce.findAll();
    }

    @Get('get/all/problems')
    getProblem() {
        return this.userSerivce.findProblems();

    }
    @Post('create/problems')
    createProblem(@Body() dto:ProblemDTO){
        return this.adminService.createProblem(dto)

    }



}