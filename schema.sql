CREATE TABLE `users` (
  `id` int PRIMARY KEY,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `username` varchar(255) UNIQUE NOT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  `photo` varchar(255)
);

CREATE TABLE `lists` (
  `id` int PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `numTasks` int,
  `numCompleted` int,
  `notes` text,
  `ownerId` int
);

CREATE TABLE `tasks` (
  `id` int PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `completed` bool,
  `dueDate` date,
  `startDate` date,
  `priority` int,
  `repeat_period` int,
  `repeat_type` varchar(255),
  `location` varchar(255),
  `estimate` int DEFAULT 0,
  `tags` varchar(255),
  `notes` text,
  `listId` int,
  `ownerId` int,
  `assigned_user` int
);

CREATE TABLE `subtasks` (
  `id` int PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `completed` bool,
  `dueDate` date,
  `startDate` date,
  `priority` int,
  `repeat_period` int,
  `repeat_type` varchar(255),
  `location` varchar(255),
  `estimate` int DEFAULT 0,
  `tags` varchar(255),
  `notes` text,
  `parentTask` int
);

CREATE TABLE `user_list` (
  `userId` int,
  `listId` int,
  `edit_priv` bool
);

ALTER TABLE `user_list` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `user_list` ADD FOREIGN KEY (`listId`) REFERENCES `lists` (`id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`assigned_user`) REFERENCES `users` (`id`);

ALTER TABLE `lists` ADD FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`listId`) REFERENCES `lists` (`id`);

ALTER TABLE `subtasks` ADD FOREIGN KEY (`parentTask`) REFERENCES `tasks` (`id`);
