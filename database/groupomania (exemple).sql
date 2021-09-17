-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 17, 2021 at 09:23 PM
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
  `userId` int DEFAULT NULL,
  `noteId` int DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `noteId` (`noteId`),
  KEY `firstname` (`firstname`),
  KEY `lastname` (`lastname`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `message`, `createdAt`, `updatedAt`, `userId`, `noteId`, `firstname`, `lastname`) VALUES
(1, 'Super !', '2021-09-17 21:07:17', '2021-09-17 21:07:17', 1, 1, 'Bili', 'Snod'),
(2, 'Le jaguar est le plus gros félin sauvage des Amériques, surpassant légèrement le puma, et le troisième au monde après le tigre et le lion. Il existe d\'importantes variations de taille parmi sa population selon les régions et les habitats, le poids de l\'animal tendant à augmenter au sud de son aire de répartition.', '2021-09-17 21:08:07', '2021-09-17 21:08:07', 1, 2, 'Bili', 'Snod'),
(3, 'J\'ai la même dans Gran Turismo...', '2021-09-17 21:08:48', '2021-09-17 21:08:48', 1, 4, 'Bili', 'Snod'),
(4, 'Trop mignon <3', '2021-09-17 21:09:03', '2021-09-17 21:09:03', 1, 9, 'Bili', 'Snod'),
(5, 'Très très beau.', '2021-09-17 21:09:42', '2021-09-17 21:09:42', 1, 11, 'Bili', 'Snod'),
(6, 'Hé ! J\'avais déjà envoyé cette image !!', '2021-09-17 21:10:34', '2021-09-17 21:10:34', 3, 12, 'Plue', 'Chan'),
(8, 'Mon animal préféré.', '2021-09-17 21:11:29', '2021-09-17 21:11:29', 3, 11, 'Plue', 'Chan'),
(9, 'Ca ne rivalise pas avec un éphélant ou une nouiffe.', '2021-09-17 21:12:26', '2021-09-17 21:12:26', 3, 8, 'Plue', 'Chan'),
(10, 'Ca vient de quel dessin animé ?', '2021-09-17 21:12:52', '2021-09-17 21:12:52', 3, 7, 'Plue', 'Chan'),
(11, '<3 <3 <3', '2021-09-17 21:13:14', '2021-09-17 21:13:14', 3, 6, 'Plue', 'Chan'),
(12, 'Sympa la manette.................', '2021-09-17 21:14:06', '2021-09-17 21:14:06', 3, 5, 'Plue', 'Chan'),
(13, 'Elle serait mieux en bleu. Non ?', '2021-09-17 21:14:40', '2021-09-17 21:14:40', 3, 4, 'Plue', 'Chan'),
(14, 'Ah, oui... Désolé !', '2021-09-17 21:15:28', '2021-09-17 21:15:28', 2, 12, 'Kubo', 'Kun'),
(15, 'J\'adore !', '2021-09-17 21:16:08', '2021-09-17 21:16:08', 2, 9, 'Kubo', 'Kun'),
(16, 'C\'est ton avis et tu le partages ^^', '2021-09-17 21:16:55', '2021-09-17 21:16:55', 2, 8, 'Kubo', 'Kun'),
(17, 'Aucune idée :<', '2021-09-17 21:17:11', '2021-09-17 21:17:11', 2, 7, 'Kubo', 'Kun'),
(18, 'Elle va plus vite en jaune, haha >_<', '2021-09-17 21:18:19', '2021-09-17 21:18:19', 2, 4, 'Kubo', 'Kun'),
(19, 'Fameuses moustache.', '2021-09-17 21:19:20', '2021-09-17 21:19:20', 1, 3, 'Bili', 'Snod'),
(20, 'Moi c\'est les ornithorynques !', '2021-09-17 21:20:05', '2021-09-17 21:20:05', 1, 11, 'Bili', 'Snod'),
(21, 'On pouvait téléphoner avec... non je rigole.', '2021-09-17 21:21:17', '2021-09-17 21:21:17', 1, 5, 'Bili', 'Snod');

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `content`, `mediaUrl`, `createdAt`, `updatedAt`, `userId`, `firstname`, `lastname`) VALUES
(1, 'Acinonyx jubatus', 'Le guépard (Acinonyx jubatus) est un grand mammifère carnassier de la famille des félidés vivant en Afrique et en Asie de l\'Ouest. Le guépard a une allure svelte et fine, avec de longues pattes élancées (aux griffes semi-rétractiles ou non-rétractiles selon les sources), et une face au museau court marquée par deux traces noires partant des yeux. Son pelage est entièrement tacheté de noir sur un fond fauve à beige très clair ; les petits sont pourvus d\'une courte crinière qui disparaît à l\'âge adulte. Il est considéré comme l\'animal terrestre le plus rapide au monde, sa vitesse à la course pouvant atteindre 112 km/h.', 'http://localhost:3000/medias/cheetah_GIF-uppercase.GIF1631911967433.gif', '2021-09-17 20:52:47', '2021-09-17 20:52:47', 3, 'Plue', 'Chan'),
(2, 'Jaguar', 'Ce félin tacheté ressemble physiquement au léopard, mais il est généralement plus grand et d\'apparence plus massive. En outre son habitat et son comportement sont plus proches de ceux du tigre. Bien que la forêt tropicale dense constitue son habitat de prédilection, le jaguar s\'accommode d\'une large variété de milieux ouverts et boisés. Il est fortement associé à la présence de l\'eau et, comme le tigre, il aime nager. C\'est un prédateur solitaire qui chasse à l\'affût, tout en étant opportuniste dans la sélection des proies. C\'est aussi un superprédateur qui joue un rôle important dans la stabilisation des écosystèmes et la régulation des populations qu\'il chasse. Il a développé une puissance de morsure exceptionnelle, même par rapport aux autres grands félins, ce qui lui permet de percer les carapaces des reptiles et d\'employer une méthode de mise à mort inhabituelle : il mord directement le crâne de sa proie et porte ainsi un coup fatal au cerveau.', 'http://localhost:3000/medias/jaguar_JPEG-lowercase.jpg1631912027638.jpg', '2021-09-17 20:53:47', '2021-09-17 20:53:47', 3, 'Plue', 'Chan'),
(3, 'Panthera onca', 'Le jaguar (Panthera onca) est un mammifère carnivore de la famille des Felidae. C\'est l\'un des cinq « grands félins » du genre Panthera, avec le tigre, le lion, la panthère des neiges et le léopard. Son aire de répartition actuelle s\'étend du Mexique à la majeure partie de l\'Amérique centrale et de l\'Amérique du Sud, jusqu\'au nord de l\'Argentine et du Paraguay. Hormis des errances occasionnelles de spécimens originaires du Mexique, le jaguar est une espèce extirpée des États-Unis depuis le début des années 1970. En France sa présence à l\'état sauvage se limite à la Guyane.', 'http://localhost:3000/medias/jaguar_GIF-lowercase.gif1631912070779.gif', '2021-09-17 20:54:30', '2021-09-17 20:54:30', 2, 'Kubo', 'Kun'),
(4, 'Jaguar roulant', 'Des modèles, le plus marquant est la Jaguar XJ (produite depuis 1968), qui reste pour beaucoup la Jaguar ultime. Depuis 1968, les séries I des XJ ont été profondément modifiées en 1973 (série II), en 1979 (série III), en 1986 pour l\'Europe et 1987 pour les États-Unis (XJ40), 1995 (X300), 1997 (jusqu\'à la X308 propulsée par un V8), et 2003 (la X350), et enfin la nouvelle X351 apparue en 2009. Les modèles XJ les plus luxueux portent les marques Vanden Plas ou Daimler. Jaguar produit aussi des voitures plus accessibles, comme la Jaguar S-Type (1999-2008) et plus petite encore, la Jaguar X-Type (2001-2009).', 'http://localhost:3000/medias/jaguar_GIF-uppercase.GIF1631912110690.gif', '2021-09-17 20:55:10', '2021-09-17 20:55:10', 2, 'Kubo', 'Kun'),
(5, 'Jaguar électronique', 'Ce prétendu système 64 bits voit sa campagne publicitaire axée sur sa supériorité sur les systèmes 16 bits existants. Les ventes sont mauvaises dès le départ  : il ne s\'écoulera que 120 000 consoles la première année aux États-Unis et elles déclineront rapidement faute de bons jeux. La programmation est difficile et le matériel contient quelques bogues, notamment un qui provoque l’arrêt des processeurs avec un code spécifique exécuté en mémoire. Les sorties de la PlayStation et de la Saturn sonnent le glas de la Jaguar en 1995.', 'http://localhost:3000/medias/jaguar_PNG.png1631912182720.png', '2021-09-17 20:56:22', '2021-09-17 21:22:11', 1, 'Bili', 'Snod'),
(6, 'Guépard', 'Classé vulnérable par l\'Union internationale pour la conservation de la nature, le guépard fait actuellement l\'objet de diverses tentatives de protection, incluant des procédés de clonage. L\'espèce est divisée en cinq sous-espèces présentant des différences mineures de morphologie ou de comportement. Parmi celles-ci, le guépard asiatique, le guépard du Sahara et le guépard d\'Afrique du Nord-Est sont classées en danger critique d\'extinction. La population de guépards est passée de 100 000 individus au début du XXe siècle à 7 100 en 2019.', 'http://localhost:3000/medias/cheetah_JPEG-lowercase.jpg1631912217114.jpg', '2021-09-17 20:56:57', '2021-09-17 20:56:57', 1, 'Bili', 'Snod'),
(7, 'Jump !', 'In 1975, five subspecies were considered valid taxa: A. j. hecki, A. j. jubatus, A. j. raineyi, A. j. soemmeringii and A. j. venaticus.[20] In 2011, a phylogeographic study found minimal genetic variation between A. j. jubatus and A. j. raineyi; only four subspecies were identified. In 2017, the Cat Classification Task Force of the IUCN Cat Specialist Group revised felid taxonomy and recognised these four subspecies as valid.', 'http://localhost:3000/medias/cheetah_GIF-space.gif1631912297121.gif', '2021-09-17 20:58:17', '2021-09-17 20:58:17', 2, 'Kubo', 'Kun'),
(8, 'Jagular', 'The jaguar\'s coat ranges from pale yellow to tan or reddish-yellow, while the ventral areas are whitish, and is covered in black spots. The spots and their shapes vary: on the sides they become rosettes which may include one or several dots. The spots on the head and neck are generally solid, as are those on the tail where they may merge to form bands near the end and create a black tip. They are elongated on the middle of the back, often connecting to create a median stripe, and blotchy on the belly.[9] These patterns serve as camouflage in areas with dense vegetation and patchy shadows.[35] Jaguars living in forests are often darker and considerably smaller than those living in open areas, possibly due to the smaller numbers of large, herbivorous prey in forest areas.', 'http://localhost:3000/medias/jaguar_JPEG-uppercase.JPG1631912385515.jpg', '2021-09-17 20:59:45', '2021-09-17 20:59:45', 2, 'Kubo', 'Kun'),
(9, 'Cheetah', 'The king cheetah is a variety of cheetah with a rare mutation for cream-coloured fur marked with large, blotchy spots and three dark, wide stripes extending from the neck to the tail.[53] In Manicaland, Zimbabwe it was known as nsuifisi and thought to be a cross between a leopard and a hyena.[54] In 1926 Major A. Cooper wrote about a cheetah-like animal he had shot near modern-day Harare, with fur as thick as that of a snow leopard and spots that merged to form stripes. He suggested it could be a cross between a leopard and a cheetah. As more such individuals were observed it was seen that they had non-retractable claws like the cheetah.', 'http://localhost:3000/medias/cheetah_PNG.png1631912519366.png', '2021-09-17 21:01:59', '2021-09-17 21:01:59', 3, 'Plue', 'Chan'),
(10, 'Grand chat', 'La phylogenèse est l\'étude de l\'apparition et de la formation d\'une espèce grâce à des fossiles. Avec l\'étude de phylogénie moléculaire, on sait que la famille des félidés a pour dernier ancêtre commun un félin préhistorique apparu il y a environ 20 millions d\'années, Pseudaelurus. La première lignée de félins à diverger est celle des Panthérinés, il y a environ 10,8 millions d\'années. Le guépard résulte d\'une divergence bien plus récente, il y a environ 6,7 millions d\'années, de la lignée du Puma, qui est en effet le félin actuel le plus proche du guépard. À la suite de l\'apparition de la lignée du Puma, celle-ci divergea pour donner d\'un côté le genre Puma et d\'un autre le genre Acinonyx. Le genre Acinonyx est apparu durant le Pliocène : on retrouve des fossiles du guépard en Afrique du Sud qui datent de la fin de cette période. L\'apparition du guépard semble donc dater d\'il y a trois millions d\'années.', 'http://localhost:3000/medias/cheetah_GIF-lowercase.gif1631912593087.gif', '2021-09-17 21:03:13', '2021-09-17 21:21:43', 3, 'Plue', 'Chan'),
(11, 'Acinonyx jubatus f. rex', 'Son aspect est différent de celui des autres guépards : ses taches sont nettement plus grandes et forment des lignes par endroits, avec une bande noire sur le dos se prolongeant de la tête à la queue. Ce pelage, marbré plutôt que moucheté, semble lui assurer un excellent camouflage dans le miombo du Botswana et du Zimbabwe.', 'http://localhost:3000/medias/cheetah_JPEG-uppercase.JPG1631912657526.jpg', '2021-09-17 21:04:17', '2021-09-17 21:09:30', 2, 'Kubo', 'Kun'),
(12, 'Guépard du Ree Park – En train de courir pour attraper une proie.', 'Rapide !', 'http://localhost:3000/medias/cheetah_GIF-uppercase.GIF1631912735200.gif', '2021-09-17 21:05:35', '2021-09-17 21:06:22', 2, 'Kubo', 'Kun');

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
(1, 'user', '2021-09-17 20:29:28', '2021-09-17 20:29:28'),
(2, 'admin', '2021-09-17 20:29:28', '2021-09-17 20:29:28');

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
(1, 'Bili', 'Snod', 'address@ema.il', '$2b$08$v4nlyuvTKi7B6QeA2TJUeuuPXQE3f43z7.secxP/5ckatX.hr9JXm', '2021-09-17 20:38:29', '2021-09-17 20:38:29'),
(2, 'Kubo', 'Kun', 'email@addr.ess', '$2b$08$xqxmvhLc5eU2/w/EpQ2nJu7ey5uYfFJZvK3b.61HwFIVtTfabgHLq', '2021-09-17 20:44:02', '2021-09-17 20:44:02'),
(3, 'Plue', 'Chan', 'email@add.ress', '$2b$08$8/MtXkfIlC5C2u64epNwIeI/7pCCDOaywL4/bhdd8ltBvQleCmTF6', '2021-09-17 20:44:55', '2021-09-17 20:44:55');

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
('2021-09-17 20:38:29', '2021-09-17 20:38:29', 1, 2),
('2021-09-17 20:44:02', '2021-09-17 20:44:02', 2, 1),
('2021-09-17 20:44:55', '2021-09-17 20:44:55', 3, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`noteId`) REFERENCES `notes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`firstname`) REFERENCES `users` (`firstname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`lastname`) REFERENCES `users` (`lastname`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
