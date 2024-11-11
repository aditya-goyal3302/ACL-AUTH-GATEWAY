const { createContainer, asClass } = require("awilix");

const user_controller_container = createContainer();

user_controller_container.register({
  get_user_details: asClass(require("./get-user-details-controller")).scoped(),
  patch_user_details: asClass(require("./patch-user-details-controller")).scoped(),
  set_user_image: asClass(require("./set-user-image-controller")).scoped(),
  remove_user_image: asClass(require("./remove-user-image-controller")).scoped(),
});

module.exports = user_controller_container;
