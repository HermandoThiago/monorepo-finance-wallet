import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { walletReport } from "./wallet-report.schema";

export const walletReportMetadata = sqliteTable("wallet_report_metada", {
    id: int().primaryKey({ autoIncrement: true }),
    model: text().notNull(),
    promptToken: text("prompt_token").notNull(),
    responseToken: text("response_token").notNull(),
    totalToken: text("total_token").notNull(),
    createdAt: text("created_at")
        .notNull()
        .default(sql`(current_timestamp)`),
    walletReportId: int("wallet_report_id")
        .notNull()
        .references(() => walletReport.id, { onDelete: "cascade" }),
})