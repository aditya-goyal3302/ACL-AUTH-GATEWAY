const cookieParser = require("cookie-parser");
const express = require("express");

class Parsers {
  cookie_parser = () => cookieParser();

  json_parser = () => express.json();

  url_encoded_parser = () => express.urlencoded({ extended: true });

  static = () => express.static("public");

  static_path = () => ["/uploads/images", express.static("uploads/images")];
}

module.exports = Parsers;
