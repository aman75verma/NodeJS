const fs = require("fs")
function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `\n${new Date.toLocaleString()}: ${req.ip} ${req.method} : ${req.path}\n`,
      (err) => {
        if (err) console.error("Log write failed:", err);
        next();
      }
    );
  };
}

module.exports = {
    logReqRes
}