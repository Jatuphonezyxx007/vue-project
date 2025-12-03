// const mongoose = require("mongoose");

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(
//     `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
//   );
//   console.log("Connect DataBase Successfully!");
// }
// db.js
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  // แก้ไขบรรทัดนี้ โดยเติม ?replicaSet=rs0 ต่อท้าย
  await mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?replicaSet=rs0`
  );

  console.log("Connect DataBase Successfully!");
}
