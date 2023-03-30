/*
  Warnings:

  - The primary key for the `Pre_Register` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `role_id` column on the `Pre_Register` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `pre_register_id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id` on the `Pre_Register` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Pre_Register" DROP CONSTRAINT "Pre_Register_role_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_pre_register_id_fkey";

-- AlterTable
ALTER TABLE "Pre_Register" DROP CONSTRAINT "Pre_Register_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "role_id",
ADD COLUMN     "role_id" UUID,
ADD CONSTRAINT "Pre_Register_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "last_access" SET DATA TYPE TIMESTAMPTZ(3),
DROP COLUMN "pre_register_id",
ADD COLUMN     "pre_register_id" UUID,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_pre_register_id_key" ON "User"("pre_register_id");

-- AddForeignKey
ALTER TABLE "Pre_Register" ADD CONSTRAINT "Pre_Register_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pre_register_id_fkey" FOREIGN KEY ("pre_register_id") REFERENCES "Pre_Register"("id") ON DELETE SET NULL ON UPDATE CASCADE;
