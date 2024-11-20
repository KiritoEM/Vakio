/*
  Warnings:

  - You are about to drop the column `resume` on the `Book` table. All the data in the column will be lost.
  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Book` DROP COLUMN `resume`,
    ADD COLUMN `cover` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    MODIFY `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
