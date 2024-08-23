import express from 'express';
import { db } from './db';
import { person } from './db/schema';
const app = express();
const port = 5000;

app.use(express.json());

app.get('/', async (req, res) => {
  const result = await db.query.person.findMany()
  await db.insert(person).values({id: 22, userCountry: 'england', userName: 'dan'})
  // console.log(result)
  res.send('Hello, TypeScript Node Express!' + JSON.stringify(result));
});
 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`to view demo go to http://localhost:${port}`);
});