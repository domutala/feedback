import * as z from "zod";

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, "clientKey") as string;
  const [model] = await dataSource
    .select()
    .from(tables.model)
    .where(eq(tables.model.clientKey, key));

  return model;
});
