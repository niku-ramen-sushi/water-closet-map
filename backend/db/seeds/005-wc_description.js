/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('wc_description').del()
  await knex('wc_description').insert([
    {hygiene_id:1 , wc_pos_id:1, gender_type_id:1, user_id:1, comment:"めちゃくちゃいけてる"},
    { hygiene_id:5 , wc_pos_id:2, gender_type_id:1,user_id:1,comment:"きたない、くさい"},
    { hygiene_id:3, wc_pos_id:3, gender_type_id:4,user_id:1,comment:""},
    { hygiene_id:2 , wc_pos_id:1, gender_type_id:2,user_id:2,comment:""},
    { hygiene_id:1, wc_pos_id:4, gender_type_id:2,user_id:1,comment:"いい場所にある。ホームトイレ認定！！"},
    { hygiene_id:5, wc_pos_id:5, gender_type_id:3,user_id:1,comment:"ここは避けたい"},
    { hygiene_id:4, wc_pos_id:6, gender_type_id:2,user_id:1,comment:""},
    { hygiene_id:5, wc_pos_id:7, gender_type_id:3,user_id:1,comment:"昭和感が。。。"},
    { hygiene_id:3, wc_pos_id:8, gender_type_id:2,user_id:1,comment:""},
    { hygiene_id:4, wc_pos_id:3, gender_type_id:4,user_id:3,comment:""},
    { hygiene_id:4, wc_pos_id:6, gender_type_id:3,user_id:3,comment:"この汚さはしょうがないのかな"},
    { hygiene_id:3, wc_pos_id:8, gender_type_id:2,user_id:3,comment:"良くも悪くもないよ"},
    { hygiene_id:5 , wc_pos_id:2, gender_type_id:1,user_id:3,comment:""},
    { hygiene_id:2, wc_pos_id:3, gender_type_id:1,user_id:2,comment:""},
    {hygiene_id:1, wc_pos_id:1, gender_type_id:2,user_id:2,comment:"清掃されていてキレイ"},


  ]);
};
