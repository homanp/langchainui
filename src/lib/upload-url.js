import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuid } from "uuid";
import { s3Client } from "./s3.js";

export const getUploadUrl = async ({ type } = {}) =>
  createPresignedPost(s3Client, {
    Bucket: process.env.NEXT_PUBLIC_AMAZON_S3_BUCKET_NAME,
    Conditions: [
      ["content-length-range", 0, 1_048_576 * 50], // TODO: Change me from 50 MB to a production value
    ],
    Expires: 60, // TODO: Change me from 60 seconds to a production value
    Fields: {
      "Content-Type": type,
    },
    Key: uuid(),
  });
