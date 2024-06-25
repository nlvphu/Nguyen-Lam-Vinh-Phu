//This file is used to rename all image files to uppercase characters
//All image files are renamed in images folder 

const fs = require('fs');
const path = require('path');
const file = '/home/weed/workspace/src/github.com/nlvphu/Nguyen-Lam-Vinh-Phu/src/problem2/fancy-form';

const directoryPath = file +'/public/asset';
const newFolderPath = file +'/public/images';

// Function to capitalize file name
const capitalizeFileName = (fileName) => {
  const fileExtension = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, fileExtension).toUpperCase();
  return `${baseName}${fileExtension}`;
};

// Read the directory
fs.readdir(directoryPath, (err, files) => {
  console.log(directoryPath);
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach((file) => {
    const oldPath = path.join(directoryPath, file);
    const newFileName = capitalizeFileName(file);
    const newPath = path.join(newFolderPath, newFileName);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.log(`Error renaming ${file}:`, err);
      } else {
        console.log(`${file} renamed to ${newFileName}`);
      }
    });
  });
});
