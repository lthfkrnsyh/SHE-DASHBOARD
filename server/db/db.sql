-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_report
CREATE DATABASE IF NOT EXISTS `db_report` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_report`;

-- Dumping structure for table db_report.report_accident
CREATE TABLE IF NOT EXISTS `report_accident` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `date_accident` date DEFAULT NULL,
  `time_accident` text,
  `location` text,
  `department` text,
  `informasi` longtext,
  `kronologi` longtext,
  `image_accident` longtext,
  `first_aid` longtext,
  `image_first_aid` longtext,
  `event_category` text,
  `approved` varchar(50) DEFAULT NULL,
  `approved_by` varchar(50) DEFAULT NULL,
  `approved_date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_report.report_accident: ~1 rows (approximately)
INSERT INTO `report_accident` (`id`, `user_id`, `date_accident`, `time_accident`, `location`, `department`, `informasi`, `kronologi`, `image_accident`, `first_aid`, `image_first_aid`, `event_category`, `approved`, `approved_by`, `approved_date`) VALUES
	(1, 1, '2024-05-15', '11:17', 'qweq', 'qwe', 'qwe', 'qwe', '1715747222614-555352908.webp', 'qwe', '1715747222615-464528826.png', 'qwe', '1', '1', '2024-05-15 11:52:56.985');

-- Dumping structure for table db_report.report_history
CREATE TABLE IF NOT EXISTS `report_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `frequncy_kecelakaan` double NOT NULL DEFAULT '0',
  `mh_worked_hilang` double NOT NULL DEFAULT '0',
  `mh_worked_tersedia` double NOT NULL DEFAULT '0',
  `hari_kerja_hilang` double NOT NULL DEFAULT '0',
  `hari_kerja_tersedia` double NOT NULL DEFAULT '0',
  `jumlah_karyawan` double NOT NULL DEFAULT '0',
  `persen_mh_worked_hilang` double NOT NULL DEFAULT '0',
  `frequency_rate` double NOT NULL DEFAULT '0',
  `severity_rate` double NOT NULL DEFAULT '0',
  `cost_kecelakaa_kerja` double NOT NULL DEFAULT '0',
  `kec_tampa_hari_hilang` double NOT NULL DEFAULT '0',
  `kec_dg_hari_hilang` double NOT NULL DEFAULT '0',
  `data_input` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_report.report_history: ~8 rows (approximately)
INSERT INTO `report_history` (`id`, `frequncy_kecelakaan`, `mh_worked_hilang`, `mh_worked_tersedia`, `hari_kerja_hilang`, `hari_kerja_tersedia`, `jumlah_karyawan`, `persen_mh_worked_hilang`, `frequency_rate`, `severity_rate`, `cost_kecelakaa_kerja`, `kec_tampa_hari_hilang`, `kec_dg_hari_hilang`, `data_input`, `date_update`) VALUES
	(1, 20, 10, 5, 6, 60, 100, 20, 21, 22, 32, 43, 12, '2024-04-11 00:00:00', NULL),
	(2, 20, 10, 5, 6, 60, 100, 20, 21, 22, 32, 43, 12, '2024-04-11 00:00:00', NULL),
	(3, 20, 10, 5, 6, 60, 100, 20, 21, 22, 32, 43, 12, '2024-04-11 00:00:00', NULL),
	(4, 20, 10, 5, 6, 60, 100, 20, 21, 22, 32, 43, 12, '2024-04-11 00:00:00', NULL),
	(5, 20, 10, 5, 6, 60, 100, 20, 21, 22, 32, 43, 12, '2024-04-11 00:00:00', NULL),
	(6, 20, 10, 5, 6, 60, 100, 20, 21, 22, 32, 43, 12, '2024-04-11 00:00:00', NULL),
	(7, 20, 10, 5, 6, 60, 100, 20, 21, 22, 32, 43, 12, '2024-04-11 00:00:00', NULL),
	(8, 20, 10, 5, 6, 60, 100, 20, 21, 22, 32, 43, 12, '2024-04-11 00:00:00', NULL),
	(9, 20, 5, 5, 6, 60, 100, 20, 21, 22, 32, 43, 12, '2024-05-05 00:00:00', NULL);

-- Dumping structure for table db_report.report_intensitas_air
CREATE TABLE IF NOT EXISTS `report_intensitas_air` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_finish_good` double DEFAULT NULL,
  `air_permukaan` double DEFAULT NULL,
  `air_tanah` double DEFAULT NULL,
  `air_pam` double DEFAULT NULL,
  `date` date DEFAULT NULL,
  `date_create` text,
  `date_update` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_report.report_intensitas_air: ~0 rows (approximately)

-- Dumping structure for table db_report.report_solid_waste
CREATE TABLE IF NOT EXISTS `report_solid_waste` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `month` varchar(50) NOT NULL,
  `year` int NOT NULL,
  
  -- Limbah Padat Disposed (Dibuang)
  `limbah_plastik_non_b3_disposed` double DEFAULT 0,
  `limbah_domestik_non_plastik_non_b3_disposed` double DEFAULT 0,
  `limbah_industri_non_plastik_non_b3_disposed` double DEFAULT 0,
  `limbah_b3_disposed` double DEFAULT 0,
  `total_limbah_padat_disposed` double GENERATED ALWAYS AS (
    `limbah_plastik_non_b3_disposed` + 
    `limbah_domestik_non_plastik_non_b3_disposed` + 
    `limbah_industri_non_plastik_non_b3_disposed` + 
    `limbah_b3_disposed`
  ) STORED,

  -- Limbah Padat Diverted (Diolah)
  `limbah_plastik_non_b3_diverted` double DEFAULT 0,
  `limbah_domestik_non_plastik_non_b3_diverted` double DEFAULT 0,
  `limbah_industri_non_plastik_non_b3_diverted` double DEFAULT 0,
  `limbah_b3_diverted` double DEFAULT 0,
  `total_limbah_padat_diverted` double GENERATED ALWAYS AS (
    `limbah_plastik_non_b3_diverted` + 
    `limbah_domestik_non_plastik_non_b3_diverted` + 
    `limbah_industri_non_plastik_non_b3_diverted` + 
    `limbah_b3_diverted`
  ) STORED,

  -- Total Limbah Padat
  `total_limbah_padat` double GENERATED ALWAYS AS (
    `total_limbah_padat_disposed` + 
    `total_limbah_padat_diverted`
  ) STORED,

  -- Persentase Diverted
  `percentage_diverted` double GENERATED ALWAYS AS (
    CASE 
      WHEN `total_limbah_padat` = 0 THEN 0
      ELSE (`total_limbah_padat_diverted` / `total_limbah_padat`) * 100 
    END
  ) STORED,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contoh data untuk table report_solid_waste
INSERT INTO `report_solid_waste` (`month`, `year`, 
  `limbah_plastik_non_b3_disposed`, `limbah_domestik_non_plastik_non_b3_disposed`, `limbah_industri_non_plastik_non_b3_disposed`, `limbah_b3_disposed`, 
  `limbah_plastik_non_b3_diverted`, `limbah_domestik_non_plastik_non_b3_diverted`, `limbah_industri_non_plastik_non_b3_diverted`, `limbah_b3_diverted`
) VALUES
  ('Januari', 2024, 
   0, 2746.00, 0, 0, 
   2707.00, 3417.00, 12328.00, 94892.00),
  ('Februari', 2024, 
   0, 2398.00, 0, 0, 
   1947.00, 2427.00, 24984.00, 98953.00);


-- Dumping structure for table db_report.users_data
CREATE TABLE IF NOT EXISTS `users_data` (
  `user_id` bigint DEFAULT NULL,
  `full_name` text NOT NULL,
  `nrp` tinytext NOT NULL,
  `position` text NOT NULL,
  `years_of_service` text NOT NULL,
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_report.users_data: ~0 rows (approximately)

-- Dumping structure for table db_report.users_login
CREATE TABLE IF NOT EXISTS `users_login` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `phone_number` text NOT NULL,
  `address` text NOT NULL,
  `role` text NOT NULL,
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `date_create` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_update` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_report.users_login: ~5 rows (approximately)
INSERT INTO `users_login` (`id`, `name`, `email`, `password`, `phone_number`, `address`, `role`, `token`, `date_create`, `date_update`) VALUES
	(1, 'ringga', 'ringgadev@gmail.com', '$2b$10$KJUeut.u7S4u2rvlNCYk1.2Bxft1gUqQ4QOtdzbvA56gvMx69wCp2', '082284621151', 'batam', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoicmluZ2dhZGV2QGdtYWlsLmNvbSIsIm5hbWUiOiJyaW5nZ2EiLCJpYXQiOjE3MTU3NDU0NjEsImV4cCI6MTcxNTc4ODY2MX0.Vuoi9hFDskQW5FOzwYqpPm1cT-DRsncDQ3YNFALdHUI', '2024-04-18 09:49:15.650', NULL),
	(2, 'ringga', 'ringgadev2@gmail.com', '$2b$10$yQlK.xr0lipmdtbvDaeSAe2BFNo9rDVr2FgUwp7hj5qg9LNZ93Zxe', '082284621151', 'batam', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoicmluZ2dhZGV2MkBnbWFpbC5jb20iLCJuYW1lIjoicmluZ2dhIiwiaWF0IjoxNzE0ODI5NzM5LCJleHAiOjE3MTQ4NzI5Mzl9.BA5PRJESNQH51vKnxjnnFBLsGmARJQQkfWTlsVMg46E', '2024-04-30 11:22:42.922', NULL),
	(4, 'Ringga septia pribadi', 'ringgadev@gmail.com', '$2b$10$rF3okel3VjlfJzi4RcGUB.DOs8LFF4oQ0AvMBJzB95lTyyjkqUMk.', '123', 'fasdf', '2', NULL, '2024-04-30 16:53:11.074', NULL),
	(5, 'Ringga septia pribadi', 'ringgadev2@gmail.com', '$2b$10$ksimDmLMtIDhgQFo3JuMy.OEhSe9DnrjUUIqVix5N32kDdfyddQIW', '123', 'fasdf', '2', NULL, '2024-05-01 20:35:16.367', NULL),
	(6, 'ringga', 'ringgadev2@gmail.com', '$2b$10$GukOAJDNu4FFCL7p5MU.Ue9/b15VRupkmZ5G5CoXHhUPIUYYey9CW', '082284621151', 'batam', '2', NULL, '2024-05-01 20:36:49.959', NULL);

-- Dumping structure for table db_report.user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL DEFAULT '0',
  `name` text NOT NULL,
  `date_create` text NOT NULL,
  `date_update` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='ini dalah table untuk mendevinisikan role dari user yang terdaftar ';

-- Dumping data for table db_report.user_roles: ~2 rows (approximately)
INSERT INTO `user_roles` (`id`, `code`, `name`, `date_create`, `date_update`) VALUES
	(1, 'ROOT', 'root', '2024-04-18 09:49:15.650', ''),
	(2, 'ADMIN', 'admin', '2024-04-18 09:49:15.650', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
