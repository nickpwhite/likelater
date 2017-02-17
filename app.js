'use strict';

const body_parser = require('body-parser');
const express = require('express');
const pg = require('pg');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(body_parser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/users', (req, res) => {
    getUsers(req.query.email, (err, users) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json(users);
    });
});
    
app.post('/users', (req, res) => {
    console.log(req.body);
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running on port ${app.get('port')}`);
});

function getUsers (email, callback) {
    console.log(email);
    let query = 'SELECT * from users';
    if (email) {
        query += ` WHERE email = \'${email}\'`; 
    }
    console.log(query);
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        client.query(query, (err, result) => {
            done(); // releases the client back to the pool

            if (err) {
                console.error(err);
                return callback(err);
            }
            return callback(null, result.rows);
        });
    });
};
