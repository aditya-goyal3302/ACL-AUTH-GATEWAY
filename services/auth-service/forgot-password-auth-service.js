const { BadRequest } = require("../../libs/error");
const AuthService = require("./auth-service");
const mail_service = require("../mail-service");
const { userStatus } = require("../../models/user/user-status");

class ForgotPasswordService extends AuthService {
  constructor({ verification_logs_repository, user_repository }) {
    super({user_repository});
    this.verification_logs_repository = verification_logs_repository;
  }

  execute = async ({ email }) => {
    return await this.user_repository.handleManagedTransaction(async (transaction) => {
      if (!email) throw new BadRequest("Email Required");

      const user = await this.user_repository.findOne({ criteria: { email }, options: { transaction } });

      if (!user) throw new BadRequest("User Not Found!");
      if (user.status !== userStatus.ENUM.ACTIVE) throw new BadRequest("User is not found!");

      const verificationLog = await this.verification_logs_repository.create({
        payload: {
          user_id: user.id,
          email,
          purpose: "reset_password",
          expires_at: new Date(Date.now() + 1000 * 60 * 60 * 2),
          type: "TOKEN",
        },
        options: { transaction },
      });

      const token = verificationLog.uuid;
      const client = process.env.CLIENT_URL;

      await mail_service.mail_reset_link({
        to: user.email,
        subject: "Reset Password Link",
        url: `${client}/reset_password/${token}`,
        name: user.name,
      });

      return { message: "Reset Password Link Sent Successfully" };
    });
  };
}

module.exports = ForgotPasswordService;
