import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative h-screen bg-gray-200 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/hero-image.webp" alt="Fashion models in black clothing" fill className="object-cover" priority />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
        {/* Year Badge */}
        <div className="flex justify-end">
          <span className="text-white text-lg font-light">2024/25</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-6xl md:text-8xl font-light tracking-wide mb-8">Ready to Wear</h1>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-16">
          <Link
            href="/men"
            className="text-white text-lg font-medium hover:opacity-70 transition-opacity border-b border-white pb-1"
          >
            MEN
          </Link>
          <Link
            href="/women"
            className="text-white text-lg font-medium hover:opacity-70 transition-opacity border-b border-white pb-1"
          >
            WOMEN
          </Link>
        </div>
      </div>
    </section>
  )
}
