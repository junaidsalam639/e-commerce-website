import { NextResponse } from 'next/server'
import connectDB from '../../../../utils/db'
import Category from '../../../../models/Category'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


export async function GET(request, context) {
  try {
    await connectDB()
    const category = await Category.findById(context?.params?.id)
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request, context) {
  try {
    await connectDB()
    const formData = await request.formData()
    const name = formData.get('name');
    const image = formData.get('image');

    const updateData = { name }

    if (image === null) {
      const buffer = await image.arrayBuffer()
      const bytes = Buffer.from(buffer)

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'categories' },
            (error, result) => {
              if (error || !result) {
                reject(error || new Error('Upload failed'))
                return
              }
              resolve(result)
            }
          )
          .end(bytes)
      })
      updateData.imageUrl = result.secure_url
    }

    const category = await Category.findByIdAndUpdate(
      context.params.id,
      updateData,
      { new: true }
    )

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, context) {
  try {
    await connectDB()
    const category = await Category.findByIdAndDelete(context?.params?.id)

    if (category.imageUrl) {
      const publicId = category.imageUrl.split('/').pop()?.split('.')[0]
      if (publicId) {
        await cloudinary.uploader.destroy(`categories/${publicId}`)
      }
    }

    return NextResponse.json(
      { message: 'Category deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}