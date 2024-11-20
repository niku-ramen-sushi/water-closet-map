# スキーマ

[schema.png](./schema.png) で下記のスキーマを参照してください。

または [dbdiagram](https://dbdiagram.io/d/673d805fe9daa85aca10a250) で確認してください。


```txt
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  id int [pk]
  name varchar(64) [not null]
  email varchar(64) [not null, unique]
  password varchar(64) [not null]
  created_at timestamp [not null]
}

table wc_info {
  id int [pk]
  users_id int
  title varchar(64) [not null]
  address varchar(255) [not null]
  comment text
  hygiene_id int
  created_at timestamp
}

table hygiene_info {
  id int [pk]
  name varchar(64) [not null]
}

table pictures {
  id int [pk]
  wc_id int
  path_name varchar(255)
}

table favorite {
  id int [pk]
  wc_id int
  user_id int
}

Ref: wc_info.hygiene_id > hygiene_info.id [delete: cascade]

Ref: pictures.wc_id > wc_info.id [delete: cascade]

Ref: wc_info.users_id > users.id [delete: cascade]

Ref:favorite.user_id > users.id [delete: cascade]

Ref:favorite.wc_id > wc_info.id [delete: cascade]

```

上記で表現している関係性の記号は下記の通りです。

| 記号   | 関係性 |
| ------ | ------ |
| pk     | 主キー |
| ref: > | 多対一 |
| ref: < | 一対多 |
| ref: - | 一対一 |
