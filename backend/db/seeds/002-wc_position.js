/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('wc_position').del()
  await knex('wc_position').insert([
    { user_id:1, title:"大名古屋ビルヂング", address:"愛知県名古屋市中村区名駅３丁目２８−１２", latitude:35.17184,longitude:136.88463,created_at:new Date("2024-11-18")},
    { user_id:1, title:"ファミマ", address:null, latitude:35.16975,longitude:136.88595,created_at:new Date("2024-11-10")},
    { user_id:2, title:"TAIHO亀島", address:null, latitude:35.17693,longitude:136.87338,created_at:new Date("2024-11-11")},
    { user_id:3, title:"南押切公園", address:"名古屋市西区則武新町", latitude:35.18253,longitude:136.88013,created_at:null},
    { user_id:2, title:"名城公園", address:null, latitude:35.18816,longitude:136.90300,created_at:null},
    { user_id:3, title:"名城公園", address:"名古屋市北区名城１丁目", latitude:35.19034,longitude:136.90332,created_at:new Date("2024-1-25")},
    {user_id:3, title:"名古屋城", address:null, latitude:35.18293,longitude:136.89621,created_at:null},
    { user_id:1, title:"東横IN", address:null, latitude:35.17358,longitude:136.88639,created_at:null},

  ]);
};
