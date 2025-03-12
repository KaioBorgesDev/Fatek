-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: fatek
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
  `id_action` int(11) NOT NULL AUTO_INCREMENT,
  `id_admin` varchar(36) NOT NULL,
  `id_user_affected` varchar(36) NOT NULL,
  `action_type` enum('bloquear','desbloquear') NOT NULL,
  `action_date` datetime DEFAULT current_timestamp(),
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

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id_log` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(36) NOT NULL,
  `action` varchar(255) NOT NULL,
  `action_date` datetime DEFAULT current_timestamp(),
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
  `id_category` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
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
  `id_inventory` int(11) NOT NULL AUTO_INCREMENT,
  `id_book` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
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
-- Table structure for table `book_recommendations`
--

DROP TABLE IF EXISTS `book_recommendations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_recommendations` (
  `id_recommendation` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(36) NOT NULL,
  `id_book` int(11) NOT NULL,
  `reason` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_recommendation`),
  KEY `id_user` (`id_user`),
  KEY `id_book` (`id_book`),
  CONSTRAINT `book_recommendations_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `book_recommendations_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_recommendations`
--

LOCK TABLES `book_recommendations` WRITE;
/*!40000 ALTER TABLE `book_recommendations` DISABLE KEYS */;
INSERT INTO `book_recommendations` VALUES (1,'550e8400-e29b-41d4-a716-446655440000',1,'Clássico imperdível.','2025-03-12 10:24:56'),(2,'550e8400-e29b-41d4-a716-446655440001',2,'Leitura obrigatória.','2025-03-12 10:24:56'),(3,'550e8400-e29b-41d4-a716-446655440000',3,'Fantasia incrível.','2025-03-12 10:24:56');
/*!40000 ALTER TABLE `book_recommendations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_requests`
--

DROP TABLE IF EXISTS `book_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_requests` (
  `id_request` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `status` enum('pendente','atendido') DEFAULT 'pendente',
  `created_at` datetime DEFAULT current_timestamp(),
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `release_date` date NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `isbn` varchar(13) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `status` enum('disponivel','vendido','em_entrega') DEFAULT 'disponivel',
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
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id_coupon` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `discount` decimal(5,2) NOT NULL,
  `expiration_date` date NOT NULL,
  `status` enum('ativo','inativo') DEFAULT 'ativo',
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
  `id_delivery` int(11) NOT NULL AUTO_INCREMENT,
  `id_order` int(11) NOT NULL,
  `delivery_address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`delivery_address`)),
  `estimated_date` date NOT NULL,
  `status` enum('preparando','a_caminho','entregue') DEFAULT 'preparando',
  PRIMARY KEY (`id_delivery`),
  KEY `id_order` (`id_order`),
  CONSTRAINT `deliveries_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE CASCADE
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
  `id_tracking` int(11) NOT NULL AUTO_INCREMENT,
  `id_delivery` int(11) NOT NULL,
  `status` enum('preparando','a_caminho','entregue') NOT NULL,
  `update_time` datetime DEFAULT current_timestamp(),
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
  `id_event` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `status` enum('ativo','inativo') DEFAULT 'ativo',
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
  `id_favorite` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(36) NOT NULL,
  `id_book` int(11) NOT NULL,
  `added_date` datetime DEFAULT current_timestamp(),
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
  `id_invoice` int(11) NOT NULL AUTO_INCREMENT,
  `id_order` int(11) NOT NULL,
  `invoice_number` varchar(100) NOT NULL,
  `issue_date` datetime DEFAULT current_timestamp(),
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
  `id_message` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(36) NOT NULL,
  `message` text NOT NULL,
  `response` text DEFAULT NULL,
  `status` enum('aberto','fechado') DEFAULT 'aberto',
  `created_at` datetime DEFAULT current_timestamp(),
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
  `id_notification` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(36) NOT NULL,
  `message` text NOT NULL,
  `status` enum('nao_lida','lida') DEFAULT 'nao_lida',
  `created_at` datetime DEFAULT current_timestamp(),
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
  `id_order_item` int(11) NOT NULL AUTO_INCREMENT,
  `id_order` int(11) NOT NULL,
  `id_book` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
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
  `id_order` int(11) NOT NULL AUTO_INCREMENT,
  `id_buyer` varchar(36) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `status` enum('pendente','em_transito','entregue') DEFAULT 'pendente',
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
  `id_request` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(36) NOT NULL,
  `token` varchar(255) NOT NULL,
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

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id_review` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(36) NOT NULL,
  `id_book` int(11) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  PRIMARY KEY (`id_review`),
  KEY `id_user` (`id_user`),
  KEY `id_book` (`id_book`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE
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
-- Table structure for table `sales_reports`
--

DROP TABLE IF EXISTS `sales_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_reports` (
  `id_report` int(11) NOT NULL AUTO_INCREMENT,
  `report_type` enum('livros_mais_vendidos','usuarios_ativos') NOT NULL,
  `report_date` datetime DEFAULT current_timestamp(),
  `report_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`report_data`)),
  PRIMARY KEY (`id_report`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_reports`
--

LOCK TABLES `sales_reports` WRITE;
/*!40000 ALTER TABLE `sales_reports` DISABLE KEYS */;
INSERT INTO `sales_reports` VALUES (1,'livros_mais_vendidos','2025-03-12 10:24:56','{\"livro1\": 10, \"livro2\": 8, \"livro3\": 5}'),(2,'usuarios_ativos','2025-03-12 10:24:56','{\"usuarios\": 150}'),(3,'livros_mais_vendidos','2025-03-12 10:24:56','{\"livro1\": 12, \"livro2\": 9, \"livro3\": 6}');
/*!40000 ALTER TABLE `sales_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id_session` varchar(36) NOT NULL,
  `id_user` varchar(36) NOT NULL,
  `login_time` datetime DEFAULT current_timestamp(),
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
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `id_subscription` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(36) NOT NULL,
  `plan` enum('mensal','anual') NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('ativo','inativo') DEFAULT 'ativo',
  PRIMARY KEY (`id_subscription`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (1,'550e8400-e29b-41d4-a716-446655440000','mensal','2023-10-01','2023-11-01','ativo'),(2,'550e8400-e29b-41d4-a716-446655440001','anual','2023-10-01','2024-10-01','ativo'),(3,'550e8400-e29b-41d4-a716-446655440002','mensal','2023-10-01','2023-11-01','inativo');
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id_transaction` int(11) NOT NULL AUTO_INCREMENT,
  `id_order` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` enum('cartao','pix') DEFAULT 'pix',
  `payment_status` enum('pendente','pago','cancelado') DEFAULT 'pendente',
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
  `id_user` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `user_type` enum('comprador','vendedor','admin') DEFAULT 'comprador',
  `reset_token` varchar(255) DEFAULT NULL,
  `account_status` enum('ativo','bloqueado') DEFAULT 'ativo',
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
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id_wishlist` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(36) NOT NULL,
  `id_book` int(11) NOT NULL,
  `added_date` datetime DEFAULT current_timestamp(),
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-12 10:29:34
