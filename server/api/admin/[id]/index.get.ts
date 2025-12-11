import * as z from "zod";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;
  const [model] = await dataSource
    .select()
    .from(tables.model)
    .where(eq(tables.model.id, id));

  return model;
});
