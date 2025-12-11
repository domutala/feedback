import { desc } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;

  const feedbacks = await dataSource
    .select()
    .from(tables.feedback)
    .where(eq(tables.feedback.modelID, id))
    .orderBy(desc(tables.feedback.createdAt))
    .limit(20);

  return feedbacks;
});
