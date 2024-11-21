# スキーマ

[schema.png](./schema.png) で下記のスキーマを参照してください。

または [dbdiagram](https://dbdiagram.io/d/673d805fe9daa85aca10a250) で確認してください。


```txt
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

//Users
Table users {
  id int [pk] 
  name varchar(64) [not null]
  gender varchar(1)
  email varchar(64) [not null, unique]
  password varchar(64) [not null]
  created_at timestamp [not null]
  latitude decimal
  longitude decimal
}

//wc info
table wc_position {
  id int [pk]
  user_id int
  title varchar(64) [not null]
  address varchar(255)
  latitude doubleprecision [not null]
  longitude doubleprecision [not null]
  comment text
  created_at timestamp
}

table wc_description {
  id int [pk]
  hygiene_id int
  wc_pos_id int
  gender_type_id int

}

//
table hygiene_info {
  id int [pk]
  name varchar(64)

}

table pictures {
  id int [pk]
  wc_desc_id int
  path_name varchar(255)
}

table favorite {
  id int [pk]
  wc_id int
  user_id int
}

table gender_type {
  id int [pk]
  type varchar(8)
}

Ref: wc_description.wc_pos_id > wc_position.id [delete: cascade]

Ref: wc_description.hygiene_id > hygiene_info.id [delete: cascade]

Ref: wc_description.gender_type_id > gender_type.id [delete: cascade]

Ref: wc_position.user_id > users.id [delete: cascade]

Ref:favorite.user_id > users.id [delete: cascade]

Ref:favorite.wc_id > wc_position.id [delete: cascade]

Ref: pictures.wc_desc_id > wc_description.id [delete: cascade]

```

上記で表現している関係性の記号は下記の通りです。

| 記号   | 関係性 |
| ------ | ------ |
| pk     | 主キー |
| ref: > | 多対一 |
| ref: < | 一対多 |
| ref: - | 一対一 |
