import { ErrorHandler } from '@/handlers/error.handler';
import {
  S3Client,
  HeadObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function getPresignedPostUrl(key: string) {
  const s3 = new S3Client({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_ACCESS_SECRET!,
    },
  });

  const urlData = await createPresignedPost(s3, {
    Bucket: 'baladi-prod-baladibucket-fedmxzsx',
    Key: key,
    Expires: 3600,
  });

  return urlData;
}

export async function getSignedUrlForS3(key: string) {
  const s3 = new S3Client({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_ACCESS_SECRET!,
    },
  });

  try {
    await s3.send(
      new HeadObjectCommand({
        Bucket: 'baladi-prod-baladibucket-fedmxzsx',
        Key: key,
      }),
    );
  } catch {
    throw new ErrorHandler(404, 'File not found', 'NOT_FOUND');
  }

  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: 'baladi-prod-baladibucket-fedmxzsx',
      Key: key,
    }),
    { expiresIn: 604800 },
  );

  return url;
}
