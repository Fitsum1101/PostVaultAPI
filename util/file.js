const { unlink } = require("fs");

module.exports = (filepath) => {
  unlink(filepath, (err) => {
    if (err) throw err;
  });
};
