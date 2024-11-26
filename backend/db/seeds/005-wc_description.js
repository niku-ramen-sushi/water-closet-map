/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('wc_description').del()
  await knex('wc_description').insert([
    {id: 1, hygiene_id:1 , wc_pos_id:1, gender_type_id:1, user_id:1, comment:"めちゃくちゃいけてる"},
    {id: 2, hygiene_id:5 , wc_pos_id:2, gender_type_id:1,user_id:1,comment:"きたない、くさい"},
    {id: 3, hygiene_id:3, wc_pos_id:3, gender_type_id:4,user_id:1,comment:""},
    {id: 4, hygiene_id:2 , wc_pos_id:1, gender_type_id:2,user_id:2,comment:""},
    {id: 5, hygiene_id:1, wc_pos_id:4, gender_type_id:2,user_id:1,comment:"いい場所にある。ホームトイレ認定！！"},
    {id: 6, hygiene_id:5, wc_pos_id:5, gender_type_id:3,user_id:1,comment:"ここは避けたい"},
    {id: 7, hygiene_id:4, wc_pos_id:6, gender_type_id:2,user_id:1,comment:""},
    {id: 8, hygiene_id:5, wc_pos_id:7, gender_type_id:3,user_id:1,comment:"昭和感が。。。"},
    {id: 9, hygiene_id:3, wc_pos_id:8, gender_type_id:2,user_id:1,comment:""},
    {id: 10, hygiene_id:4, wc_pos_id:3, gender_type_id:4,user_id:3,comment:""},
    {id: 11, hygiene_id:4, wc_pos_id:6, gender_type_id:3,user_id:3,comment:"この汚さはしょうがないのかな"},
    {id: 12, hygiene_id:3, wc_pos_id:8, gender_type_id:2,user_id:3,comment:"良くも悪くもないよ"},
    {id: 13, hygiene_id:5 , wc_pos_id:2, gender_type_id:1,user_id:3,comment:""},
    {id: 14, hygiene_id:2, wc_pos_id:3, gender_type_id:1,user_id:2,comment:""},
    {id: 15, hygiene_id:1, wc_pos_id:1, gender_type_id:2,user_id:2,comment:"清掃されていてキレイ"},


  ]);
};
