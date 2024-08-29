import { count } from "drizzle-orm";
import { db } from "..";
import { trainingSessions, users } from "../schema";
import { eq } from "drizzle-orm";
export const getTrainingSessionsByUser = async (userID: number) => {
  const result = await db.query.trainingSessions.findMany({
    where: (session, { eq }) => eq(session.userId, userID),
    with: {
      sessionTags: {
        with: {
          tag: true,
        },
      },
    },
  });
  return result;
};

export const countAllTrainingSessions = async () => {
  const rows = await db.select({ count: count() }).from(trainingSessions);
  return rows;
};

export const countUsersTrainingSessions = async (userID: number) => {
  const rowsCount = await db
    .select({ count: count() })
    .from(trainingSessions)
    .where(eq(trainingSessions.userId, userID));
  return rowsCount;
};


export const getTrainingSession = async (sessionID: number, userID: number) => {
    const result = await db.query.trainingSessions.findFirst({
        where: (trainingSession ,{eq, and}) => 
            and(
            eq(trainingSession.sessionId, sessionID),
            eq(trainingSession.userId, userID)
            )
    })
    console.log(result)

    return result
}