/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name", 64).notNullable();
    table.string("gender", 1);
    table.string("email", 64).notNullable();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.decimal("latitude", 9, 7);
    table.decimal("longitude", 10, 7);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("wc_position", function (table) {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.string("title", 64).notNullable();
    table.string("address", 255);
    table.decimal("latitude", 9, 7).notNullable();
    table.decimal("longitude", 10, 7).notNullable();
    table.timestamp("created_at");

    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("wc_position");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("hygiene_info", function (table) {
    table.increments("id").primary();
    table.string("name", 64);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("hygiene_info");
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("gender_type", function (table) {
    table.increments("id").primary();
    table.string("type", 20);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("gender_type");
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("wc_description", function (table) {
    table.increments("id").primary();
    table.integer("hygiene_id");
    table.integer("wc_pos_id");
    table.integer("gender_type_id");
    table.text("comment");
    table.integer("user_id");

    table
      .foreign("hygiene_id")
      .references("hygiene_info.id")
      .onDelete("CASCADE");
    table.foreign("wc_pos_id").references("wc_position.id").onDelete("CASCADE");
    table
      .foreign("gender_type_id")
      .references("gender_type.id")
      .onDelete("CASCADE");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("wc_description");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("favorite", function (table) {
    table.increments("id").primary();
    table.integer("wc_id");
    table.integer("user_id");

    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.foreign("wc_id").references("wc_position.id").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("favorite");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("pictures", function (table) {
    table.increments("id").primary();
    table.integer("wc_desc_id");
    table.string("path_name", 255);

    table
      .foreign("wc_desc_id")
      .references("wc_description.id")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("pictures");
};
