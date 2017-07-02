CREATE TABLE `api_routes` (
  `Id` varchar(36) NOT NULL,
  `ApiId` varchar(36) NOT NULL,
  `Path` varchar(45) NOT NULL,
  `Created` int(11) NOT NULL,
  `Deleted` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `ApiId` (`ApiId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
