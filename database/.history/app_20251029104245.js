var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
require("./db");

process.env.DB_HOST;

var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var productRouter = require("./routes/products");
var authRouter = require("./routes/auth");
var cartRouter = require("./routes/cart");
var orderRouter = require("./routes/orders");

var app = express();
app.use(cors());
app.use("/product-images", express.static("uploads/products"));
app.use("/e-slips", express.static("uploads/e-slips"));
app.use(express.urlencoded({ extended: false }));

app.use("/product-images", express.static("uploads/products"));
app.use("/slip-images", exp)

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
