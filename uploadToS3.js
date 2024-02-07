const fs = require('fs');
const archiver = require('archiver');
const axios = require('axios');
const dotenv = require('dotenv').config();
const folderPath = '/app/dist/spa';
//const { generatePresignedUrl, uploadZipToS3 } = require('./generatePresignedUrl');
//const presignedUrl = process.argv[2];
//console.log(presignedUrl);
//const s3PresignedUrl = generatePresignedUrl.js 'quasar-cs-build' 'dist-cs-spa';

  // Read the content of the file
const fileContent = fs.readFileSync('/app/presigned_url.txt', 'utf-8').trim();

  // Log the export statement
console.log(`export S3_PRESIGNED_URL="${fileContent}"`);
  
const s3PresignedUrl = process.env.S3_PRESIGNED_URL;
console.log(s3PresignedUrl)
// Now you can access your environment variables using process.env
//const s3PresignedUrl = process.env.S3_PRESIGNED_URL;
console.log("S§PRESIGNDURL MI NI. ", s3PresignedUrl);

// Use awsPresignedUrl1 in your application
console.log('S3_PRESIGNED_URL:', s3PresignedUrl);

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
zipDirectory(folderPath, zipFilePath)
  .then(() => {
    console.log('Directory zipped successfully');

    // Read the zip file content
    const zipFileContent = fs.readFileSync(zipFilePath);

    // Upload the zip file to S3 using the presigned URL
    axios
      .put(s3PresignedUrl, zipFileContent, {
        headers: {
          'Content-Type': 'application/zip', // Set the appropriate content type for a zip file
        },
      })
      .then(() => {
        console.log('Uploaded zip file to S3');
      })
      .catch((error) => {
        console.error('Error uploading zip file to S3:', error.message);
      });
  })
  .catch((error) => {
    console.error('Error zipping directory:', error);
  });
