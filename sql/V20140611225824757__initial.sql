CREATE TABLE `time_series` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(256) NOT NULL DEFAULT '',
  `time_created` datetime NOT NULL,
  `time_modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE `devices` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `real_device_id` varchar(256) NOT NULL DEFAULT '',
  `name` varchar(256) DEFAULT NULL,
  `series_id` int(11) unsigned NOT NULL,
  `time_created` datetime NOT NULL,
  `time_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `series_id` (`series_id`),
  CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`series_id`) REFERENCES `time_series` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

CREATE TABLE `data_points` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(11) unsigned NOT NULL,
  `value` float NOT NULL,
  `running_total` float NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `data_points_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74341 DEFAULT CHARSET=latin1;

CREATE TABLE `data_points_1d` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(11) unsigned NOT NULL,
  `mean` float NOT NULL,
  `running_total` float NOT NULL,
  `time` datetime NOT NULL,
  `sum` float NOT NULL,
  `min` float NOT NULL,
  `max` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `data_points_1d_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

CREATE TABLE `data_points_1h` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(11) unsigned NOT NULL,
  `mean` float NOT NULL,
  `running_total` float NOT NULL,
  `time` datetime NOT NULL,
  `sum` float NOT NULL,
  `min` float NOT NULL,
  `max` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `data_points_1h_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=latin1;

CREATE TABLE `data_points_1m` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(11) unsigned NOT NULL,
  `mean` float NOT NULL,
  `running_total` float NOT NULL,
  `time` datetime NOT NULL,
  `sum` float NOT NULL,
  `min` float NOT NULL,
  `max` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `data_points_1m_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3109 DEFAULT CHARSET=latin1;

CREATE TABLE `data_points_1mo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(11) unsigned NOT NULL,
  `mean` float NOT NULL,
  `running_total` float NOT NULL,
  `time` datetime NOT NULL,
  `sum` float NOT NULL,
  `min` float NOT NULL,
  `max` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `data_points_1mo_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

CREATE TABLE `data_points_1w` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(11) unsigned NOT NULL,
  `mean` float NOT NULL,
  `running_total` float NOT NULL,
  `time` datetime NOT NULL,
  `sum` float NOT NULL,
  `min` float NOT NULL,
  `max` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `data_points_1w_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

CREATE TABLE `data_points_1y` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(11) unsigned NOT NULL,
  `mean` float NOT NULL,
  `running_total` float NOT NULL,
  `time` datetime NOT NULL,
  `sum` float NOT NULL,
  `min` float NOT NULL,
  `max` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `data_points_1y_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

CREATE TABLE `running_total_cache` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(11) unsigned NOT NULL,
  `running_total` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `running_total_cache_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;