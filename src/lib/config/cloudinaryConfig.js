import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: 'okaforjude',
  api_key: 996355845829939,
  api_secret: 'THgg-bLXivyGxo-uHGz4WG8Ootc',
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
