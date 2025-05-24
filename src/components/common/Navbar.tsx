"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Heart, ShoppingCart } from "lucide-react"

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top navbar with logo, search, and icons */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-black">Zirconia</span>
               
              </span>
            </Link>
          </div>

          {/* Search bar - centered on desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full bg-gray-100 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right navigation */}
          <div className="flex items-center space-x-6">
            {/* Mobile search icon */}
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-700">
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Cart */}
            <div className="relative">
              <Link href="/cart" className="text-gray-500 hover:text-gray-700">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              </Link>
            </div>

            {/* Favorites */}
            <div>
              <Link href="/favorites" className="text-gray-500 hover:text-gray-700">
                <Heart className="h-6 w-6" />
              </Link>
            </div>

            {/* User profile */}
            <div>
              <Link href="/profile">
                <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="User profile"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom navbar with categories */}
        <div className="py-3">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
            <NavLink href="/women">Women</NavLink>
            <NavLink href="/men">Men</NavLink>
            <NavLink href="/kids">Kids</NavLink>
            <NavLink href="/sports">Sports</NavLink>
            <NavLink href="/brands">Brands</NavLink>
            <NavLink href="/new">New</NavLink>
            <NavLink href="/sale">
              Sale
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, className = "", children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={`text-sm font-medium whitespace-nowrap hover:text-gray-900 ${className}`}>
      {children}
    </Link>
  )
}
