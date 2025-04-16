import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { uploadDTO } from './dto/upload.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findProblems(){
    return this.prisma.problem.findMany()
  }
  findSolvedProblem(){
    return this.prisma.progress.findMany()
  }

  getCurrentLeaderBoard(userId:string ){

    const user = this.prisma.leaderboard.findUnique({
      where: {
        id:userId,
      },
    })
    return user
  }

  async uploadSolvedProblem(dto: uploadDTO) {
    const solvedData = await this.prisma.progress.upsert({
      where: {
        userId_problemId: {
          userId: dto.userId,
          problemId: dto.problemId,
        },
      },
      update: {
        solved: dto.solved,
        solvedAt: dto.solved ? new Date() : null,
      },
      create: {
        userId: dto.userId,
        problemId: dto.problemId,
        solved: dto.solved,
        solvedAt: dto.solved ? new Date() : null,
      },
    });
  
    return { message: 'Progress recorded successfully', data: solvedData };
  }
  
}
