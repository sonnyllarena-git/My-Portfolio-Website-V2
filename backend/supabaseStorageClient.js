import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'

let client = null

function getClient() {
  if (!client) {
    client = new S3Client({
      region: process.env.SUPABASE_S3_REGION,
      endpoint: process.env.SUPABASE_S3_ENDPOINT,
      forcePathStyle: true, // Supabase's S3-compatible endpoint isn't virtual-hosted-style
      credentials: {
        accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY,
      },
    })
  }
  return client
}

function publicUrlBase() {
  return `${process.env.SUPABASE_URL?.replace(/\/$/, '')}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}`
}

export async function uploadToStorage(buffer, key, contentType) {
  await getClient().send(
    new PutObjectCommand({
      Bucket: process.env.SUPABASE_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  )
  return `${publicUrlBase()}/${key}`
}

export async function deleteFromStorage(key) {
  await getClient().send(
    new DeleteObjectCommand({
      Bucket: process.env.SUPABASE_BUCKET_NAME,
      Key: key,
    }),
  )
}

export function keyFromUrl(url) {
  const base = publicUrlBase()
  if (typeof url !== 'string' || !url.startsWith(base)) return null
  return url.slice(base.length + 1)
}
