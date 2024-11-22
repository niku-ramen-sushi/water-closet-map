const express = require('express');
const path = require('path');
const app = express();

// 静的ファイルの配信
console.log(`👻👻👻👻👻 staticを開始`);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

// 環境変数の確認
console.log(`👻👻👻👻👻 Running in ${process.env.NODE_ENV} mode`);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});