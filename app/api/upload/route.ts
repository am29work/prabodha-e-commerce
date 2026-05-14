import { NextResponse } from 'next/server';
import { getBucket } from '../../../lib/storage';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name}`;

    const bucket = getBucket();

    const blob = bucket.file(filename);

    await blob.save(buffer, {
      contentType: file.type,
      public: true,
    });

    const publicUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${filename}`;

    return NextResponse.json({
      success: true,
      imageUrl: publicUrl,
    });

  } catch (error) {
    console.error('UPLOAD ERROR:', error);

    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}