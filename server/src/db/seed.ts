import { faker } from "@faker-js/faker";
import {  users, trainingSessions, tags, sessionTags} from "./schema";
import { db } from ".";

async function seedDatabase(): Promise<void> {
  console.log("delete all existing table data");

  await db.delete(users);
  await db.delete(trainingSessions);
  await db.delete(tags)
  await db.delete(sessionTags)

  // Generate 50 users
const fakeUsers = Array.from({ length: 10 }, () => ({
    userName: faker.internet.userName(),
    password: faker.internet.password(),
  }));
  
  // Insert users into the database and get their IDs
  const insertedUsers = await db.insert(users).values(fakeUsers).returning();
  const userIds = insertedUsers.map((user) => user.userId);
  
  // Generate 20 tags
  const fakeTags = Array.from({ length: 10 }, () => ({
    tagName: faker.hacker.noun(),
  }));
  
  // Insert tags into the database and get their IDs
  const insertedTags = await db.insert(tags).values(fakeTags).returning();
  const tagIds = insertedTags.map((tag) => tag.tagId);
  
  // Generate 50 training sessions
  const fakeTrainingSessions = Array.from({ length: 50 }, () => ({
    userId: faker.helpers.arrayElement(userIds),
    sessionDate: faker.date.past().toISOString(),
    score: faker.number.int({ min: 1, max: 5 }),
    fitnessScore: faker.datatype.number({ min: 1, max: 5 }),
    whatWorked: faker.lorem.sentence(),
    whatDidNotWork: faker.lorem.sentence(),
    duration: faker.number.int({ min: 30, max: 120 }),
    instructor: faker.person.firstName() + ' ' + faker.name.lastName(),
    roundsSparred: faker.number.int({ min: 1, max: 10 }),
  }));
  
  // Insert training sessions into the database and get their IDs
  const insertedSessions = await db.insert(trainingSessions).values(fakeTrainingSessions).returning();
  const sessionIds = insertedSessions.map((session) => session.sessionId);
  
  // Generate session_tags relationships
  const fakeSessionTags = sessionIds.flatMap((sessionId) => {
    const numTags = faker.number.int({ min: 1, max: 3 }); // Each session can have 1 to 3 tags
    const selectedTags = faker.helpers.arrayElements(tagIds, numTags);
  
    return selectedTags.map((tagId) => ({
      sessionId: sessionId,
      tagId: tagId,
    }));
  });
  
  // Insert session_tags into the database
  await db.insert(sessionTags).values(fakeSessionTags);
  
  console.log('Database successfully populated with fake data!');
}

seedDatabase().catch((error) => {
  console.error("Error seeding database:", error);
});
