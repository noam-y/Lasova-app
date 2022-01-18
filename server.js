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

app.get('/createVolunteer', (req,res) =>{
  
  // for reference- https://www.w3schools.com/sql/sql_datatypes.asp 
  let sql = 'CREATE TABLE volunteers(id int AUTO_INCREMENT, taz VARCHAR(10), first_name VARCHAR(15), last_name VARCHAR(25), police_certification BOOL, other_certications BOOL, cellphone VARCHAR(11), email VARCHAR(40), home_adress VARCHAR(100), volunteer_type INT, year_joined YEAR, gender int, PRIMARY KEY(id))'
  db.query(sql, err => {
    if(err){
      throw err
    }
    res.send('volunteers table CREATED.')
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