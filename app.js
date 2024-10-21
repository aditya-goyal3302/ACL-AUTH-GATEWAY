//config
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
// const proxy = require('express-http-proxy');  //aws
// const re = new RegExp(" ", "g");  //aws

// const http = require("http");    //Socket connection
const { multer: { upload }, error_middleware } = require("./middlewares");
// const server = http.createServer(app);     /Socket connection

// //Socket connection
// const { socket } = require("./config").    //Socket connection
//   socket(server);    //Socket connection+-

app.use(upload.fields([{ name: "link", maxCount: 4 }, { name: "image", maxCount: 1 }]));
app.use(express.static("public"));
app.use("/uploads/images", express.static("uploads/images"));

//parsing
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors
app.use(cors({
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'development') return callback(null, true);
    if (process.env.CLIENT_URL.split(', ').includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


//routes
app.use("/", require("./routes"));
// app.use("/uploads/images/:FileName",
//   proxy(`https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`,
//     {
//       proxyReqPathResolver: (req) => { return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.params.FileName.replace(re, "+")}` }
//     }
//   )
// );      //aws

app.use(error_middleware);

//server
app.use((req, res) => {
  res.status(404).send({ e: "404: Page not found" });
});

//error handling
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception:', err);
});

app.listen(process.env.PORT, () =>    //for Socket connection use server instead of app
  console.log(`Server Up and running on port ${process.env.PORT}`)
);
