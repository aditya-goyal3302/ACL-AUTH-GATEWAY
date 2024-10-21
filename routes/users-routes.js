const router = require("express").Router();
const { user_controller } = require("../controllers");
const { auth_middleware } = require("../middlewares");

router
  .use(auth_middleware.verify_auth)
  .get("/", user_controller.get_user_details) // to get user details by user himself
  .patch("/", user_controller.patch_user_details) // to set details of users
  .patch("/image", user_controller.set_user_image)
  .delete("/image", user_controller.delete_user_image)

  .use((req, res, next) => {
    req.access_required = 3;
    next();
  })
  .put("/:user_id", auth_middleware.checkpoint, user_controller.set_user_active) // to set status active of users
  .get("/users", auth_middleware.checkpoint, user_controller.get_all_user_for_admin) //admin access to fetch all users

  .use((req, res, next) => {
    req.access_required = 1;
    next();
  })
  .delete("/", auth_middleware.checkpoint, user_controller.set_user_inactive); // to set status inactive of users

module.exports = router;
