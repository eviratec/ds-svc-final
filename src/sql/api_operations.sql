CREATE TABLE `api_operations` (
  `Id` varchar(36) NOT NULL,
  `ApiId` varchar(36) NOT NULL,
  `RouteId` varchar(36) DEFAULT NULL,
  `Name` varchar(45) NOT NULL,
  `Method` enum('get','post','put','patch','delete') DEFAULT 'get',
  `Summary` text NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Created` int(11) NOT NULL,
  `Deleted` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `ApiId` (`ApiId`),
  KEY `RouteId` (`RouteId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
