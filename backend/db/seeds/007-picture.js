/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pictures').del()
  await knex('pictures').insert([
    { wc_desc_id:5, path_name:"../pictures/female-1.png"},
    {wc_desc_id:5, path_name:"../pictures/female-1.png"},
    { wc_desc_id:9, path_name:"../pictures/female-3.jpg"},
    { wc_desc_id:1, path_name:"../pictures/male-4.png"},
    {wc_desc_id:1, path_name:"../pictures/male-5.png"},
    { wc_desc_id:14, path_name:"../pictures/everyone-6"},
    { wc_desc_id:2, path_name:"../pictures/male-7.jpg"},
    { wc_desc_id:13, path_name:"../pictures/everyone-8.jpg"},
    { wc_desc_id:13, path_name:"../pictures/male-9.jpeg"},
    { wc_desc_id:10, path_name:"../pictures/everyone-10.jpg"},

  ]);
};
