/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('gender_type').del()
  await knex('gender_type').insert([
    {type: '男性'},
    { type: '女性'},
    { type: '共用'},
    {type: 'みんなのトイレ'},
  ]);
};
