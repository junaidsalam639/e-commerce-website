import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import connectDB from '../../../utils/db';
import Category from '../../../models/Category';
import Product from '../../../models/Product';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    const title = formData.get('title');
    const desc = formData.get('desc');
    const price = parseFloat(formData.get('price'));
    const type = formData.get('type');
    const condition = formData.get('condition');
    const location = formData.get('location');
    const number = formData.get('number');
    const categoryId = formData.get('category');
    const image = formData.get('image');

    if (!title || !desc || !price || !type || !condition || !location || !number || !categoryId || !image) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const buffer = await image.arrayBuffer();
    const bytes = Buffer.from(buffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'products',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(bytes);
    });

    const product = new Product({
      title,
      image: result.secure_url,
      desc,
      price,
      type,
      condition,
      location,
      number,
      category: categoryId
    });

    await product.save();

    return NextResponse.json(product, { status: 201 });

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
    const products = await Product.find({}).populate('category');
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}