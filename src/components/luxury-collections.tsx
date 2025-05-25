import Image from "next/image"
import Link from "next/link"

const collections = [
  {
    id: 1,
    category: "MIT DEN EXKLUSIVEN YELLOW STYLES",
    title: "Bottega Veneta Pre-Fall '25",
    image: "/1.avif",
    href: "/collections/bottega-veneta",
    imageAlt: "Woman in pink coat with black handbag",
  },
  {
    id: 2,
    category: "DIE EXKLUSIVE TAORMINA KOLLEKTION",
    title: "Dolce&Gabbana Kids x Mytheresa",
    image: "/2.webp",
    href: "/collections/dolce-gabbana-kids",
    imageAlt: "Young person in colorful floral dress",
  },
  {
    id: 3,
    category: "VESTIAIRE COLLECTIVE X MYTHERESA",
    title: "Unseren Resale Service nutzen & Mytheresa Guthaben erhalten",
    image: "/4.avif",
    href: "/services/resale",
    imageAlt: "Woman in pink coat from different angle",
  },
  {
    id: 4,
    category: "JETZT BEI MYTHERESA",
    title: "Dolce&Gabbana Casa: Die exklusive Kollektion",
    subtitle: "Dolce&Gabbana x Mytheresa",
    categoryBottom: "DIE EXKLUSIVE TAORMINA KOLLEKTION",
    image: "/4.webp",
    href: "/collections/dolce-gabbana-casa",
    imageAlt: "Colorful striped and floral home accessories",
  },
]

export default function LuxuryCollections() {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <Link key={collection.id} href={collection.href} className="group block">
              <div className="bg-gray-50 overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                {/* Category Text */}
                <div className="text-center py-4 px-6">
                  <p className="text-xs font-medium tracking-widest text-gray-600 uppercase">{collection.category}</p>
                </div>

                {/* Main Title */}
                <div className="text-center px-6 mb-6">
                  <h3 className="text-xl md:text-2xl font-light text-gray-900 leading-tight">{collection.title}</h3>
                  {collection.subtitle && (
                    <h4 className="text-lg md:text-xl font-light text-gray-900 mt-2">{collection.subtitle}</h4>
                  )}
                </div>

                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Bottom Category (for item 4) */}
                {collection.categoryBottom && (
                  <div className="text-center py-4 px-6">
                    <p className="text-xs font-medium tracking-widest text-gray-600 uppercase">
                      {collection.categoryBottom}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
