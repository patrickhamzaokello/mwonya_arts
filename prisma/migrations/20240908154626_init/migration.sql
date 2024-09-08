-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `IndexedData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entity_id` VARCHAR(300) NOT NULL,
    `entity_title` VARCHAR(255) NULL,
    `entity_type` ENUM('song', 'album', 'artist', 'playlist', 'events') NULL,
    `worded` INTEGER NOT NULL DEFAULT 0,
    `date_added` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `date_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    FULLTEXT INDEX `idx_title`(`entity_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReplicateData` (
    `SongID` BIGINT NOT NULL,
    `JSONData` TEXT NULL,

    PRIMARY KEY (`SongID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `albums` (
    `no` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(300) NOT NULL,
    `title` VARCHAR(250) NOT NULL,
    `artist` VARCHAR(300) NOT NULL,
    `genre` INTEGER NOT NULL,
    `artworkPath` VARCHAR(500) NOT NULL,
    `tag` VARCHAR(200) NOT NULL DEFAULT (music),
    `producer` TEXT NOT NULL,
    `writer` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `datecreated` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `releaseDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `available` INTEGER NOT NULL DEFAULT 0,
    `totalsongplays` INTEGER NOT NULL DEFAULT 0,
    `featured` INTEGER NOT NULL DEFAULT 0,
    `AES_code` VARCHAR(11) NOT NULL DEFAULT (album),
    `exclusive` INTEGER NOT NULL DEFAULT 0,
    `notified` INTEGER NOT NULL DEFAULT 0,
    `indexed` INTEGER NOT NULL DEFAULT 0,

    FULLTEXT INDEX `title`(`title`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `analytics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `song_id` INTEGER NOT NULL,
    `artist` VARCHAR(255) NOT NULL,
    `plays` INTEGER NOT NULL,
    `plays_week` INTEGER NOT NULL,
    `plays_month` INTEGER NOT NULL,

    UNIQUE INDEX `idx_song_date`(`song_id`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artist_events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(300) NOT NULL,
    `artistID` VARCHAR(300) NOT NULL,
    `title` VARCHAR(300) NOT NULL,
    `venu` VARCHAR(300) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artistfollowing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artistid` VARCHAR(300) NOT NULL,
    `userid` VARCHAR(300) NOT NULL,
    `datefollowed` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artistpick` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tile` VARCHAR(300) NOT NULL,
    `artistID` VARCHAR(300) NOT NULL,
    `CoverArt` VARCHAR(300) NOT NULL,
    `songID` INTEGER NOT NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artistpicksongs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `songID` INTEGER NOT NULL,
    `artistPickID` INTEGER NOT NULL,
    `track_order` INTEGER NOT NULL,
    `data_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artists` (
    `no` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(300) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `facebookurl` VARCHAR(500) NOT NULL,
    `twitterurl` VARCHAR(500) NOT NULL,
    `instagramurl` VARCHAR(500) NOT NULL,
    `RecordLable` VARCHAR(500) NOT NULL DEFAULT (Independent),
    `password` VARCHAR(100) NOT NULL,
    `profilephoto` VARCHAR(300) NOT NULL,
    `coverimage` VARCHAR(300) NOT NULL DEFAULT (assets/images/profile-pics/artistbackground.png),
    `bio` VARCHAR(500) NOT NULL,
    `genre` INTEGER NOT NULL,
    `datecreated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `releaseDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `available` INTEGER NOT NULL DEFAULT 0,
    `lastupdate` VARCHAR(100) NOT NULL,
    `tag` VARCHAR(200) NOT NULL DEFAULT (music),
    `overalplays` INTEGER NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 0,
    `featured` INTEGER NOT NULL DEFAULT 0,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `circle_cost` DECIMAL(10, 2) NOT NULL DEFAULT 5000.00,
    `circle_cost_maximum` DECIMAL(10, 2) NOT NULL DEFAULT 20000.00,
    `circle_duration` INTEGER NOT NULL DEFAULT 30,
    `notified` INTEGER NOT NULL DEFAULT 0,
    `indexed` INTEGER NOT NULL DEFAULT 0,

    FULLTEXT INDEX `name`(`name`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `captions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `track_id` INTEGER NOT NULL,
    `captions` TEXT NOT NULL,
    `dateCreated` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `dateUpdated` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `available` INTEGER NOT NULL DEFAULT 1,

    INDEX `id`(`id`),
    INDEX `track_id`(`track_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collectionfollowing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `collectionID` VARCHAR(100) NOT NULL,
    `userID` VARCHAR(100) NOT NULL,
    `dateFollowed` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment_threads` (
    `thread_id` VARCHAR(30) NOT NULL,
    `thread_name` VARCHAR(100) NOT NULL,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`thread_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_id` VARCHAR(30) NOT NULL,
    `comment_thread_id` VARCHAR(30) NOT NULL,
    `parent_comment_id` VARCHAR(30) NULL,
    `user_id` VARCHAR(100) NOT NULL,
    `comment` TEXT NOT NULL,
    `created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `config` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `url` VARCHAR(250) NOT NULL,
    `source_id` VARCHAR(250) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `curatedplaylist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(300) NOT NULL,
    `pagename` VARCHAR(300) NOT NULL,
    `coverart` VARCHAR(300) NOT NULL,
    `datecreated` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expirystate` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dev` (
    `itemID1` INTEGER NOT NULL DEFAULT 0,
    `itemID2` INTEGER NOT NULL DEFAULT 0,
    `count` INTEGER NOT NULL DEFAULT 0,
    `sum` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`itemID1`, `itemID2`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(300) NOT NULL,
    `description` TEXT NOT NULL,
    `startDate` DATE NOT NULL,
    `startTime` TIME(0) NOT NULL,
    `endDate` DATE NOT NULL,
    `endtime` TIME(0) NOT NULL,
    `location` VARCHAR(300) NOT NULL,
    `host_name` VARCHAR(300) NOT NULL,
    `host_contact` VARCHAR(100) NOT NULL,
    `image` VARCHAR(500) NOT NULL,
    `ranking` INTEGER NOT NULL DEFAULT 1,
    `featured` INTEGER NOT NULL DEFAULT 1,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `frequency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` VARCHAR(300) NOT NULL,
    `songid` INTEGER NOT NULL,
    `playsmonth` INTEGER NOT NULL DEFAULT 0,
    `plays` INTEGER NOT NULL DEFAULT 0,
    `lastPlayed` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `dateAdded` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `dateUpdated` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_songs`(`songid`),
    INDEX `FK_user`(`userid`(250)),
    INDEX `songid_index`(`songid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `friends` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `followee` VARCHAR(300) NOT NULL,
    `username` VARCHAR(300) NOT NULL,
    `follower` VARCHAR(300) NOT NULL,
    `followerName` VARCHAR(300) NOT NULL,
    `datefollowed` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `tag` VARCHAR(300) NOT NULL DEFAULT (music),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `join_tracks_comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `track_id` INTEGER NOT NULL,
    `comment_thread_id` VARCHAR(30) NOT NULL,
    `datecreated` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likedsongs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `songId` INTEGER NOT NULL,
    `userID` VARCHAR(300) NOT NULL,
    `dateAdded` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `dateUpdated` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meta_data` (
    `song_id` INTEGER NOT NULL,
    `chroma` TEXT NULL,
    `mfcc` TEXT NULL,
    `spectral_centroid` TEXT NULL,
    `tempo` FLOAT NULL,
    `beat_frames` TEXT NULL,
    `onset_strength` TEXT NULL,
    `date_added` DATE NULL,
    `status` TEXT NULL,

    PRIMARY KEY (`song_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metadata` (
    `song_id` INTEGER NOT NULL,
    `chroma` TEXT NULL,
    `mfcc` TEXT NULL,
    `spectral_centroid` TEXT NULL,
    `tempo` FLOAT NULL,
    `beat_frames` TEXT NULL,
    `onset_strength` TEXT NULL,
    `date_added` DATE NULL,
    `status` TEXT NULL,

    PRIMARY KEY (`song_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(255) NOT NULL,
    `dateCreated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `sub_title` TEXT NOT NULL,
    `body` TEXT NOT NULL,
    `image_url` VARCHAR(300) NOT NULL DEFAULT (https://mwonya.com/notification_image.png),
    `action_type` VARCHAR(100) NOT NULL DEFAULT (link_profile),
    `action_id` VARCHAR(100) NOT NULL DEFAULT (link_profile),
    `send_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` INTEGER NOT NULL DEFAULT 1,
    `notified` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pesapal_ipn_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `OrderTrackingId` VARCHAR(300) NOT NULL,
    `OrderMerchantReference` VARCHAR(300) NOT NULL,
    `OrderNotificationType` VARCHAR(300) NOT NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pesapal_transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_tracking_id` VARCHAR(300) NOT NULL,
    `user_id` VARCHAR(300) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `currency` CHAR(6) NOT NULL,
    `subscription_type` VARCHAR(100) NOT NULL,
    `subscription_type_id` VARCHAR(300) NOT NULL,
    `status_code` VARCHAR(6) NOT NULL,
    `payment_status_description` VARCHAR(300) NOT NULL,
    `payment_account` VARCHAR(300) NOT NULL,
    `payment_method` VARCHAR(300) NOT NULL,
    `confirmation_code` VARCHAR(300) NOT NULL,
    `payment_created_date` DATETIME(0) NOT NULL,
    `plan_start_datetime` TIMESTAMP(0) NOT NULL DEFAULT (0000-00-00 00:00:00),
    `plan_end_datetime` TIMESTAMP(0) NOT NULL DEFAULT (0000-00-00 00:00:00),
    `plan_duration` VARCHAR(50) NOT NULL,
    `plan_description` VARCHAR(255) NOT NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `order_status` ENUM('pending', 'success', 'failed', '') NOT NULL,
    `retries` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `playlist_sliders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(300) NOT NULL,
    `playlistID` VARCHAR(300) NOT NULL,
    `owner` VARCHAR(300) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `imagepath` VARCHAR(300) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `playlists` (
    `no` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(300) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `owner` VARCHAR(50) NOT NULL,
    `ownerID` VARCHAR(300) NOT NULL,
    `dateCreated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `description` TEXT NOT NULL,
    `coverurl` VARCHAR(300) NOT NULL DEFAULT (https://assets.mwonya.com/images/createdplaylist/newplaylist.png),
    `status` INTEGER NOT NULL DEFAULT 0,
    `featuredplaylist` VARCHAR(10) NOT NULL DEFAULT (no),

    FULLTEXT INDEX `name`(`name`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `playlistsongs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `songId` INTEGER NOT NULL,
    `playlistId` VARCHAR(300) NOT NULL,
    `playlistOrder` INTEGER NOT NULL,
    `dateAdded` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `songId_index`(`songId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recommendations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(300) NULL,
    `recommended_songs` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `search_slider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(300) NOT NULL,
    `playlistID` VARCHAR(300) NOT NULL,
    `owner` VARCHAR(300) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `imagepath` VARCHAR(300) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `searches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `query` VARCHAR(1000) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `songs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NOT NULL,
    `artist` VARCHAR(300) NOT NULL,
    `feat` INTEGER NOT NULL,
    `album` VARCHAR(300) NOT NULL,
    `genre` INTEGER NOT NULL,
    `duration` VARCHAR(8) NOT NULL,
    `cover` VARCHAR(500) NOT NULL DEFAULT (http://res.cloudinary.com/simpleview/image/upload/v1468268614/clients/austin/WP2_510da756-7e9f-4e24-afc0-9e54c97e65c8.jpg),
    `path` VARCHAR(500) NOT NULL,
    `lyrics` TEXT NULL,
    `albumOrder` INTEGER NOT NULL,
    `plays` INTEGER NOT NULL,
    `meta_data` TEXT NOT NULL,
    `weekplays` INTEGER NOT NULL DEFAULT 0,
    `lastplayed` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `tag` VARCHAR(300) NOT NULL DEFAULT (music),
    `producer` TEXT NOT NULL,
    `songwriter` TEXT NOT NULL,
    `featuring` TEXT NOT NULL,
    `labels` VARCHAR(300) NOT NULL,
    `description` TEXT NOT NULL,
    `comments` INTEGER NOT NULL,
    `dateAdded` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `releaseDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `available` INTEGER NOT NULL DEFAULT 0,
    `rating` DOUBLE NOT NULL,
    `workedon` INTEGER NOT NULL DEFAULT 0,
    `indexed` INTEGER NOT NULL DEFAULT 0,

    FULLTEXT INDEX `title`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sponsored` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(300) NOT NULL,
    `imagepath` VARCHAR(300) NOT NULL,
    `pagelink` VARCHAR(300) NOT NULL,
    `datacreated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `track_plays` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `songid` INTEGER NULL,
    `total_plays` INTEGER NULL,
    `last_updated` DATETIME(0) NULL,

    UNIQUE INDEX `songid`(`songid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_notification_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(300) NULL,
    `token` VARCHAR(300) NULL,
    `dateCreated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(300) NOT NULL,
    `album_id` VARCHAR(300) NOT NULL,
    `datecreated` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `no` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(300) NOT NULL,
    `username` VARCHAR(25) NOT NULL,
    `firstName` VARCHAR(200) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(300) NOT NULL,
    `password` VARCHAR(32) NOT NULL,
    `signUpDate` DATETIME(0) NOT NULL,
    `profilePic` VARCHAR(500) NOT NULL DEFAULT (https://ui-avatars.com/api/?name=Mwonya%20User%20&background=03f440),
    `songsplayed` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(300) NOT NULL DEFAULT (00kasfa0016UazHafise),
    `verified` TINYINT NOT NULL DEFAULT 0,
    `mwRole` VARCHAR(100) NOT NULL DEFAULT (mwuser),
    `accountOrigin` VARCHAR(100) NOT NULL DEFAULT (web),
    `preferenceScore` FLOAT NOT NULL,
    `listener` INTEGER NOT NULL DEFAULT 0,

    INDEX `id`(`id`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weeklytop10` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `song_id` INTEGER NULL,
    `rank` INTEGER NULL,
    `weeks_on_chart` INTEGER NULL,
    `last_week_rank` INTEGER NULL,
    `peak_rank` INTEGER NULL,
    `entry_date` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `word_bag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(255) NULL,
    `metaphone_key` VARCHAR(255) NULL,
    `dateAdded` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
