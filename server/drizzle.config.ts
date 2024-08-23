 
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite", // "mysql" | "sqlite" | "postgresql"
  schema: "./src/db/schema.ts",
  dbCredentials: {url: './src/db/bjjinlierdatabase.db'},
  out: "./drizzle",
});