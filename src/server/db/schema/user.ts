import { sql } from "drizzle-orm";
import { createTable, ids } from "#/server/db/utils";

export const users = createTable("user", (d) => ({
    ...ids,
    name: d.varchar({ length: 255 }),
    email: d.varchar({ length: 255 }).notNull(),
    emailVerified: d
        .timestamp({
            mode: "date",
            withTimezone: true,
        })
        .default(sql`CURRENT_TIMESTAMP`),
    image: d.varchar({ length: 255 }),
}));
