var express = require("express");
var router = express.Router();
var userSchema = require("../models/user.model");
const { Query } = require("mongoose");
// const multer = require("multer");

// All Users
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  async function (req, res, next) {
    try {
      let users = await userSchema.find({});
      res.send(users);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

module.exports = router;
