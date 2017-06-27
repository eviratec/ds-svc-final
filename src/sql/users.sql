CREATE TABLE `users` (
  `Id` varchar(36) NOT NULL,
  `Login` varchar(45) DEFAULT NULL,
  `Created` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
