const { BadRequest } = require("../../libs/error");
const { userStatus } = require("../../models/user/user-status");
const { verify_OTP } = require("../otp-service");
const AuthService = require("./auth-service");

class ValidateTwoStepAuthService extends AuthService {
  execute = async ({ email, otp }) => {
    return await this.user_repository.handleManagedTransaction(async (transaction) => {
      if (!email) throw new BadRequest("Email Required");
      if (!otp) throw new BadRequest("OTP Required");

      const verification = await verify_OTP({ email, otp, purpose: "login" });
      if (!verification) throw new BadRequest("Invalid OTP");

      if (verification.user_details.status !== userStatus.ENUM.ACTIVE) throw new BadRequest("User Not Found");
      if (verification.expires_at < new Date()) throw new BadRequest("OTP Expired");

      return this.gen_response_with_token(verification.user_details);
    });
  };
}

module.exports = ValidateTwoStepAuthService;
