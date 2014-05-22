CREATE TABLE `energy_consumer_devices` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;