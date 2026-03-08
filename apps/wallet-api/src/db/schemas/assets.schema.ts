import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { wallets } from "./wallet.schema";

export const assets = sqliteTable("assets", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    symbol: text(),
    createdAt: text("created_at")
        .notNull()
        .default(sql`(current_timestamp)`),
    walletId: int("wallet_id")
        .notNull()
        .references(() => wallets.id, { onDelete: "cascade" }),
})