const mongoose = require("mongoose");
async function connectDb(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("Mongoose Connected"))
    .catch((error) => console.console.error(err));
}

module.exports = {connectDb};