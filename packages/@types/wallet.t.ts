import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import type { wallets } from "@mono-dev/drizzle"

export type Wallet = InferSelectModel<typeof wallets>
export type InsertWallet = InferInsertModel<typeof wallets>