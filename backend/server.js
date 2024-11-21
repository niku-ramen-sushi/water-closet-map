const express = require("express");
const db = require("knex");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}/`);
});

app.use(cors());
app.use(express.json());
app.use("/", express.static("../frontend/dist"));

app.get("/api/users", async(req,res) => {
  const userData= await db
    .select("*")
    .from("users");
  res.status(200).send(userData);
})

app.get("/api/users/:id",async(req,res)=>{
  const idParams = req.params.id;
  const userInfo = await db
    .select(
      "users.*",
      "favorite.wc_id"
      )
    .where(id=idParams)
    .from("users")
    .join("favorite",{"favorite.user_id":"users.id"});
  res.status(200).send(userInfo);
})

app.get("/api/hygiene", async(req,res) => {
  const hygieneData = await db
    .select("*")
    .from("hygiene_info");
  res.status(200).send(hygieneData);
})

app.get("/api/gender-type", async(req,res) => {
  const genderTypeData = await db
    .select("*")
    .from("gender_type");
  res.status(200).send(genderTypeData);
})

app.get("/api/wc-info", async(req,res) => {
  const wcInfoData = await db
    .select(
      "title", "address", "latitude", "longitude", "created_at",
      "wc_description.comment",
      "pictures.path_name",
      "hygiene_info.name",
      "gender_type.type")
    .from("wc_position")
    .join("wc_description",{"wc_description.wc_pos_id":"wc_position.id"})
    .join("pictures",{"pictures.wc_desc_id":"wc_description.id"})
    .join("hygiene_info",{"hygiene_info.id":"wc_description.hygiene_id"})
    .join("gender_type",{"gender_type.id":"wc_description.gender_type_id"})
  res.status(200).send(wcInfoData);
})

