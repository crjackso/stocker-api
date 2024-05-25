-- CreateTable
CREATE TABLE "dividend_logs" (
    "id" SERIAL NOT NULL,
    "tickerSymbol" TEXT NOT NULL,
    "cashAmount" DOUBLE PRECISION NOT NULL,
    "exDividendDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payDate" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dividend_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dividend_logs_tickerSymbol_payDate_key" ON "dividend_logs"("tickerSymbol", "payDate");

-- AddForeignKey
ALTER TABLE "dividend_logs" ADD CONSTRAINT "dividend_logs_tickerSymbol_fkey" FOREIGN KEY ("tickerSymbol") REFERENCES "stocks"("tickerSymbol") ON DELETE RESTRICT ON UPDATE CASCADE;
