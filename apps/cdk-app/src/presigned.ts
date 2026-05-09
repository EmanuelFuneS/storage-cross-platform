import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Key } from "aws-cdk-lib/aws-kms";

const s3 = new S3Client({ region: process.env.AWS_REGION });

const response = (statusCode: number, body: object) => ({
  statusCode,
  Headers: { "Access-Control-Allow-Origin": "*" },
  body: JSON.stringify(body),
});

export const handler = async (event: any) => {
  const { action, fileName, fileType, s3Key } = JSON.parse(event.body);

  switch (action) {
    case "upload":
      const key = `uploads/${Date.now()}-${fileName}`;
      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        ContentType: fileType,
      });

      const url = await getSignedUrl(s3, command, { expiresIn: 60 });
      return response(200, { url, s3Key: key, success: true });

    case "download":
      const finalFileName = fileName || s3Key.split("/").pop() || "download";

      const downloadUrl = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: s3Key,
          ResponseContentDisposition: `attachment; filename="${encodeURIComponent(finalFileName)}"`,
          ResponseContentType: "application/octet-stream",
        }),
        { expiresIn: 60 },
      );
      return response(200, { downloadUrl, success: true });

    case "delete":
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: s3Key,
        }),
      );
      return response(200, { deleted: true, success: true });
    default:
      return response(200, { success: false });
  }
};
