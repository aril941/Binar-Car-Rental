import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("cars", (builder) => {
    builder.increments("id").primary().notNullable();
    builder.string("plate").notNullable();
    builder.string("manufacture").notNullable();
    builder.string("model").notNullable();
    builder.json("image").defaultTo(null).nullable();
    builder.integer("rentPerDay").defaultTo(0);
    builder.integer("capacity").defaultTo(0);
    builder.string("description").notNullable();
    builder.timestamp("availableAt").defaultTo(knex.fn.now());
    builder.string("transmission").notNullable();
    builder.boolean("available").defaultTo(false);
    builder.string("type").notNullable();
    builder.integer("year").defaultTo(0);
    builder.specificType("options", "text ARRAY");
    builder.specificType("specs", "text ARRAY");
    builder.integer("created_by").references("id").inTable("users");
    builder.integer("updated_by").references("id").inTable("users");
    builder.boolean("deleted").defaultTo(false);
    builder.timestamp("created_at").notNullable();
    builder.timestamp("updated_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("cars");
}