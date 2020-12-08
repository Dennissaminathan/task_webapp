'use strict';

//const express = require('express');
const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyparser.json());

// Constants
//const PORT = 8080;
//const HOST = '0.0.0.0';

//MySQL details
var mysqlConnection = mysql.createConnection({
host: process.env.MYSQL_SERVICE_NAME ,
user: process.env.MYSQL_USER || '',
password: process.env.MYSQL_ROOT_PASSWORD || '',
database: 'mydb',
multipleStatements: true
});

mysqlConnection.connect((err)=> {
if(!err)
console.log('Connection Established Successfully');
else
console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});
//MYSQL DB Creation
mysqlConnection.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
    console.log("Database created");
  });
//MYSQL TABLE creation
mysqlConnection.query("CREATE TABLE IF NOT EXISTS mydb.mytable (sno INT NOT NULL, strings VARCHAR(40) NOT NULL, PRIMARY KEY ( sno ))", function (err, result) {
    console.log("Table created");
  });
//MYSQL insert data
mysqlConnection.query("INSERT IGNORE INTO mydb.mytable (sno, strings) VALUES (1, 'HelloWorld');", function (err, result) {
    console.log("Data Populated");
  });

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/data' , (req, res) => {
mysqlConnection.query('SELECT strings FROM my_table WHERE sno=1', (err, rows, fields) => {
if (!err)
res.send(rows[0].strings);
else
console.log(err);
})
} );

