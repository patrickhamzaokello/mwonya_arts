-- AlterTable
ALTER TABLE `MediaUpload` MODIFY `type` ENUM('image', 'video', 'audio') NOT NULL DEFAULT 'image';

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `Album` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `mediaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `MediaUpload`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
