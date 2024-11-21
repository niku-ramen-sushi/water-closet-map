/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("pictures", function(table){
    table.increments("id").primary();
    table.integer("wc_desc_id");
    table.string("path_name", 255);

    table.foreign("wc_desc_id").references("wc_description.id").onDelete("CASCADE");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("pictures");
};
