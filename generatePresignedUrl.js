const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');


// import { PutObjectCommand } from '@aws-sdk/client-s3'
// Configure the S3 client
const bucketName = process.argv[2]
const objectKey = process.argv[3]
const region = process.argv[4]

if (!bucketName || !objectKey) {
  console.log(bucketName)
  console.log(objectKey)
  console.error('Please provide both bucketName and objectKey as command line arguments.')
  process.exit(1)
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate a presigned URL
  const s3Client = new S3Client({ region: region })
  // Create a GetObjectCommand
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey
  })


// Call the function to generate and use the presigned URL
const presignedUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 })
  await delay(5000);
console.log('Presigned URL:', presignedUrl)
