CREATE TABLE `wallet_report_metada` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`model` text NOT NULL,
	`prompt_token` text NOT NULL,
	`response_token` text NOT NULL,
	`total_token` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`wallet_report_id` integer NOT NULL,
	FOREIGN KEY (`wallet_report_id`) REFERENCES `wallet_reports`(`id`) ON UPDATE no action ON DELETE cascade
);
