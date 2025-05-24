import Image from "next/image"
import Link from "next/link"

interface Collection {
  _id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
}

async function getCollections(): Promise<Collection[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/collections`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch collections');
  }
  
  return res.json();
}

export default async function CollectionsSection() {
  const collections = await getCollections();

  return (
    <section className="py-16 px-8 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Explore the Maisons Collections</h2>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link key={collection._id} href={`/collections/${collection.slug}`} className="group cursor-pointer">
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-6 aspect-square">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">{collection.title}</h3>
                <p className="text-gray-600 mb-2">{collection.description}</p>
                <div className="w-12 h-px bg-gray-400 mx-auto"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
