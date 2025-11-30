import * as z from "zod";
import {
  additionalValidator,
  commentValidator,
} from "~~/app/tools/modelValidation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const key = getRouterParam(event, "clientKey") as string;
  const [model] = await dataSource
    .select()
    .from(tables.model)
    .where(eq(tables.model.clientKey, key));

  const cObj = commentValidator(model.data, (v) => v);
  const vObj = additionalValidator(model.data, (v) => v);
  const r1 = z
    .object({
      ...cObj,
      ...vObj,
      rate: z
        .number("rate.error.rate")
        .gte(1, "rate.error.rate")
        .lte(5, "rate.error.rate"),
    })
    .safeParse(body);
  if (r1.error) {
    throw createError({
      statusCode: 400,
      data: { zod: r1.error.message },
    });
  }

  const [{ id }] = await dataSource
    .insert(tables.feedback)
    .values({ data: body, modelID: model.id })
    .returning({ id: tables.feedback.id });

  return {};
});
