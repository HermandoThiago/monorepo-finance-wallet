import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { walletReport } from "@mono-dev/drizzle"


export type WalletReport = InferSelectModel<typeof walletReport>
export type InsertWalletReport = InferInsertModel<typeof walletReport>
