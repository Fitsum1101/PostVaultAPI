const { truncate } = require("fs");

module.exports = (filepath) => {
  truncate(filepath, (err) => {
    throw err;
  });
};
