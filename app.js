//config
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { error_middleware } = require("./middlewares");

app.use(express.static("public"));
app.use("/uploads/images", express.static("uploads/images"));

//parsing
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors
app.use(
  cors({
    origin: (origin, callback) => {
      if (process.env.NODE_ENV === "development") return callback(null, true);
      if (process.env.CLIENT_URL.split(", ").includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//routes
app.use("/", require("./routes"));


app.use(error_middleware);

//server
app.use((req, res) => {
  res.status(404).send({ e: "404: Page not found" });
});

//error handling
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception:", err);
});

app.listen(process.env.PORT, () =>
  //for Socket connection use server instead of app
  console.log(`Server Up and running on port ${process.env.PORT}`)
);
