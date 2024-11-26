const express = require("express");
const db = require("./knex");
const cors = require("cors");
const path = require("path");
const app = express();

// 静的ファイルの配信
console.log(`👻👻👻👻👻 staticを開始`);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// 環境変数の確認
console.log(`👻👻👻👻👻 Running in ${process.env.NODE_ENV} mode`);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}/`);
});

app.use(cors());
app.use(express.json());
app.use("/", express.static("../frontend/dist"));

//全ユーザーのデータcheckOK
app.get("/api/users", async (req, res) => {
  const userData = await db.select("*").from("users");
  res.status(200).send(userData);
});

//idのユーザー情報
app.get("/api/users/:id", async (req, res) => {
  const idParams = req.params.id;
  const userInfo = await db
    .select("users.*", "favorite.wc_id")
    .where("users.id", idParams)
    .from("users")
    .join("favorite", { "favorite.user_id": "users.id" });
  res.status(200).send(userInfo);
});

//清潔度の選択用に使用checkOK
app.get("/api/hygiene", async (req, res) => {
  const hygieneData = await db.select("*").from("hygiene_info");
  console.log("====",hygieneData)
  res.status(200).send(hygieneData);
});

//トイレ種類の選択用に使用checkOK
app.get("/api/gender-type", async (req, res) => {
  const genderTypeData = await db.select("*").from("gender_type");
  res.status(200).send(genderTypeData);
});

//ログイン後のピン表示用checkOK
app.get("/api/all-wc-position", async (req, res) => {
  const allWcPositionData = await db
    .select("id", "latitude", "longitude","title")
    .from("wc_position");
  res.status(200).send(allWcPositionData);
});

//ピンをクリックした時の詳細表示(写真は別)checkOK-自分の投稿のみ（編集用）
app.get("/api/click-wc-data/:id/:userid", async (req, res) => {
  let {id,userid} = req.params;
  id = Number(id)
  userid = Number(userid)
  console.log("----",id,userid)
  const wcData = await db
      .select("wc_description.id",
          "comment",
          "wc_position.title",
          "wc_position.address",
          "wc_position.created_at",
          "hygiene_info.name",
          "gender_type.type",
          "wc_position.user_id",
          "wc_description.wc_pos_id"
      )
      .where({"wc_description.wc_pos_id": id})
          .andWhere({"wc_description.user_id":userid})
      .from("wc_description")
      .join("wc_position", { "wc_position.id": "wc_description.wc_pos_id" })
      .join("hygiene_info", { "hygiene_info.id": "wc_description.hygiene_id" })
      .join("gender_type", { "gender_type.id": "wc_description.gender_type_id" });
  res.status(200).send(wcData);
});

//ピンをクリックした時の詳細表示(写真は別)checkOK
app.get("/api/click-wc-data/:id", async (req, res) => {
  const idParams = req.params.id;
  console.log("----",idParams)
  const wcData = await db
    .select("wc_description.id",
      "comment",
      "wc_position.title",
      "wc_position.address",
      "wc_position.created_at",
      "hygiene_info.name",
      "gender_type.type",
        "wc_position.user_id",
        "wc_description.wc_pos_id"
    )
    .where("wc_description.wc_pos_id", idParams)
    .from("wc_description")
    .join("wc_position", { "wc_position.id": "wc_description.wc_pos_id" })
    .join("hygiene_info", { "hygiene_info.id": "wc_description.hygiene_id" })
    .join("gender_type", { "gender_type.id": "wc_description.gender_type_id" });
  res.status(200).send(wcData);
});

//ピンをクリックした時の詳細表示(写真のみ)checkOK
app.get("/api/click-wc-picture/:id", async (req, res) => {
  const idParams = req.params.id;
  const wcPictureData = await db
    .select("pictures.path_name")
    .where("wc_pos_id", idParams)
    .from("wc_description")
    .join("pictures", { "pictures.wc_desc_id": "wc_description.id" });
  res.status(200).send(wcPictureData);
});

//お気に入りを表示する 未確認
app.get("/api/favorite/:id", async (req, res) => {
  const idParams = req.params.id;
  const userFavorite = await db
    .select("wc_position.id")
    .where({ user_id: idParams })
    .from("favorite")
    .join("wc_position", { "wc_position.id": "favorite.wc_id" });
  res.status(200).send(userFavorite);
});

//使えるのか分からない
app.get("/api/wc-info", async (req, res) => {
  const wcInfoData = await db
    .select(
      "title",
      "address",
      "latitude",
      "longitude",
      "created_at",
      "wc_description.comment",
      "pictures.path_name",
      "hygiene_info.name",
      "gender_type.type",
    )
    .from("wc_position")
    .join("wc_description", { "wc_description.wc_pos_id": "wc_position.id" })
    .join("pictures", { "pictures.wc_desc_id": "wc_description.id" })
    .join("hygiene_info", { "hygiene_info.id": "wc_description.hygiene_id" })
    .join("gender_type", { "gender_type.id": "wc_description.gender_type_id" });
  res.status(200).send(wcInfoData);
});

//commit用にPOSTメソッドコメントアウト
//サインアップ登録用
// app.post("/api/create-user", async(req,res)=>{
//   const createUserData = await req.body;
//   knex("users")
//     .insert(createUserData)
//     .then(() => console.log("データ挿入完了"))
//     .catch((err) => console.log("失敗 : ", err))
//     .finally(() => knex.destroy());
// })

//新たなトイレ情報登録用

//お気に入り登録用
