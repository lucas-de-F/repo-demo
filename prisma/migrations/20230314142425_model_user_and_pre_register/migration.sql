/*
  Warnings:

  - You are about to drop the column `email_active` on the `User` table. All the data in the column will be lost.
  - Added the required column `last_access` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalized_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalized_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "email_active",
ADD COLUMN     "last_access" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "normalized_email" TEXT NOT NULL,
ADD COLUMN     "normalized_name" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Pre_Register" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role_id" TEXT,

    CONSTRAINT "Pre_Register_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pre_Register" ADD CONSTRAINT "Pre_Register_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
