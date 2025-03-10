const express = require("express");

const postControlles = require("../controllers/post");

const router = express.Router();

router.post('/posts',postControlles)

module.exports = router.promise();
