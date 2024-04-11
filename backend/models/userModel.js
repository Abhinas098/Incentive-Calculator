const db = require("./db");


function createTableIfNotExists(cb) {
  db?.query(
    "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(55), email VARCHAR(255) UNIQUE, password VARCHAR(255), isAdmin BOOLEAN)",
    cb
  );
}

function createUser(name, email, hashedPassword, isAdmin, cb) {
  createTableIfNotExists((err) => {
    if (err) {
      return cb(err);
    }
    db.query(
      "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, isAdmin],
      cb
    );
  });
}
function findUserByEmail(email, cb) {
  createTableIfNotExists((err) => {
    if (err) {
      return cb(err);
    }
    db.query("SELECT * FROM users WHERE email = ?", [email], cb);
  });
}

module.exports = {
  createUser,
  findUserByEmail,
};
