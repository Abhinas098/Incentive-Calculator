const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to  database:', err);
    return;
  }
  console.log('connected db');
  
  // --------------------------।Check  if  database exists 
  db.query("CREATE DATABASE IF NOT EXISTS incentive_calculator", (err) => {
    if (err) {
      console.error('Error in  database creation', err);
      return;
    }

    // ----------------> If exist use 
    db.query("USE incentive_calculator", (err) => {
      if (err) {
        console.error('Error in database:', err);
        return;
      } 

    });
  });
});
module.exports = db;