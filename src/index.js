const express = require('express')
var my_sql = require('mysql2')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
const conn = require('./config/db')
const port = 3000
const nf = require('./middleware/notFound.js')


//var sql = `INSERT INTO user(email,password,name,firstname) VALUES('jeancharle@test.eu','1234', 'jean', 'charle')`;

conn.connect(function(err) {
    if (err) {
        console.log(err)
        return;
    }
    console.log("connected to db!")
});

function main() {
    app.use(express.json())
  // app.use(body.json)*
    // support parsing of application/json type post data
    app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/register', require('./routes/auth/auth'))
    app.use('/login', require('./routes/login/login'))
    app.use('/user', require('./routes/user/user'))
    app.use('/todo', require('./routes/todos/todos'))
    app.use(nf);
    app.listen(port, function() {
        console.info("sever starts on " + port);
    })
};

main()
