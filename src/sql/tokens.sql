CREATE TABLE `tokens` (
  `Id` varchar(36) NOT NULL,
  `UserId` varchar(36) NOT NULL,
  `Key` varchar(255) NOT NULL,
  `Created` int(11) NOT NULL,
  `Expiry` int(11) NOT NULL DEFAULT '3600',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Key_UNIQUE` (`Key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
