import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background via-background to-primary-50/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Skeleton className="h-12 w-64 rounded-lg" />
              <Skeleton className="h-6 w-full max-w-[600px] rounded-lg" />
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-12">
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-8 w-48 rounded-lg" />
                  <Skeleton className="h-4 w-64 rounded-lg" />
                </div>
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24 rounded-lg" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                  ))}
                  <Skeleton className="h-10 w-full rounded-lg mt-4" />
                </div>
              </div>

              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-lg border p-6 shadow-sm">
                    <div className="space-y-2 mb-4">
                      <Skeleton className="h-6 w-32 rounded-lg" />
                      <Skeleton className="h-4 w-48 rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full rounded-lg" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
