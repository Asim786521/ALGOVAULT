// user/dto/filter-problems.dto.ts
import { IsOptional, IsEnum, IsISO8601, IsInt, Min, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ProgressStatus } from 'generated/prisma';

export enum ProblemStatus {
  SOLVED = 'SOLVED',
  IN_PROGRESS = 'IN_PROGRESS',
  UNSOLVED = 'UNSOLVED',
}

export class FilterProblemsDto {
  @IsOptional()
  @IsEnum(ProblemStatus)
  status?: ProgressStatus;

  @IsOptional()
  @IsISO8601()
  from?: string;

  @IsOptional()
  @IsISO8601()
  to?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit = 10;


  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'orderBy must be either asc or desc' })
  orderBy?: 'asc' | 'desc';
}
