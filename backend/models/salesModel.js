const db = require("./db");

function createTableIfNotExists(cb) {
  db.query(
    "CREATE TABLE IF NOT EXISTS sales (id INT AUTO_INCREMENT PRIMARY KEY, totalSales INT, user_id VARCHAR(255))",
    cb
  );
}

function createSales(totalSales, userId, cb) {
  createTableIfNotExists((err) => {
    if (err) {
      return cb(err); 
    }
    db.query(
      "INSERT INTO sales (totalSales, user_id) VALUES (?, ?)",
      [totalSales, userId], 
      cb
    );
  });
}

function getSalesByUserId(userId, cb) {
  createTableIfNotExists((err) => {
    if (err) {
      return cb(err); 
    }
    db.query("SELECT * FROM sales WHERE user_id = ?", [userId], cb);
  });
}

function updateSalesById(totalSales, id, cb) {
  createTableIfNotExists((err) => {
    if (err) {
      return cb(err); 
    }

    db.query(
      "UPDATE sales SET totalSales = ? WHERE user_id  = ?",
      [totalSales, id],
      cb
    );
  });
}


module.exports = {
  createSales,
  getSalesByUserId,
  updateSalesById,
};
