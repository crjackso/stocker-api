-- CreateTable
CREATE TABLE "portfolios" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "tickerSymbol" TEXT NOT NULL,
    "lastPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PortfolioToStock" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_userId_title_key" ON "portfolios"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_companyName_key" ON "stocks"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_tickerSymbol_key" ON "stocks"("tickerSymbol");

-- CreateIndex
CREATE UNIQUE INDEX "_PortfolioToStock_AB_unique" ON "_PortfolioToStock"("A", "B");

-- CreateIndex
CREATE INDEX "_PortfolioToStock_B_index" ON "_PortfolioToStock"("B");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioToStock" ADD CONSTRAINT "_PortfolioToStock_A_fkey" FOREIGN KEY ("A") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioToStock" ADD CONSTRAINT "_PortfolioToStock_B_fkey" FOREIGN KEY ("B") REFERENCES "stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
