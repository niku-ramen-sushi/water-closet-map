/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("wc_position", function(table){
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.string("title", 64).notNullable();
    table.string("address", 255).notNullable();
    table.decimal("latitude",9,7).notNullable();
    table.decimal("longitude",10,7).notNullable();
    table.timestamp("created_at").notNullable();

    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("wc_position");
};
