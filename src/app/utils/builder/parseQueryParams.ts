import { Request } from "express";
import qs from "qs";
import { QueryParams } from "./PrismaQueryBuilder";

export const parseQueryParams = (req: Request): QueryParams => {
  const parsedQuery = qs.parse(req.query as Record<string, any>, {
    depth: 10,
    allowDots: true,
  });

  const query: QueryParams = {
    search: parsedQuery.search as string | undefined,
    filter: (parsedQuery.filter as Record<string, any>) || {},
    sortBy: parsedQuery.sortBy as string | undefined,
    sortOrder:
      parsedQuery.sortOrder &&
      String(parsedQuery.sortOrder).toLowerCase() === "desc"
        ? "desc"
        : "asc",
    page:
      parsedQuery.page && !isNaN(Number(parsedQuery.page))
        ? Number(parsedQuery.page)
        : undefined,
    limit:
      parsedQuery.limit && !isNaN(Number(parsedQuery.limit))
        ? Number(parsedQuery.limit)
        : undefined,
    cursor: parsedQuery.cursor as string | undefined,
  };

  return query;
};
