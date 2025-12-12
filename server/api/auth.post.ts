import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const token = jwt.verify(body.token, config.jwtPrivateKey) as {
    email: string;
  };

  const auth = await dataSource
    .insert(tables.auth)
    .values({ email: token.email })
    .returning({ id: tables.auth.id });

  const _token = jwt.sign(auth[0].id, config.jwtPrivateKey, {});
  setCookie(event, "access_token", _token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return { token: auth[0].id, user: { email: token.email } };
});
