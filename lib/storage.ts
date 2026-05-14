import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

export function getBucket() {
  const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

  if (!bucketName) {
    throw new Error('GOOGLE_CLOUD_BUCKET_NAME is missing');
  }

  return storage.bucket(bucketName);
}