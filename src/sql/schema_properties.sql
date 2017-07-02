CREATE TABLE `schema_properties` (
  `Id` varchar(36) NOT NULL,
  `SchemaId` varchar(36) NOT NULL,
  `Key` varchar(45) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `Created` int(11) NOT NULL,
  `Deleted` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `SchemaId` (`SchemaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
