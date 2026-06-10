import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const source = path.join(publicDir, 'logo-rx.png');

const targets = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'favicon (1).png'
];

targets.forEach(target => {
  const dest = path.join(publicDir, target);
  try {
    fs.copyFileSync(source, dest);
    console.log(`Successfully copied logo-rx.png to ${target}`);
  } catch (err) {
    console.error(`Error copying to ${target}:`, err);
  }
});
