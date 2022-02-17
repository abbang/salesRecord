var mysql = require('mysql');
const config = require('./config');

var state = {
    pool: null,
    mode: null
}

exports.connect = (mode, done) => {
    state.pool = mysql.createPool({
        host: config.mysql.host,
        user: config.mysql.username,
        password: config.mysql.password,
        database: config.mysql.database
    });

    state.mode = mode;
    done();
}

exports.get = () => {
    return state.pool;
}