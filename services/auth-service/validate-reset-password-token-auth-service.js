const { BadRequest } = require("../../libs/error");
const { userStatus } = require("../../models/user/user-status");
const AuthService = require("./auth-service");
const { User } = require("../../models");

class ValidateResetPasswordTokenService extends AuthService {
  // constructor({ verification_logs_repository }) {
  //   super();
  //   this.user_repository = user_repository;
  //   this.verification_logs_repository = verification_logs_repository;
  // }
  execute = async ({ token }) => {
    return await this.user_repository.handleManagedTransaction(async (transaction) => {
      if (!token) throw new BadRequest("Token Required");

      const verificationLog = await this.verification_logs_repository.findOne({
        criteria: { uuid: token },
        options: { transaction },
        include: [{ model: User, as: "user_details" }],
      });

      if (!verificationLog) throw new BadRequest("Token Invalid!");
      if (verificationLog.expires_at < new Date()) throw new BadRequest("Token Expired!");

      const user = verificationLog.user_details;

      if (!user) throw new BadRequest("User Not Found!");
      if (user.status !== userStatus.ENUM.ACTIVE) throw new BadRequest("User is not found!");

      if (user.email !== verificationLog.email) throw new BadRequest("Email Mismatch!");

      return { message: "Token Verified Successfully" };
    });
  };
}

module.exports = ValidateResetPasswordTokenService;
