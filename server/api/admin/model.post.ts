import * as z from "zod";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validator = z.object({
    title: z
      .transform((v) => (v === "" ? undefined : v))
      .pipe(
        z
          .string("editor.errors.title.string")
          .max(50, "editor.errors.title.max")
          .optional()
      ),

    count: z
      .number("editor.errors.count.number")
      .int("editor.errors.count.int")
      .nullable(),

    comment: z.enum(["notRequired", "required", "no"], "editor.errors.other"),

    name: z.boolean("editor.errors.other"),
    name_required: z.boolean("editor.errors.other").optional(),

    email: z.boolean("editor.errors.other"),
    email_required: z
      .boolean("editor.errors.email_required.boolean")
      .optional(),

    phone: z.boolean("editor.errors.other"),
    phone_required: z.boolean("editor.errors.other").optional(),

    address: z.boolean("editor.errors.other"),
    address_required: z.boolean("editor.errors.aother").optional(),
  });

  const result = validator.safeParse(body.model);
  if (result.error) {
    throw createError({
      statusCode: 400,
      data: { zod: result.error.message },
    });
  }

  const r2 = z.email("editor.errors.user.email").safeParse(body.email);
  if (r2.error) {
    throw createError({
      statusCode: 400,
      data: { zod: r2.error.message },
    });
  }

  return { okay: true };
});
