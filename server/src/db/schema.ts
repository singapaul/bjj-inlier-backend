import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { boolean } from "drizzle-orm/mysql-core";
export const person = sqliteTable("Person", {
  id: integer("id"),
  userName: text("userName"),
  userCountry: text("userCountry"),
});

export const technique = sqliteTable("Technique", {
  id: integer("id"),
  technique: text("technique"),
  showBoating: integer("showBoating", {mode: "boolean"}).default(false),
});

// DROP TABLE FROM SCHEMA LETS LOOK AT MIGRATION FILES
// export const style = sqliteTable("Style", {
//     id: integer("id"),
//     guardType: text("guardType"),
// })
