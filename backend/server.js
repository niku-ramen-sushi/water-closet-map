const express = require('express');
const app = express();

app.use(express.static(__dirname, '../frontend/dist'));

// 環境変数の確認
console.log(`👻👻👻👻👻 Running in ${process.env.NODE_ENV} mode`);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});