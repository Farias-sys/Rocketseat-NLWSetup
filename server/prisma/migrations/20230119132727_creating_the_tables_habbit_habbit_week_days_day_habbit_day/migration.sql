-- CreateTable
CREATE TABLE "HabbitWeekDays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habbit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "day_habbits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habbit_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "day_habbits_day_id_habbit_id_key" ON "day_habbits"("day_id", "habbit_id");
