/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("pictures").del();
  await knex("favorite").del();
  await knex("wc_description").del();
  await knex("gender_type").del();
  await knex("hygiene_info").del();
  await knex("wc_position").del();
  await knex("users").del();

  const userRows = await knex("users")
    .insert([
      {
        name: "トラ",
        gender: "m",
        email: "12345@mail.toyota.co.jp",
        password: "",
        created_at: new Date("2024-11-15"),
        latitude: 35.17002,
        longitude: 136.8851,
      },
      {
        name: "マサ",
        gender: "f",
        email: "67890@mail.toyota.co.jp",
        password: "",
        created_at: new Date("2024-11-3"),
        latitude: null,
        longitude: null,
      },
      {
        name: "tsugu",
        gender: "",
        email: "13579@mail.toyota.co.jp",
        password: "",
        created_at: new Date("2024-10-19"),
        latitude: null,
        longitude: null,
      },
    ])
    .returning("*");

  const [user1, user2, user3] = userRows;

  const wcPosRows = await knex("wc_position")
    .insert([
      {
        user_id: user1.id,
        title: "大名古屋ビルヂング",
        address: "愛知県名古屋市中村区名駅３丁目２８−１２",
        latitude: 35.17184,
        longitude: 136.88463,
        created_at: new Date("2024-11-18"),
      },
      {
        user_id: user1.id,
        title: "ファミマ",
        address: null,
        latitude: 35.16975,
        longitude: 136.88595,
        created_at: new Date("2024-11-10"),
      },
      {
        user_id: user2.id,
        title: "TAIHO亀島",
        address: null,
        latitude: 35.17693,
        longitude: 136.87338,
        created_at: new Date("2024-11-11"),
      },
      {
        user_id: user3.id,
        title: "南押切公園",
        address: "名古屋市西区則武新町",
        latitude: 35.18253,
        longitude: 136.88013,
        created_at: null,
      },
      {
        user_id: user2.id,
        title: "名城公園",
        address: null,
        latitude: 35.18816,
        longitude: 136.903,
        created_at: null,
      },
      {
        user_id: user3.id,
        title: "名城公園",
        address: "名古屋市北区名城１丁目",
        latitude: 35.19034,
        longitude: 136.90332,
        created_at: new Date("2024-1-25"),
      },
      {
        user_id: user3.id,
        title: "名古屋城",
        address: null,
        latitude: 35.18293,
        longitude: 136.89621,
        created_at: null,
      },
      {
        user_id: user1.id,
        title: "東横IN",
        address: null,
        latitude: 35.17358,
        longitude: 136.88639,
        created_at: null,
      },
    ])
    .returning("*");

  const [wcPos1, wcPos2, wcPos3, wcPos4, wcPos5, wcPos6, wcPos7, wcPos8] =
    wcPosRows;

  const hygieneRows = await knex("hygiene_info")
    .insert([
      { name: "すごくきれい" },
      { name: "きれい" },
      { name: "普通" },
      { name: "汚い" },
      { name: "すごく汚い" },
    ])
    .returning("*");

  const [hygiene1, hygiene2, hygiene3, hygiene4, hygiene5] = hygieneRows;

  const genderRows = await knex("gender_type")
    .insert([
      { type: "男性" },
      { type: "女性" },
      { type: "共用" },
      { type: "みんなのトイレ" },
    ])
    .returning("*");

  const [gender1, gender2, gender3, gender4] = genderRows;

  const wcDescRows = await knex("wc_description")
    .insert([
      {
        hygiene_id: hygiene1.id,
        wc_pos_id: wcPos1.id,
        gender_type_id: gender1.id,
        user_id: user1.id,
        comment: "めちゃくちゃいけてる",
      },
      {
        hygiene_id: hygiene5.id,
        wc_pos_id: wcPos2.id,
        gender_type_id: gender1.id,
        user_id: user1.id,
        comment: "きたない、くさい",
      },
      {
        hygiene_id: hygiene3.id,
        wc_pos_id: wcPos3.id,
        gender_type_id: gender4.id,
        user_id: user1.id,
        comment: "",
      },
      {
        hygiene_id: hygiene2.id,
        wc_pos_id: wcPos4.id,
        gender_type_id: gender2.id,
        user_id: user1.id,
        comment: "",
      },
      {
        hygiene_id: hygiene1.id,
        wc_pos_id: wcPos5.id,
        gender_type_id: gender2.id,
        user_id: user1.id,
        comment: "いい場所にある。ホームトイレ認定！！",
      },
      {
        hygiene_id: hygiene5.id,
        wc_pos_id: wcPos6.id,
        gender_type_id: gender3.id,
        user_id: user1.id,
        comment: "ここは避けたい",
      },
      {
        hygiene_id: hygiene4.id,
        wc_pos_id: wcPos7.id,
        gender_type_id: gender2.id,
        user_id: user1.id,
        comment: "",
      },
      {
        hygiene_id: hygiene5.id,
        wc_pos_id: wcPos7.id,
        gender_type_id: gender3.id,
        user_id: user2.id,
        comment: "昭和感が。。。",
      },
      {
        hygiene_id: hygiene3.id,
        wc_pos_id: wcPos8.id,
        gender_type_id: gender2.id,
        user_id: user1.id,
        comment: "",
      },
      {
        hygiene_id: hygiene4.id,
        wc_pos_id: wcPos1.id,
        gender_type_id: gender4.id,
        user_id: user2.id,
        comment: "",
      },
      {
        hygiene_id: hygiene4.id,
        wc_pos_id: wcPos2.id,
        gender_type_id: gender3.id,
        user_id: user2.id,
        comment: "この汚さはしょうがないのかな",
      },
      {
        hygiene_id: hygiene3.id,
        wc_pos_id: wcPos3.id,
        gender_type_id: gender2.id,
        user_id: user2.id,
        comment: "良くも悪くもないよ",
      },
      {
        hygiene_id: hygiene5.id,
        wc_pos_id: wcPos4.id,
        gender_type_id: gender1.id,
        user_id: user3.id,
        comment: "",
      },
      {
        hygiene_id: hygiene2.id,
        wc_pos_id: wcPos5.id,
        gender_type_id: gender1.id,
        user_id: user3.id,
        comment: "",
      },
      {
        hygiene_id: hygiene1.id,
        wc_pos_id: wcPos6.id,
        gender_type_id: gender2.id,
        user_id: user3.id,
        comment: "清掃されていてキレイ",
      },
    ])
    .returning("*");

  await knex("favorite").insert([
    { wc_id: wcPos3.id, user_id: user2.id },
    { wc_id: wcPos1.id, user_id: user1.id },
    { wc_id: wcPos4.id, user_id: user1.id },
    { wc_id: wcPos7.id, user_id: user3.id },
  ]);

  await knex("pictures").insert([
    { wc_desc_id: wcDescRows[4].id, path_name: "../pictures/female-1.png" },
    { wc_desc_id: wcDescRows[4].id, path_name: "../pictures/female-1.png" },
    { wc_desc_id: wcDescRows[8].id, path_name: "../pictures/female-3.jpg" },
    { wc_desc_id: wcDescRows[0].id, path_name: "../pictures/male-4.png" },
    { wc_desc_id: wcDescRows[0].id, path_name: "../pictures/male-5.png" },
    { wc_desc_id: wcDescRows[13].id, path_name: "../pictures/everyone-6" },
    { wc_desc_id: wcDescRows[1].id, path_name: "../pictures/male-7.jpg" },
    { wc_desc_id: wcDescRows[12].id, path_name: "../pictures/everyone-8.jpg" },
    { wc_desc_id: wcDescRows[12].id, path_name: "../pictures/male-9.jpeg" },
    { wc_desc_id: wcDescRows[9].id, path_name: "../pictures/everyone-10.jpg" },
  ]);
};
