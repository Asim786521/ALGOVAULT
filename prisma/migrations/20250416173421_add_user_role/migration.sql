-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "status" "ProgressStatus";
