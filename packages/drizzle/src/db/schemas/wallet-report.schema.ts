import { sql } from "drizzle-orm";
import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";
import { wallets } from "./wallet.schema";

export const walletReport = sqliteTable("wallet_reports", {
    id: int().primaryKey({ autoIncrement: true }),
    summary: text().notNull(),
    createdAt: text("created_at")
        .notNull()
        .default(sql`(current_timestamp)`),
    walletId: int("wallet_id")
        .notNull()
        .references(() => wallets.id, { onDelete: "cascade" }),
})