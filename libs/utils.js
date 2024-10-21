const jwt = require("jsonwebtoken");
const { BAD_REQUEST, NOT_FOUND, NO_CONTENT, CONFLICT, INTERNAL_SERVER_ERROR, UNAUTHORIZED, FORBIDDEN } = require("./constants");
const { bad_request, not_found, no_content, conflict, internal_server_error, unauthorized, forbidden } = require("./error");
const { Sequelize } = require("sequelize");
exports.verify_token = token => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

exports.create_token = async data => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.error_handler = error => {
  switch (true) {
    case error instanceof Sequelize.ValidationError:
      error.message = get_error_message(error);
      return BAD_REQUEST;
    case error instanceof bad_request:
      return BAD_REQUEST;
    case error instanceof not_found:
      return NOT_FOUND;
    case error instanceof no_content:
      return NO_CONTENT;
    case error instanceof conflict:
      return CONFLICT;
    case error instanceof internal_server_error:
      return INTERNAL_SERVER_ERROR;
    case error instanceof unauthorized:
      return UNAUTHORIZED;
    case error instanceof forbidden:
      return FORBIDDEN;
    default:
      return INTERNAL_SERVER_ERROR;
  }
};

const get_error_message = error => {
  const error_messages = error.errors.map(err => err.message);
  return error_messages.join(", ");
};
