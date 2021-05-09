const express = require('express');
const open = require('open');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cityController = require('./controllers/cities.controllers');

const app = express();

const accessTokenSecret = 'youraccesstokensecret';
app.use(cors());
app.use(express.static('docs'));

// create express app
// Setup server port
// const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


// define a root route
// Require employee routes
const citiesRoutes = require('./routes/cities.routes');
// using as middleware
app.use('/api/v1/cities', citiesRoutes);
app.set('port', process.env.PORT || 8000);
app.set('ip', process.env.NODEJS_IP || '127.0.0.1');
app.listen(app.get('port'), () => {
    console.log('%s: Node server started on %s ...', Date(Date.now()), app.get('port'));
    open('http://localhost:8000');
});