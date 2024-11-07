const { verification_logs_repository } = require("../repositories");
const { mail_verification_OTP } = require("./mail-service");
const { User } = require("../models");
const { userStatus } = require("../models/user/user-status");

exports.send_OTP = async ({ email, purpose, user }) => {
  return await verification_logs_repository.handleManagedTransaction(async (transaction) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("otp: ", otp);
    await verification_logs_repository.create({
      payload: {
        email,
        otp,
        type: "OTP",
        purpose,
        expires_at: new Date(Date.now() + 1000 * 60 * 10),
        user_id: user.id,
      },
      options: { transaction },
    });
    return await mail_verification_OTP({
      to: email,
      subject: "OTP for Verification",
      otp,
    });
  });
};

exports.verify_OTP = async ({ email, otp, purpose }) => {
  return await verification_logs_repository.handleManagedTransaction(async (transaction) => {
    const verification = await verification_logs_repository.findOne({
      criteria: { email, otp, type: "OTP", purpose },
      options: { transaction },
      include: [{ model: User, as: "user_details" }],
    });

    if (!verification) throw new Error("Invalid OTP");
    if (verification.user_details.status !== userStatus.ENUM.ACTIVE) throw new Error("User Not Found");
    if (verification.expires_at < new Date()) throw new Error("OTP Expired");
    await verification_logs_repository.update({
      payload: { used_at: new Date() },
      criteria: { id: verification.id },
      options: { transaction },
    });
    return verification;
  });
};
