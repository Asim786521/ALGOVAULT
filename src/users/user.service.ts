import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { uploadDTO } from './dto/upload.dto';
 
import { Prisma, ProgressStatus } from 'generated/prisma';
import { FilterProblemsDto } from './dto/filter-problems.dto';
 

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
    if (!dto.userId || !dto.problemId) {
      throw new Error('userId and problemId are required.');
    }
  
    const solvedData = await this.prisma.progress.upsert({
      where: {
        userId_problemId: {
          userId: dto.userId, 
          problemId: dto.problemId,
        },
      },
      update: {
        solved: true,
        status:ProgressStatus.COMPLETED,
        solvedAt: new Date(),
      },
      create: {
        userId: dto.userId,
        problemId: dto.problemId,
        status:ProgressStatus.COMPLETED,
        solved: true,
        solvedAt: new Date(),
      },
    });
  
    return solvedData;
  }
  
  async getProgressData(
    userId: string,
    status?: ProgressStatus,
    from?: string,
    to?: string,
    page: number = 1,
    limit: number = 10,
    orderBy: 'asc' | 'desc' = 'desc'
  ) {
   
    const filters: Prisma.ProgressWhereInput = {
      userId,
    };
  
    if (status) {
      filters.status = status;
    }
  
    if (from || to) {
      filters.solvedAt = {};
  
      if (from) {
        filters.solvedAt.gte = new Date(from);
      }
  
      if (to) {
        filters.solvedAt.lte = new Date(to);
      }
    }
  
    // 1. Total count
    const totalCount = await this.prisma.progress.count({
      where: filters,
    });
  
    // 2. Paginated data
    const content = await this.prisma.progress.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        solvedAt:orderBy,
      },
      include: {
        problem: true,
        
         // Include related problem details
      },
    });
  
    return {
      content,
      meta: {
        totalCount,
        currentPage: page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }
  
  
}

