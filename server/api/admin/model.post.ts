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

  const result = validator.safeParse(body.data);
  if (result.error) {
    throw createError({
      statusCode: 400,
      data: { zod: result.error.message },
    });
  }

  const r2 = z.email("editor.errors.user.email").array().safeParse(body.emails);
  if (r2.error) {
    throw createError({
      statusCode: 400,
      data: { zod: r2.error.message },
    });
  }

  const r3 = z.string("editor.errors.title").optional().safeParse(body.title);
  if (r3.error) {
    throw createError({
      statusCode: 400,
      data: { zod: r3.error.message },
    });
  }

  function generateAdminKey(length = 12) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Générer une clé unique en base
  async function generateUniqueAdminKey(): Promise<string> {
    let unique = false;
    let key = "";

    while (!unique) {
      key = generateAdminKey(12);
      const existing = await dataSource
        .select()
        .from(tables.model)
        .where(eq(tables.model.clientKey, key));
      if (existing.length === 0) unique = true;
    }

    return key;
  }

  const [{ id }] = await dataSource
    .insert(tables.model)
    .values({ ...body, clientKey: await generateUniqueAdminKey() })
    .returning({ id: tables.model.id });

  const model = await dataSource
    .select()
    .from(tables.model)
    .where(eq(tables.model.id, id));

  return model[0];
});
