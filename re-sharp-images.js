const fs = require("fs");
const sharp = require("sharp");
const { glob } = require("glob");

function getFilesizeInMBytes(filename) {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes / (1024 * 1024);
}

function getFileName(path) {
  const parts = path.split("/");
  const fileName = parts[parts.length - 1];
  const extension = fileName.split(".")[1];
  return { fileName, extension };
}

async function process() {
  const images = await glob(["src/images/**/*.{png,jpeg,jpg,JPG}"]);
  console.log(`Found ${images.length} images`);
  for (const image of images) {
    const imageSize = getFilesizeInMBytes(image);
    const { fileName, extension } = getFileName(image);
    if (extension === "jpg" && imageSize < 3) {
      console.log(`Skipping ${fileName}`);
      continue;
    }
    console.log(`Processing ${fileName} with size ${imageSize}MB`);
    const newFile =
      extension === "jpg"
        ? image.replace(".jpg", "-touched.jpg")
        : image.replace(`.${extension}`, ".jpg");
    await sharp(image)
      .jpeg({ mozjpeg: true, quality: imageSize > 3 ? 80 : 100 })
      .toFile(newFile);
  }
}

process().then(() => {
  console.log("All good");
});
