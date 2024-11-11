const express = require("express");
const { SUCCESS } = require("../libs/constants");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(SUCCESS).send("ACL-AUTH-GATEWAY Service 1.0.0");
});

router.use('/user', require('./users-routes'));
router.use("/auth", require("./auth-routes"));

module.exports = router;
