import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProblemDTO } from './dto/problem.dto';
 

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

 async createProblem(dto:ProblemDTO){
    const problem = await this.prisma.problem.create({
        data: {
            title: dto.title,
            topic: dto.topic,
            difficulty: dto.difficulty,
            description: dto.description,
          }
      });
      return problem
  }
 
  
}
