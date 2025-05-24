import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Collection from "@/models/Collection"

export async function GET() {
  try {
    await connectDB()
    const collections = await Collection.find({ isActive: true }).sort({ order: 1 })
    return NextResponse.json(collections)
  } catch (error) {
    console.error("Error fetching collections:", error)
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 })
  }
}

export async function POST() {
  try {
    await connectDB()

    const collections = [
      {
        title: "Elegant Coats",
        slug: "coats",
        image: "/coat.webp",
        description: "Discover our premium collection of elegant coats",
        order: 1
      },
      {
        title: "Designer Glasses",
        slug: "glasses",
        image: "/glasses.webp",
        description: "Explore our stylish eyewear collection",
        order: 2
      },
      {
        title: "Frog Collection",
        slug: "frog",
        image: "/frog.webp",
        description: "Unique pieces from our frog-inspired collection",
        order: 3
      }
    ]

    // Clear existing collections
    await Collection.deleteMany({})

    // Insert new collections
    await Collection.insertMany(collections)

    return NextResponse.json({ message: "Collections initialized successfully" })
  } catch (error) {
    console.error("Error initializing collections:", error)
    return NextResponse.json({ error: "Failed to initialize collections" }, { status: 500 })
  }
}
