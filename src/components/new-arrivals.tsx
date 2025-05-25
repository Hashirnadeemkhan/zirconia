"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

const newArrivals = [
  {
    id: 1,
    status: "NOW LIVE",
    title: "REVERE MANOR - SUMMER '25",
    ctaText: "→ SHOP NEW ARRIVALS",
    videoSrc: "/vid1.mp4", // You'll replace this with actual video
    href: "/collections/revere-manor-summer",
    description: "Discover the latest summer collection",
  },
  {
    id: 2,
    status: "JUST DROPPED",
    title: "URBAN ELEGANCE - FALL '25",
    ctaText: "→ EXPLORE COLLECTION",
    videoSrc: "/vid2.mp4",
    href: "/collections/urban-elegance-fall",
    description: "Sophisticated urban wear for the modern individual",
  },
  {
    id: 3,
    status: "EXCLUSIVE",
    title: "MIDNIGHT LUXE - LIMITED EDITION",
    ctaText: "→ SHOP EXCLUSIVE",
    videoSrc: "/vid3.mov",
    href: "/collections/midnight-luxe",
    description: "Limited edition luxury pieces",
  },
  {
    id: 4,
    status: "TRENDING",
    title: "COASTAL BREEZE - RESORT '25",
    ctaText: "→ VIEW RESORT WEAR",
    videoSrc: "/vid4.mp4",
    href: "/collections/coastal-breeze-resort",
    description: "Effortless resort wear for your next getaway",
  },
]

export default function NewArrivals() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    // Auto-play the first video
    if (videoRefs.current[0]) {
      videoRefs.current[0].play()
    }
  }, [])

  const handleVideoHover = (index: number) => {
    setCurrentVideo(index)
    // Pause all videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause()
      }
    })
    // Play the hovered video
    if (videoRefs.current[index]) {
      videoRefs.current[index]?.play()
    }
  }

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">New Arrivals</h2>
          <p className="text-lg text-gray-600">Discover our latest collections and exclusive pieces</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {newArrivals.map((arrival, index) => (
            <Link
              key={arrival.id}
              href={arrival.href}
              className="group block relative overflow-hidden bg-black"
              onMouseEnter={() => handleVideoHover(index)}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                {/* Video Background */}
               <video
  ref={(el) => {
    videoRefs.current[index] = el
  }}
  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  muted
  loop
  playsInline
  preload="metadata"
>
  <source src={arrival.videoSrc} type="video/mp4" />
</video>


                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-20" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-8">
                  {/* Status Badge */}
                  <div className="mb-4">
                    <span className="text-sm font-medium tracking-widest uppercase opacity-90">{arrival.status}</span>
                  </div>

                  {/* Main Title */}
                  <h3 className="text-2xl md:text-4xl font-light mb-8 leading-tight">{arrival.title}</h3>

                  {/* CTA Button */}
                  <div className="border-b border-white pb-1 transition-all duration-300 group-hover:border-opacity-70">
                    <span className="text-sm font-medium tracking-wide uppercase">{arrival.ctaText}</span>
                  </div>
                </div>

                {/* Play/Pause Indicator */}
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Video Controls Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">Hover over each section to preview the collection</p>
        </div>
      </div>
    </section>
  )
}
