const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const secretKey = "secret";

//===========================> Register Controller <=============================>
function register(req, res) {
  const { name, email, password, isAdmin } = req.body;

  // ========================>    Encrypt Password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    userModel.findUserByEmail(email, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Server Error" });
        return;
      }

      // =================>  Check email exist or not
      if (results.length > 0) {
        res.status(400).json({ error: "email already exists" });
      } else {
        userModel.createUser(
          name,
          email,
          hashedPassword,
          isAdmin,
          (err) => {
            if (err) {
              console.error("Error adding user into database:", err);
              res.status(500).json({ error: "Database error" });
              return;
            }
            res.status(201).json({ message: "Registered successfully" });
          }
        );
      }
    });
  });
}

//===========================> Login Controller <=============================>

function login(req, res) {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          res.status(401).json({ error: "Invalid email or password" });
        } else {
          const accessToken = jwt.sign({ email: user.email }, secretKey);
          res.json({
            token: accessToken,
            isAdmin: user.isAdmin,
            email: user.email,
            name: user.name,
          });
        }
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  });
}

module.exports = {
  register,
  login,
};
