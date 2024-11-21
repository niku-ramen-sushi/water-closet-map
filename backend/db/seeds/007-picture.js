/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('picture').del()
  await knex('picture').insert([
    {id: 1, wc_desc_id:5, path_name:"../picture/female-1.png"},
    {id: 2, wc_desc_id:5, path_name:"../picture/female-2.jpeg"},
    {id: 3, wc_desc_id:9, path_name:"../picture/female-3.jpg"},
    {id: 4, wc_desc_id:1, path_name:"../picture/male-4.png"},
    {id: 5, wc_desc_id:1, path_name:"../picture/male-5.png"},
    {id: 6, wc_desc_id:14, path_name:"../picture/everyone-6"},
    {id: 7, wc_desc_id:2, path_name:"../picture/male-7.jpg"},
    {id: 8, wc_desc_id:13, path_name:"../picture/everyone-8.jpg"},
    {id: 9, wc_desc_id:13, path_name:"../picture/male-9.jpeg"},
    {id: 10, wc_desc_id:10, path_name:"../picture/everyone-10.jpg"},

  ]);
};
