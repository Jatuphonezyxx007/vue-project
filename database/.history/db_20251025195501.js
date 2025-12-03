const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${process.DB_HOST}:${process_}`)
}
