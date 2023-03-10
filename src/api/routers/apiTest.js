const express = require("express");
const router = express.Router();
const apiTest = require("../controls/apiTest");

//Router
router.get("/test", (req, res) => apiTest.get(req, res, router.client));

module.exports = router;
