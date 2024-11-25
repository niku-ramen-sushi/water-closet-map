/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('hygiene_info').del()
  await knex('hygiene_info').insert([
    {id: 1, name: 'すごくきれい'},
    {id: 2, name: 'きれい'},
    {id: 3, name: '普通'},
    {id: 4, name: '汚い'},
    {id: 5, name: 'すごく汚い'},


  ]);
};
