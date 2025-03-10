const jst = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.get("authorization");
    try {
        const isValid = jst.verify()
    } catch (error) {
        
    }
};
