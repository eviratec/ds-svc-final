CREATE TABLE `operation_parameters` (
  `Id` varchar(36) NOT NULL,
  `OperationId` varchar(36) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `In` enum('query', 'header', 'path', 'formData', 'body') NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Required` tinyint(4) NOT NULL,
  `Created` int(11) NOT NULL,
  `Deleted` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `OperationId` (`OperationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
