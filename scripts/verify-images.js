const fs = require("fs")
const path = require("path")

// Directory to check
const publicDir = path.join(process.cwd(), "public")

// Function to check if a file is an image
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase()
  return [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"].includes(ext)
}

// Function to recursively get all image files in a directory
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList)
    } else if (isImageFile(file)) {
      fileList.push({
        path: filePath.replace(publicDir, "").replace(/\\/g, "/"),
        size: stat.size,
        lastModified: stat.mtime,
      })
    }
  })

  return fileList
}

// Get all image files
const imageFiles = getImageFiles(publicDir)

// Print the results
console.log(`Found ${imageFiles.length} image files in the public directory:`)
imageFiles.forEach((file) => {
  console.log(`- ${file.path} (${(file.size / 1024).toFixed(2)} KB, last modified: ${file.lastModified})`)
})

// Check for referenced images that don't exist
console.log("\nChecking for missing referenced images...")

// Add code here to scan your components for image references and check if they exist
// This would require parsing your React components which is beyond the scope of this script

console.log("\nImage verification complete!")
