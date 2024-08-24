CREATE TABLE `Session_Tags` (
	`session_id` integer,
	`tag_id` integer,
	FOREIGN KEY (`session_id`) REFERENCES `Training_Sessions`(`session_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `Tags`(`tag_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Tags` (
	`tag_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tag_name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Training_Sessions` (
	`session_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`session_date` text NOT NULL,
	`score` integer NOT NULL,
	`fitness_score` integer NOT NULL,
	`what_worked` text,
	`what_did_not_work` text,
	`duration` integer NOT NULL,
	`instructor` text,
	`rounds_sparred` integer,
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userName` text,
	`password` text
);
--> statement-breakpoint
DROP TABLE `Person`;--> statement-breakpoint
DROP TABLE `Technique`;--> statement-breakpoint
CREATE UNIQUE INDEX `Tags_tag_name_unique` ON `Tags` (`tag_name`);