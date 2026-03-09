import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { assets } from "@mono-dev/drizzle"

export type Asset = InferSelectModel<typeof assets>
export type InsertAsset = InferInsertModel<typeof assets>