const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const LOGO_URL = 'https://i.postimg.cc/wBT6H1j9/Gold-solace-logo.png';
const FAVICON_DIR = path.join(process.cwd(), 'public', 'favicon');

async function downloadImage(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}

async function generateFavicons() {
  try {
    // Create favicon directory if it doesn't exist
    await fs.mkdir(FAVICON_DIR, { recursive: true });

    // Download the logo
    const imageBuffer = await downloadImage(LOGO_URL);

    // Generate different sizes
    const sizes = {
      'favicon-16x16.png': 16,
      'favicon-32x32.png': 32,
      'apple-touch-icon.png': 180,
      'android-chrome-192x192.png': 192,
      'android-chrome-512x512.png': 512
    };

    for (const [filename, size] of Object.entries(sizes)) {
      await sharp(imageBuffer)
        .resize(size, size)
        .toFile(path.join(FAVICON_DIR, filename));
    }

    // Generate ICO file (16x16 and 32x32)
    await sharp(imageBuffer)
      .resize(32, 32)
      .toFile(path.join(process.cwd(), 'public', 'favicon.ico'));

    console.log('Favicon generation complete!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 