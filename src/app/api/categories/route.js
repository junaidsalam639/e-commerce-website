import { NextResponse } from 'next/server';
import connectDB from '../../../utils/db';
import { v2 as cloudinary } from 'cloudinary';
import Category from '../../../models/Category';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const name = formData.get('name');
    const image = formData.get('image');
    const buffer = await image.arrayBuffer();
    const bytes = Buffer.from(buffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'categories',
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(bytes);
    });

    const category = new Category({
      name,
      imageUrl: (result).secure_url,
    });

    await category.save();

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
