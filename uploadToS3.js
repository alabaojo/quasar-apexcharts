const fs = require('fs')
const axios = require('axios')

const folderPath = 'src/assets' // Change this to the path of your folder
const presignedUrl = process.argv[4]

const files = fs.readdirSync(folderPath)

files.forEach(async (file) => {
  const filePath = `${folderPath}/${file}`
  const fileContent = fs.readFileSync(filePath)

  try {
    await axios.put(presignedUrl, fileContent, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    })
    console.log(`Uploaded ${file} to S3`)
  } catch (error) {
    console.error(`Error uploading ${file} to S3:`, error.message)
  }
})
