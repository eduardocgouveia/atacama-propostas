import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  numeric,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core"

export const userRoleEnum = pgEnum("user_role", ["admin", "closer", "sdr"])

export const proposalStatusEnum = pgEnum("proposal_status", [
  "draft",
  "analyzing",
  "generating",
  "review",
  "sent",
  "viewed",
  "contracted",
  "expired",
  "lost",
])

export const leadTemperatureEnum = pgEnum("lead_temperature", [
  "HOT",
  "WARM",
  "COOL",
  "COLD",
])

export const proposalTypeEnum = pgEnum("proposal_type", [
  "tipo_a",
  "multipla",
  "ignition",
])

// ---------- TABLES ----------

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: userRoleEnum("role").notNull().default("closer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const prospects = pgTable("prospects", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name"),
  sector: text("sector"),
  estimatedRevenue: numeric("estimated_revenue"),
  city: text("city"),
  state: text("state"),
  phone: text("phone"),
  email: text("email"),
  notes: text("notes"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const proposals = pgTable("proposals", {
  id: uuid("id").primaryKey().defaultRandom(),
  prospectId: uuid("prospect_id").references(() => prospects.id),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  planName: text("plan_name"),
  planPrice: numeric("plan_price"),
  setupPrice: numeric("setup_price"),

  // AI data
  transcriptionText: text("transcription_text"),
  analysisData: jsonb("analysis_data"),
  leadScore: integer("lead_score"),
  leadTemperature: leadTemperatureEnum("lead_temperature"),
  personaMatch: text("persona_match"),
  personaAdherence: integer("persona_adherence"),
  tier: text("tier"),

  // Pipeline
  status: proposalStatusEnum("status").notNull().default("draft"),
  lostReason: text("lost_reason"),

  // Storage
  htmlStoragePath: text("html_storage_path"),
  proposalType: proposalTypeEnum("proposal_type").default("tipo_a"),

  // Dates
  sentAt: timestamp("sent_at"),
  viewedAt: timestamp("viewed_at"),
  expiresAt: timestamp("expires_at"),
  contractedAt: timestamp("contracted_at"),

  // Ownership
  createdBy: uuid("created_by").references(() => users.id),
  assignedTo: uuid("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const proposalViews = pgTable("proposal_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  proposalId: uuid("proposal_id")
    .references(() => proposals.id)
    .notNull(),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
})

export const contractSubmissions = pgTable("contract_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  proposalId: uuid("proposal_id")
    .references(() => proposals.id)
    .notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  formData: jsonb("form_data"),
})

// ---------- TYPES ----------

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Prospect = typeof prospects.$inferSelect
export type NewProspect = typeof prospects.$inferInsert
export type Proposal = typeof proposals.$inferSelect
export type NewProposal = typeof proposals.$inferInsert
export type ContractSubmission = typeof contractSubmissions.$inferSelect
