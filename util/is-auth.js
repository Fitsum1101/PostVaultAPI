const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization"); // Ensure case sensitivity matches
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const isValid = jwt.verify(token, "mysecretkeyformyrpoject"); // Fixed the typo in "myproject"
    req.user = isValid;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
