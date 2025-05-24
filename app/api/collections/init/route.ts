import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Collection from '@/models/Collection';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();

    // Check if collections already exist
    const existingCollections = await Collection.find({});
    if (existingCollections.length > 0) {
      return NextResponse.json({ message: "Collections already initialized" });
    }

    // Initialize collections
    const collections = [
      {
        title: "Men",
        slug: "men",
        image: "/images/men-collection.jpg",
        description: "Discover our premium men's collection",
        order: 1,
        isActive: true
      },
      {
        title: "Women",
        slug: "women",
        image: "/images/women-collection.jpg",
        description: "Explore our elegant women's collection",
        order: 2,
        isActive: true
      },
      {
        title: "Sports",
        slug: "sports",
        image: "/images/sports-collection.jpg",
        description: "Performance wear for active lifestyles",
        order: 3,
        isActive: true
      },
      {
        title: "Kids",
        slug: "kids",
        image: "/images/kids-collection.jpg",
        description: "Stylish and comfortable clothing for kids",
        order: 4,
        isActive: true
      },
      {
        title: "New Arrivals",
        slug: "new",
        image: "/images/new-arrivals.jpg",
        description: "Latest additions to our collection",
        order: 5,
        isActive: true
      },
      {
        title: "Sale",
        slug: "sale",
        image: "/images/sale.jpg",
        description: "Special offers and discounts",
        order: 6,
        isActive: true
      }
    ];

    await Collection.insertMany(collections);

    return NextResponse.json({ message: "Collections initialized successfully" });
  } catch (error) {
    console.error("Error initializing collections:", error);
    return NextResponse.json(
      { error: "Failed to initialize collections" },
      { status: 500 }
    );
  }
} 