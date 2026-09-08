import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'

let client = null

function getClient() {
  if (!client) {
    client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    })
  }
  return client
}

export async function uploadToR2(buffer, key, contentType) {
  await getClient().send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  )
  return `${process.env.R2_PUBLIC_URL.replace(/\/$/, '')}/${key}`
}

export async function deleteFromR2(key) {
  await getClient().send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }),
  )
}

export function keyFromUrl(url) {
  const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, '')
  if (!base || typeof url !== 'string' || !url.startsWith(base)) return null
  return url.slice(base.length + 1)
}
