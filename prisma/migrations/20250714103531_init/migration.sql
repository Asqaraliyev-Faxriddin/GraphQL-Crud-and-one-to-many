/*
  Warnings:

  - You are about to drop the column `lastname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "lastname",
DROP COLUMN "phone";
