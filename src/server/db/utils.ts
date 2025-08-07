import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { pgTableCreator, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `muelsyse_${name}`);

export const publicId = varchar({ length: 128 })
    .notNull()
    .$defaultFn(() => createId());

export const ids = {
    id: uuid()
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    publicId,
};

export const timestamps = {
    created_at: timestamp({ mode: "date", withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp({ mode: "date", withTimezone: true }).$onUpdate((): Date => new Date()),
};
