const { createContainer, asClass } = require("awilix");

const auth_controller_container = createContainer();

auth_controller_container.register({
  login: asClass(require("./login-controller")).scoped(),
  register: asClass(require("./register-controller")).scoped(),
  forgot_password: asClass(require("./forgot-password-controller")).scoped(),
  reset_password: asClass(require("./reset-password-controller")).scoped(),
  change_password: asClass(require("./change-password-controller")).scoped(),
  validate_reset_password_token: asClass(require("./validate-reset-password-token-controller")).scoped(),
  validate_two_step_auth: asClass(require("./validate-two-step-controller")).scoped(),
});

module.exports = auth_controller_container;
