import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const wallets = sqliteTable("wallets", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    description: text(),
    createdAt: text("created_at")
        .notNull()
        .default(sql`(current_timestamp)`),
});