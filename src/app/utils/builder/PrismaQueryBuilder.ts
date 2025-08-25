export interface QueryParams {
  search?: string;
  filter?: Record<string, any>;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number; // page-based
  limit?: number;
  cursor?: string; // cursor-based (usually unique id)
}

// Prisma QueryBuilder
export class PrismaQueryBuilder<T> {
  private where: Record<string, any> = {};
  private orderBy: Record<string, "asc" | "desc"> | undefined;
  private take: number | undefined;
  private skip: number | undefined;
  private cursorObj: Record<string, any> | undefined;
  private query: QueryParams;

  constructor(query: QueryParams) {
    this.query = query;
  }

  // Search
  search(searchingFields: (keyof T | string)[]) {
    const search = this.query.search;
    if (search && searchingFields.length) {
      this.where.OR = searchingFields.map((field) => {
        if (typeof field === "string") {
          const keys = field.split("."); // ✅ safe now
          if (keys.length === 2) {
            // nested field
            return {
              [keys[0]]: {
                some: { [keys[1]]: { contains: search, mode: "insensitive" } },
              },
            };
          } else {
            return { [field]: { contains: search, mode: "insensitive" } };
          }
        }
        return {}; // fallback, ignore non-string keys
      });
    }
    return this;
  }
// Filter
filter() {
  const filter = this.query.filter || {};

    Object.keys(filter).forEach((key) => {
      let value: any = filter[key];

      // Convert string/number to boolean
      if (value === "true" || value === true || value === 1 || value === "1")
        value = true;
      if (value === "false" || value === false || value === 0 || value === "0")
        value = false;

      // Convert number strings to numbers (exclude booleans)
      if (!isNaN(value) && value !== "" && value !== true && value !== false)
        value = Number(value);

      // Handle operators if value is object
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        this.where[key] = {};
        Object.keys(value).forEach((op) => {
          let opValue = value[op];

          // Convert string/number to boolean/number for operator values
          if (
            opValue === "true" ||
            opValue === true ||
            opValue === 1 ||
            opValue === "1"
          )
            opValue = true;
          if (
            opValue === "false" ||
            opValue === false ||
            opValue === 0 ||
            opValue === "0"
          )
            opValue = false;
          if (
            !isNaN(opValue) &&
            opValue !== "" &&
            opValue !== true &&
            opValue !== false
          )
            opValue = Number(opValue);

          switch (op) {
            case "gt":
            case "gte":
            case "lt":
            case "lte":
            case "equals":
            case "not":
            case "in":
            case "notIn":
              this.where[key][op] = opValue;
              break;
            case "contains":
              this.where[key].contains = opValue;
              this.where[key].mode = "insensitive";
              break;
            default:
              throw new Error(`Unsupported filter operator: ${op}`);
          }
        });
      } else {
        // direct match
        this.where[key] = value;
      }
    });

    return this;
  }

  // Sort
  sort() {
    if (this.query.sortBy) {
      this.orderBy = {
        [this.query.sortBy]: this.query.sortOrder === "desc" ? "desc" : "asc",
      };
    }
    return this;
  }

  // Paginate
  paginate() {
    const limit = this.query.limit ? Number(this.query.limit) : 10;
    this.take = limit;

    if (this.query.cursor) {
      // Cursor-based pagination
      this.cursorObj = { id: this.query.cursor };
      this.skip = 1; // skip cursor itself
    } else {
      // Page-based pagination
      const page = this.query.page ? Number(this.query.page) : 1;
      this.skip = (page - 1) * limit;
    }

    return this;
  }

  // Build the final query
  build() {
    const finalQuery: any = {
      where: this.where,
      orderBy: this.orderBy,
      take: this.take,
      skip: this.skip,
    };

    if (this.cursorObj) {
      finalQuery.cursor = this.cursorObj;
    }

    return finalQuery;
  }
}
