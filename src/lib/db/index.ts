import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const connectionString = process.env.SUPABASE_DB_URL || process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(
  "https://",
  "postgresql://postgres:postgres@"
) + ":5432/postgres"

const client = postgres(connectionString)
export const db = drizzle(client, { schema })
