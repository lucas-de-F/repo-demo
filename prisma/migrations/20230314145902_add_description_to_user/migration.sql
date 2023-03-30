/*
  Warnings:

  - You are about to drop the column `role_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pre_register_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identification` to the `Pre_Register` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_id_fkey";

-- AlterTable
ALTER TABLE "Pre_Register" ADD COLUMN     "identification" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role_id",
ADD COLUMN     "pre_register_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_pre_register_id_key" ON "User"("pre_register_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pre_register_id_fkey" FOREIGN KEY ("pre_register_id") REFERENCES "Pre_Register"("id") ON DELETE SET NULL ON UPDATE CASCADE;
