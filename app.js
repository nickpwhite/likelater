'use strict';

const express = require('express');
const pg = require('pg');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/users', (req, res) => {
    getUsers((err, users) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(users);
    });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running on port ${app.get('port')}`);
});

getUsers = function (callback) {
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        client.query('SELECT * from users', (err, result) => {
            done(); // releases the client back to the pool

            if (err) {
                console.error(err);
                return callback(err);
            }
            return callback(null, result);
        });
    });
};
