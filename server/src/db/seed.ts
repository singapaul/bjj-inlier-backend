import { faker } from "@faker-js/faker";
import { person, technique } from "./schema";
import { db } from ".";

async function seedDatabase(): Promise<void> {
  console.log("delete all existing table data");

  await db.delete(person);
  await db.delete(technique);

  for (let i = 0; i < 50; i++) {
    // Insert random data into Person table
    await db.insert(person).values({
      id: faker.number.int(),
      userName: faker.internet.userName(),
      userCountry: faker.location.country(),
    });

    // Insert random data into Technique table
    await db.insert(technique).values({
      technique: faker.lorem.word(),
    });
  }

  console.log(
    "50 rows of random data inserted into Person and Technique tables."
  );
}

seedDatabase().catch((error) => {
  console.error("Error seeding database:", error);
});
