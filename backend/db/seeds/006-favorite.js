/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('favorite').del()
  await knex('favorite').insert([
    { wc_id:3, user_id:2 },
    {wc_id:1, user_id:1 },
    { wc_id:4, user_id:1 },
    { wc_id:7, user_id:3 },
  ]);
};
