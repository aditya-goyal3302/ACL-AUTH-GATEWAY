const router = require("express").Router();
const { auth_controller } = require("../controllers");
const { auth_middleware } = require("../middlewares");

router.post("/signup", auth_controller.signup);
router.post("/login", auth_controller.login);
router.post("/login/verify", auth_controller.verify_login);

router.post("/forgot-password", auth_controller.forgot_password);
router.get("/reset-password/:token", auth_controller.verify_reset_token);
router.post("/reset-password/:token", auth_controller.reset_password);

router.post("/change-password", auth_middleware.verify_auth, auth_controller.change_password);

module.exports = router;
