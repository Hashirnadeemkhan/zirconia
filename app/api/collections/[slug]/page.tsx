import Image from "next/image"
import Link from "next/link"
import { getProductsByCollection } from "@/lib/db-operations"
import { notFound } from "next/navigation"

interface CollectionPageProps {
  params: {
    slug: string
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const products = await getProductsByCollection(params.slug)

  if (!products.length) {
    notFound()
  }

  const collectionTitle = params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace("-", " ")

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl md:text-6xl font-light text-center text-gray-900">{collectionTitle}</h1>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="group">
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back Link */}
      <div className="text-center pb-16">
        <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
