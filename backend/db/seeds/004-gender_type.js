/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('gender_type').del()
  await knex('gender_type').insert([
    {id: 1, type: '男性'},
    {id: 2, type: '女性'},
    {id: 3, type: '共用'},
    {id: 4, type: 'みんなのトイレ'},
  ]);
};
