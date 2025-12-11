import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const runtime = useRuntimeConfig();
const r2Client = new S3Client({
  region: "auto",
  endpoint: runtime.cloudflareEndpoint,
  credentials: {
    accessKeyId: runtime.cloudflareAccessKeyId,
    secretAccessKey: runtime.cloudflareSecretAccessKey,
  },
});

export const uploadToR2 = async (
  key: string,
  body: Buffer,
  contentType: string
) => {
  const command = new PutObjectCommand({
    Bucket: runtime.cloudflareBucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  return r2Client.send(command);
};
