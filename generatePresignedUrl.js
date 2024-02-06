const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const awsRegion = process.env.AWS_REGION || 'us-east-1'
const awsAccessId = process.env.AWS_ACCESS_ID
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const s3Client = new S3Client({region: ${awsRegion},credentials:{ accessKeyId:${awsAccessId},secretAccessKey:${awsSecretAccessKey}}})

// import { PutObjectCommand } from '@aws-sdk/client-s3'
// Configure the S3 client
const bucketName = process.argv[2]
const objectKey = process.argv[3]

if (!bucketName || !objectKey) {
  console.log(bucketName)
  console.log(objectKey)
  console.error('Please provide both bucketName and objectKey as command line arguments.')
  process.exit(1)
}
// Generate a presigned URL
  // Create a GetObjectCommand
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey
  })
(async () => {
  const presignedUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });
  console.log('Presigned URL:', presignedUrl);
})();

// Call the function to generate and use the presigned URL
//const presignedUrl = getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 })
//console.log('Presigned URL:', presignedUrl)
