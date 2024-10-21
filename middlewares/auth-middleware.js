const { utils } = require("../libs");
const { unauthorized, forbidden } = require("../libs/error");
const { acl_repository } = require("../repositories");

exports.verify_auth = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log('token: ', token);
  if (!token) {
    return res.status(401).send({ code: 401, message: "Unauthorized" });
  }
  try {
    const decode_token = utils.verify_token(token);
    // console.log('decode_token: ', decode_token);
    req.body.user = decode_token;
    next();
  } catch (err) {
    console.log("err_in_auth_verify: ", err);
    throw new unauthorized("Unauthorized");
  }
};
exports.checkpoint = async (req, res, next) => {
  const { role } = req.body.user;
  const { access_required } = req;
  const response = await acl_repository.findOne({
    criteria: {
      uuid: role.uuid,
    },
  });
  if (response.toJSON().access.includes(access_required)) {
    return next();
  } else {
    return next(new forbidden("Forbidden"));
  }
};
