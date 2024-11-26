/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('hygiene_info').del()
  await knex('hygiene_info').insert([
    { name: 'すごくきれい'},
    { name: 'きれい'},
    { name: '普通'},
    { name: '汚い'},
    { name: 'すごく汚い'},


  ]);
};
