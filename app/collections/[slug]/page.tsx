import { notFound } from 'next/navigation';
import Image from 'next/image';
import connectDB from '@/lib/db';
import Collection from '@/models/Collection';
import Product from '@/models/Product';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  await connectDB();

  const collection = await Collection.findOne({ slug: params.slug, isActive: true });
  if (!collection) {
    notFound();
  }

  const products = await Product.find({ 
    collection: params.slug,
    isActive: true 
  }).sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl md:text-6xl font-light text-center text-gray-900">
            {collection.title}
          </h1>
          <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products available in this collection yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="group">
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square relative">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
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
        )}
      </div>
    </div>
  );
} 