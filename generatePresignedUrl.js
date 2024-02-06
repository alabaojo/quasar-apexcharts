const AWS = require('aws-sdk')

const s3 = new AWS.S3()

const bucketName = process.argv[2]
const objectKey = process.argv[3]

if (!bucketName || !objectKey) {
  console.log(bucketName)
  console.log(objectKey)
  console.error('Please provide both bucketName and objectKey as command line arguments.')
  process.exit(1) // Exit with an error code
}
const params = {
  Bucket: bucketName,
  Key: objectKey,
  Expires: 3600
}

const presignedUrl = s3.getSignedUrl('putObject', params)

console.log('Pre-signed URL:', presignedUrl)
