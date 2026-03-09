import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { walletReport } from "./wallet-report.schema";

export const walletReportMetadata = sqliteTable("wallet_report_metadata", {
    id: int().primaryKey({ autoIncrement: true }),
    model: text().notNull(),
    promptToken: int("prompt_token").notNull(),
    responseToken: int("response_token").notNull(),
    totalToken: int("total_token").notNull(),
    createdAt: text("created_at")
        .notNull()
        .default(sql`(current_timestamp)`),
    walletReportId: int("wallet_report_id")
        .notNull()
        .references(() => walletReport.id, { onDelete: "cascade" }),
})