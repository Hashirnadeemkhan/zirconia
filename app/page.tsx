import { Suspense } from 'react';
import CollectionsSection from "@/src/components/collections-section"
import HeroSection from "@/src/components/hero-section"
import { ErrorBoundary } from "@/src/components/error-boundary"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ErrorBoundary>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <HeroSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading collections...</div>}>
          <CollectionsSection />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}
