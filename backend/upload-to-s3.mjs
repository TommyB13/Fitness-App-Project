// export const handler = async (event) => {
//   // TODO implement
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify('Hello from Lambda!'),
//   };
//   return response;
// };

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client();

export const handler = async (event) => {
  try {
    const { file, type } = JSON.parse(event.body);
    const bucketName = "fitness-app-project";
    const region = "us-east-2";
    const extractBase64Details = (base64String) => {
        const match = base64String.match(/^data:(.+?);base64,(.+)$/);
        if (!match) {
            throw new Error("Invalid Base64 string");
        }
        return {
            mimeType: match[1],
            data: match[2],
        };
    };
    const { mimeType, data } = extractBase64Details(file);
    const buffer = Buffer.from(data, "base64");
    const getFileExtension = (mimeType) => {
        const map = {
            "image/png": "png",
            "image/jpeg": "jpg",
            "image/gif": "gif",
            // Add more MIME types as needed
        };
        return map[mimeType] || "bin"; // Default to 'bin' if unknown
    };
    const s3Key = `${type || "default"}/${Date.now()}.${getFileExtension(mimeType)}`;

    await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketName,
            Key: s3Key,
            Body: buffer,
            ContentType: mimeType,
        })
    );

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "File uploaded successfully",
            fileUrl: `https://${bucketName}.s3.${region}.amazonaws.com/${s3Key}`,
        }),
    };
} catch (error) {
    console.error("Error uploading file", error);
    return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
    };
}
};
