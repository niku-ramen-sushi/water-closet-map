/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("favorite", function(table){
    table.increments("id").primary();
    table.integer("wc_id");
    table.integer("user_id");

    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.foreign("wc_id").references("wc_position.id").onDelete("CASCADE");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("favorite");
};