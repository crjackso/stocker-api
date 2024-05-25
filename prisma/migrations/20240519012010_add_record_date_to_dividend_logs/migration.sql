-- AlterTable
ALTER TABLE "dividend_logs" ADD COLUMN     "recordDate" TIMESTAMP(3),
ALTER COLUMN "exDividendDate" DROP NOT NULL;
