const firebase = require('firebase');
const { firebase: config } = require('../config');

firebase.initializeApp(config);

module.exports = firebase.database();
