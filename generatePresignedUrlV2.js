const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

async function generatePresignedUrl() {
  // Configure the S3 client
  const s3Client = new S3Client({ region: "your-s3-region" });

  // Specify the S3 bucket and object key
  const bucketName = "your-s3-bucket";
  const objectKey = "your-s3-object-key";

  // Create a GetObjectCommand
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation with setTimeout
    setTimeout(() => {
      // Generate a presigned URL
      const presignedUrl = getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 }); // Set expiresIn to the desired expiration time in seconds

      // Resolve the promise with the presigned URL
      resolve(presignedUrl);
    }, 1000); // Adjust the delay as needed
  });
}

// Usage example
generatePresignedUrl()
  .then((presignedUrl) => {
    // The presigned URL is now resolved and can be used
    console.log("Presigned URL:", presignedUrl);

    // Add your logic here to use the presigned URL as needed
  })
  .catch((error) => {
    // Handle errors appropriately
    console.error("Error generating presigned URL:", error);
});
