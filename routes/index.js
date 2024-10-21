const express = require("express");
const { acl_model } = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("you are in the root route of the server.");
});

router.use('/user', require('./users-routes'));
router.use("/auth", require("./auth-routes"));
router.use('/role',require('./role-routes'))
// router.use('',require('./-routes'))
// router.use('',require('./-routes'))
router.get("/acl", async (req,res)=>{
  try {
    const response = await acl_model.find({}, null, { select: 'title _id' })
    res.status(200).send(response)
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send(error)
  }
});

module.exports = router;
