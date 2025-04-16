import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { uploadDTO } from './dto/upload.dto';
 
import { Prisma, ProgressStatus } from 'generated/prisma';
 

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService
 ) {}
 
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
  async getProgressData(
    userId: string,
    status?: ProgressStatus,
    from?: string,
    to?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const filters: Prisma.ProgressWhereInput = {
      userId,
      ...(status !== undefined && { status: status }),  
      ...(from && { solvedAt: { gte: new Date(from) } }),  
      ...(to && { solvedAt: { lte: new Date(to) } }), 
    };

    const [progress, total] = await this.prisma.progress.findMany({
      where: filters,
      skip: (page - 1) * limit,  // Pagination
      take: limit,  // Limit results
      orderBy: {
        solvedAt: 'desc', // Order by solved date (optional)
      },
    });

    return {
      data: progress,
      totalCount: total,
      page,
      limit,
    };
  }
}

