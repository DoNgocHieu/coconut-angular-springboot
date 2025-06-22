-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th6 20, 2025 lúc 06:11 AM
-- Phiên bản máy phục vụ: 9.1.0
-- Phiên bản PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `coconut_music`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `artists`
--

DROP TABLE IF EXISTS `artists`;
CREATE TABLE IF NOT EXISTS `artists` (
  `is_active` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `bio` text,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `artists`
--

INSERT INTO `artists` (`is_active`, `created_at`, `id`, `updated_at`, `avatar_url`, `bio`, `name`) VALUES
(b'1', '2025-06-20 13:01:10.284704', 1, '2025-06-20 13:01:10.284704', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', 'Talented artist in the music industry', 'Unknown Artist'),
(b'1', '2025-06-20 13:01:10.351403', 2, '2025-06-20 13:01:10.351403', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for BIG SHAQ', 'BIG SHAQ'),
(b'1', '2025-06-20 13:01:10.371956', 3, '2025-06-20 13:01:10.371956', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for NEFFEX', 'NEFFEX'),
(b'1', '2025-06-20 13:01:10.439893', 4, '2025-06-20 13:01:10.439893', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for More Plastic', 'More Plastic'),
(b'1', '2025-06-20 13:01:10.466229', 5, '2025-06-20 13:01:10.466229', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for (Lofi Ver.) - Orange x Freak D', '(Lofi Ver.) - Orange x Freak D'),
(b'1', '2025-06-20 13:01:10.475417', 6, '2025-06-20 13:01:10.475417', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for (Lofi Ver.) - Khải Đăng x Freak D', '(Lofi Ver.) - Khải Đăng x Freak D'),
(b'1', '2025-06-20 13:01:10.487866', 7, '2025-06-20 13:01:10.487866', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for (Lofi ver by Hawys) - Việt [Video Lyrics]', '(Lofi ver by Hawys) - Việt [Video Lyrics]'),
(b'1', '2025-06-20 13:01:10.498517', 8, '2025-06-20 13:01:10.498517', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for (Lofi Ver.) - Nhật Phong x MewMew', '(Lofi Ver.) - Nhật Phong x MewMew'),
(b'1', '2025-06-20 13:01:10.529753', 9, '2025-06-20 13:01:10.529753', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Karra', 'Karra'),
(b'1', '2025-06-20 13:01:10.540151', 10, '2025-06-20 13:01:10.540151', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Clean Bandit  Zara Larsson Beau Collins', 'Clean Bandit  Zara Larsson Beau Collins'),
(b'1', '2025-06-20 13:01:10.552473', 11, '2025-06-20 13:01:10.552473', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Clean Bandit  Sean Paul  AnneMarie', 'Clean Bandit  Sean Paul  AnneMarie'),
(b'1', '2025-06-20 13:01:10.562296', 12, '2025-06-20 13:01:10.562296', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Charlie Puth', 'Charlie Puth'),
(b'1', '2025-06-20 13:01:10.572678', 13, '2025-06-20 13:01:10.572678', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Zombic  Felix Schorn', 'Zombic  Felix Schorn'),
(b'1', '2025-06-20 13:01:10.583742', 14, '2025-06-20 13:01:10.583742', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Gryffin ft Maia', 'Gryffin ft Maia'),
(b'1', '2025-06-20 13:01:10.594647', 15, '2025-06-20 13:01:10.594647', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for BEAUZ , Dallas', 'BEAUZ , Dallas'),
(b'1', '2025-06-20 13:01:10.606784', 16, '2025-06-20 13:01:10.606784', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for BEAUZ  JVNA', 'BEAUZ  JVNA'),
(b'1', '2025-06-20 13:01:10.619427', 17, '2025-06-20 13:01:10.619427', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Avicii', 'Avicii'),
(b'1', '2025-06-20 13:01:10.629735', 18, '2025-06-20 13:01:10.629735', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Justin Bieber', 'Justin Bieber'),
(b'1', '2025-06-20 13:01:10.649760', 19, '2025-06-20 13:01:10.649760', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Hawk Nelson', 'Hawk Nelson'),
(b'1', '2025-06-20 13:01:10.660788', 20, '2025-06-20 13:01:10.660788', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for DnB Feint, Laura Brehm Monstercat Release', 'DnB Feint, Laura Brehm Monstercat Release'),
(b'1', '2025-06-20 13:01:10.672076', 21, '2025-06-20 13:01:10.672076', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Micah Martin NCS', 'Micah Martin NCS'),
(b'1', '2025-06-20 13:01:10.684014', 22, '2025-06-20 13:01:10.684014', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for NCS Release', 'NCS Release'),
(b'1', '2025-06-20 13:01:10.693018', 23, '2025-06-20 13:01:10.693018', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Defqwop, Strix Deleted, NCS', 'Defqwop, Strix Deleted, NCS'),
(b'1', '2025-06-20 13:01:10.704121', 24, '2025-06-20 13:01:10.704121', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Artist', 'Artist'),
(b'1', '2025-06-20 13:01:10.714465', 25, '2025-06-20 13:01:10.714465', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Dylan Kaiser', 'Dylan Kaiser'),
(b'1', '2025-06-20 13:01:10.724909', 26, '2025-06-20 13:01:10.724909', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Julius Dreisig & Zeus X Crona', 'Julius Dreisig & Zeus X Crona'),
(b'1', '2025-06-20 13:01:10.735345', 27, '2025-06-20 13:01:10.735345', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Jo Cohen & Sex Whales', 'Jo Cohen & Sex Whales'),
(b'1', '2025-06-20 13:01:10.746803', 28, '2025-06-20 13:01:10.746803', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Janji', 'Janji'),
(b'1', '2025-06-20 13:01:10.757769', 29, '2025-06-20 13:01:10.757769', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for Imagine Dragons', 'Imagine Dragons'),
(b'1', '2025-06-20 13:01:10.789811', 30, '2025-06-20 13:01:10.789811', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for trending', 'trending'),
(b'1', '2025-06-20 13:01:10.802147', 31, '2025-06-20 13:01:10.802147', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for TEST', 'TEST'),
(b'1', '2025-06-20 13:01:10.811581', 32, '2025-06-20 13:01:10.811581', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for J97', 'J97'),
(b'1', '2025-06-20 13:01:10.823251', 33, '2025-06-20 13:01:10.823251', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', 'Biography for MIT ft JAPANDEE', 'MIT ft JAPANDEE');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banners`
--

DROP TABLE IF EXISTS `banners`;
CREATE TABLE IF NOT EXISTS `banners` (
  `is_active` bit(1) DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `banners`
--

INSERT INTO `banners` (`is_active`, `sort_order`, `created_at`, `id`, `updated_at`, `image_url`, `link_url`, `title`) VALUES
(b'1', 1, '2025-06-20 13:01:11.297793', 1, '2025-06-20 13:01:11.297793', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', '/music', '🎵 Discover New Music'),
(b'1', 2, '2025-06-20 13:01:11.302867', 2, '2025-06-20 13:01:11.302867', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800', '/premium', '🎧 Premium Features'),
(b'1', 3, '2025-06-20 13:01:11.306860', 3, '2025-06-20 13:01:11.306860', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800', '/download', '📱 Mobile App Available');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `is_active` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_t8o6pivur7nn124jehx7cygw5` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`is_active`, `created_at`, `id`, `updated_at`, `description`, `image_url`, `name`) VALUES
(b'1', '2025-06-20 13:01:10.236075', 1, '2025-06-20 13:01:10.236075', 'Những bản nhạc lofi Việt Nam thư giãn', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 'VN Lofi'),
(b'1', '2025-06-20 13:01:10.241312', 2, '2025-06-20 13:01:10.241312', 'Electronic Dance Music - Nhạc điện tử sôi động', 'https://images.unsplash.com/photo-1571974599782-87624638275d?w=400', 'EDM'),
(b'1', '2025-06-20 13:01:10.247761', 3, '2025-06-20 13:01:10.247761', 'Nhạc thư giãn, êm dịu', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400', 'Chill'),
(b'1', '2025-06-20 13:01:10.253064', 4, '2025-06-20 13:01:10.253064', 'Nhạc thịnh hành, xu hướng mới nhất', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 'Trending'),
(b'1', '2025-06-20 13:01:10.258137', 5, '2025-06-20 13:01:10.258137', 'Nhạc pop hiện đại', 'https://images.unsplash.com/photo-1574267432553-b38e22ad7055?w=400', 'Pop'),
(b'1', '2025-06-20 13:01:10.264973', 6, '2025-06-20 13:01:10.264973', 'Nhạc hip hop và rap', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 'Hip Hop'),
(b'1', '2025-06-20 13:01:10.269634', 7, '2025-06-20 13:01:10.269634', 'Nhạc rock và alternative', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 'Rock'),
(b'1', '2025-06-20 13:01:10.274930', 8, '2025-06-20 13:01:10.274930', 'Nhạc jazz cổ điển và hiện đại', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400', 'Jazz');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorites`
--

DROP TABLE IF EXISTS `favorites`;
CREATE TABLE IF NOT EXISTS `favorites` (
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `music_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKlm7pjthpstykj5qdnmsgwvdh3` (`user_id`,`music_id`),
  KEY `FKit9o546ff6pl3rxq5namd64q3` (`music_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `favorites`
--

INSERT INTO `favorites` (`created_at`, `id`, `music_id`, `user_id`) VALUES
('2025-06-20 13:03:32.293592', 1, 1, 1),
('2025-06-20 13:10:21.735435', 2, 2, 1),
('2025-06-20 13:10:32.098210', 3, 4, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorite_playlists`
--

DROP TABLE IF EXISTS `favorite_playlists`;
CREATE TABLE IF NOT EXISTS `favorite_playlists` (
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `playlist_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKfavorite_playlist_user` (`user_id`,`playlist_id`),
  KEY `FKfavorite_playlist_playlist` (`playlist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `favorite_playlists`
--

INSERT INTO `favorite_playlists` (`created_at`, `id`, `playlist_id`, `user_id`) VALUES
('2025-06-22 15:30:00.000000', 1, 1, 1),
('2025-06-22 15:30:00.000000', 2, 3, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `history`
--

DROP TABLE IF EXISTS `history`;
CREATE TABLE IF NOT EXISTS `history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `music_id` bigint NOT NULL,
  `played_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6v19ydsyrte2fgoeyfk5ro7ar` (`music_id`),
  KEY `FKq4kh99ws9lhtls5i3o73gw30t` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `history`
--

INSERT INTO `history` (`id`, `music_id`, `played_at`, `user_id`) VALUES
(1, 2, '2025-06-20 13:09:47.057377', 1),
(2, 37, '2025-06-20 13:10:11.938409', 1),
(3, 1, '2025-06-20 13:10:17.269771', 1),
(4, 2, '2025-06-20 13:10:20.403976', 1),
(5, 4, '2025-06-20 13:10:31.013713', 1),
(6, 2, '2025-06-20 13:10:49.613080', 1),
(7, 3, '2025-06-20 13:10:51.092499', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `music`
--

DROP TABLE IF EXISTS `music`;
CREATE TABLE IF NOT EXISTS `music` (
  `duration_seconds` int NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `artist_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `like_count` bigint DEFAULT NULL,
  `play_count` bigint DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `uploaded_by` bigint DEFAULT NULL,
  `file_url` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `type_music` enum('NEW_MUSIC','TRENDING','TOP_VIEW','VN_LOFI','FAVORITE') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjpdage9hhk02hayd8t66t3d98` (`artist_id`),
  KEY `FKgay0qa7jkt2teap230klglx53` (`category_id`),
  KEY `FK5guo7a7xyo2hwd8w35fmct0xt` (`uploaded_by`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `music`
--

INSERT INTO `music` (`duration_seconds`, `is_active`, `artist_id`, `category_id`, `created_at`, `id`, `like_count`, `play_count`, `updated_at`, `uploaded_by`, `file_url`, `image_url`, `title`, `type_music`) VALUES
(214, b'1', 2, 2, '2025-06-20 13:01:10.364395', 1, 674, 19, '2025-06-20 13:01:10.364395', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20BIG%20SHAQ%20%20MANS%20NOT%20HOT%202Scratch%20Trap%20Remix.mp3?alt=media&token=76ecd846-2d3e-4a6e-a609-b02c8467aca4', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F63.jpeg?alt=media&token=a00ab016-adeb-4b32-b4f8-8683e0e1991b', 'MANS NOT HOT', 'NEW_MUSIC'),
(204, b'1', 3, 2, '2025-06-20 13:01:10.378474', 2, 6, 5769, '2025-06-20 13:01:10.378474', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Unstoppable.mp3?alt=media&token=cb9343b8-057e-42f2-9da9-52bdf9614c73', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F28.jpeg?alt=media&token=801ca61f-7476-43bb-a1a3-a931bd20dbf8', 'Unstoppable', 'NEW_MUSIC'),
(176, b'1', 3, 2, '2025-06-20 13:01:10.384482', 3, 14, 1010, '2025-06-20 13:01:10.384482', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20%20Tell%20Me%20That%20I%20Cant%20Copyright%20Free.mp3?alt=media&token=1f591203-5c03-4ec5-80cc-8c80cd54a006', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F27.jpeg?alt=media&token=86faaafa-9df5-4a80-be3f-d3077a479e59', 'Tell Me That I Cant', 'NEW_MUSIC'),
(247, b'1', 3, 2, '2025-06-20 13:01:10.390770', 4, 311, 3433, '2025-06-20 13:01:10.390770', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Rumors.mp3?alt=media&token=487a50d8-3239-4c44-9018-a2a3955b5736', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F26.jpeg?alt=media&token=51093ef4-ff44-4893-95fe-b153e2db2bbb', 'Rumors', 'NEW_MUSIC'),
(217, b'1', 3, 2, '2025-06-20 13:01:10.397217', 5, 483, 801, '2025-06-20 13:01:10.397217', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20%20-%20Pro.mp3?alt=media&token=f45cb1f2-ca29-43db-93b9-a9da3b18ca27', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F25.jpeg?alt=media&token=639ac9e2-8942-4e17-9501-5826df07038d', 'Pro', 'NEW_MUSIC'),
(217, b'1', 3, 2, '2025-06-20 13:01:10.403771', 6, 79, 7491, '2025-06-20 13:01:10.403771', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Light%20It%20Up.mp3?alt=media&token=c911b412-c1c9-4cf9-ad3d-fcf8dfc8756c', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F24.jpeg?alt=media&token=b7dbfea3-bbb6-4784-90f1-5b3769612d6d', 'Light It Up', 'NEW_MUSIC'),
(215, b'1', 3, 2, '2025-06-20 13:01:10.409047', 7, 539, 1015, '2025-06-20 13:01:10.409047', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Hometown.mp3?alt=media&token=e9fd5476-3930-4b76-a945-79631cc8f484', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F23.jpeg?alt=media&token=fa3b8590-6c70-49c3-b8bd-bf55e55a937e', 'Hometown', 'NEW_MUSIC'),
(182, b'1', 3, 2, '2025-06-20 13:01:10.414549', 8, 504, 3050, '2025-06-20 13:01:10.414549', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Grateful.mp3?alt=media&token=0f7819c7-dc98-4424-b1ce-4c80df0a73dd', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F22.jpeg?alt=media&token=141040e7-83d2-4591-81f1-b242a4e86248', 'Grateful', 'NEW_MUSIC'),
(215, b'1', 3, 2, '2025-06-20 13:01:10.421268', 9, 393, 2352, '2025-06-20 13:01:10.421268', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Fight%20Back.mp3?alt=media&token=b646cff4-7c80-44e1-aac5-59e529e14921', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F21.jpeg?alt=media&token=224af526-8c6d-4ce7-b4f8-f344df8892de', 'Fight Back', 'NEW_MUSIC'),
(186, b'1', 3, 2, '2025-06-20 13:01:10.426715', 10, 427, 929, '2025-06-20 13:01:10.426715', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNEFFEX%20-%20Cold.mp3?alt=media&token=a024de5b-2b13-4839-b01a-75a3e9f90229', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F20.jpeg?alt=media&token=4aeb11d4-69e2-4b65-adde-21ba7888a4ad', 'Cold', 'NEW_MUSIC'),
(227, b'1', 3, 2, '2025-06-20 13:01:10.433982', 11, 400, 7557, '2025-06-20 13:01:10.433982', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FNeffex%20-%20Best%20of%20me.mp3?alt=media&token=bf79861f-c6f3-4ead-ad94-8f185dbca927', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F19.jpeg?alt=media&token=409af700-7186-4e4d-a365-0aff90db5c97', 'Best of me', 'NEW_MUSIC'),
(208, b'1', 4, 2, '2025-06-20 13:01:10.445055', 12, 147, 2091, '2025-06-20 13:01:10.445055', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FMore%20Plastic%20%20Razor%20NCS%20Release.mp3?alt=media&token=21ab521b-45c8-4e69-93cf-85042e36c205', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F18.jpeg?alt=media&token=404c7807-e854-453d-b59f-5f030cb70490', 'Razor NCS', 'NEW_MUSIC'),
(256, b'1', 5, 3, '2025-06-20 13:01:10.471381', 13, 236, 457, '2025-06-20 13:01:10.471381', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FEm%20Ht%20Ai%20Nghe%20(Lofi%20Ver.)%20-%20Orange%20x%20Freak%20D.mp3?alt=media&token=041b7c99-5068-42ff-92f1-e50dad7a56d6', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F2345.jpeg?alt=media&token=7ffdfaeb-9528-490a-8494-699a5b5ca1a3', 'Em Hát Ai Nghe', 'VN_LOFI'),
(260, b'1', 6, 3, '2025-06-20 13:01:10.482131', 14, 731, 9347, '2025-06-20 13:01:10.482131', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FHm%20Nay%20Em%20Ci%20Ri%20(Lofi%20Ver.)%20-%20Khi%20ng%20x%20Freak%20D.mp3?alt=media&token=33720ad2-7c0a-4d19-b2b1-b0a50a97e49b', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F230.jpeg?alt=media&token=c77eb398-9b82-4f28-b2b1-9ca33a146e19', 'Hôm Nay Em Cưới Rồi', 'VN_LOFI'),
(150, b'1', 7, 3, '2025-06-20 13:01:10.492349', 15, 878, 4794, '2025-06-20 13:01:10.492349', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FHn%20C%20My%20Tri%20(Lofi%20ver%20by%20Hawys)%20-%20Vit%20%5BVideo%20Lyrics%5D.mp3?alt=media&token=641913ed-f308-4187-b510-982965cb509b', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F247.jpeg?alt=media&token=96fa78d5-84da-4462-89d0-4d9ff93d1705', 'Hơn Cả Mây Trời', 'VN_LOFI'),
(270, b'1', 9, 2, '2025-06-20 13:01:10.535506', 16, 227, 5259, '2025-06-20 13:01:10.535506', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Far%20Out%20%20On%20My%20Own%20feat%20Karra.mp3?alt=media&token=cc63b8b8-1917-4078-8120-c2d6824fa458', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F115.jpeg?alt=media&token=3de1bb2c-b309-4071-b700-187891fbba75', 'Far Out  On My Own', 'TOP_VIEW'),
(249, b'1', 10, 3, '2025-06-20 13:01:10.546462', 17, 262, 4198, '2025-06-20 13:01:10.546462', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Clean%20Bandit%20%20Symphony%20ft%20Zara%20Larsson%20Beau%20Collins%20Remix.mp3?alt=media&token=13073554-e592-4f85-99e1-b5e18c90e2b2', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F104.jpeg?alt=media&token=4a4d4340-867a-4fb2-896d-8272a98e71ff', 'Symphony', 'TOP_VIEW'),
(206, b'1', 11, 2, '2025-06-20 13:01:10.556997', 18, 593, 4491, '2025-06-20 13:01:10.556997', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Clean%20Bandit%20%20Rockabye%20ft%20Sean%20Paul%20%20AnneMarie%20SHAKED%20Remix.mp3?alt=media&token=529b02cf-9a9d-459a-9618-f1e5a201a856', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F103.jpeg?alt=media&token=b272e445-9359-4f28-95ca-8ab06e409f25', 'Rockabye', 'TOP_VIEW'),
(211, b'1', 12, 3, '2025-06-20 13:01:10.566778', 19, 235, 9685, '2025-06-20 13:01:10.566778', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Charlie%20Puth%20%20Attention%20Lyrics.mp3?alt=media&token=fb700a59-610e-4377-a66b-4747ff3a6c57', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F102.jpeg?alt=media&token=608e8a75-4629-4c2f-a34a-006ea18f8e04', 'Attention', 'TOP_VIEW'),
(160, b'1', 13, 1, '2025-06-20 13:01:10.577216', 20, 152, 4063, '2025-06-20 13:01:10.577216', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Besomorph%20%20N3WPORT%20%20Zombie%20Zombic%20%20Felix%20Schorn%20Remix.mp3?alt=media&token=7995c39b-5490-4af0-8473-c9d3b0f03525', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F100.jpeg?alt=media&token=76f80e09-391b-4e93-b5e1-e384e66ffa9b', 'Zombie', 'TOP_VIEW'),
(214, b'1', 14, 2, '2025-06-20 13:01:10.588916', 21, 880, 4310, '2025-06-20 13:01:10.588916', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Body%20Back%20%20Gryffin%20ft%20Maia%20Wright%20Lyrics%20%20Vietsub%20TikTok%20%20edit%20%20Top%20Tik%20Tok.mp3?alt=media&token=3206f8a7-7cd9-4379-8d5d-25b5b738f274', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F65.jpeg?alt=media&token=d9ff27cb-e5b2-4249-bd58-984bbd0e3447', 'Body Back', 'TOP_VIEW'),
(174, b'1', 15, 2, '2025-06-20 13:01:10.601076', 22, 942, 4524, '2025-06-20 13:01:10.601076', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20BEAUZ%20%20Outerspace%20feat%20Dallas.mp3?alt=media&token=d4b549fd-c83a-4195-87c9-b89d29fa2651', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F62.jpeg?alt=media&token=a9290733-c927-48d0-828a-892e8daf1336', 'Outerspace', 'TOP_VIEW'),
(188, b'1', 16, 2, '2025-06-20 13:01:10.613043', 23, 898, 5756, '2025-06-20 13:01:10.613043', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20BEAUZ%20%20JVNA%20%20Crazy%20NCS%20Release.mp3?alt=media&token=5cb409ee-63fc-4bda-9143-fde5e980f19d', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F61.jpeg?alt=media&token=90858835-2c3a-4770-a0c0-5d68521deedb', 'Crazy', 'TOP_VIEW'),
(242, b'1', 17, 2, '2025-06-20 13:01:10.623727', 24, 867, 9384, '2025-06-20 13:01:10.623727', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Avicii%20%20Wake%20Me%20Up%20Lyrics.mp3?alt=media&token=5698efd9-e288-4470-b5ca-8f14639d917c', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F60.jpeg?alt=media&token=4371a464-f6ae-4d40-a5c6-24e90a9f32f8', 'Wake Me Up', 'TOP_VIEW'),
(224, b'1', 19, 2, '2025-06-20 13:01:10.654652', 25, 754, 636, '2025-06-20 13:01:10.654652', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Hawk%20Nelson%20%20Sold%20Out%20Official%20Lyric%20Video.mp3?alt=media&token=6fea3a46-88b6-4ff1-bfe1-6d3331f914fa', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F116.jpeg?alt=media&token=3985bdcd-97ea-4c9e-93bc-c92e74ab78c1', 'Sold Out', 'FAVORITE'),
(234, b'1', 20, 2, '2025-06-20 13:01:10.666621', 26, 441, 1041, '2025-06-20 13:01:10.666621', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20DnB%20%20Feint%20%20We%20Wont%20Be%20Alone%20feat%20Laura%20Brehm%20Monstercat%20Release.mp3?alt=media&token=57a0d61b-a85a-4887-ab08-73b969c20e8f', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F111.jpeg?alt=media&token=1535b4c6-1b15-4d25-81be-52eeedf2fcb2', 'We Wont Be Alone', 'FAVORITE'),
(230, b'1', 21, 2, '2025-06-20 13:01:10.677950', 27, 454, 8864, '2025-06-20 13:01:10.677950', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Dirty%20Palm%20%20Oblivion%20feat%20Micah%20Martin%20NCS%20Release.mp3?alt=media&token=f90f5d24-f842-4935-8de5-4ac3fa32e715', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F110.jpeg?alt=media&token=dc6e00b3-4989-468d-a48f-377240cf5ba7', 'Dirty Palm Oblivion', 'FAVORITE'),
(240, b'1', 22, 2, '2025-06-20 13:01:10.688009', 28, 794, 3969, '2025-06-20 13:01:10.688009', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Diamond%20Eyes%20%20Flutter%20NCS%20Release.mp3?alt=media&token=fedd9de4-ab34-42f7-bd2d-f5e98fac3db6', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F108.jpeg?alt=media&token=1a121504-16a1-4b98-9284-f309eb78038e', 'Diamond Eyes Flutter', 'FAVORITE'),
(240, b'1', 23, 2, '2025-06-20 13:01:10.699904', 29, 585, 9278, '2025-06-20 13:01:10.699904', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Defqwop%20%20Heart%20Afire%20feat%20Strix%20Deleted%20NCS%20Release.mp3?alt=media&token=6e12bef1-4467-48fc-911c-93ca1861f1e7', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F107.jpeg?alt=media&token=35725ed2-ee35-4b4f-ac4a-5b0eea77359e', 'Heart Afire', 'FAVORITE'),
(229, b'1', 24, 2, '2025-06-20 13:01:10.709444', 30, 325, 5320, '2025-06-20 13:01:10.709444', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2Fy2mate.com%20-%20Asketa%20%20Natan%20Chaim%20x%20Requenze%20x%20MIME%20%20Warriors%20NCS%20Release.mp3?alt=media&token=1ba6d675-a252-4f84-9dd7-db6f6da274d9', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F57.jpeg?alt=media&token=ca89ec54-4b68-42d2-b935-a6794f46d7d3', 'Asketa  Natan Chaim', 'FAVORITE'),
(126, b'1', 25, 2, '2025-06-20 13:01:10.719526', 31, 586, 6136, '2025-06-20 13:01:10.719526', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FLCS%202021%20%20Commercial%20Break%20%20Fast%20Flow.mp3?alt=media&token=48231953-5ebc-4785-9291-b57590147af7', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F14.jpeg?alt=media&token=d57d236e-8fd9-4da3-a567-0405f0347970', 'Commercial Break', 'FAVORITE'),
(201, b'1', 26, 2, '2025-06-20 13:01:10.729031', 32, 567, 4876, '2025-06-20 13:01:10.729031', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FJulius%20Dreisig%20%26%20Zeus%20X%20Crona%20-%20Invisible.mp3?alt=media&token=e410e5b4-97e8-4147-a105-a2dfc7b3e2e9', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F13.jpeg?alt=media&token=4439753c-334e-4db9-ab4b-2d394f4d8035', 'Invisible', 'FAVORITE'),
(237, b'1', 27, 2, '2025-06-20 13:01:10.740823', 33, 353, 1903, '2025-06-20 13:01:10.740823', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FJo%20Cohen%20%26%20Sex%20Whales%20-%20We%20Are.mp3?alt=media&token=2dc0787d-3a5f-4d15-8dd4-e3d573b4607c', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F12.jpeg?alt=media&token=f45224b7-525a-47f6-8207-b365cdd3ab05', 'We Are', 'FAVORITE'),
(208, b'1', 28, 2, '2025-06-20 13:01:10.751148', 34, 156, 3975, '2025-06-20 13:01:10.751148', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FJanji%20-%20Heroes%20Tonight.mp3?alt=media&token=709e5473-a462-459a-ba33-5dbe824272a3', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F11.jpeg?alt=media&token=ea157685-2ab9-4341-acaf-884f29874d44', 'Heroes Tonight', 'FAVORITE'),
(173, b'1', 29, 2, '2025-06-20 13:01:10.762465', 35, 918, 4254, '2025-06-20 13:01:10.762465', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FImagine%20Dragons%20x%20JID%20%20Enemy.mp3?alt=media&token=1b7b6522-cca6-4e19-9395-5b68d329a449', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F10.jpeg?alt=media&token=26a261cf-596a-4411-9f0d-80d486347f69', 'JID  Enemy', 'FAVORITE'),
(190, b'1', 29, 2, '2025-06-20 13:01:10.768538', 36, 674, 8856, '2025-06-20 13:01:10.768538', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FImagine%20Dragons%20-%20Natural.mp3?alt=media&token=db5e07c2-9ed4-4c26-b84d-4c0c7df8d433', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2F9.jpeg?alt=media&token=909bfc3c-57b8-45a6-94a8-761ca6dbe3c8', 'Natural', 'FAVORITE'),
(256, b'1', 30, 4, '2025-06-20 13:01:10.795037', 37, 254, 3551, '2025-06-20 13:01:10.795037', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FB%E1%BA%A0C%20PH%E1%BA%ACN%20%EF%BD%9C%20ICM%20x%20JACK%20%EF%BD%9C%20OFFICIAL%20MV.mp3?alt=media&token=d6156583-dd63-4e90-b307-2c74d84354af', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2Fdownload.webp?alt=media&token=ac689153-d0ed-4f3d-b183-4ab81b4f4659', 'test', 'TRENDING'),
(256, b'1', 31, 4, '2025-06-20 13:01:10.806683', 38, 446, 1127, '2025-06-20 13:01:10.806683', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FB%E1%BA%A0C%20PH%E1%BA%ACN%20%EF%BD%9C%20ICM%20x%20JACK%20%EF%BD%9C%20OFFICIAL%20MV.mp3?alt=media&token=71fa072e-e5f7-46ee-babc-8d337148530f', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2Fdownload.webp?alt=media&token=e630ac53-a30b-40b3-9b24-0939b4652a2e', 'TEST', 'TRENDING'),
(256, b'1', 32, 4, '2025-06-20 13:01:10.817898', 39, 573, 5779, '2025-06-20 13:01:10.817898', 1, 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/mp3%2FB%E1%BA%A0C%20PH%E1%BA%ACN%20%EF%BD%9C%20ICM%20x%20JACK%20%EF%BD%9C%20OFFICIAL%20MV.mp3?alt=media&token=3ab8ac3f-a0fb-4d98-b516-0b31973400c6', 'https://firebasestorage.googleapis.com/v0/b/aloimp3.appspot.com/o/images%2Fdownload.webp?alt=media&token=e35290a1-cc7d-4717-98ad-278563946796', 'J97', 'TRENDING');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlists`
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE IF NOT EXISTS `playlists` (
  `is_public` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtgjwvfg23v990xk7k0idmqbrj` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `playlists`
--

INSERT INTO `playlists` (`is_public`, `created_at`, `id`, `updated_at`, `user_id`, `description`, `image_url`, `name`) VALUES
(b'1', '2025-06-20 13:01:10.844207', 1, '2025-06-20 13:01:10.844207', 1, 'The hottest tracks right now', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', '🎵 Trending Hits'),
(b'0', '2025-06-20 13:01:10.881399', 2, '2025-06-20 13:01:10.881399', 2, 'My all-time favorite songs', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300', '💖 My Favorites'),
(b'1', '2025-06-20 13:01:10.930163', 3, '2025-06-20 13:01:10.930163', 3, 'Perfect songs to start your day', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300', '🌅 Morning Vibes'),
(b'1', '2025-06-20 13:01:10.958921', 4, '2025-06-20 13:01:10.958921', 4, 'Relaxing lofi beats', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', '🎧 Lofi Chill'),
(b'1', '2025-06-20 13:01:10.990507', 5, '2025-06-20 13:01:10.990507', 5, 'High energy songs for workout', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300', '🔥 Workout Mix'),
(b'0', '2025-06-20 13:01:11.058025', 6, '2025-06-20 13:01:11.058025', 6, 'Mellow songs for evening', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300', '🌙 Night Mood'),
(b'1', '2025-06-20 13:01:11.109016', 7, '2025-06-20 13:01:11.109016', 1, 'Amazing vocal performances', 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300', '🎤 Top Vocals'),
(b'1', '2025-06-20 13:01:11.169009', 8, '2025-06-20 13:01:11.169009', 2, 'Popular radio songs', 'https://images.unsplash.com/photo-1520637836862-4d197d17c26a?w=300', '📻 Radio Hits'),
(b'0', '2025-06-20 13:01:11.199191', 9, '2025-06-20 13:01:11.199191', 3, 'Beautiful instrumental music', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', '🎹 Instrumental'),
(b'1', '2025-06-20 13:01:11.237497', 10, '2025-06-20 13:01:11.237497', 4, 'Music from around the world', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300', '🌍 World Music');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlist_music`
--

DROP TABLE IF EXISTS `playlist_music`;
CREATE TABLE IF NOT EXISTS `playlist_music` (
  `position` int DEFAULT NULL,
  `added_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `music_id` bigint NOT NULL,
  `playlist_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKjqogmyxqyt00teo6p648ly4aw` (`playlist_id`,`music_id`),
  KEY `FK5g0xtl5e89uycye0jo1ll65sq` (`music_id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `playlist_music`
--

INSERT INTO `playlist_music` (`position`, `added_at`, `id`, `music_id`, `playlist_id`) VALUES
(1, '2025-06-20 13:01:10.850775', 1, 16, 1),
(2, '2025-06-20 13:01:10.855939', 2, 11, 1),
(3, '2025-06-20 13:01:10.861793', 3, 30, 1),
(4, '2025-06-20 13:01:10.867038', 4, 31, 1),
(5, '2025-06-20 13:01:10.871310', 5, 26, 1),
(6, '2025-06-20 13:01:10.874772', 6, 37, 1),
(1, '2025-06-20 13:01:10.886919', 7, 33, 2),
(2, '2025-06-20 13:01:10.891179', 8, 8, 2),
(3, '2025-06-20 13:01:10.895887', 9, 37, 2),
(4, '2025-06-20 13:01:10.900630', 10, 11, 2),
(5, '2025-06-20 13:01:10.905214', 11, 28, 2),
(6, '2025-06-20 13:01:10.910505', 12, 14, 2),
(7, '2025-06-20 13:01:10.915139', 13, 15, 2),
(8, '2025-06-20 13:01:10.920166', 14, 2, 2),
(9, '2025-06-20 13:01:10.925172', 15, 38, 2),
(1, '2025-06-20 13:01:10.934916', 16, 14, 3),
(2, '2025-06-20 13:01:10.940063', 17, 3, 3),
(3, '2025-06-20 13:01:10.943753', 18, 27, 3),
(4, '2025-06-20 13:01:10.949922', 19, 30, 3),
(5, '2025-06-20 13:01:10.953941', 20, 26, 3),
(1, '2025-06-20 13:01:10.965109', 21, 24, 4),
(2, '2025-06-20 13:01:10.970211', 22, 5, 4),
(3, '2025-06-20 13:01:10.974460', 23, 1, 4),
(4, '2025-06-20 13:01:10.980498', 24, 39, 4),
(5, '2025-06-20 13:01:10.984508', 25, 2, 4),
(1, '2025-06-20 13:01:10.994495', 26, 12, 5),
(2, '2025-06-20 13:01:11.000716', 27, 20, 5),
(3, '2025-06-20 13:01:11.005031', 28, 5, 5),
(4, '2025-06-20 13:01:11.009870', 29, 13, 5),
(5, '2025-06-20 13:01:11.016164', 30, 28, 5),
(6, '2025-06-20 13:01:11.020712', 31, 35, 5),
(7, '2025-06-20 13:01:11.026237', 32, 14, 5),
(8, '2025-06-20 13:01:11.031725', 33, 31, 5),
(9, '2025-06-20 13:01:11.037302', 34, 2, 5),
(10, '2025-06-20 13:01:11.042356', 35, 24, 5),
(11, '2025-06-20 13:01:11.046369', 36, 27, 5),
(12, '2025-06-20 13:01:11.052014', 37, 38, 5),
(1, '2025-06-20 13:01:11.062012', 38, 3, 6),
(2, '2025-06-20 13:01:11.066540', 39, 27, 6),
(3, '2025-06-20 13:01:11.070539', 40, 29, 6),
(4, '2025-06-20 13:01:11.076546', 41, 37, 6),
(5, '2025-06-20 13:01:11.080559', 42, 13, 6),
(6, '2025-06-20 13:01:11.085791', 43, 19, 6),
(7, '2025-06-20 13:01:11.090652', 44, 1, 6),
(8, '2025-06-20 13:01:11.094570', 45, 10, 6),
(9, '2025-06-20 13:01:11.099451', 46, 38, 6),
(10, '2025-06-20 13:01:11.103843', 47, 24, 6),
(1, '2025-06-20 13:01:11.113676', 48, 28, 7),
(2, '2025-06-20 13:01:11.117554', 49, 25, 7),
(3, '2025-06-20 13:01:11.122844', 50, 3, 7),
(4, '2025-06-20 13:01:11.127270', 51, 20, 7),
(5, '2025-06-20 13:01:11.132576', 52, 14, 7),
(6, '2025-06-20 13:01:11.137835', 53, 12, 7),
(7, '2025-06-20 13:01:11.141853', 54, 7, 7),
(8, '2025-06-20 13:01:11.146953', 55, 4, 7),
(9, '2025-06-20 13:01:11.151187', 56, 15, 7),
(10, '2025-06-20 13:01:11.154733', 57, 29, 7),
(11, '2025-06-20 13:01:11.158862', 58, 21, 7),
(12, '2025-06-20 13:01:11.164093', 59, 16, 7),
(1, '2025-06-20 13:01:11.172996', 60, 22, 8),
(2, '2025-06-20 13:01:11.178580', 61, 8, 8),
(3, '2025-06-20 13:01:11.183577', 62, 3, 8),
(4, '2025-06-20 13:01:11.189598', 63, 16, 8),
(5, '2025-06-20 13:01:11.193605', 64, 5, 8),
(1, '2025-06-20 13:01:11.204730', 65, 35, 9),
(2, '2025-06-20 13:01:11.208745', 66, 6, 9),
(3, '2025-06-20 13:01:11.213911', 67, 24, 9),
(4, '2025-06-20 13:01:11.218419', 68, 3, 9),
(5, '2025-06-20 13:01:11.222438', 69, 7, 9),
(6, '2025-06-20 13:01:11.227444', 70, 20, 9),
(7, '2025-06-20 13:01:11.232948', 71, 10, 9),
(1, '2025-06-20 13:01:11.241497', 72, 30, 10),
(2, '2025-06-20 13:01:11.247183', 73, 12, 10),
(3, '2025-06-20 13:01:11.251718', 74, 17, 10),
(4, '2025-06-20 13:01:11.256237', 75, 15, 10),
(5, '2025-06-20 13:01:11.260297', 76, 28, 10),
(6, '2025-06-20 13:01:11.264351', 77, 14, 10),
(7, '2025-06-20 13:01:11.268340', 78, 8, 10),
(8, '2025-06-20 13:01:11.273765', 79, 5, 10),
(9, '2025-06-20 13:01:11.277790', 80, 31, 10),
(10, '2025-06-20 13:01:11.283964', 81, 25, 10),
(11, '2025-06-20 13:01:11.287964', 82, 7, 10);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `is_admin` bit(1) DEFAULT NULL,
  `is_verified` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `forgot_password_token_expiry` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `verify_token_expiry` datetime(6) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `forgot_password_token` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `verify_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`is_admin`, `is_verified`, `created_at`, `forgot_password_token_expiry`, `id`, `updated_at`, `verify_token_expiry`, `avatar_url`, `email`, `forgot_password_token`, `password`, `username`, `verify_token`) VALUES
(b'1', b'1', '2025-06-20 13:01:09.815321', NULL, 1, '2025-06-20 13:01:09.815321', NULL, NULL, 'admin@coconutmusic.com', NULL, '$2a$10$FhHNQuxCwWERjvqNmT95t.5wfZkdnLfH8IEbrk5dWFBy1H2A9YLTi', 'admin', NULL),
(b'0', b'1', '2025-06-20 13:01:09.915236', NULL, 2, '2025-06-20 13:01:09.915236', NULL, NULL, 'musiclover@example.com', NULL, '$2a$10$Acnzvyk1AZIXZ3IPs5yCpuj1bWljC/qvLFOX6V4fjwdldZJ7Yy/im', 'musiclover', NULL),
(b'0', b'1', '2025-06-20 13:01:09.993969', NULL, 3, '2025-06-20 13:01:09.993969', NULL, NULL, 'playlistpro@example.com', NULL, '$2a$10$de.O6qu3vk2mz5YsGmzN3u4dahFe7gKfdgIdq8ZX2e9m1MlzEz7Du', 'playlistpro', NULL),
(b'0', b'1', '2025-06-20 13:01:10.071047', NULL, 4, '2025-06-20 13:01:10.071047', NULL, NULL, 'melomaniac@example.com', NULL, '$2a$10$UesH2NrxQshOQwYbmNquJeA5Vw7Y6nJOZUr7eJxn3Asg1tcLjyyFm', 'melomaniac', NULL),
(b'0', b'1', '2025-06-20 13:01:10.147930', NULL, 5, '2025-06-20 13:01:10.147930', NULL, NULL, 'soundseeker@example.com', NULL, '$2a$10$9z9w7FWlO9y1HShzWWCTkOUWkPwoTWrs7iobrJM0yhNh08La0wODW', 'soundseeker', NULL),
(b'0', b'1', '2025-06-20 13:01:10.225050', NULL, 6, '2025-06-20 13:01:10.225050', NULL, NULL, 'rhythmfan@example.com', NULL, '$2a$10$b9TXP95fs27gI/fkxwAWjOjQYZeYGdI54nX44SxyVljkPvsfAZ1BK', 'rhythmfan', NULL);

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
  ADD CONSTRAINT `FKfavorite_playlist_playlist_ref` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`),
  ADD CONSTRAINT `FKfavorite_playlist_user_ref` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
