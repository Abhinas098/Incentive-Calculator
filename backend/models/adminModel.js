const db = require("./db");

function checkTable(cb) {
  db.query(
    "CREATE TABLE IF NOT EXISTS holyday_packages (id INT AUTO_INCREMENT PRIMARY KEY, holiday_name VARCHAR(255) NOT NULL, duration_nights INT NOT NULL, destination VARCHAR(255) NOT NULL, location VARCHAR(255), amenities TEXT)",
    cb
  );
}

function getAllPackages(cb) {
  checkTable((err) => {
    if (err) {
      return cb(err);
    }
    db.query("SELECT * FROM holyday_packages", cb);
  });
}

function postPackages(
  { holiday_name, duration_nights, destination, location, amenities },
  cb
) {
  checkTable((err) => {
    if (err) {
      return cb(err);
    }
    db.query(
      "INSERT INTO holyday_packages (holiday_name, duration_nights, destination, location, amenities) VALUES (?, ?, ?, ?, ?) ",
      [holiday_name, duration_nights, destination, location, amenities],
      cb
    );
  });
}

function updatePackageById(
  { holiday_name, duration_nights, destination, location, amenities },
  id,
  cb
) {
  checkTable((err) => {
    if (err) {
      return cb(err);
    }
    db.query(
      "UPDATE holyday_packages SET holiday_name=?, duration_nights=?, destination=?, location=?, amenities=? WHERE id = ?",
      [holiday_name, duration_nights, destination, location, amenities, id],
      cb
    );
  });
}

function deletePackageById(id, cb) {
  checkTable((err) => {
    if (err) {
      return cb(err);
    }
    db.query("DELETE FROM holyday_packages  WHERE id =?", [id], cb);
  });
}

module.exports = {
  getAllPackages,
  postPackages,
  updatePackageById,
  deletePackageById,
};
