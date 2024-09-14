/*
  Warnings:

  - You are about to drop the `Album` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Album` DROP FOREIGN KEY `Album_mediaId_fkey`;

-- AlterTable
ALTER TABLE `MediaUpload` MODIFY `type` ENUM('image', 'video', 'audio') NOT NULL DEFAULT 'image';

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `Album`;

-- CreateTable
CREATE TABLE `MediaDescription` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `mediaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MediaDescription` ADD CONSTRAINT `MediaDescription_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `MediaUpload`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
