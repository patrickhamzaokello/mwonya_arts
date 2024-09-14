"use server"
import { auth } from '@/auth';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

//using edge function to generate file names
const generateFilename = (fileType: string, bytes = 32) => {
    const array = new Uint8Array(bytes);
    crypto.getRandomValues(array);
    const randomString = Array.from(array).map(b => b.toString(16).padStart(2, "0")).join("");
    const extension = fileType.split('/')[1];
    return `${randomString}.${extension}`;
  }

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY!,
    },
})


const acceptedFileTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm", "audio/mp3", "audio/wav", "audio/m4a" , "audio/mpeg"]

const maxFileSize = 10 * 1024 * 1024 // 10MB

export async function getSignedURL(fileType: string, fileSize: number, checksum: string) {
    const session = await auth();
    if (!session) {
        return { failure: "Not authenticate" }
    }
   
    if (!acceptedFileTypes.includes(fileType)) {
        return { failure: "Invalid file type" }
    }

    if (fileSize > maxFileSize) {
        return { failure: "File size too large" }
    }

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: generateFilename(fileType),
        ContentType: fileType,
        ContentLength: fileSize,
        ChecksumSHA256: checksum,
        Metadata: {
            userId: session.user.id,
        }
    })


    const signedURL = await getSignedUrl(s3, putObjectCommand, 
        { expiresIn: 300 } // link available for only 5 mins 60 * 5
    )

    return { success: { url: signedURL } }
}