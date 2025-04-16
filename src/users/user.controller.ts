import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';

import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UsersService } from './user.service';
import { Role } from 'src/common/constants/roles.constant';
import { AuthGuard } from '@nestjs/passport';
import { uploadDTO } from './dto/upload.dto';
import { FilterProblemsDto } from './dto/filter-problems.dto';
import { JwtPayload } from 'src/auth/dto/jwt.dto';
 

@Controller('users')
@Roles(Role.USER)
@UseGuards(RolesGuard)
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
  @Get('problems')
  
  @UseGuards(AuthGuard('jwt'))
  @Get('user-progress')
  async getUserProgress(
    @Req() req: JwtPayload,
    @Query() query: FilterProblemsDto,
  ) {
 
    return await this.userService.getProgressData(
      req.sub,
      query.status,
      query.from,
      query.to,
      query.page,
      query.limit,

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
    const userId:string = req.sub;
    console.log(req);
    
     return this.userService.uploadSolvedProblem({userId,...dto})
  }
}
