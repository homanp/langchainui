import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AMAZON_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AMAZON_S3_SECRET_ACCESS_KEY,
  },
  region: "eu-north-1",
});
