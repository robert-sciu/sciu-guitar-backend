const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const logger = require("../utilities/logger");

const s3Client = new S3Client({
  endpoint:
    process.env.NODE_ENV === "production"
      ? process.env.S3_ENDPOINT
      : process.env.S3RVER_ENDPOINT, // S3rver endpoint
  region:
    process.env.NODE_ENV === "production" ? process.env.S3_REGION : "us-east-1",
  forcePathStyle: true,
  accessKeyId:
    process.env.NODE_ENV === "production"
      ? process.env.S3_ACCESS_KEY_ID
      : "accessKey1", // Setting the access key ID
  secretAccessKey:
    process.env.NODE_ENV === "production"
      ? process.env.S3_SECRET_ACCESS_KEY
      : "verySecretKey1", // Setting the secret access key
});
