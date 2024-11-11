const { error_handler } = require("../libs").utils;

class ErrorMiddleware {
  handle_error(err, req, res, next) {
    console.error(err.message);
    res.status(error_handler(err)).send(err.message);
  }
}

module.exports = ErrorMiddleware;
