const mysql = require("mysql");
// for the first time run 'npm install'
// Libraries installed: express, nodemon, dotenv
// temporarily libraries: fs

const express = require("express");
const app = express();
const cors = require("cors");

// require("dotenv").config();

// // requests can only come from this domains
// app.use(
//   cors({
//     origin: '*',
//   })
// );

// // Settings up routes, can be found at './routes/'
// app.use("/users", require("./routes/users/get.js"));

// // Starting the server on http://localhost:PORT
// app.listen(process.env.PORT, () =>
//   console.log(`Server Is Up!\nhttp://localhost:${process.env.PORT}`)
// );


// this snippet of code was written to reset the database. it will show on LOCALHOST 5000.

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
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

app.listen('5000', () => {
  console.log('server started on port 5000')
})