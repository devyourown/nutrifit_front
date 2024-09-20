import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { makeReview } from "@/app/lib/api/review";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
});

async function uploadToS3(file: File) {
    const arrayBuffer = await file.arrayBuffer();

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `${Date.now()}_${file.name}`,
        Body: Buffer.from(arrayBuffer),
        ContentType: file.type,
        ACL: 'public-read',
    };

    try {
        await s3.send(new PutObjectCommand(uploadParams as any));
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
    } catch (err) {
        console.error('Error uploading file to S3: ', err);
        throw new Error('File upload failed');
    }
}

async function deleteFileFromS3(file: string) {
    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: file, // 삭제할 파일의 Key
      };
    
      try {
        await s3.send(new DeleteObjectCommand(deleteParams));
        console.log(`Successfully deleted ${file} from S3`);
      } catch (error) {
        console.error(`Error deleting ${file} from S3:`, error);
      }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files') as File[];
        if (files.length === 0) return;

        const uploadedUrls = [];
        for (const key in files) {
            const file = files[key];
            const url = await uploadToS3(file);
            uploadedUrls.push(url);
        }
        const token = formData.get('token') as string;
        const productId = formData.get('productId') as string;
        const review = formData.get('review') as string;
        const rating = formData.get('rating') as string;
        const response: any = await makeReview(token, Number(productId), review, uploadedUrls, Number(rating));
        if (!response.ok) {
            await Promise.all(uploadedUrls.map((url) => deleteFileFromS3(url)));
            return NextResponse.json({ error: 'Review creation failed and files were deleted.' }, { status: 500 });
        }
        return NextResponse.json({
            message: "Files uploaded successfully",
            success: true
        });
    } catch (error) {
        console.error('Error in POST request', error);
        return NextResponse.json({error: "File upload failed"}, {status: 500});
    }
}