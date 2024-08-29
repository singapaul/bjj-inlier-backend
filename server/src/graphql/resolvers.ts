import { getTrainingSessionsByUser } from "../db/operations/traingsessions";
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export const resolvers = {
  Query: {
    books: () => books,
    trainingSessions: async (_root: any, args: { userId: number }) => {
    console.log(args.userId);
      console.log("called");
      console.log('the result of the database query is below')
      const result = await getTrainingSessionsByUser(args.userId);
      console.log(result);
      return result;
    },
  },
};
