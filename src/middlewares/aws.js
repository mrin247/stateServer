const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const accessKeyId = process.env.AWS_ACCESS_PRIVATE_KEY_ID;
const secretAccessKey = process.env.AWS_PRIVATE_SECRET_KEY;

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(path.dirname(__dirname), "../uploads"));
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   });
  
//   const upload = multer({ storage });

exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "state-front",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});
