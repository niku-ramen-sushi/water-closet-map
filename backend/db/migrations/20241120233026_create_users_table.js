/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", function(table){
    table.increments("id").primary();
    table.string("name", 64).notNullable();
    table.string("gender",1);
    table.string("email", 64).notNullable();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());;
    table.decimal("latitude",9,7);
    table.decimal("longitude",10,7);

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
