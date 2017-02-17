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
    getUsers(null, (err, users) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json(users);
    });
});
    
app.post('/users', (req, res) => {
    console.log(req);
});

app.get('/users?email=:email', (req, res) => {
    getUsers(req.params.email, (err, users) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json(users);
    });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running on port ${app.get('port')}`);
});

function getUsers (email, callback) {
    let query = 'SELECT * from users';
    if (email) {
        query += ` WHERE email = \'${email}\'`; 
    }
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
