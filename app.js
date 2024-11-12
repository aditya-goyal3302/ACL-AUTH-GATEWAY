require("dotenv").config();
const { createContainer, asClass, asValue } = require("awilix");
const container = createContainer();

class Server {
  constructor({ root_router, error_middleware, parsers, app }) {
    this.app = app;
    this.root_router = root_router;
    this.error_middleware = error_middleware;
    this.parsers = parsers;
  }

  setup_middlewares = () => {
    this.app.use(this.parsers.json_parser());
    this.app.use(this.parsers.cookie_parser());
    this.app.use(this.parsers.url_encoded_parser());
    this.app.use(this.parsers.static());
    this.app.use(...this.parsers.static_path());
  };

  setup_routes = () => {
    this.app.use(this.root_router.router);
  };

  setup_error_handlers = () => {
    this.app.use(this.error_middleware.handle_error);
    this.app.use(this.error_middleware.handle_not_found);
    this.error_middleware.handle_uncaught_error();
  };

  run_engine = () => {
    this.setup_middlewares();
    this.setup_routes();
    this.setup_error_handlers();

    this.app.listen(process.env.PORT, () => console.log(`Server Up and running on port ${process.env.PORT}`));
  };
}

container.register({
  server: asClass(Server).singleton(),
  app: asValue(require("express")()),
  express: asValue(require("express")),
  ...require("./routes"),
  ...require("./middlewares"),
  ...require("./controllers"),
  ...require("./libs").container,
  ...require('./services').auth_service,
  ...require('./repositories')
});

container.resolve("server").run_engine();
