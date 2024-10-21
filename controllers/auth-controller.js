const { CREATED, SUCCESS } = require("../libs/constants");
const { auth_service } = require("../services/index");

exports.signup = async (req, res, next) => {
  try {
    const result = await auth_service.signup(req.body);
    res.status(CREATED).send(result);
  } catch (error) {
    console.log("error_in_signup: ", error);
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await auth_service.login(req.body);
    res.status(SUCCESS).send(result);
  } catch (error) {
    console.log("error_in_login: ", error);
    return next(error);
  }
};

exports.verify_login = async (req, res, next) => {
  try {
    const result = await auth_service.verify_login(req.body);
    res.status(SUCCESS).send(result);
  } catch (error) {
    console.log("error_in_verify_login: ", error);
    return next(error);
  }
}

exports.forgot_password = async (req, res, next) => {
  try {
    const result = await auth_service.forgot_password(req.body);
    res.status(SUCCESS).send(result);
  } catch (error) {
    console.log("error_in_forgot_password: ", error);
    return next(error);
  }
}

exports.reset_password = async (req, res, next) => {
  try {
    const result = await auth_service.reset_password(req.body, req.params);
    res.status(SUCCESS).send(result);
  } catch (error) {
    console.log("error_in_reset_password: ", error);
    return next(error);
  }
}

exports.verify_reset_token = async (req, res, next) => {
  try {
    const result = await auth_service.verify_reset_token(req.params);
    res.status(SUCCESS).send(result);
  } catch (error) {
    console.log("error_in_verify_token: ", error);
    return next(error);
  }
}

exports.change_password = async (req, res, next) => {
  try {
    const result = await auth_service.change_password(req.body);
    res.status(SUCCESS).send(result);
  } catch (error) {
    console.log("error_in_change_password: ", error);
    return next(error);
  }
}
