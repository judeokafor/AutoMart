/* istanbul ignore file */
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploads = file => new Promise((resolve) => {
  cloudinary.uploader.upload(
    file,
    (result) => {
      resolve({ url: result.url, id: result.public_id });
    },
    { resource_type: 'auto' },
  );
});

export default uploads;
