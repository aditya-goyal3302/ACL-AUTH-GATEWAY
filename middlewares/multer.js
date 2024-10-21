const multer = require("multer");
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

//multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//aws-multer storage
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//   }
// })

// const aws_storage = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_BUCKET_NAME,
//   key: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname.trim());
//   }
// })

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  // storage: aws_storage,
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5mb file size
  }
})

exports.upload = upload;
// exports.S3 = s3