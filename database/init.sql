-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: fatek
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_actions`
--

DROP TABLE IF EXISTS `admin_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_actions` (
  `id_action` int NOT NULL AUTO_INCREMENT,
  `id_admin` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_user_affected` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `action_type` enum('bloquear','desbloquear') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `action_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_action`),
  KEY `id_admin` (`id_admin`),
  KEY `id_user_affected` (`id_user_affected`),
  CONSTRAINT `admin_actions_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `admin_actions_ibfk_2` FOREIGN KEY (`id_user_affected`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_actions`
--

LOCK TABLES `admin_actions` WRITE;
/*!40000 ALTER TABLE `admin_actions` DISABLE KEYS */;
INSERT INTO `admin_actions` VALUES (1,'550e8400-e29b-41d4-a716-446655440002','550e8400-e29b-41d4-a716-446655440000','bloquear','2025-03-12 10:24:56'),(2,'550e8400-e29b-41d4-a716-446655440002','550e8400-e29b-41d4-a716-446655440001','desbloquear','2025-03-12 10:24:56'),(3,'550e8400-e29b-41d4-a716-446655440002','550e8400-e29b-41d4-a716-446655440000','desbloquear','2025-03-12 10:24:56');
/*!40000 ALTER TABLE `admin_actions` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_admin_action_audit` AFTER INSERT ON `admin_actions` FOR EACH ROW BEGIN
  INSERT INTO audit_logs (id_user, action, action_date)
  VALUES (
    NEW.id_admin,
    CONCAT('Admin realizou a ação: ', NEW.action_type, ' no usuário ', NEW.id_user_affected),
    NEW.action_date
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id_log` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `action` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `action_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_log`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,'550e8400-e29b-41d4-a716-446655440002','Bloqueou usuário João Silva','2025-03-12 10:24:56'),(2,'550e8400-e29b-41d4-a716-446655440002','Desbloqueou usuário Maria Souza','2025-03-12 10:24:56'),(3,'550e8400-e29b-41d4-a716-446655440002','Gerou relatório de vendas','2025-03-12 10:24:56');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_categories`
--

DROP TABLE IF EXISTS `book_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_categories` (
  `id_category` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_categories`
--

LOCK TABLES `book_categories` WRITE;
/*!40000 ALTER TABLE `book_categories` DISABLE KEYS */;
INSERT INTO `book_categories` VALUES (1,'Literatura Clássica'),(2,'Ficção Científica'),(3,'Fantasia');
/*!40000 ALTER TABLE `book_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_inventory`
--

DROP TABLE IF EXISTS `book_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_inventory` (
  `id_inventory` int NOT NULL AUTO_INCREMENT,
  `id_book` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id_inventory`),
  KEY `id_book` (`id_book`),
  CONSTRAINT `book_inventory_ibfk_1` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_inventory`
--

LOCK TABLES `book_inventory` WRITE;
/*!40000 ALTER TABLE `book_inventory` DISABLE KEYS */;
INSERT INTO `book_inventory` VALUES (1,1,10),(2,2,5),(3,3,8);
/*!40000 ALTER TABLE `book_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_requests`
--

DROP TABLE IF EXISTS `book_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_requests` (
  `id_request` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('pendente','atendido') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pendente',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_request`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `book_requests_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_requests`
--

LOCK TABLES `book_requests` WRITE;
/*!40000 ALTER TABLE `book_requests` DISABLE KEYS */;
INSERT INTO `book_requests` VALUES (1,'550e8400-e29b-41d4-a716-446655440000','O Hobbit','J.R.R. Tolkien','pendente','2025-03-12 10:24:56'),(2,'550e8400-e29b-41d4-a716-446655440001','A Revolução dos Bichos','George Orwell','pendente','2025-03-12 10:24:56'),(3,'550e8400-e29b-41d4-a716-446655440000','Cem Anos de Solidão','Gabriel García Márquez','pendente','2025-03-12 10:24:56');
/*!40000 ALTER TABLE `book_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `publisher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `release_date` date NOT NULL,
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `isbn` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('disponivel','vendido','em_entrega') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'disponivel',
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'550e8400-e29b-41d4-a716-446655440001','Dom Quixote','Miguel de Cervantes','Editora A','1605-01-01','Literatura Clássica',50.00,'Um clássico da literatura mundial.','9781234567890','http://imagem.com/quixote.jpg','disponivel'),(2,'550e8400-e29b-41d4-a716-446655440001','1984','George Orwell','Editora B','1949-06-08','Ficção Científica',40.00,'Uma distopia famosa.','9781234567891','http://imagem.com/1984.jpg','disponivel'),(3,'550e8400-e29b-41d4-a716-446655440001','O Senhor dos Anéis','J.R.R. Tolkien','Editora C','1954-07-29','Fantasia',60.00,'Uma épica jornada na Terra-média.','9781234567892','http://imagem.com/senhor-aneis.jpg','disponivel');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id_cart_item` int NOT NULL AUTO_INCREMENT,
  `id_cart` int NOT NULL,
  `id_book` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `added_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_cart_item`),
  KEY `id_cart` (`id_cart`),
  KEY `id_book` (`id_book`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`id_cart`) REFERENCES `shopping_cart` (`id_cart`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,1,1,1,'2025-03-12 10:30:15'),(2,1,2,1,'2025-03-12 10:30:20'),(3,2,3,2,'2025-03-12 10:31:10'),(4,3,1,1,'2025-03-12 10:32:05'),(5,3,2,1,'2025-03-12 10:32:10'),(6,3,3,1,'2025-03-12 10:40:00');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id_coupon` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `discount` decimal(5,2) NOT NULL,
  `expiration_date` date NOT NULL,
  `status` enum('ativo','inativo') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'ativo',
  PRIMARY KEY (`id_coupon`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (1,'CUPOM10',10.00,'2023-12-31','ativo'),(2,'CUPOM20',20.00,'2023-12-31','ativo'),(3,'CUPOM30',30.00,'2023-12-31','inativo');
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveries`
--

DROP TABLE IF EXISTS `deliveries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveries` (
  `id_delivery` int NOT NULL AUTO_INCREMENT,
  `id_order` int NOT NULL,
  `delivery_address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `estimated_date` date NOT NULL,
  `status` enum('preparando','a_caminho','entregue') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'preparando',
  PRIMARY KEY (`id_delivery`),
  KEY `id_order` (`id_order`),
  CONSTRAINT `deliveries_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE CASCADE,
  CONSTRAINT `deliveries_chk_1` CHECK (json_valid(`delivery_address`))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveries`
--

LOCK TABLES `deliveries` WRITE;
/*!40000 ALTER TABLE `deliveries` DISABLE KEYS */;
INSERT INTO `deliveries` VALUES (1,1,'{\"rua\": \"Rua A, 123\", \"cidade\": \"São Paulo\"}','2023-10-02','preparando'),(2,2,'{\"rua\": \"Rua B, 456\", \"cidade\": \"Rio de Janeiro\"}','2023-10-03','a_caminho'),(3,3,'{\"rua\": \"Rua C, 789\", \"cidade\": \"Belo Horizonte\"}','2023-10-04','entregue');
/*!40000 ALTER TABLE `deliveries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_tracking`
--

DROP TABLE IF EXISTS `delivery_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_tracking` (
  `id_tracking` int NOT NULL AUTO_INCREMENT,
  `id_delivery` int NOT NULL,
  `status` enum('preparando','a_caminho','entregue') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_tracking`),
  KEY `id_delivery` (`id_delivery`),
  CONSTRAINT `delivery_tracking_ibfk_1` FOREIGN KEY (`id_delivery`) REFERENCES `deliveries` (`id_delivery`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_tracking`
--

LOCK TABLES `delivery_tracking` WRITE;
/*!40000 ALTER TABLE `delivery_tracking` DISABLE KEYS */;
INSERT INTO `delivery_tracking` VALUES (1,1,'preparando','2025-03-12 10:24:56'),(2,2,'a_caminho','2025-03-12 10:24:56'),(3,3,'entregue','2025-03-12 10:24:56');
/*!40000 ALTER TABLE `delivery_tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id_event` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `status` enum('ativo','inativo') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'ativo',
  PRIMARY KEY (`id_event`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Feira do Livro','Evento com descontos em livros.','2023-11-01 00:00:00','2023-11-07 00:00:00','ativo'),(2,'Lançamento de Novidades','Conheça os novos livros.','2023-12-01 00:00:00','2023-12-03 00:00:00','ativo'),(3,'Promoção de Natal','Descontos especiais de Natal.','2023-12-20 00:00:00','2023-12-25 00:00:00','inativo');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id_favorite` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_book` int NOT NULL,
  `added_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_favorite`),
  KEY `id_user` (`id_user`),
  KEY `id_book` (`id_book`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,'550e8400-e29b-41d4-a716-446655440000',1,'2023-10-01 10:00:00'),(2,'550e8400-e29b-41d4-a716-446655440001',2,'2023-10-01 11:00:00'),(3,'550e8400-e29b-41d4-a716-446655440000',3,'2023-10-01 12:00:00');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id_invoice` int NOT NULL AUTO_INCREMENT,
  `id_order` int NOT NULL,
  `invoice_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `issue_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_invoice`),
  KEY `id_order` (`id_order`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,1,'INV-001','2025-03-12 10:24:56'),(2,2,'INV-002','2025-03-12 10:24:56'),(3,3,'INV-003','2025-03-12 10:24:56');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id_message` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `response` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `status` enum('aberto','fechado') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'aberto',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_message`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'550e8400-e29b-41d4-a716-446655440000','Quando chega meu pedido?','Seu pedido está a caminho.','fechado','2025-03-12 10:24:56'),(2,'550e8400-e29b-41d4-a716-446655440001','Preciso de ajuda com meu livro.','Claro, como posso ajudar?','aberto','2025-03-12 10:24:56'),(3,'550e8400-e29b-41d4-a716-446655440000','O livro chegou danificado.','Vamos enviar um novo.','fechado','2025-03-12 10:24:56');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id_notification` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('nao_lida','lida') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'nao_lida',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_notification`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'550e8400-e29b-41d4-a716-446655440000','Seu pedido foi enviado.','nao_lida','2025-03-12 10:24:56'),(2,'550e8400-e29b-41d4-a716-446655440001','Seu livro foi vendido.','nao_lida','2025-03-12 10:24:56'),(3,'550e8400-e29b-41d4-a716-446655440000','Avalie seu pedido.','nao_lida','2025-03-12 10:24:56');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id_order_item` int NOT NULL AUTO_INCREMENT,
  `id_order` int NOT NULL,
  `id_book` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_order_item`),
  KEY `id_order` (`id_order`),
  KEY `id_book` (`id_book`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,1,50.00),(2,1,2,1,40.00),(3,2,3,2,60.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id_order` int NOT NULL AUTO_INCREMENT,
  `id_buyer` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pendente','em_transito','entregue') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pendente',
  PRIMARY KEY (`id_order`),
  KEY `id_buyer` (`id_buyer`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_buyer`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'550e8400-e29b-41d4-a716-446655440000','2023-10-01 10:00:00','pendente'),(2,'550e8400-e29b-41d4-a716-446655440000','2023-10-01 11:00:00','em_transito'),(3,'550e8400-e29b-41d4-a716-446655440001','2023-10-01 12:00:00','entregue');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_requests`
--

DROP TABLE IF EXISTS `password_reset_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_requests` (
  `id_request` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expiration` datetime NOT NULL,
  PRIMARY KEY (`id_request`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `password_reset_requests_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_requests`
--

LOCK TABLES `password_reset_requests` WRITE;
/*!40000 ALTER TABLE `password_reset_requests` DISABLE KEYS */;
INSERT INTO `password_reset_requests` VALUES (1,'550e8400-e29b-41d4-a716-446655440000','token123','2023-10-02 10:00:00'),(2,'550e8400-e29b-41d4-a716-446655440001','token456','2023-10-02 11:00:00'),(3,'550e8400-e29b-41d4-a716-446655440002','token789','2023-10-02 12:00:00');
/*!40000 ALTER TABLE `password_reset_requests` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_password_reset_request_audit` AFTER INSERT ON `password_reset_requests` FOR EACH ROW BEGIN
  INSERT INTO audit_logs (id_user, action, action_date)
  VALUES (
    NEW.id_user,
    CONCAT('Usuário solicitou redefinição de senha. Token: ', NEW.token),
    NOW()
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id_review` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_book` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id_review`),
  KEY `id_user` (`id_user`),
  KEY `id_book` (`id_book`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'550e8400-e29b-41d4-a716-446655440000',1,5,'Excelente livro!'),(2,'550e8400-e29b-41d4-a716-446655440001',2,4,'Muito bom, mas assustador.'),(3,'550e8400-e29b-41d4-a716-446655440000',3,5,'Obra-prima da fantasia.');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id_session` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `login_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `logout_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id_session`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('660e8400-e29b-41d4-a716-446655440000','550e8400-e29b-41d4-a716-446655440000','2023-10-01 10:00:00','2023-10-01 12:00:00'),('660e8400-e29b-41d4-a716-446655440001','550e8400-e29b-41d4-a716-446655440001','2023-10-01 11:00:00','2023-10-01 13:00:00'),('660e8400-e29b-41d4-a716-446655440002','550e8400-e29b-41d4-a716-446655440002','2023-10-01 12:00:00','2023-10-01 14:00:00');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `id_cart` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_cart`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (1,'550e8400-e29b-41d4-a716-446655440000','2025-03-12 10:30:00','2025-03-12 10:30:00'),(2,'550e8400-e29b-41d4-a716-446655440001','2025-03-12 10:31:00','2025-03-12 10:35:00'),(3,'550e8400-e29b-41d4-a716-446655440000','2025-03-12 10:32:00','2025-03-12 10:40:00');
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id_transaction` int NOT NULL AUTO_INCREMENT,
  `id_order` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` enum('cartao','pix') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pix',
  `payment_status` enum('pendente','pago','cancelado') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pendente',
  PRIMARY KEY (`id_transaction`),
  KEY `id_order` (`id_order`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,1,90.00,'pix','pago'),(2,2,120.00,'cartao','pago'),(3,3,60.00,'pix','pendente');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `passwordHash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_type` enum('comprador','vendedor','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'comprador',
  `reset_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `account_status` enum('ativo','bloqueado') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'ativo',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('550e8400-e29b-41d4-a716-446655440000','João Silva','joao@email.com','hash123','11999999999','Rua A, 123','comprador',NULL,'ativo'),('550e8400-e29b-41d4-a716-446655440001','Maria Souza','maria@email.com','hash456','11988888888','Rua B, 456','vendedor',NULL,'ativo'),('550e8400-e29b-41d4-a716-446655440002','Admin','admin@email.com','hash789',NULL,NULL,'admin',NULL,'ativo');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_usuarios_ativos`
--

DROP TABLE IF EXISTS `view_usuarios_ativos`;
/*!50001 DROP VIEW IF EXISTS `view_usuarios_ativos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_usuarios_ativos` AS SELECT 
 1 AS `id_user`,
 1 AS `name`,
 1 AS `email`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id_wishlist` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_book` int NOT NULL,
  `added_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_wishlist`),
  KEY `id_user` (`id_user`),
  KEY `id_book` (`id_book`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (1,'550e8400-e29b-41d4-a716-446655440000',1,'2023-10-01 10:00:00'),(2,'550e8400-e29b-41d4-a716-446655440001',2,'2023-10-01 11:00:00'),(3,'550e8400-e29b-41d4-a716-446655440000',3,'2023-10-01 12:00:00');
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'fatek'
--

--
-- Dumping routines for database 'fatek'
--
/*!50003 DROP PROCEDURE IF EXISTS `listar_usuarios_bloqueados` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `listar_usuarios_bloqueados`()
BEGIN
  SELECT id_user, name, email
  FROM users
  WHERE account_status = 'bloqueado';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `view_usuarios_ativos`
--

/*!50001 DROP VIEW IF EXISTS `view_usuarios_ativos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_usuarios_ativos` AS select `users`.`id_user` AS `id_user`,`users`.`name` AS `name`,`users`.`email` AS `email` from `users` where (`users`.`account_status` = 'ativo') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-30  9:09:23
