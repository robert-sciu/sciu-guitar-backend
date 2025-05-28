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
  // accessKeyId:
  //   process.env.NODE_ENV === "production"
  //     ? process.env.S3_ACCESS_KEY_ID
  //     : "accessKey1", // Setting the access key ID
  // secretAccessKey:
  //   process.env.NODE_ENV === "production"
  //     ? process.env.S3_SECRET_ACCESS_KEY
  //     : "verySecretKey1", // Setting the secret access key
});

/**
 * Uploads a file to an S3 bucket using the configured S3 client.
 *
 * @param {Object} params - The upload parameters.
 * @param {Object} params.file - The file to be uploaded.
 * @param {string} params.file.filepath - The destination path for the file in the S3 bucket.
 * @param {Buffer} params.file.buffer - The file buffer to upload.
 * @param {string} params.file.mimetype - The MIME type of the file.
 * @throws {Error} Throws an error if the file upload fails.
 */
async function uploadFileToS3({ file }) {
  try {
    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: file.filepath,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    await s3Client.send(new PutObjectCommand(uploadParams));
  } catch (error) {
    logger.error(error);
    throw new Error(`Error uploading file: ${file.originalname}`);
  }
}

async function getSignedUrlFromS3({ filepath }) {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filepath,
  };
  try {
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    logger.error(error);
    throw new Error(`Error getting signed URL`);
  }
}

async function deleteFileFromS3({ filepath }) {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filepath,
    };
    await s3Client.send(new DeleteObjectCommand(params));
  } catch (error) {
    logger.error(error);
    throw new Error(`Error deleting file: ${filepath}`);
  }
}

const s3Manager = {
  uploadFileToS3,
  getSignedUrlFromS3,
  deleteFileFromS3,
};

module.exports = s3Manager;
