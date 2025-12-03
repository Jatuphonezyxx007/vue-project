var express = require("express");
var router = express.Router();
var productSchema = require("../models/product.model");
const multer = require("multer");
const verifyToken = require("../middleware/token.middleware");
const authorizeRoles = require("../middleware/role.middleware");