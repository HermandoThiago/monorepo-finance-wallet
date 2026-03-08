CREATE TABLE `wallet_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`summary` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`wallet_id` integer NOT NULL,
	FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`id`) ON UPDATE no action ON DELETE cascade
);
