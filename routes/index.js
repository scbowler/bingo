const { resolve } = require('path');

module.exports = app => {
    require('./api')(app);
    require('./game')(app);

    app.get('/', (req, res) => {
        res.sendFile(resolve(__dirname, '..', 'client', 'dist', 'index.html'));
    });
}
