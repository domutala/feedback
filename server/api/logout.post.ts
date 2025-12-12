export default defineEventHandler(async (event) => {
  deleteCookie(event, "access_token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  if (!event.context.auth) return;

  await dataSource
    .update(tables.auth)
    .set({ closed: false })
    .where(eq(tables.auth.id, event.context.auth.token));

  return;
});
