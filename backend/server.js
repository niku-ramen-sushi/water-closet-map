const express = require('express');
const path = require('path');
const app = express();

// `dist`を静的ファイルとして提供
app.use(express.static(path.join(__dirname, '../frontend/dist')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});