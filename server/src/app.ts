import express from "express";
import { getTags } from "./db/operations/tags";
import { trainingSessions, users } from "./db/schema";
import { countUsersTrainingSessions } from "./db/operations/traingsessions";
import { getTrainingSessionsByUser } from "./db/operations/traingsessions";
import { getUserByUsername } from "./db/operations/users";
import { getTagsFromTrainingSessionByTrainingSessionID } from "./db/operations/tags";
import { getAllUsersTrainingSessionTags } from "./db/operations/tags";
import { countAllTrainingSessions } from "./db/operations/traingsessions";
import { getTrainingSession } from "./db/operations/traingsessions";

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", async (req, res) => {
  const userSession = await getTrainingSession(36, 2);

  res.send(JSON.stringify(userSession));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`to view demo go to http://localhost:${port}`);
});
