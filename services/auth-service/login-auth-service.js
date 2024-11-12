const AuthService = require("./auth-service");
const { send_OTP } = require("../otp-service");
const { BadRequest } = require("../../libs/error");
const { userStatus } = require("../../models/user/user-status");

class LoginService extends AuthService {
  execute = async ({ email, password }) => {
    return await this.user_repository.handleManagedTransaction(async (transaction) => {
      if (!email) throw new BadRequest("Email Required");
      if (!password) throw new BadRequest("Password Required");

      const user = await this.user_repository.find_and_compare_password({
        criteria: { email, password },
        options: { transaction },
      });

      if (user.status !== userStatus.ENUM.ACTIVE) throw new BadRequest("User Blocked");

      if (user.is_two_step_verification_enabled) {
        await send_OTP({ email, purpose: "login", user });
        return { message: "OTP Sent Successfully" };
      } else {
        return this.gen_response_with_token(user);
      }
    });
  };
}

module.exports = LoginService;
