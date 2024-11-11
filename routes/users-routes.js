const router = require("express").Router();
const { user_controller } = require("../controllers");
const { auth_middleware } = require("../middlewares");

router
  .use(auth_middleware.verify_auth)
  .get("/", (req, res, next) => user_controller.resolve("get_user_details").handle_request(req, res, next)) // to get user details by user himself
  .patch("/", (req, res, next) => user_controller.resolve("patch_user_details").handle_request(req, res, next)) // to set details of users
  .patch("/image", (req, res, next) => user_controller.resolve("set_user_image").handle_request(req, res, next))
  .delete("/image", (req, res, next) => user_controller.resolve("remove_user_image").handle_request(req, res, next));

module.exports = router;
