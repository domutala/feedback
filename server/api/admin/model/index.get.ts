import { arrayContains, count, asc, desc } from "drizzle-orm";
import { Auth } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const auth = event.context.auth as Auth;
  const query = getQuery<{
    page?: string;
    pageSize?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }>(event);

  //  { sortBy: 'createdAt', sortOrder: 'desc' }
  const page = Number(query.page ?? 1);
  const pageSize = Number(query.pageSize ?? 20);
  const safePage = Math.max(1, page);
  const safePageSize = Math.min(Math.max(1, pageSize), 100);
  const offset = (safePage - 1) * safePageSize;
  const limit = safePageSize;

  // Colonnes autorisées
  const sortableColumns = {
    title: tables.model.title,
    createdAt: tables.model.createdAt,
    clientKey: tables.model.clientKey,
  };

  // Sécurisation du tri
  const sortBy =
    query.sortBy && sortableColumns[query.sortBy as "title"]
      ? sortableColumns[query.sortBy as "title"]
      : tables.model.createdAt; // fallback
  const sortOrder = query.sortOrder === "asc" ? asc(sortBy) : desc(sortBy);

  const models = await dataSource
    .select()
    .from(tables.model)
    .where(arrayContains(tables.model.emails, [auth.email]))
    .orderBy(sortOrder)
    .limit(limit)
    .offset(offset);

  const totalResult = await dataSource
    .select({ total: count() })
    .from(tables.model)
    .where(arrayContains(tables.model.emails, [auth.email]));
  const total = totalResult[0]?.total ?? 0;

  return {
    page: safePage,
    pageSize: safePageSize,
    items: models,
    total,
    totalPages: Math.ceil(total / safePage),
  };
});
