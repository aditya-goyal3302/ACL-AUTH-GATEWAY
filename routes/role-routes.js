const router = require("express").Router();
const { role_controller } = require("../controllers");

router.get("/", role_controller.get_roles);

module.exports = router;