import { NextResponse } from 'next/server'
import connectDB from '../../../../utils/db'
import Product from '../../../../models/Product'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(request, { params }) {
  try {
    await connectDB()
    const product = await Product.findById(params.id).populate('category')
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB()
    const formData = await request.formData()

    const existingProduct = await Product.findById(params.id)
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const updateData = {
      title: formData.get('title') || existingProduct.title,
      desc: formData.get('desc') || existingProduct.desc,
      price: formData.get('price') || existingProduct.price,
      type: formData.get('type') || existingProduct.type,
      condition: formData.get('condition') || existingProduct.condition,
      location: formData.get('location') || existingProduct.location,
      number: formData.get('number') || existingProduct.number,
      category: formData.get('category') || existingProduct.category
    }

    const image = formData.get('image')
    if (image && image !== 'null') {
      const buffer = await image.arrayBuffer()
      const bytes = Buffer.from(buffer)

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'products' },
            (error, result) => {
              if (error) reject(error)
              resolve(result)
            }
          )
          .end(bytes)
      })

      if (existingProduct.image) {
        const publicId = existingProduct.image.split('/').pop().split('.')[0]
        await cloudinary.uploader.destroy(`products/${publicId}`)
      }

      updateData.image = result.secure_url
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    )

    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const product = await Product.findByIdAndDelete(params.id)
    if (product?.image) {
      const publicId = product.image.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`products/${publicId}`)
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}