-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 14, 2021 at 09:53 AM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groupomania`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(2040) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `noteId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `noteId` (`noteId`),
  KEY `userId` (`userId`),
  KEY `firstname` (`firstname`),
  KEY `lastname` (`lastname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `message`, `createdAt`, `updatedAt`, `noteId`, `userId`, `firstname`, `lastname`) VALUES
(1, 'Superbe !', '2021-09-14 09:35:19', '2021-09-14 09:35:19', 1, 1, 'Bili', 'Snod'),
(2, 'Trop mignon', '2021-09-14 09:39:54', '2021-09-14 09:39:54', 5, 1, 'Bili', 'Snod'),
(3, 'J\'en veux un !', '2021-09-14 09:40:22', '2021-09-14 09:40:22', 5, 1, 'Bili', 'Snod'),
(4, 'Cool !', '2021-09-14 09:49:57', '2021-09-14 09:49:57', 6, 1, 'Bili', 'Snod');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
CREATE TABLE IF NOT EXISTS `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(2040) NOT NULL,
  `mediaUrl` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `firstname` (`firstname`),
  KEY `lastname` (`lastname`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `content`, `mediaUrl`, `createdAt`, `updatedAt`, `userId`, `firstname`, `lastname`) VALUES
(1, 'Jaguar', 'Ce félin tacheté ressemble physiquement au léopard, mais il est généralement plus grand et d\'apparence plus massive. En outre son habitat et son comportement sont plus proches de ceux du tigre. Bien que la forêt tropicale dense constitue son habitat de prédilection, le jaguar s\'accommode d\'une large variété de milieux ouverts et boisés. Il est fortement associé à la présence de l\'eau et, comme le tigre, il aime nager. C\'est un prédateur solitaire qui chasse à l\'affût, tout en étant opportuniste dans la sélection des proies. C\'est aussi un superprédateur qui joue un rôle important dans la stabilisation des écosystèmes et la régulation des populations qu\'il chasse. Il a développé une puissance de morsure exceptionnelle, même par rapport aux autres grands félins, ce qui lui permet de percer les carapaces des reptiles et d\'employer une méthode de mise à mort inhabituelle : il mord directement le crâne de sa proie et porte ainsi un coup fatal au cerveau. ', 'http://localhost:3000/medias/jaguar_3.jpg1631612001608.jpg', '2021-09-14 09:33:21', '2021-09-14 09:33:21', 2, 'Kubo', 'Kun'),
(2, 'Jaguar roulant', 'Des modèles, le plus marquant est la Jaguar XJ (produite depuis 1968), qui reste pour beaucoup la Jaguar ultime. Depuis 1968, les séries I des XJ ont été profondément modifiées en 1973 (série II), en 1979 (série III), en 1986 pour l\'Europe et 1987 pour les États-Unis (XJ40), 1995 (X300), 1997 (jusqu\'à la X308 propulsée par un V8), et 2003 (la X350), et enfin la nouvelle X351 apparue en 2009. Les modèles XJ les plus luxueux portent les marques Vanden Plas ou Daimler. Jaguar produit aussi des voitures plus accessibles, comme la Jaguar S-Type (1999-2008) et plus petite encore, la Jaguar X-Type (2001-2009).', 'http://localhost:3000/medias/jaguar-cars-jaguar-ftype.gif1631612098930.gif', '2021-09-14 09:34:58', '2021-09-14 09:34:58', 1, 'Bili', 'Snod'),
(3, 'Jaguar électronique', 'Ce prétendu système 64 bits voit sa campagne publicitaire axée sur sa supériorité sur les systèmes 16 bits existants. Les ventes sont mauvaises dès le départ  : il ne s\'écoulera que 120 000 consoles la première année aux États-Unis2 et elles déclineront rapidement faute de bons jeux. La programmation est difficile et le matériel contient quelques bogues, notamment un qui provoque l’arrêt des processeurs avec un code spécifique exécuté en mémoire. Les sorties de la PlayStation et de la Saturn sonnent le glas de la Jaguar en 1995.', 'http://localhost:3000/medias/1280px-Atari-Jaguar-Console-Set.png1631612169900.png', '2021-09-14 09:36:09', '2021-09-14 09:36:09', 1, 'Bili', 'Snod'),
(4, 'Acinonyx jubatus', 'Le guépard (Acinonyx jubatus) est un grand mammifère carnassier de la famille des félidés vivant en Afrique et en Asie de l\'Ouest. Le guépard a une allure svelte et fine, avec de longues pattes élancées (aux griffes semi-rétractiles ou non-rétractiles selon les sources), et une face au museau court marquée par deux traces noires partant des yeux. Son pelage est entièrement tacheté de noir sur un fond fauve à beige très clair ; les petits sont pourvus d\'une courte crinière qui disparaît à l\'âge adulte. Il est considéré comme l\'animal terrestre le plus rapide au monde, sa vitesse à la course pouvant atteindre 112 km/h. ', 'http://localhost:3000/medias/cheetah_GIF.gif1631612271080.gif', '2021-09-14 09:37:51', '2021-09-14 09:37:51', 3, 'Plue', 'Chan'),
(5, 'Encore un guépard...', 'Très beau !', 'http://localhost:3000/medias/cheetah_PNG.png1631612344069.png', '2021-09-14 09:39:04', '2021-09-14 09:39:04', 3, 'Plue', 'Chan'),
(6, 'Moi aussi je sais des trucs', 'La phylogenèse est l\'étude de l\'apparition et de la formation d\'une espèce grâce à des fossiles. Avec l\'étude de phylogénie moléculaire, on sait que la famille des félidés a pour dernier ancêtre commun un félin préhistorique apparu il y a environ 20 millions d\'années, Pseudaelurus. La première lignée de félins à diverger est celle des Panthérinés, il y a environ 10,8 millions d\'années29. Le guépard résulte d\'une divergence bien plus récente, il y a environ 6,7 millions d\'années, de la lignée du Puma29, qui est en effet le félin actuel le plus proche du guépard. À la suite de l\'apparition de la lignée du Puma, celle-ci divergea pour donner d\'un côté le genre Puma et d\'un autre le genre Acinonyx29. Le genre Acinonyx est apparu durant le Pliocène : on retrouve des fossiles du guépard en Afrique du Sud qui datent de la fin de cette période. L\'apparition du guépard semble donc dater d\'il y a trois millions d\'années', 'http://localhost:3000/medias/cheetah_JPEG-lowercase.jpg1631612515910.jpg', '2021-09-14 09:41:55', '2021-09-14 09:41:55', 1, 'Bili', 'Snod');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL,
  `level` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `level`, `createdAt`, `updatedAt`) VALUES
(1, 'user', '2021-09-14 09:22:36', '2021-09-14 09:22:36'),
(2, 'admin', '2021-09-14 09:22:36', '2021-09-14 09:22:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `firstname` (`firstname`),
  UNIQUE KEY `lastname` (`lastname`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Bili', 'Snod', 'address@ema.il', '$2b$08$Samnh4fFuxCLgOlcN2ErseD4UeuZmQOpV8zCbYUY0LDDsqqdHJegy', '2021-09-14 09:28:48', '2021-09-14 09:28:48'),
(2, 'Kubo', 'Kun', 'email@addr.ess', '$2b$08$x6MsnTrY1M8K5m9burmo8eAGl1N8WVCEQb80FG4pTWMwzPClNPqT6', '2021-09-14 09:29:41', '2021-09-14 09:29:41'),
(3, 'Plue', 'Chan', 'email@add.ress', '$2b$08$PsWCmvecukPis.cb2DTk8u/B5wyTfNp6E5q.IpnADG/TgZVRZxmAu', '2021-09-14 09:30:10', '2021-09-14 09:30:10');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE IF NOT EXISTS `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `roleId` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `userId`, `roleId`) VALUES
('2021-09-14 09:28:48', '2021-09-14 09:28:48', 1, 2),
('2021-09-14 09:29:41', '2021-09-14 09:29:41', 2, 1),
('2021-09-14 09:30:10', '2021-09-14 09:30:10', 3, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`noteId`) REFERENCES `notes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`firstname`) REFERENCES `users` (`firstname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`lastname`) REFERENCES `users` (`lastname`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`firstname`) REFERENCES `users` (`firstname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notes_ibfk_3` FOREIGN KEY (`lastname`) REFERENCES `users` (`lastname`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
