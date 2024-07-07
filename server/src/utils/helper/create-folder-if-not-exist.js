const fs = require("fs");
const path = require("path");

function createFolderIfNotExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Folder '${folderPath}' created.`);
  } else {
    console.log(`Folder '${folderPath}' already exists.`);
  }
}

module.exports = createFolderIfNotExists;
