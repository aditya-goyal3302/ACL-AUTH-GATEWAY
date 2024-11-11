const router = require("express").Router();
const { auth_controller } = require("../controllers");
const { auth_middleware } = require("../middlewares");

router
  .post("/login", (req, res, next) => auth_controller.resolve("login").handle_request(req, res, next))
  .post("/register", (req, res, next) => auth_controller.resolve("register").handle_request(req, res, next))
  .post("/login/verify", (req, res, next) =>
    auth_controller.resolve("validate_two_step_auth").handle_request(req, res, next)
  )

  .post("/forgot-password", (req, res, next) =>
    auth_controller.resolve("forgot_password").handle_request(req, res, next)
  )
  .get("/reset-password/:token", (req, res, next) =>
    auth_controller.resolve("validate_reset_password_token").handle_request(req, res, next)
  )
  .post("/reset-password/:token", (req, res, next) =>
    auth_controller.resolve("reset_password").handle_request(req, res, next)
  )

  .post("/change-password", auth_middleware.verify_auth, (req, res, next) =>
    auth_controller.resolve("change_password").handle_request(req, res, next)
  );

module.exports = router;
