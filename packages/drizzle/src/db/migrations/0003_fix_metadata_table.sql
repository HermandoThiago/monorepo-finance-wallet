ALTER TABLE `wallet_report_metada` RENAME TO `wallet_report_metadata`;
--> statement-breakpoint
CREATE TABLE `wallet_report_metadata_new` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`model` text NOT NULL,
	`prompt_token` integer NOT NULL,
	`response_token` integer NOT NULL,
	`total_token` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`wallet_report_id` integer NOT NULL,
	FOREIGN KEY (`wallet_report_id`) REFERENCES `wallet_reports`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `wallet_report_metadata_new` SELECT `id`, `model`, CAST(`prompt_token` AS INTEGER), CAST(`response_token` AS INTEGER), CAST(`total_token` AS INTEGER), `created_at`, `wallet_report_id` FROM `wallet_report_metadata`;
--> statement-breakpoint
DROP TABLE `wallet_report_metadata`;
--> statement-breakpoint
ALTER TABLE `wallet_report_metadata_new` RENAME TO `wallet_report_metadata`;
