import { relations } from "drizzle-orm/relations";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("Users", {
  userId: integer("id").primaryKey({ autoIncrement: true }),
  userName: text("userName"),
  password: text("password"),
});

// Training Sessions table
export const trainingSessions = sqliteTable("Training_Sessions", {
  sessionId: integer("session_id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.userId),
  sessionDate: text("session_date").notNull(),
  score: integer("score").notNull(),
  fitnessScore: integer("fitness_score").notNull(),
  whatWorked: text("what_worked"),
  whatDidNotWork: text("what_did_not_work"),
  duration: integer("duration").notNull(), // Duration in minutes
  instructor: text("instructor"),
  roundsSparred: integer("rounds_sparred"), // Number of rounds sparred
});

// Tags table
export const tags = sqliteTable("Tags", {
  tagId: integer("tag_id").primaryKey({ autoIncrement: true }),
//   tagName: text("tag_name").notNull().unique(),
  tagName: text("tag_name").notNull(),
});

// Session_Tags table for many-to-many relationship between Training_Sessions and Tags
export const sessionTags = sqliteTable("Session_Tags", {
  sessionId: integer("session_id").references(() => trainingSessions.sessionId),
  tagId: integer("tag_id").references(() => tags.tagId),
});

// One user has many sessions
export const userSessions = relations(users, ({ many }) => ({
  trainingSessions: many(trainingSessions),
}));

// One training session has many tags, but only has one user
export const trainingSessionsRelations = relations(
  trainingSessions,
  ({ one, many }) => ({
    user: one(users),
    sessionTags: many(sessionTags),
  })
);

export const tagsRelations = relations(tags, ({ many }) => ({
  sessionTags: many(sessionTags),
}));

export const sessionTagsRelations = relations(sessionTags, ({ one }) => ({
  trainingSession: one(trainingSessions),
  tag: one(tags),
}));
