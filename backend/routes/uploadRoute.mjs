import Cloud from '@google-cloud/storage';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import util from 'util';

const { format } = util;

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceKey = path.join(__dirname, '../floraria-medeea-cf3fa3fe4be8.json')
const { Storage }= Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "floraria-medeea"
});

export const uploadImage = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file
  const blob = storage.bucket("medeea-bucket").file(originalname.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    resumable: false
  })
  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/medeea-bucket/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})