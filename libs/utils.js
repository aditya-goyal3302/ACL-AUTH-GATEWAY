const jwt = require("jsonwebtoken");
const { BAD_REQUEST, NOT_FOUND, NO_CONTENT, CONFLICT, INTERNAL_SERVER_ERROR, UNAUTHORIZED, FORBIDDEN } = require("./constants");
const { BadRequest, Conflict, Forbidden, InternalServerError, NoContent, NotFound, Unauthorized } = require("./error");
const { Sequelize } = require("sequelize");

exports.verify_token = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

exports.create_token = async (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.error_handler = (error) => {
  switch (true) {
    case error instanceof Sequelize.ValidationError:
      error.message = get_error_message(error);
      return BAD_REQUEST;
    case error instanceof BadRequest:
      return BAD_REQUEST;
    case error instanceof NotFound:
      return NOT_FOUND;
    case error instanceof NoContent:
      return NO_CONTENT;
    case error instanceof Conflict:
      return CONFLICT;
    case error instanceof InternalServerError:
      return INTERNAL_SERVER_ERROR;
    case error instanceof Unauthorized:
      return UNAUTHORIZED;
    case error instanceof Forbidden:
      return FORBIDDEN;
    default:
      return INTERNAL_SERVER_ERROR;
  }
};

const get_error_message = (error) => {
  const error_messages = error.errors.map((err) => err.message);
  return error_messages.join(", ");
};
