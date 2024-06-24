import { readdir, rename } from 'fs';
import { join } from 'path';

const directoryPath = join(__dirname, '../public/asset');
const newFolderPath = join(__dirname, '../public/images');

// Function to capitalize file name
const capitalizeFileName = (fileName) => {
  return fileName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');
};

// Read the directory
readdir(newFolderPath, directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach((file) => {
    const oldPath = join(directoryPath, file);
    const newFileName = capitalizeFileName(file);
    const newPath = join(newFolderPath, newFileName);

    rename(oldPath, newPath, (err) => {
      if (err) {
        console.log(`Error renaming ${file}:`, err);
      } else {
        console.log(`${file} renamed to ${newFileName}`);
      }
    });
  });
});
