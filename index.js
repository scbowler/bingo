const express = require('express');
const PORT = process.env.PORT || 9000;

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Server Up!</h1>');
});

app.listen(PORT, () => {
    console.log('Server Running on Port:', PORT);
}).on('error', (err) => {
    console.log('Server Error:', err.message);
});
