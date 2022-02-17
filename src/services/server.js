const express = require('express');
const config = require('./config');
const db = require('./db');

console.log(config.api_url);

module.exports = {
    app: () => {
        const application = express();
        console.log('Connecting to MySQL Database.')
        console.log(config.mysql.host);
        db.connect(db.MODE_TEST, function(err) {
            if (err) {
            console.log('Unable to connect to MySQL.')
            process.exit(1)
            } else {
                console.log('Success on connecting database.')
            }
        })

        return application;
    }
}