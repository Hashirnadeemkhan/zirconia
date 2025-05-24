import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Product from "@/models/Product"

export const runtime = 'nodejs'

export async function GET() {
  try {
    await connectDB()
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
