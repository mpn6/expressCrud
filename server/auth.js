const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const accessTokenSecret = 'youraccesstokensecret';


app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
});

const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];
app.use(bodyParser.json());

