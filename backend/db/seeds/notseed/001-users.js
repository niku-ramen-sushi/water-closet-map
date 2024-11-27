/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  const seedTime = new Date()
  .setTime()
  await knex('users').insert([
    { name: 'トラ', gender:"m", email:"12345@mail.toyota.co.jp",
      password:"",created_at:new Date("2024-11-15"), latitude:35.17002,longitude:136.88510},
    { name: 'マサ', gender:"f", email:"67890@mail.toyota.co.jp",
      password:"",created_at:new Date("2024-11-3"), latitude:null,longitude:null},
    { name: 'tsugu', gender:"", email:"13579@mail.toyota.co.jp",
      password:"",created_at:new Date("2024-10-19"), latitude:null,longitude:null}
  ]);
};
