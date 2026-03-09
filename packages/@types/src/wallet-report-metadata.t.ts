import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { walletReportMetadata } from "@mono-dev/drizzle"

export type WalletReportMetadata = InferSelectModel<typeof walletReportMetadata>
export type InsertWalletReportMetadata = InferInsertModel<typeof walletReportMetadata>