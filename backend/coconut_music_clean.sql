-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th10 28, 2025 lúc 09:19 AM
-- Phiên bản máy phục vụ: 8.2.0
-- Phiên bản PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";




--
-- Cơ sở dữ liệu: `coconut_music`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `artists`
--

DROP TABLE IF EXISTS `artists`;
CREATE TABLE IF NOT EXISTS `artists` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `avatar_url` varchar(255) DEFAULT NULL,
  `bio` text,
  `created_at` datetime(6) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `artists`
--

INSERT INTO `artists` (`id`, `avatar_url`, `bio`, `created_at`, `is_active`, `name`, `updated_at`) VALUES
(1, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'Talented artist in the music industry', '2025-06-21 17:44:55.967937', b'1', 'Unknown Artist', '2025-06-21 17:44:55.967937'),
(2, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for BIG SHAQ', '2025-06-21 17:44:56.045921', b'1', 'BIG SHAQ', '2025-06-21 17:44:56.045921'),
(3, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for NEFFEX', '2025-06-21 17:44:56.075511', b'1', 'NEFFEX', '2025-06-21 17:44:56.075511'),
(4, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for More Plastic', '2025-06-21 17:44:56.196820', b'1', 'More Plastic', '2025-06-21 17:44:56.196820'),
(5, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for (Lofi Ver.) - Orange x Freak D', '2025-06-21 17:44:56.210757', b'1', '(Lofi Ver.) - Orange x Freak D', '2025-06-21 17:44:56.210757'),
(6, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for (Lofi Ver.) - Khải Đăng x Freak D', '2025-06-21 17:44:56.220850', b'1', '(Lofi Ver.) - Khải Đăng x Freak D', '2025-06-21 17:44:56.220850'),
(7, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for (Lofi ver by Hawys) - Việt [Video Lyrics]', '2025-06-21 17:44:56.229738', b'1', '(Lofi ver by Hawys) - Việt [Video Lyrics]', '2025-06-21 17:44:56.229738'),
(8, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for (Lofi Ver.) - Nhật Phong x MewMew', '2025-06-21 17:44:56.240894', b'1', '(Lofi Ver.) - Nhật Phong x MewMew', '2025-06-21 17:44:56.240894'),
(9, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Karra', '2025-06-21 17:44:56.293534', b'1', 'Karra', '2025-06-21 17:44:56.293534'),
(10, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Clean Bandit  Zara Larsson Beau Collins', '2025-06-21 17:44:56.306346', b'1', 'Clean Bandit  Zara Larsson Beau Collins', '2025-06-21 17:44:56.306346'),
(11, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Clean Bandit  Sean Paul  AnneMarie', '2025-06-21 17:44:56.358282', b'1', 'Clean Bandit  Sean Paul  AnneMarie', '2025-06-21 17:44:56.358282'),
(12, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Charlie Puth', '2025-06-21 17:44:56.435738', b'1', 'Charlie Puth', '2025-06-21 17:44:56.435738'),
(13, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Zombic  Felix Schorn', '2025-06-21 17:44:56.482490', b'1', 'Zombic  Felix Schorn', '2025-06-21 17:44:56.482490'),
(14, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Gryffin ft Maia', '2025-06-21 17:44:56.501286', b'1', 'Gryffin ft Maia', '2025-06-21 17:44:56.501286'),
(15, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for BEAUZ , Dallas', '2025-06-21 17:44:56.523988', b'1', 'BEAUZ , Dallas', '2025-06-21 17:44:56.523988'),
(16, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for BEAUZ  JVNA', '2025-06-21 17:44:56.550739', b'1', 'BEAUZ  JVNA', '2025-06-21 17:44:56.550739'),
(17, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Avicii', '2025-06-21 17:44:56.584697', b'1', 'Avicii', '2025-06-21 17:44:56.584697'),
(18, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Justin Bieber', '2025-06-21 17:44:56.610848', b'1', 'Justin Bieber', '2025-06-21 17:44:56.610848'),
(19, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Hawk Nelson', '2025-06-21 17:44:56.655859', b'1', 'Hawk Nelson', '2025-06-21 17:44:56.655859'),
(20, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for DnB Feint, Laura Brehm Monstercat Release', '2025-06-21 17:44:56.675606', b'1', 'DnB Feint, Laura Brehm Monstercat Release', '2025-06-21 17:44:56.675606'),
(21, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Micah Martin NCS', '2025-06-21 17:44:56.695810', b'1', 'Micah Martin NCS', '2025-06-21 17:44:56.695810'),
(22, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for NCS Release', '2025-06-21 17:44:56.729945', b'1', 'NCS Release', '2025-06-21 17:44:56.729945'),
(23, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Defqwop, Strix Deleted, NCS', '2025-06-21 17:44:56.763707', b'1', 'Defqwop, Strix Deleted, NCS', '2025-06-21 17:44:56.765727'),
(24, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Artist', '2025-06-21 17:44:56.775664', b'1', 'Artist', '2025-06-21 17:44:56.775664'),
(25, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Dylan Kaiser', '2025-06-21 17:44:56.805962', b'1', 'Dylan Kaiser', '2025-06-21 17:44:56.805962'),
(26, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Julius Dreisig & Zeus X Crona', '2025-06-21 17:44:56.845634', b'1', 'Julius Dreisig & Zeus X Crona', '2025-06-21 17:44:56.845634'),
(27, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Jo Cohen & Sex Whales', '2025-06-21 17:44:56.859855', b'1', 'Jo Cohen & Sex Whales', '2025-06-21 17:44:56.859855'),
(28, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Janji', '2025-06-21 17:44:56.885727', b'1', 'Janji', '2025-06-21 17:44:56.885727'),
(29, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Imagine Dragons', '2025-06-21 17:44:56.896728', b'1', 'Imagine Dragons', '2025-06-21 17:44:56.896728'),
(30, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for trending', '2025-06-21 17:44:56.915891', b'1', 'trending', '2025-06-21 17:44:56.915891'),
(31, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for TEST', '2025-06-21 17:44:56.928887', b'1', 'TEST', '2025-06-21 17:44:56.928887'),
(32, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for J97', '2025-06-21 17:44:56.938656', b'1', 'J97', '2025-06-21 17:44:56.938656'),
(33, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for MIT ft JAPANDEE', '2025-06-21 17:44:56.985858', b'1', 'MIT ft JAPANDEE', '2025-06-21 17:44:56.985858');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banners`
--

DROP TABLE IF EXISTS `banners`;
CREATE TABLE IF NOT EXISTS `banners` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `banners`
--

INSERT INTO `banners` (`id`, `created_at`, `image_url`, `is_active`, `link_url`, `sort_order`, `title`, `updated_at`) VALUES
(1, '2025-06-21 17:44:57.655878', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', b'1', '/music', 1, '🎵 Discover New Music', '2025-06-21 17:44:57.655878'),
(2, '2025-06-21 17:44:57.679665', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800', b'1', '/premium', 2, '🎧 Premium Features', '2025-06-21 17:44:57.679665'),
(3, '2025-06-21 17:44:57.685669', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800', b'1', '/download', 3, '📱 Mobile App Available', '2025-06-21 17:44:57.685669');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_t8o6pivur7nn124jehx7cygw5` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `created_at`, `description`, `image_url`, `is_active`, `name`, `updated_at`) VALUES
(1, '2025-06-21 17:44:55.900211', 'Những bản nhạc lofi Việt Nam thư giãn', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', b'1', 'VN Lofi', '2025-06-21 17:44:55.900211'),
(2, '2025-06-21 17:44:55.915641', 'Electronic Dance Music - Nhạc điện tử sôi động', 'https://images.unsplash.com/photo-1571974599782-87624638275d?w=400', b'1', 'EDM', '2025-06-21 17:44:55.915641'),
(3, '2025-06-21 17:44:55.927826', 'Nhạc thư giãn, êm dịu', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400', b'1', 'Chill', '2025-06-21 17:44:55.927826'),
(4, '2025-06-21 17:44:55.932484', 'Nhạc thịnh hành, xu hướng mới nhất', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', b'1', 'Trending', '2025-06-21 17:44:55.932484'),
(5, '2025-06-21 17:44:55.938111', 'Nhạc pop hiện đại', 'https://images.unsplash.com/photo-1574267432553-b38e22ad7055?w=400', b'1', 'Pop', '2025-06-21 17:44:55.938111'),
(6, '2025-06-21 17:44:55.943205', 'Nhạc hip hop và rap', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', b'1', 'Hip Hop', '2025-06-21 17:44:55.943205'),
(7, '2025-06-21 17:44:55.949844', 'Nhạc rock và alternative', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', b'1', 'Rock', '2025-06-21 17:44:55.949844'),
(8, '2025-06-21 17:44:55.955723', 'Nhạc jazz cổ điển và hiện đại', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400', b'1', 'Jazz', '2025-06-21 17:44:55.955723');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorites`
--

DROP TABLE IF EXISTS `favorites`;
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `music_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKlm7pjthpstykj5qdnmsgwvdh3` (`user_id`,`music_id`),
  KEY `FKit9o546ff6pl3rxq5namd64q3` (`music_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `favorites`
--

INSERT INTO `favorites` (`id`, `created_at`, `music_id`, `user_id`) VALUES
(45, '2025-09-14 22:53:21.214164', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorite_playlists`
--

DROP TABLE IF EXISTS `favorite_playlists`;
CREATE TABLE IF NOT EXISTS `favorite_playlists` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `playlist_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKjsvhcfym0rsj62p3n6laj0a4m` (`user_id`,`playlist_id`),
  KEY `FKeiet4qf75d84t5sso4fdgjoeg` (`playlist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `favorite_playlists`
--

INSERT INTO `favorite_playlists` (`id`, `created_at`, `playlist_id`, `user_id`) VALUES
(6, '2025-06-23 22:09:46.853629', 10, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `history`
--

DROP TABLE IF EXISTS `history`;
CREATE TABLE IF NOT EXISTS `history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `played_at` datetime(6) DEFAULT NULL,
  `music_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6v19ydsyrte2fgoeyfk5ro7ar` (`music_id`),
  KEY `FKq4kh99ws9lhtls5i3o73gw30t` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=529 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `history`
--

INSERT INTO `history` (`id`, `played_at`, `music_id`, `user_id`) VALUES
(473, '2025-07-15 21:00:41.411717', 3, 9),
(474, '2025-07-15 21:03:38.843829', 16, 9),
(475, '2025-07-15 21:08:10.941386', 32, 9),
(480, '2025-07-15 22:23:43.844868', 21, 9),
(486, '2025-07-15 22:23:46.411990', 24, 9),
(488, '2025-07-15 22:23:54.623981', 18, 9),
(491, '2025-07-15 22:23:55.023019', 19, 9),
(492, '2025-07-15 22:23:55.490005', 20, 9),
(494, '2025-07-15 22:23:57.242227', 22, 9),
(496, '2025-07-15 22:23:57.719519', 23, 9),
(500, '2025-09-14 22:31:55.515207', 1, 1),
(501, '2025-09-14 22:31:58.080296', 2, 1),
(502, '2025-09-14 22:32:01.911374', 37, 1),
(503, '2025-09-14 22:32:03.183112', 38, 1),
(504, '2025-09-14 22:32:44.557429', 2, 1),
(522, '2025-09-14 22:52:06.798868', 2, 8),
(523, '2025-09-14 22:52:10.721697', 29, 8),
(526, '2025-09-14 22:53:09.297585', 38, 8),
(528, '2025-09-14 22:53:19.087063', 1, 8);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `music`
--

DROP TABLE IF EXISTS `music`;
CREATE TABLE IF NOT EXISTS `music` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `duration_seconds` int NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `like_count` bigint DEFAULT NULL,
  `play_count` bigint DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `type_music` enum('NEW_MUSIC','TRENDING','TOP_VIEW','VN_LOFI','FAVORITE') DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `artist_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `uploaded_by` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjpdage9hhk02hayd8t66t3d98` (`artist_id`),
  KEY `FKgay0qa7jkt2teap230klglx53` (`category_id`),
  KEY `FK5guo7a7xyo2hwd8w35fmct0xt` (`uploaded_by`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `music`
--

INSERT INTO `music` (`id`, `created_at`, `duration_seconds`, `file_url`, `image_url`, `is_active`, `like_count`, `play_count`, `title`, `type_music`, `updated_at`, `artist_id`, `category_id`, `uploaded_by`) VALUES
(1, '2025-06-21 17:44:56.062802', 214, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20BIG%20SHAQ%20%20MANS%20NOT%20HOT%202Scratch%20Trap%20Remix.mp3?alt=media&token=76ecd846-2d3e-4a6e-a609-b02c8467aca4', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F63.jpeg?alt=media&token=a00ab016-adeb-4b32-b4f8-8683e0e1991b', b'1', 1, 16, 'MANS NOT HOT', 'NEW_MUSIC', '2025-09-14 22:53:21.231715', 2, 2, 1),
(2, '2025-06-21 17:44:56.079496', 204, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Unstoppable.mp3?alt=media&token=cb9343b8-057e-42f2-9da9-52bdf9614c73', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F28.jpeg?alt=media&token=801ca61f-7476-43bb-a1a3-a931bd20dbf8', b'1', 892, 4002, 'Unstoppable', 'NEW_MUSIC', '2025-09-14 22:52:06.802356', 3, 2, 1),
(3, '2025-06-21 17:44:56.085518', 176, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20%20Tell%20Me%20That%20I%20Cant%20Copyright%20Free.mp3?alt=media&token=1f591203-5c03-4ec5-80cc-8c80cd54a006', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F27.jpeg?alt=media&token=86faaafa-9df5-4a80-be3f-d3077a479e59', b'1', 915, 6414, 'Tell Me That I Cant', 'NEW_MUSIC', '2025-09-14 22:51:49.363960', 3, 2, 1),
(4, '2025-06-21 17:44:56.089797', 247, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Rumors.mp3?alt=media&token=487a50d8-3239-4c44-9018-a2a3955b5736', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F26.jpeg?alt=media&token=51093ef4-ff44-4893-95fe-b153e2db2bbb', b'1', 346, 496, 'Rumors', 'NEW_MUSIC', '2025-09-14 22:51:49.365466', 3, 2, 1),
(5, '2025-06-21 17:44:56.125745', 217, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20%20-%20Pro.mp3?alt=media&token=f45cb1f2-ca29-43db-93b9-a9da3b18ca27', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F25.jpeg?alt=media&token=639ac9e2-8942-4e17-9501-5826df07038d', b'1', 822, 6556, 'Pro', 'NEW_MUSIC', '2025-09-14 22:51:42.982202', 3, 2, 1),
(6, '2025-06-21 17:44:56.137846', 217, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Light%20It%20Up.mp3?alt=media&token=c911b412-c1c9-4cf9-ad3d-fcf8dfc8756c', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F24.jpeg?alt=media&token=b7dbfea3-bbb6-4784-90f1-5b3769612d6d', b'1', 482, 2728, 'Light It Up', 'NEW_MUSIC', '2025-09-14 22:51:43.653435', 3, 2, 1),
(7, '2025-06-21 17:44:56.145750', 215, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Hometown.mp3?alt=media&token=e9fd5476-3930-4b76-a945-79631cc8f484', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F23.jpeg?alt=media&token=fa3b8590-6c70-49c3-b8bd-bf55e55a937e', b'1', 410, 7581, 'Hometown', 'NEW_MUSIC', '2025-09-14 22:51:43.866572', 3, 2, 1),
(8, '2025-06-21 17:44:56.155787', 182, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Grateful.mp3?alt=media&token=0f7819c7-dc98-4424-b1ce-4c80df0a73dd', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F22.jpeg?alt=media&token=141040e7-83d2-4591-81f1-b242a4e86248', b'1', 875, 1706, 'Grateful', 'NEW_MUSIC', '2025-09-14 22:51:44.046192', 3, 2, 1),
(9, '2025-06-21 17:44:56.165621', 215, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Fight%20Back.mp3?alt=media&token=b646cff4-7c80-44e1-aac5-59e529e14921', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F21.jpeg?alt=media&token=224af526-8c6d-4ce7-b4f8-f344df8892de', b'1', 201, 840, 'Fight Back', 'NEW_MUSIC', '2025-09-14 22:51:45.633869', 3, 2, 1),
(10, '2025-06-21 17:44:56.174746', 186, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Cold.mp3?alt=media&token=a024de5b-2b13-4839-b01a-75a3e9f90229', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F20.jpeg?alt=media&token=4aeb11d4-69e2-4b65-adde-21ba7888a4ad', b'1', 111, 5030, 'Cold', 'NEW_MUSIC', '2025-09-14 22:51:44.238663', 3, 2, 1),
(11, '2025-06-21 17:44:56.191305', 227, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNeffex%20-%20Best%20of%20me.mp3?alt=media&token=bf79861f-c6f3-4ead-ad94-8f185dbca927', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F19.jpeg?alt=media&token=409af700-7186-4e4d-a365-0aff90db5c97', b'1', 855, 3351, 'Best of me', 'NEW_MUSIC', '2025-09-14 22:51:44.556521', 3, 2, 1),
(12, '2025-06-21 17:44:56.200857', 208, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FMore%20Plastic%20%20Razor%20NCS%20Release.mp3?alt=media&token=21ab521b-45c8-4e69-93cf-85042e36c205', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F18.jpeg?alt=media&token=404c7807-e854-453d-b59f-5f030cb70490', b'1', 582, 4079, 'Razor NCS', 'NEW_MUSIC', '2025-09-14 22:51:45.022540', 4, 2, 1),
(13, '2025-06-21 17:44:56.215767', 256, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FEm%20Ht%20Ai%20Nghe%20(Lofi%20Ver.)%20-%20Orange%20x%20Freak%20D.mp3?alt=media&token=041b7c99-5068-42ff-92f1-e50dad7a56d6', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F2345.jpeg?alt=media&token=7ffdfaeb-9528-490a-8494-699a5b5ca1a3', b'1', 187, 1946, 'Em Hát Ai Nghe', 'VN_LOFI', '2025-09-14 22:51:45.823483', 5, 3, 1),
(14, '2025-06-21 17:44:56.225713', 260, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FHm%20Nay%20Em%20Ci%20Ri%20(Lofi%20Ver.)%20-%20Khi%20ng%20x%20Freak%20D.mp3?alt=media&token=33720ad2-7c0a-4d19-b2b1-b0a50a97e49b', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F230.jpeg?alt=media&token=c77eb398-9b82-4f28-b2b1-9ca33a146e19', b'1', 476, 7762, 'Hôm Nay Em Cưới Rồi', 'VN_LOFI', '2025-09-14 22:51:46.018284', 6, 3, 1),
(15, '2025-06-21 17:44:56.235733', 150, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FHn%20C%20My%20Tri%20(Lofi%20ver%20by%20Hawys)%20-%20Vit%20%5BVideo%20Lyrics%5D.mp3?alt=media&token=641913ed-f308-4187-b510-982965cb509b', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F247.jpeg?alt=media&token=96fa78d5-84da-4462-89d0-4d9ff93d1705', b'1', 487, 8758, 'Hơn Cả Mây Trời', 'VN_LOFI', '2025-06-21 17:44:56.235733', 7, 3, 1),
(16, '2025-06-21 17:44:56.300913', 270, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Far%20Out%20%20On%20My%20Own%20feat%20Karra.mp3?alt=media&token=cc63b8b8-1917-4078-8120-c2d6824fa458', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F115.jpeg?alt=media&token=3de1bb2c-b309-4071-b700-187891fbba75', b'1', 432, 3826, 'Far Out  On My Own', 'TOP_VIEW', '2025-09-14 22:50:14.241562', 9, 2, 1),
(17, '2025-06-21 17:44:56.326023', 249, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Clean%20Bandit%20%20Symphony%20ft%20Zara%20Larsson%20Beau%20Collins%20Remix.mp3?alt=media&token=13073554-e592-4f85-99e1-b5e18c90e2b2', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F104.jpeg?alt=media&token=4a4d4340-867a-4fb2-896d-8272a98e71ff', b'1', 215, 2562, 'Symphony', 'TOP_VIEW', '2025-09-14 22:50:15.113287', 10, 3, 1),
(18, '2025-06-21 17:44:56.379849', 206, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Clean%20Bandit%20%20Rockabye%20ft%20Sean%20Paul%20%20AnneMarie%20SHAKED%20Remix.mp3?alt=media&token=529b02cf-9a9d-459a-9618-f1e5a201a856', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F103.jpeg?alt=media&token=b272e445-9359-4f28-95ca-8ab06e409f25', b'1', 784, 6619, 'Rockabye', 'TOP_VIEW', '2025-07-15 22:23:54.646250', 11, 2, 1),
(19, '2025-06-21 17:44:56.457019', 211, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Charlie%20Puth%20%20Attention%20Lyrics.mp3?alt=media&token=fb700a59-610e-4377-a66b-4747ff3a6c57', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F102.jpeg?alt=media&token=608e8a75-4629-4c2f-a34a-006ea18f8e04', b'1', 239, 1363, 'Attention', 'TOP_VIEW', '2025-07-15 22:23:55.025032', 12, 3, 1),
(20, '2025-06-21 17:44:56.493004', 160, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Besomorph%20%20N3WPORT%20%20Zombie%20Zombic%20%20Felix%20Schorn%20Remix.mp3?alt=media&token=7995c39b-5490-4af0-8473-c9d3b0f03525', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F100.jpeg?alt=media&token=76f80e09-391b-4e93-b5e1-e384e66ffa9b', b'1', 410, 8155, 'Zombie', 'TOP_VIEW', '2025-07-15 22:23:55.513217', 13, 1, 1),
(21, '2025-06-21 17:44:56.506938', 214, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Body%20Back%20%20Gryffin%20ft%20Maia%20Wright%20Lyrics%20%20Vietsub%20TikTok%20%20edit%20%20Top%20Tik%20Tok.mp3?alt=media&token=3206f8a7-7cd9-4379-8d5d-25b5b738f274', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F65.jpeg?alt=media&token=d9ff27cb-e5b2-4249-bd58-984bbd0e3447', b'1', 424, 9015, 'Body Back', 'TOP_VIEW', '2025-07-15 22:23:43.848383', 14, 2, 1),
(22, '2025-06-21 17:44:56.529590', 174, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20BEAUZ%20%20Outerspace%20feat%20Dallas.mp3?alt=media&token=d4b549fd-c83a-4195-87c9-b89d29fa2651', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F62.jpeg?alt=media&token=a9290733-c927-48d0-828a-892e8daf1336', b'1', 157, 6590, 'Outerspace', 'TOP_VIEW', '2025-07-15 22:23:57.246733', 15, 2, 1),
(23, '2025-06-21 17:44:56.562564', 188, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20BEAUZ%20%20JVNA%20%20Crazy%20NCS%20Release.mp3?alt=media&token=5cb409ee-63fc-4bda-9143-fde5e980f19d', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F61.jpeg?alt=media&token=90858835-2c3a-4770-a0c0-5d68521deedb', b'1', 271, 8199, 'Crazy', 'TOP_VIEW', '2025-07-15 22:23:57.726662', 16, 2, 1),
(24, '2025-06-21 17:44:56.596585', 242, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Avicii%20%20Wake%20Me%20Up%20Lyrics.mp3?alt=media&token=5698efd9-e288-4470-b5ca-8f14639d917c', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F60.jpeg?alt=media&token=4371a464-f6ae-4d40-a5c6-24e90a9f32f8', b'1', 509, 4971, 'Wake Me Up', 'TOP_VIEW', '2025-07-15 22:23:46.418496', 17, 2, 1),
(25, '2025-06-21 17:44:56.661242', 224, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Hawk%20Nelson%20%20Sold%20Out%20Official%20Lyric%20Video.mp3?alt=media&token=6fea3a46-88b6-4ff1-bfe1-6d3331f914fa', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F116.jpeg?alt=media&token=3985bdcd-97ea-4c9e-93bc-c92e74ab78c1', b'1', 8, 6548, 'Sold Out', 'FAVORITE', '2025-06-23 23:59:14.834225', 19, 2, 1),
(26, '2025-06-21 17:44:56.675606', 234, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20DnB%20%20Feint%20%20We%20Wont%20Be%20Alone%20feat%20Laura%20Brehm%20Monstercat%20Release.mp3?alt=media&token=57a0d61b-a85a-4887-ab08-73b969c20e8f', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F111.jpeg?alt=media&token=1535b4c6-1b15-4d25-81be-52eeedf2fcb2', b'1', 501, 5727, 'We Wont Be Alone', 'FAVORITE', '2025-06-23 23:59:15.330145', 20, 2, 1),
(27, '2025-06-21 17:44:56.713255', 230, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Dirty%20Palm%20%20Oblivion%20feat%20Micah%20Martin%20NCS%20Release.mp3?alt=media&token=f90f5d24-f842-4935-8de5-4ac3fa32e715', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F110.jpeg?alt=media&token=dc6e00b3-4989-468d-a48f-377240cf5ba7', b'1', 907, 4299, 'Dirty Palm Oblivion', 'FAVORITE', '2025-06-23 23:59:15.802858', 21, 2, 1),
(28, '2025-06-21 17:44:56.756899', 240, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Diamond%20Eyes%20%20Flutter%20NCS%20Release.mp3?alt=media&token=fedd9de4-ab34-42f7-bd2d-f5e98fac3db6', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F108.jpeg?alt=media&token=1a121504-16a1-4b98-9284-f309eb78038e', b'1', 722, 7976, 'Diamond Eyes Flutter', 'FAVORITE', '2025-06-23 23:59:16.309245', 22, 2, 1),
(29, '2025-06-21 17:44:56.765727', 240, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Defqwop%20%20Heart%20Afire%20feat%20Strix%20Deleted%20NCS%20Release.mp3?alt=media&token=6e12bef1-4467-48fc-911c-93ca1861f1e7', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F107.jpeg?alt=media&token=35725ed2-ee35-4b4f-ac4a-5b0eea77359e', b'1', 583, 4154, 'Heart Afire', 'FAVORITE', '2025-09-14 22:52:10.728768', 23, 2, 1),
(30, '2025-06-21 17:44:56.785682', 229, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Asketa%20%20Natan%20Chaim%20x%20Requenze%20x%20MIME%20%20Warriors%20NCS%20Release.mp3?alt=media&token=1ba6d675-a252-4f84-9dd7-db6f6da274d9', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F57.jpeg?alt=media&token=ca89ec54-4b68-42d2-b935-a6794f46d7d3', b'1', 388, 8214, 'Asketa  Natan Chaim', 'FAVORITE', '2025-06-24 00:56:21.965373', 24, 2, 1),
(31, '2025-06-21 17:44:56.815813', 126, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FLCS%202021%20%20Commercial%20Break%20%20Fast%20Flow.mp3?alt=media&token=48231953-5ebc-4785-9291-b57590147af7', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F14.jpeg?alt=media&token=d57d236e-8fd9-4da3-a567-0405f0347970', b'1', 837, 7678, 'Commercial Break', 'FAVORITE', '2025-06-23 10:50:31.594442', 25, 2, 1),
(32, '2025-06-21 17:44:56.855708', 201, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FJulius%20Dreisig%20%26%20Zeus%20X%20Crona%20-%20Invisible.mp3?alt=media&token=e410e5b4-97e8-4147-a105-a2dfc7b3e2e9', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F13.jpeg?alt=media&token=4439753c-334e-4db9-ab4b-2d394f4d8035', b'1', 21, 8168, 'Invisible', 'FAVORITE', '2025-07-15 21:08:10.956860', 26, 2, 1),
(33, '2025-06-21 17:44:56.879707', 237, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FJo%20Cohen%20%26%20Sex%20Whales%20-%20We%20Are.mp3?alt=media&token=2dc0787d-3a5f-4d15-8dd4-e3d573b4607c', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F12.jpeg?alt=media&token=f45224b7-525a-47f6-8207-b365cdd3ab05', b'1', 327, 8887, 'We Are', 'FAVORITE', '2025-06-23 11:35:06.394680', 27, 2, 1),
(34, '2025-06-21 17:44:56.891950', 208, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FJanji%20-%20Heroes%20Tonight.mp3?alt=media&token=709e5473-a462-459a-ba33-5dbe824272a3', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F11.jpeg?alt=media&token=ea157685-2ab9-4341-acaf-884f29874d44', b'1', 529, 507, 'Heroes Tonight', 'FAVORITE', '2025-06-23 11:46:24.244282', 28, 2, 1),
(35, '2025-06-21 17:44:56.896728', 173, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FImagine%20Dragons%20x%20JID%20%20Enemy.mp3?alt=media&token=1b7b6522-cca6-4e19-9395-5b68d329a449', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F10.jpeg?alt=media&token=26a261cf-596a-4411-9f0d-80d486347f69', b'1', 12, 1424, 'JID  Enemy', 'FAVORITE', '2025-06-21 17:44:56.896728', 29, 2, 1),
(36, '2025-06-21 17:44:56.906849', 190, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FImagine%20Dragons%20-%20Natural.mp3?alt=media&token=db5e07c2-9ed4-4c26-b84d-4c0c7df8d433', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F9.jpeg?alt=media&token=909bfc3c-57b8-45a6-94a8-761ca6dbe3c8', b'1', 139, 6659, 'Natural', 'FAVORITE', '2025-06-23 23:36:50.714725', 29, 2, 1),
(37, '2025-06-21 17:44:56.921693', 256, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FB%E1%BA%A0C%20PH%E1%BA%ACN%20%EF%BD%9C%20ICM%20x%20JACK%20%EF%BD%9C%20OFFICIAL%20MV.mp3?alt=media&token=d6156583-dd63-4e90-b307-2c74d84354af', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2Fdownload.webp?alt=media&token=ac689153-d0ed-4f3d-b183-4ab81b4f4659', b'1', 675, 7412, 'test', 'TRENDING', '2025-09-14 22:50:07.290199', 30, 4, 1),
(38, '2025-06-21 17:44:56.932023', 256, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FB%E1%BA%A0C%20PH%E1%BA%ACN%20%EF%BD%9C%20ICM%20x%20JACK%20%EF%BD%9C%20OFFICIAL%20MV.mp3?alt=media&token=71fa072e-e5f7-46ee-babc-8d337148530f', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2Fdownload.webp?alt=media&token=e630ac53-a30b-40b3-9b24-0939b4652a2e', b'1', 643, 970, 'TEST', 'TRENDING', '2025-09-14 22:53:09.298957', 31, 4, 1),
(39, '2025-06-21 17:44:56.942698', 256, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FB%E1%BA%A0C%20PH%E1%BA%ACN%20%EF%BD%9C%20ICM%20x%20JACK%20%EF%BD%9C%20OFFICIAL%20MV.mp3?alt=media&token=3ab8ac3f-a0fb-4d98-b516-0b31973400c6', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2Fdownload.webp?alt=media&token=e35290a1-cc7d-4717-98ad-278563946796', b'1', 323, 5582, 'J97', 'TRENDING', '2025-07-16 04:11:14.784173', 32, 4, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `my_list`
--

DROP TABLE IF EXISTS `my_list`;
CREATE TABLE IF NOT EXISTS `my_list` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `music_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKxb6atrvrjqhp9t5vhw4779df` (`user_id`,`music_id`),
  KEY `FK6e70g9aghqoj6aw0lr8a1haq9` (`music_id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `my_list`
--

INSERT INTO `my_list` (`id`, `created_at`, `music_id`, `user_id`) VALUES
(17, '2025-06-21 23:14:08.978390', 2, 2),
(76, '2025-06-22 05:24:09.894468', 15, 8),
(83, '2025-06-22 13:17:03.499229', 2, 8),
(84, '2025-06-22 13:17:26.493275', 14, 8),
(85, '2025-06-22 13:31:54.827148', 6, 8),
(86, '2025-06-22 13:31:59.225379', 5, 8),
(88, '2025-09-14 22:32:31.221220', 2, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlists`
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE IF NOT EXISTS `playlists` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `is_public` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtgjwvfg23v990xk7k0idmqbrj` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `playlists`
--

INSERT INTO `playlists` (`id`, `created_at`, `description`, `image_url`, `is_public`, `name`, `updated_at`, `user_id`) VALUES
(1, '2025-06-21 17:44:57.012710', 'The hottest tracks right now', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', b'1', '🎵 Trending Hits', '2025-06-21 17:44:57.012710', 1),
(2, '2025-06-21 17:44:57.110064', 'My all-time favorite songs', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300', b'0', '💖 My Favorites', '2025-06-21 17:44:57.110064', 2),
(3, '2025-06-21 17:44:57.187817', 'Perfect songs to start your day', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300', b'1', '🌅 Morning Vibes', '2025-06-21 17:44:57.187817', 3),
(4, '2025-06-21 17:44:57.251633', 'Relaxing lofi beats', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', b'1', '🎧 Lofi Chill', '2025-06-21 17:44:57.251633', 4),
(5, '2025-06-21 17:44:57.329637', 'High energy songs for workout', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300', b'1', '🔥 Workout Mix', '2025-07-16 04:11:12.347930', 5),
(6, '2025-06-21 17:44:57.375652', 'Mellow songs for evening', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300', b'0', '🌙 Night Mood', '2025-06-21 17:44:57.375652', 6),
(7, '2025-06-21 17:44:57.422468', 'Amazing vocal performances', 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300', b'1', '🎤 Top Vocals', '2025-06-21 17:44:57.422468', 1),
(9, '2025-06-21 17:44:57.521191', 'Beautiful instrumental music', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', b'0', '🎹 Instrumental', '2025-06-21 17:44:57.521191', 3),
(10, '2025-06-21 17:44:57.553805', 'Music from around the world', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300', b'1', '🌍 World Music', '2025-07-16 04:10:50.761079', 4),
(12, '2025-09-14 22:52:39.775503', 'DEMO', '/uploads/playlist-images/1757865159726_3205_2.jpg', b'1', 'Đỗ Ngọc Hiếu', '2025-09-14 22:53:02.465801', 8);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlist_music`
--

DROP TABLE IF EXISTS `playlist_music`;
CREATE TABLE IF NOT EXISTS `playlist_music` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `added_at` datetime(6) DEFAULT NULL,
  `position` int DEFAULT NULL,
  `music_id` bigint NOT NULL,
  `playlist_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKjqogmyxqyt00teo6p648ly4aw` (`playlist_id`,`music_id`),
  KEY `FK5g0xtl5e89uycye0jo1ll65sq` (`music_id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `playlist_music`
--

INSERT INTO `playlist_music` (`id`, `added_at`, `position`, `music_id`, `playlist_id`) VALUES
(1, '2025-06-21 17:44:57.030983', 1, 28, 1),
(2, '2025-06-21 17:44:57.051452', 2, 26, 1),
(3, '2025-06-21 17:44:57.056889', 3, 25, 1),
(4, '2025-06-21 17:44:57.060909', 4, 31, 1),
(5, '2025-06-21 17:44:57.067027', 5, 14, 1),
(6, '2025-06-21 17:44:57.071667', 6, 37, 1),
(7, '2025-06-21 17:44:57.077970', 7, 38, 1),
(8, '2025-06-21 17:44:57.082588', 8, 9, 1),
(9, '2025-06-21 17:44:57.088022', 9, 32, 1),
(10, '2025-06-21 17:44:57.093537', 10, 7, 1),
(11, '2025-06-21 17:44:57.097089', 11, 23, 1),
(12, '2025-06-21 17:44:57.100813', 12, 12, 1),
(13, '2025-06-21 17:44:57.105994', 13, 21, 1),
(14, '2025-06-21 17:44:57.115637', 1, 9, 2),
(15, '2025-06-21 17:44:57.120750', 2, 10, 2),
(16, '2025-06-21 17:44:57.125729', 3, 17, 2),
(17, '2025-06-21 17:44:57.129930', 4, 5, 2),
(18, '2025-06-21 17:44:57.135540', 5, 35, 2),
(19, '2025-06-21 17:44:57.138622', 6, 12, 2),
(20, '2025-06-21 17:44:57.138622', 7, 8, 2),
(21, '2025-06-21 17:44:57.145789', 8, 30, 2),
(22, '2025-06-21 17:44:57.165649', 9, 25, 2),
(23, '2025-06-21 17:44:57.171756', 10, 7, 2),
(24, '2025-06-21 17:44:57.175584', 11, 15, 2),
(25, '2025-06-21 17:44:57.176736', 12, 4, 2),
(26, '2025-06-21 17:44:57.188256', 1, 18, 3),
(27, '2025-06-21 17:44:57.195698', 2, 3, 3),
(28, '2025-06-21 17:44:57.195698', 3, 8, 3),
(29, '2025-06-21 17:44:57.205732', 4, 5, 3),
(30, '2025-06-21 17:44:57.205732', 5, 16, 3),
(31, '2025-06-21 17:44:57.215550', 6, 13, 3),
(32, '2025-06-21 17:44:57.219685', 7, 23, 3),
(33, '2025-06-21 17:44:57.225677', 8, 6, 3),
(34, '2025-06-21 17:44:57.225677', 9, 20, 3),
(35, '2025-06-21 17:44:57.235666', 10, 22, 3),
(36, '2025-06-21 17:44:57.235666', 11, 14, 3),
(37, '2025-06-21 17:44:57.256712', 1, 14, 4),
(38, '2025-06-21 17:44:57.256712', 2, 9, 4),
(39, '2025-06-21 17:44:57.265418', 3, 29, 4),
(40, '2025-06-21 17:44:57.271658', 4, 38, 4),
(41, '2025-06-21 17:44:57.275731', 5, 26, 4),
(42, '2025-06-21 17:44:57.275731', 6, 13, 4),
(43, '2025-06-21 17:44:57.279801', 7, 10, 4),
(44, '2025-06-21 17:44:57.285654', 8, 19, 4),
(45, '2025-06-21 17:44:57.287773', 9, 32, 4),
(46, '2025-06-21 17:44:57.287773', 10, 28, 4),
(47, '2025-06-21 17:44:57.305861', 11, 31, 4),
(48, '2025-06-21 17:44:57.305861', 12, 18, 4),
(49, '2025-06-21 17:44:57.315584', 13, 20, 4),
(50, '2025-06-21 17:44:57.321387', 14, 21, 4),
(51, '2025-06-21 17:44:57.329637', 15, 27, 4),
(54, '2025-06-21 17:44:57.348510', 3, 32, 5),
(57, '2025-06-21 17:44:57.355859', 6, 20, 5),
(58, '2025-06-21 17:44:57.365842', 7, 16, 5),
(59, '2025-06-21 17:44:57.369215', 8, 3, 5),
(60, '2025-06-21 17:44:57.375652', 1, 36, 6),
(61, '2025-06-21 17:44:57.386630', 2, 9, 6),
(62, '2025-06-21 17:44:57.386630', 3, 28, 6),
(63, '2025-06-21 17:44:57.386630', 4, 38, 6),
(64, '2025-06-21 17:44:57.395612', 5, 27, 6),
(65, '2025-06-21 17:44:57.395612', 6, 33, 6),
(66, '2025-06-21 17:44:57.405837', 7, 34, 6),
(67, '2025-06-21 17:44:57.405837', 8, 8, 6),
(68, '2025-06-21 17:44:57.405837', 9, 32, 6),
(69, '2025-06-21 17:44:57.415665', 10, 26, 6),
(70, '2025-06-21 17:44:57.425937', 1, 32, 7),
(71, '2025-06-21 17:44:57.425937', 2, 13, 7),
(72, '2025-06-21 17:44:57.445639', 3, 23, 7),
(73, '2025-06-21 17:44:57.445639', 4, 31, 7),
(74, '2025-06-21 17:44:57.449526', 5, 21, 7),
(75, '2025-06-21 17:44:57.455513', 6, 10, 7),
(89, '2025-06-21 17:44:57.525713', 1, 15, 9),
(90, '2025-06-21 17:44:57.526807', 2, 26, 9),
(91, '2025-06-21 17:44:57.526807', 3, 36, 9),
(92, '2025-06-21 17:44:57.537757', 4, 18, 9),
(93, '2025-06-21 17:44:57.546925', 5, 23, 9),
(94, '2025-06-21 17:44:57.571668', 1, 2, 10),
(95, '2025-06-21 17:44:57.575674', 2, 21, 10),
(96, '2025-06-21 17:44:57.575674', 3, 30, 10),
(97, '2025-06-21 17:44:57.588735', 4, 27, 10),
(98, '2025-06-21 17:44:57.588735', 5, 13, 10),
(99, '2025-06-21 17:44:57.625829', 6, 7, 10),
(100, '2025-06-21 17:44:57.625829', 7, 29, 10),
(101, '2025-06-21 17:44:57.637076', 8, 35, 10),
(102, '2025-06-21 17:44:57.645979', 9, 3, 10),
(103, '2025-06-21 17:44:57.645979', 10, 26, 10),
(104, '2025-06-21 17:44:57.655878', 11, 31, 10),
(125, '2025-07-16 04:09:24.496286', 12, 1, 10),
(127, '2025-07-16 04:10:43.193677', 13, 4, 10),
(128, '2025-07-16 04:10:50.755809', 14, 24, 10),
(129, '2025-07-16 04:10:50.757816', 14, 28, 10),
(131, '2025-07-16 04:11:12.343666', 5, 39, 5),
(132, '2025-09-14 22:52:57.717003', 1, 38, 12),
(133, '2025-09-14 22:53:02.463270', 2, 1, 12);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `avatar_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `forgot_password_token` varchar(255) DEFAULT NULL,
  `forgot_password_token_expiry` datetime(6) DEFAULT NULL,
  `is_admin` bit(1) DEFAULT NULL,
  `is_verified` bit(1) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `verify_token` varchar(255) DEFAULT NULL,
  `verify_token_expiry` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `avatar_url`, `created_at`, `email`, `forgot_password_token`, `forgot_password_token_expiry`, `is_admin`, `is_verified`, `password`, `updated_at`, `username`, `verify_token`, `verify_token_expiry`) VALUES
(1, NULL, '2025-06-21 17:44:54.935542', 'admin@coconutmusic.com', NULL, NULL, b'1', b'1', '$2a$10$qqwZHEa9.kuTH5q87sDxJOn1AE4KjDFdNFKW6xE0i610hY32/sOC.', '2025-06-21 17:44:54.935542', 'admin', NULL, NULL),
(2, NULL, '2025-06-21 17:44:55.147931', 'musiclover@example.com', NULL, NULL, b'0', b'1', '$2a$10$Tm9sJEZw2Lkwm7OMDAjVk.6UBZPSCiQkLu/MUirWptp85Lelh43Gi', '2025-06-21 17:44:55.147931', 'musiclover', NULL, NULL),
(3, NULL, '2025-06-21 17:44:55.322743', 'playlistpro@example.com', NULL, NULL, b'0', b'1', '$2a$10$SMF7A7rrOhBDDyKK4nIDtOKk2pX79CfOW27JAuB/VtFh9.CvZyQcG', '2025-06-21 17:44:55.322743', 'playlistpro', NULL, NULL),
(4, NULL, '2025-06-21 17:44:55.459636', 'melomaniac@example.com', NULL, NULL, b'0', b'1', '$2a$10$IWGQFAtCwXoRWvai41ZOZ.Y6CwJYEaisGYZRVZkb0Lpc5y1WuI3Ty', '2025-06-21 17:44:55.459636', 'melomaniac', NULL, NULL),
(5, NULL, '2025-06-21 17:44:55.680040', 'soundseeker@example.com', NULL, NULL, b'0', b'1', '$2a$10$1Jb99zIn0tqxorEMo29IZum8TXMcO2VL08AC3ZYZTB8dcjax5A8Ba', '2025-06-21 17:44:55.680040', 'soundseeker', NULL, NULL),
(6, NULL, '2025-06-21 17:44:55.881680', 'rhythmfan@example.com', NULL, NULL, b'0', b'1', '$2a$10$tYFTCTXkgp9kzwLIqI.5B.nHCYDgG4o8iSdGtqkDnigWaj/nKkBCK', '2025-06-21 17:44:55.881680', 'rhythmfan', NULL, NULL),
(8, NULL, '2025-06-22 02:31:35.963119', 'dongochieu333@gmail.com', NULL, NULL, b'0', b'1', '$2a$10$bqVLWeuyE5J3FLxUlppK9.rtxsXTfvtZzmQOC0HTyASFuyDxJ9WBi', '2025-07-14 23:09:46.430425', 'DNH', '6358cbd7-1c78-4c85-9771-ac3c293ae70b', '2025-06-23 02:31:35.954676'),
(9, NULL, '2025-07-15 12:04:33.535594', '22211tt2029@mal.com', NULL, NULL, b'0', b'1', '$2a$10$QjADxRwanUprufubIvJsa.O0Cw59DoI5bOebcTRnqsl4tjwEx9u0C', '2025-07-15 12:14:39.131663', '22211tt2029@mal.com', '00eac330-f6a3-4080-a165-10f9532fea50', '2025-07-16 12:04:33.495876');

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FKit9o546ff6pl3rxq5namd64q3` FOREIGN KEY (`music_id`) REFERENCES `music` (`id`),
  ADD CONSTRAINT `FKk7du8b8ewipawnnpg76d55fus` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `favorite_playlists`
--
ALTER TABLE `favorite_playlists`
  ADD CONSTRAINT `FK1ijpgxmq0d2ivpwsynsmdfukt` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKeiet4qf75d84t5sso4fdgjoeg` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`);

--
-- Các ràng buộc cho bảng `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `FK6v19ydsyrte2fgoeyfk5ro7ar` FOREIGN KEY (`music_id`) REFERENCES `music` (`id`),
  ADD CONSTRAINT `FKq4kh99ws9lhtls5i3o73gw30t` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `FK5guo7a7xyo2hwd8w35fmct0xt` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKgay0qa7jkt2teap230klglx53` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `FKjpdage9hhk02hayd8t66t3d98` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`);

--
-- Các ràng buộc cho bảng `my_list`
--
ALTER TABLE `my_list`
  ADD CONSTRAINT `FK6e70g9aghqoj6aw0lr8a1haq9` FOREIGN KEY (`music_id`) REFERENCES `music` (`id`),
  ADD CONSTRAINT `FKdcxcdj4vl4l7rgwvvo4j7y6jj` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `FKtgjwvfg23v990xk7k0idmqbrj` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `playlist_music`
--
ALTER TABLE `playlist_music`
  ADD CONSTRAINT `FK5g0xtl5e89uycye0jo1ll65sq` FOREIGN KEY (`music_id`) REFERENCES `music` (`id`),
  ADD CONSTRAINT `FKprmk2eaf5owals8yf2fn113lm` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`);


