const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs');
const archiver = require('archiver');

const awsRegion = process.env.AWS_REGION || 'us-east-1'
const awsAccessId = process.env.AWS_ACCESS_ID
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
console.log(process.env)
const s3Client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessId,
    secretAccessKey: awsSecretAccessKey
  }
})
// Configure the S3 client
const bucketName = process.argv[2]
const objectKey = process.argv[3]
const folderPath = '/app/dist/spa';

if (!bucketName || !objectKey) {
  console.log(bucketName)
  console.log(objectKey)
  console.error('Please provide both bucketName and objectKey as command line arguments.')
  process.exit(1)
}
// Generate a presigned URL

async function uploadZipToS3() {
  const folderPath = '/app/dist/spa';
  const bucketName = process.argv[2];
  const objectKey = process.argv[3];

  if (!bucketName || !objectKey) {
    console.error('Please provide both bucketName and objectKey as command line arguments.');
    process.exit(1);
  }
 console.log(folderPath)
  // Function to create a zip archive of the specified directory
  function zipDirectory(source, out) {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(out);

    return new Promise((resolve, reject) => {
      archive
        .directory(source, false)
        .on('error', (err) => reject(err))
        .pipe(stream);

      stream.on('close', () => resolve());
      archive.finalize();
    });
  }

  // Create a zip file from the specified directory
  const zipFilePath = '/app/dist/spa.zip';
  await zipDirectory(folderPath, zipFilePath);

  // Read the zip file content
  const zipFileContent = fs.readFileSync(zipFilePath);

  // Generate a presigned URL for the PutObjectCommand
  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
    Body: zipFileContent,
    ContentType: 'application/zip', // Set the appropriate content type for a zip file
  });

  try {
    const presignedUrl = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 3600 });
    console.log('Presigned URL:', presignedUrl); 
      // Write the presigned URL to a file
    //fs.writeFileSync('presigned-url.txt', presignedUrl);
    // Set the environment variable for the current process
    process.env.S3_PRESIGNED_URL = presignedUrl;
    process.stdout.write(presignedUrl);
    process.env.S3_PRESIGNED_URL = presignedUrl;
    console.log(process.env.S3_PRESIGNED_URL);
       // return presignedUrl;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
  }
    // Write the presigned URL to a file
    fs.writeFileSync('presigned-url.txt', presignedUrl);
    // Set the environment variable for the current process
    process.env.S3_PRESIGNED_URL = presignedUrl;
    process.stdout.write(presignedUrl);
    process.env.S3_PRESIGNED_URL = presignedUrl;
    console.log(process.env.S3_PRESIGNED_URL);
  }

// Call the async function
uploadZipToS3();
