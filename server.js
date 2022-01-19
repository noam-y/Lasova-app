const mysql = require("mysql");
// for the first time run 'npm install'
// Libraries installed: express, nodemon, dotenv
// temporarily libraries: fs

const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

// requests can only come from this domains
app.use(
  cors({
    origin: '*',
  })
);

// Settings up routes, can be found at './routes/'
app.use("/users", require("./routes/users/get.js"));

// Starting the server on http://localhost:PORT
app.listen(process.env.PORT, () =>
  console.log(`Server Is Up!\nhttp://localhost:${process.env.PORT}`)
);


// this snippet of code was written to reset the database. it will show on LOCALHOST 5000.

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lasovadb"
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql CONNECTED");
});

// creating the db on localhost:5000/createdb
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE lasovadb";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Database created");
  });
});

app.get('/createvolunteertable', (req,res) =>{
  
  // for reference- https://www.w3schools.com/sql/sql_datatypes.asp 
  let sql = 'CREATE TABLE volunteers(id int AUTO_INCREMENT, taz VARCHAR(10) NOT NULL UNIQUE, first_name VARCHAR(15), last_name VARCHAR(25), police_certification BOOL DEFAULT FALSE, other_certications BOOL DEFAULT FALSE, cellphone VARCHAR(11) NOT NULL UNIQUE, email VARCHAR(40) NOT NULL UNIQUE, home_adress VARCHAR(100), volunteer_type INT DEFAULT 0, year_joined YEAR DEFAULT 2022, gender int DEFAULT 0, PRIMARY KEY(id))'
  db.query(sql, err => {
    if(err){
      throw err
    }
    res.send('volunteers table CREATED.')
  })
})


// this function is used to illustrate how you can create a volunteer.
app.get('/newvolunteer', (req,res) => {
  let post = {taz: "322476004", first_name: "סהר", last_name: "כהן", cellphone: "0524781006", email: "yulfs53@lasova.com", home_adress:"356 street apt 22", volunteer_type: "2", year_joined:"2018", gender:"1"}
  let sql = 'INSERT INTO volunteers SET ?'
  let query = db.query(sql, post, err =>{
    if(err) {
      throw err
    }
    res.send("Volunteer added!")
  })
})

// this query gets all volunteers inside table of volunteers
app.get('/volunteers', (req,res) => {
  let sql = 'SELECT * FROM volunteers'
  let query = db.query(sql, (err, results) =>{
    if(err) {
      throw err
    }
    console.log('volunteers extracted from sql server successfuly')
    console.log(results) 
    res.send(results)
  })
})

// this query gets volunteer by taz. for example http://localhost:5000/volunteers/308786284
// if no volunteer appear, it will return null
app.get('/volunteers/:taz', (req,res) => {
  let sql = `SELECT * FROM volunteers WHERE volunteers.taz = ${req.params.taz}`
  let query = db.query(sql, (err, results) =>{
    if(err) {
      throw err
    }
    console.log('volunteer with id=1 is presented')
    console.log(results)
    res.send(results)
  })
})


// FOR YOUR REFERENCE ONLY- HERES A READABLE EXAMPLE OF USER ON A JSON FORMAT
// "group_name": "מסעדת ת\"א",
// "birth": "23.11.99",
// "gender": "0/1/2", 1= unknown. 1= male 2=female 
// "police_certification": "TRUE",
// "other_documents": "FALSE",
// "cellphone": "0547371762",
// "email": "אין",
// "home_adress": "יד אליהו", 
// "city": "תל אביב",
// "volunteer_type": "הגשת מזון", in the future we will count these inside categories. 1- giving food, 2- driving, 3 etc
// "scholarship": "אימפקט", // NOT INCLUDED ON CURRENT TABLE 
// "year_joined": "ראשונה",
// "weekday_available": "טרם נקבע יום קבוע" // NOT INCLUDED ON CURRENT TABLE 

app.listen('5000', () => {
  console.log('server started on port 5000')
})


// "CREATE TABLE Volunteers (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	first_name VARCHAR(255) NOT NULL,
// 	last_name VARCHAR(255) NOT NULL,
// 	phone_number VARCHAR(10) NOT NULL UNIQUE,
// 	email VARCHAR(25) NOT NULL UNIQUE,
// 	gender INT(1) NOT NULL DEFAULT 0,
// 	role INT NOT NULL DEFAULT 0,
// 	police_certification BINARY NOT NULL DEFAULT FALSE,
// 	other_certications BOOLEAN NOT NULL DEFAULT FALSE,
// 	date_of_birth DATETIME,
// 	city VARCHAR(255) NOT NULL,
// 	home_adress VARCHAR(255) NOT NULL,
// 	group_id INT,
// 	role_id INT NOT NULL DEFAULT 0,
// 	year_joined DATETIME(4) NOT NULL DEFAULT 2022,
// 	PRIMARY KEY (id)
// );"