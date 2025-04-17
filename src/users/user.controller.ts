import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';

import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UsersService } from './user.service';
import { Role } from 'src/common/constants/roles.constant';
import { AuthGuard } from '@nestjs/passport';
import { uploadDTO } from './dto/upload.dto';
import { FilterProblemsDto } from './dto/filter-problems.dto';
import { JwtPayload } from 'src/auth/dto/jwt.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
 

@Controller('users')
@Roles(Role.USER)
@UseGuards(JwtAuthGuard,RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get('get/problems/progress')
  getProblem() {
    return this.userService.findProblems()

  }
 
  @UseGuards(AuthGuard('jwt'))
  @Get('get/progress')
  async getUserProgress(
    @Req() req,
    @Query() query: FilterProblemsDto,
  ) {
    const userId: string = req.user.userId;
    return await this.userService.getProgressData(
      userId,
      query.status,
      query.from,
      query.to,
      query.page,
      query.limit,
      query.orderBy
    );
  }
  


  @Get('get/solved/problems')
  getSolvedProblem() {
    return this.userService.findSolvedProblem()
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('get/leaderboard/ranking')
  getLeaderBoardRanking(@Req() req) {
    const userId:string = req.user.userId;
    return this.userService.getCurrentLeaderBoard(userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('upload/solved/problem')
  uploadSolvedProblem(@Req() req ,@Body() dto:uploadDTO){
    const userId:string= req.user.userId;
     return this.userService.uploadSolvedProblem({userId,...dto})
  }
}
