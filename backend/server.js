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

