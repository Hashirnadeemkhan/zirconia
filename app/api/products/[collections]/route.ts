import { NextResponse } from "next/server"
import { getProductsByCollection } from "@/lib/db-operations"

export async function GET(request: Request, { params }: { params: { collection: string } }) {
  try {
    const products = await getProductsByCollection(params.collection)
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error in collection products API:", error)
    return NextResponse.json({ error: "Failed to fetch collection products" }, { status: 500 })
  }
}
