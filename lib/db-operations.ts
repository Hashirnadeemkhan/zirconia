import clientPromise from "./mongodb"
import type { Collection, Product } from "./models/Collection"

export async function getCollections(): Promise<Collection[]> {
  try {
    const client = await clientPromise
    const db = client.db("fashion_store")

    const collections = await db
      .collection<Collection>("collections")
      .find({ isActive: true })
      .sort({ order: 1 })
      .toArray()

    return collections
  } catch (error) {
    console.error("Error fetching collections:", error)
    return []
  }
}

export async function getProductsByCollection(collectionSlug: string): Promise<Product[]> {
  try {
    const client = await clientPromise
    const db = client.db("fashion_store")

    const products = await db
      .collection<Product>("products")
      .find({
        collection: collectionSlug,
        inStock: true,
      })
      .sort({ createdAt: -1 })
      .toArray()

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const client = await clientPromise
    const db = client.db("fashion_store")

    const products = await db
      .collection<Product>("products")
      .find({
        featured: true,
        inStock: true,
      })
      .limit(6)
      .toArray()

    return products
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export async function initializeDatabase() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_store")

    // Check if collections already exist
    const collectionsCount = await db.collection("collections").countDocuments()

    if (collectionsCount === 0) {
      // Insert sample collections
      await db.collection("collections").insertMany([
        {
          title: "Men",
          slug: "men",
          image: "/placeholder.svg?height=400&width=400",
          description: "Sophisticated menswear collection",
          isActive: true,
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Women",
          slug: "women",
          image: "/placeholder.svg?height=400&width=400",
          description: "Elegant women's fashion",
          isActive: true,
          order: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Men's Accessories",
          slug: "mens-accessories",
          image: "/placeholder.svg?height=400&width=400",
          description: "Premium accessories for men",
          isActive: true,
          order: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])

      // Insert sample products
      await db.collection("products").insertMany([
        {
          name: "Classic Black Jacket",
          slug: "classic-black-jacket",
          description: "Premium black jacket for sophisticated style",
          price: 299,
          images: ["/placeholder.svg?height=400&width=400"],
          category: "outerwear",
          collection: "men",
          sizes: ["S", "M", "L", "XL"],
          colors: ["Black"],
          inStock: true,
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Elegant Black Skirt",
          slug: "elegant-black-skirt",
          description: "Sophisticated black skirt for modern women",
          price: 199,
          images: ["/placeholder.svg?height=400&width=400"],
          category: "bottoms",
          collection: "women",
          sizes: ["XS", "S", "M", "L"],
          colors: ["Black"],
          inStock: true,
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Premium Sunglasses",
          slug: "premium-sunglasses",
          description: "Luxury sunglasses with UV protection",
          price: 149,
          images: ["/placeholder.svg?height=400&width=400"],
          category: "eyewear",
          collection: "mens-accessories",
          sizes: ["One Size"],
          colors: ["Black", "Brown"],
          inStock: true,
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    }
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}
