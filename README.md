### 開発メモ


# W.C. (Water Closet)

公共トイレをナビゲートするモバイルアプリケーション

## 概要

W.C.は、ユーザーが清潔で使いやすい公共トイレを素早く見つけることができるナビゲーションサービスです。実際のユーザーレビューをもとに、街中での移動時に「今すぐトイレに行きたい」というニーズに応えます。

## 主な機能

- Google Mapsと連携した周辺トイレのリアルタイム検索
- トイレの清潔さ、設備などの5段階評価システム
- 写真付きユーザーレビュー機能
- 直感的なUI/UXによる最小限の操作での情報アクセス

## 使用技術

- **フロントエンド**
    - Jotai (状態管理)
    - YamadaUI (UIコンポーネント)
    - Google Maps API
        - 位置情報の取得と表示

- **バックエンド**
    - Passport.js（認証システム）



## インストール方法

```bash
npm run build

npm run start
```

## 環境構築

1. 必要な環境変数の設定（env.sampleを参考に設定してください）
2. Google Maps APIキーの取得と設定
3. データベースの準備（PostgreSQLで準備してください）

