const { role_service } = require("../services");

exports.get_roles = async (req, res, next) => {
  try {
    const roles = await role_service.get_roles();
    res.status(200).json(roles);
  } catch (err) {
    return next(err);
  }
}