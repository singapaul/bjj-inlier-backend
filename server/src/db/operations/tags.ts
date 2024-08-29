import { db } from "../index";
import { trainingSessions, tags, sessionTags, users } from "../schema";
import { eq } from "drizzle-orm";
export const getTags = async () => {
  const result = await db.query.tags.findMany();
  return result;
};

export const getTagsFromTrainingSessionByTrainingSessionID = async (
  sessionID: number
) => {
  const result = await db.query.sessionTags.findMany({
    where: (sess, { eq }) => eq(sess.sessionId, sessionID),
    with: {
      tag: true,
    },
  });

  return result;
};

export const getAllUsersTrainingSessionTags = async (userId: number ) => {
  const result  = await db
  .select({
    sessionDate: trainingSessions.sessionDate,
    tagName: tags.tagName,
  })
  .from(users)
  .leftJoin(trainingSessions, eq(trainingSessions.userId, users.userId))
  .leftJoin(sessionTags, eq(sessionTags.sessionId, trainingSessions.sessionId))
  .leftJoin(tags, eq(tags.tagId, sessionTags.tagId))
  .where(eq(users.userId, userId))

  return result
};
