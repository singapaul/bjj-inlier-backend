CREATE TABLE `Person` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userName` text,
	`userCountry` text
);
--> statement-breakpoint
CREATE TABLE `Technique` (
	`id` integer,
	`technique` text,
	`showBoating` integer DEFAULT false
);
