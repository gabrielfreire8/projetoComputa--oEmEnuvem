-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bancopjb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bancopjb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bancopjb` DEFAULT CHARACTER SET utf8mb3 ;
USE `bancopjb` ;

-- -----------------------------------------------------
-- Table `bancopjb`.`atividades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancopjb`.`atividades` (
  `idatividades` INT NOT NULL AUTO_INCREMENT,
  `nome` CHAR(255) NULL DEFAULT NULL,
  `tipo` CHAR(45) NULL DEFAULT NULL,
  `descricao` CHAR(255) NULL DEFAULT NULL,
  `data` DATE NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idatividades`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bancopjb`.`aprovacaoatividades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancopjb`.`aprovacaoatividades` (
  `atividades_idatividades` INT NOT NULL,
  `status` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`atividades_idatividades`),
  INDEX `fk_table2_atividades1_idx` (`atividades_idatividades` ASC) VISIBLE,
  CONSTRAINT `fk_table2_atividades1`
    FOREIGN KEY (`atividades_idatividades`)
    REFERENCES `bancopjb`.`atividades` (`idatividades`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bancopjb`.`participantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancopjb`.`participantes` (
  `idparticipantes` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NULL DEFAULT NULL,
  `cpf` VARCHAR(11) NULL DEFAULT NULL,
  `dataNascimento` DATE NULL DEFAULT NULL,
  `telefone` VARCHAR(13) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `cep` VARCHAR(10) NULL DEFAULT NULL,
  `enderecoRua` VARCHAR(45) NULL DEFAULT NULL,
  `enderecoNumero` INT NULL DEFAULT NULL,
  `enderecoBairro` VARCHAR(45) NULL DEFAULT NULL,
  `cidade` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idparticipantes`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bancopjb`.`presenca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancopjb`.`presenca` (
  `idpresenca` INT NOT NULL AUTO_INCREMENT,
  `usuario_idusuario` INT NULL DEFAULT NULL,
  `atividades_data` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`idpresenca`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bancopjb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancopjb`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NULL DEFAULT NULL,
  `usuario` VARCHAR(45) NULL DEFAULT NULL,
  `senha` VARCHAR(255) NULL DEFAULT NULL,
  `funcao` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;

USE `bancopjb` ;

-- -----------------------------------------------------
-- procedure alterar_status_aprovacao
-- -----------------------------------------------------

DELIMITER $$
USE `bancopjb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `alterar_status_aprovacao`(p_id INT)
BEGIN
	UPDATE atividades SET atividades.status = 1 WHERE idatividades = p_id;
END$$

DELIMITER ;
USE `bancopjb`;

DELIMITER $$
USE `bancopjb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `bancopjb`.`after_insert_aprovacaoatividades`
AFTER INSERT ON `bancopjb`.`aprovacaoatividades`
FOR EACH ROW
BEGIN 
CALL 
alterar_status_aprovacao(NEW.atividades_idatividades); 
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
