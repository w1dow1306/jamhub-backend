const mongoose = require("mongoose");
const config = require("../config/server-config.json");
const userfunc = require("../functions/user");
const User = require("../models/users");
mongoose.connect(config.database.url);

exports.getALLUSERS = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addNEWUSER = async (req, res) => {
  try {
    let usr = req.body;
    await userfunc.olduser(usr).then((e) => {
      if (e == 1) {
        userfunc.adduser(usr).then((id) => {
          res.json({ message: "User added successfully", id: id, code: 1 });
          res.status(200);
        });
      } else {
        res.json({ message: "The user already exists!", code: 3 });
        res.status(409);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "error occured",code:3 });
  }
};

exports.loginUSER = async (req, res) => {
  try {
    let msg = await userfunc.login(req.body);
    if (msg[3]) {
      res.cookie("token", msg[1]);
      res.cookie("username", msg[2]);
    }
    res.json({ message: msg[0], code: msg.pop()});
    res.status(200);
  } catch (err) {
    res.status(500).json({ message: "error occured",code:3 });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("username");
    res.status(200);
    res.send("User logged out");
  } catch (err) {
    res.status(500).json({ message: "error occured",code:3 });
  }
};
