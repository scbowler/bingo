const express = require('express');
const { resolve } = require('path');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.static(resolve(__dirname, 'client', 'dist')));

require('./routes')(app);

app.listen(PORT, () => {
    console.log('Server Running on Port:', PORT);
}).on('error', (err) => {
    console.log('Server Error:', err.message);
});
