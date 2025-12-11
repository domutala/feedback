import jwt from "jsonwebtoken";
import { eq, isNull, and, or } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const authHeader = getRequestHeader(event, "authorization");
  const accesToken = getCookie(event, "access_token");
  let token = "";

  if (authHeader) token = authHeader.replace("Bearer ", "");
  else if (accesToken) {
    token = jwt.verify(accesToken, config.jwtPrivateKey) as string;
  }

  if (token) {
    const auth = await dataSource
      .select()
      .from(tables.auth)
      .where(
        and(
          eq(tables.auth.id, token),
          or(isNull(tables.auth.closed), eq(tables.auth.closed, false))
        )
      );

    if (!auth?.length) {
      throw createError({
        statusCode: 403,
        statusMessage: "errors.not_authorized++",
      });
    }

    event.context.auth = auth[0];
  }

  if (event.path.startsWith("/api/admin/") && !event.context.auth) {
    throw createError({
      statusCode: 403,
      statusMessage: "errors.not_authorized",
    });
  }
});
