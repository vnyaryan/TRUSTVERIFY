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

            <div className="mx-auto mt-12 max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-64 rounded-lg" />
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Skeleton className="h-10 w-full sm:w-32 rounded-lg" />
                    <Skeleton className="h-10 w-full sm:w-32 rounded-lg" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Skeleton className="h-64 w-full max-w-md rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl space-y-16">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Skeleton className="h-64 w-full rounded-xl" />
                  </div>
                  <div>
                    <Skeleton className="h-8 w-48 rounded-lg mb-4" />
                    <Skeleton className="h-32 w-full rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
