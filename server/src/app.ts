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
import { resolvers } from "./graphql/resolvers";
import { readFile } from "node:fs/promises";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";

const app = express();
const port = 5000;
 
 
const typeDefs = await readFile("./schema.graphql", "utf-8");
app.use(express.json());

const apolloServer = new ApolloServer({ typeDefs, resolvers });

await apolloServer.start();

app.use("/graphql", apolloMiddleware(apolloServer));

app.get("/", async (req, res) => {
  const userSession = await getTrainingSession(36, 2);

  res.send(JSON.stringify(userSession));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`to view demo go to http://localhost:${port}`);
  console.log(`Graph QL endpoint at http://localhost:${port}/graphql `);
});
