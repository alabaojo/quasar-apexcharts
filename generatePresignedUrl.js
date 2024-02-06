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

// Generate a presigned URL
  const s3Client = new S3Client({ region: region })
  // Create a GetObjectCommand
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey
  })


// Call the function to generate and use the presigned URL
//const presignedUrl = getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 })
//console.log('Presigned URL:', presignedUrl)

++++++++++++++++
async function generatePresignedUrl() {
  // Configure the S3 client
 
  // Specify the S3 bucket and object key
// Generate a presigned URL
  const s3Client = new S3Client({ region: region })
  // Create a GetObjectCommand
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey
  })

  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation with setTimeout
    setTimeout(() => {
      // Generate a presigned URL
      const presignedUrl = getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 })
      // Set expiresIn to the desired expiration time in seconds

      // Resolve the promise with the presigned URL
      resolve(presignedUrl)
    }, 10000)
  })
}
