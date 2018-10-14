CREATE Database escola;
use escola; 
-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: localhost    Database: escola
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `turmas`
--

DROP TABLE IF EXISTS `turmas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `turmas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  `ID_Professor` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Professor` (`ID_Professor`),
  CONSTRAINT `turmas_ibfk_1` FOREIGN KEY (`ID_Professor`) REFERENCES `professores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turmas`
--

LOCK TABLES `turmas` WRITE;
/*!40000 ALTER TABLE `turmas` DISABLE KEYS */;
INSERT INTO `turmas` VALUES (1,'Java',1),(2,'C',2),(3,'C#',3),(4,'C++',4),(5,'PHP',1),(6,'Pearl',2),(7,'Asp Net',3),(8,'Node',4),(9,'Angular JS',5),(10,'Angular',6),(11,'React',2),(12,'Exemplo de teste',2);
/*!40000 ALTER TABLE `turmas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-13 15:58:08
select * from alunos where ID_Turma = 8;
select * from turmas; 
SELECT a.Nome as NOME_ALUNO, a.ID as ID_ALUNO, p.ID as ID_PROFESSOR, t.ID as ID_TURMA, p.Nome as NOME_PROFESSOR, t.Nome as TURMA FROM alunos A INNER JOIN turmas T ON T.ID = A.ID_turma INNER JOIN professores P on P.ID = T.ID_Professor where T.ID = 8; 

SELECT count(A.Nome) as Alunos, T.Nome as Turma,  P.Nome as Professor, T.ID FROM ALUNOS AS A left JOIN TURMAS AS T ON T.ID = A.ID_Turma 
right JOIN TURMAS AS T ON T.ID = A.ID_Turma 
JOIN PROFESSORES AS P ON P.ID = T.ID_Professor group by T.Nome
	