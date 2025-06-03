import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TrustConnectionDetailLoading() {
  return (
    <div>
      <Skeleton className="h-10 w-40 mb-4" />

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Skeleton className="h-6 w-64 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <Skeleton className="h-4 w-full" />

          <div>
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>
        </CardContent>
        <div className="p-6 flex justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </Card>
    </div>
  )
}
