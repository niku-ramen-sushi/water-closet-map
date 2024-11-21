/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("wc_description", function(table) {
    table.increments("id").primary();
    table.integer("hygiene_id");
    table.integer("wc_pos_id");
    table.integer("gender_type_id");

    table.foreign("hygiene_id").references("hygiene_info.id").onDelete("CASCADE");
    table.foreign("wc_pos_id").references("wc_position.id").onDelete("CASCADE");
    table.foreign("gender_type_id").references("gender_type.id").onDelete("CASCADE");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("wc_description");
};