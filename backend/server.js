require("dotenv").config();
const express = require("express");
const db = require("./knex");
const cors = require("cors");
const path = require("path");
const app = express();

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

// 静的ファイルの配信
console.log(`👻👻👻👻👻 staticを開始`);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// 環境変数の確認
console.log(`👻👻👻👻👻 Running in ${process.env.NODE_ENV} mode`);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}/`);
});

// app.use(
//   cors({
//     origin: "https://water-closet-map-pmvz.onrender.com", //"http://localhost:5173", アクセス許可するオリジン
//     credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
//     optionsSuccessStatus: 200, //レスポンスstatusを200に設定
//   }),
// );
app.use(cors());

app.use(express.json());
app.use("/", express.static("../frontend/dist"));

// // 認証機能 ====================================================
// // セッション設定 express-session
// app.use(
//   session({
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000, // 有効期限設定 1日
//       secure: process.env.NODE_ENV === "production", // true->httpsのみを許可、localはhttpなので切り替え
//       httpOnly: true, // javascriptからのアクセスを防ぐ
//     },
//   }),
// );
//
// // passport session
// app.use(passport.initialize());
// app.use(passport.session());
//
// // LocalStrategy(ユーザー名・パスワードでの認証)の設定
// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     const user = await find(username);
//
//     if (!user) {
//       // ユーザーが見つからない場合
//       return done(null, false);
//     }
//     // ハッシュ化したPWの突き合わせ。入力されたpasswordから、DBに保存されたハッシュ値を比較する
//     const match = await bcrypt.compare(password, user.password);
//     if (match) {
//       return done(null, user); // ログイン成功
//     } else {
//       return done(null, false); // ログイン失敗
//     }
//   }),
// );
//
// // 認証に成功した時にsessionにusernameを保存するための記述
// passport.serializeUser((user, done) => done(null, user));
// // sessionからuserを取り出して検証するための記述
// passport.deserializeUser(async (username, done) => {
//   const user = find(username);
//   done(null, user);
// });
//
// async function find(username) {
//   const [foundUser] = await db("users").where({ name: username });
//   return foundUser || {};
// }
//
// function checkAuth(req, res, next) {
//   if (req.isAuthenticated()) {
//     // isAuthenticated() 現在の認証状態を確認するメソッド
//     return next(); // 認証済みの場合、次のミドルウェアへ
//   }
//   res.status(401).json({ message: "ログインが必要です" });
// }
//
// // ログインエンドポイント
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({
//       message: "usernameとpasswordが必要です",
//     });
//   }
//
//   // 最初に設定したLocalStrategy(ユーザー名とパスワードでの認証)を使ってログイン
//   passport.authenticate("local", (err, user) => {
//     if (!user) return res.status(401).json({ message: "ログイン失敗！" });
//
//     // sessionにログイン情報を格納
//     req.logIn(user, () => {
//       return res.json({ message: `ログイン成功！ Hello, ${user.name}` });
//     });
//   })(req, res);
// });
//
// // サインアップ
// async function signup(username, email, password) {
//   const [newUsername] = await db("users")
//     .insert({
//       name: username,
//       email: email,
//       password: bcrypt.hashSync(password, 10),
//     })
//     .returning("name");
//
//   return newUsername;
// }
//
// app.post("/signup", async (req, res) => {
//   const { username, email, password } = req.body;
//   if (!username || !password) {
//     res.status(400).json({
//       message: "usernameとpasswordが必要です",
//     });
//   } else {
//     // usernameの重複check
//     const user = await findUser(username);
//     if (user.id) {
//       res.status(400).json({
//         message: "既に利用されているusernameです",
//       });
//     } else {
//       const newUserName = await signup(username, email, password);
//       res.json({
//         message: "サインアップが完了しました",
//         username: newUserName,
//       });
//     }
//   }
// });
//
// // dbからユーザー情報を検索
// async function findUser(username) {
//   const name = username;
//   const [foundUser] = await db("users").where({ name });
//   return foundUser || {};
// }
//
// // ログアウトエンドポイント
// app.get("/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err); // エラーハンドリングを適切に行う
//     }
//
//     req.session.destroy((err) => {
//       if (err) {
//         return res
//           .status(500)
//           .json({ message: "セッション削除に失敗しました" });
//       }
//       res.clearCookie("connect.sid", {
//         secure: process.env.NODE_ENV === "production",
//         httpOnly: true,
//       });
//
//       return res.json({ message: "ログアウト成功" });
//     });
//   });
// });
//
// app.get("/api/auth_check", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({ authenticated: true, user: req.user });
//   } else {
//     res.json({ authenticated: false });
//   }
// });

///////////////////////////////////////////////////

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
    .select("id", "latitude", "longitude", "title")
    .from("wc_position");
  res.status(200).send(allWcPositionData);
});

// //ピンをクリックした時の詳細表示(写真は別)checkOK-自分の投稿のみ（編集用）
// app.get("/api/click-wc-data/:id/:userid", checkAuth, async (req, res) => {
//   let { id, userid } = req.params;
//   id = Number(id);
//   userid = Number(userid);
//
//
// });
//ピンをクリックした時の詳細表示(写真は別)checkOK-自分の投稿のみ（編集用）//checkAuth,
app.get("/api/click-wc-data/:id/:userid", async (req, res) => {
  let { id, userid } = req.params;
  id = Number(id);
  userid = Number(userid);
  // console.log("----", id, userid);
  const wcData = await db
    .select(
      "wc_description.id",
      "comment",
      "wc_position.title",
      "wc_position.address",
      "wc_position.created_at",
      "hygiene_info.name",
      "gender_type.type",
      "wc_position.user_id",
      "wc_description.wc_pos_id",
    )
    .where({ "wc_description.wc_pos_id": id })
    .andWhere({ "wc_description.user_id": userid })
    .from("wc_description")
    .join("wc_position", { "wc_position.id": "wc_description.wc_pos_id" })
    .join("hygiene_info", { "hygiene_info.id": "wc_description.hygiene_id" })
    .join("gender_type", { "gender_type.id": "wc_description.gender_type_id" });
  res.status(200).send(wcData);
});

//ピンをクリックした時の詳細表示(写真は別)checkOK
app.get("/api/click-wc-data/:id", async (req, res) => {
  const idParams = req.params.id;
  // console.log("----", idParams);
  const wcData = await db
    .select(
      "wc_description.id",
      "comment",
      "wc_position.title",
      "wc_position.address",
      "wc_position.created_at",
      "hygiene_info.name",
      "gender_type.type",
      "wc_description.user_id",
      "users.name as username",
      "wc_description.wc_pos_id",
    )
    .where("wc_description.wc_pos_id", idParams)
    .from("wc_description")
    .join("wc_position", { "wc_position.id": "wc_description.wc_pos_id" })
    .join("hygiene_info", { "hygiene_info.id": "wc_description.hygiene_id" })
    .join("gender_type", { "gender_type.id": "wc_description.gender_type_id" })
    .join("users", { "users.id": "wc_description.user_id" });
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
app.post("/api/wc-position", async (req, res) => {
  const params = req.body;
  const addPosition = await db("wc_position")
    .insert({
      user_id: params.user_id,
      title: params.title,
      address: params.address,
      latitude: params.latitude,
      longitude: params.longitude,
      created_at: new Date(),
    })
    .returning("*");
  res.status(201).send(addPosition);
});

app.post("/api/wc-description", async (req, res) => {
  const params = req.body;
  console.log(params);
  const addPosition = await db("wc_description")
    .insert({
      hygiene_id: params.hygiene_id,
      wc_pos_id: params.wc_pos_id,
      gender_type_id: params.gender_type_id,
      user_id: params.user_id,
      comment: params.comment,
    })
    .returning("*");
  res.status(201).send(addPosition);
});

//投稿削除
app.delete("/api/wc-description/:id", async (req, res) => {
  // console.log("del---start-----");
  const id = Number(req.params.id);
  const delData = await db("wc_description")
    .delete()
    .where({ id })
    .returning("*");

  res.status(201).send(delData);
});

//お気に入り登録用
