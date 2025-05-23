import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
});

// Medication schema
export const medications = pgTable("medications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  initialDose: text("initial_dose").notNull(),
  currentDose: text("current_dose").notNull(),
  targetDose: text("target_dose").notNull(),
  frequency: text("frequency").notNull(),
  startDate: date("start_date").notNull(),
  targetDuration: text("target_duration"),
});

export const insertMedicationSchema = createInsertSchema(medications).omit({ id: true });

// Dose logs schema
export const doseLogs = pgTable("dose_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  medicationId: integer("medication_id").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  dosage: text("dosage").notNull(),
  site: text("site"),
  taken: boolean("taken").notNull().default(true),
  skipped: boolean("skipped").default(false),
  notes: text("notes"),
});

export const insertDoseLogSchema = createInsertSchema(doseLogs).omit({ id: true });

// Weight logs schema
export const weightLogs = pgTable("weight_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: date("date").notNull(),
  weight: text("weight").notNull(),
  unit: text("unit").default("lbs"),
});

export const insertWeightLogSchema = createInsertSchema(weightLogs).omit({ id: true });

// Side effects schema
export const sideEffects = pgTable("side_effects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(),
  severity: text("severity").notNull(),
  startTime: timestamp("start_time").notNull(),
  duration: integer("duration"),
  durationUnit: text("duration_unit"),
  notes: text("notes"),
  date: date("date").notNull(),
});

export const insertSideEffectSchema = createInsertSchema(sideEffects).omit({ id: true });

// Reminders schema
export const reminders = pgTable("reminders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  time: text("time").notNull(),
  days: text("days"),
  date: date("date"),
  enabled: boolean("enabled").default(true),
});

export const insertReminderSchema = createInsertSchema(reminders).omit({ id: true });

// Resources schema
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  link: text("link").notNull(),
  category: text("category").notNull(),
});

export const insertResourceSchema = createInsertSchema(resources).omit({ id: true });

// Progress photos schema
export const progressPhotos = pgTable("progress_photos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: date("date").notNull(),
  imageUrl: text("image_url").notNull(),
  notes: text("notes"),
  category: text("category").default("monthly"),
});

export const insertProgressPhotoSchema = createInsertSchema(progressPhotos).omit({ id: true });

// Injection sites schema
export const injectionSites = pgTable("injection_sites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  site: text("site").notNull(),
  siteCoordinates: text("site_coordinates").notNull(), // Stores X,Y coordinates as JSON string
  lastUsed: timestamp("last_used"),
  timesUsed: integer("times_used").default(0),
  notes: text("notes"),
});

export const insertInjectionSiteSchema = createInsertSchema(injectionSites).omit({ id: true });

// Doctor visit reports schema
export const doctorVisits = pgTable("doctor_visits", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  visitDate: date("visit_date").notNull(),
  nextVisitDate: date("next_visit_date"),
  doctorName: text("doctor_name"),
  notes: text("notes"),
  reportGenerated: boolean("report_generated").default(false),
  reportUrl: text("report_url"),
});

export const insertDoctorVisitSchema = createInsertSchema(doctorVisits).omit({ id: true });

// Community posts schema
export const communityP
