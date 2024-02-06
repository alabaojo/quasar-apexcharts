import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
// import { PutObjectCommand } from '@aws-sdk/client-s3'
// Configure the S3 client
const bucketName = process.argv[2]
const objectKey = process.argv[3]
const region = process.argv[4]

if (!bucketName || !objectKey) {
  console.log(bucketName)
  console.log(objectKey)
  console.error('Please provide both bucketName and objectKey as command line arguments.')
  process.exit(1) // Exit with an error code
}
const s3Client = new S3Client({ region: region })
// Printing process.argv property value 
console.log(process.argv)
// Create a GetObjectCommand
const getObjectCommand = new GetObjectCommand({
  Bucket: bucketName,
  Key: objectKey
})

// Generate a presigned URL
const presignedUrl = getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 })
console.log('Presigned URL:', presignedUrl)
