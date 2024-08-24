import express from "express";
import { db } from "./db";
import { eq } from "drizzle-orm";
import {   trainingSessions, users } from "./db/schema";
const app = express();
const port = 5000;

app.use(express.json());

app.get("/", async (req, res) => {
  const result = db.select().from(users).where(eq(users.userId, 4)).get();
 

    const nahh = await db.query.trainingSessions.findMany({
      where: eq(trainingSessions.userId, 4)
    })
  const userAndSessions = {
    ...result,
    trainingSessions: nahh
  }

  res.send("Hello, TypeScript Node Express!" + JSON.stringify(userAndSessions));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`to view demo go to http://localhost:${port}`);
});
