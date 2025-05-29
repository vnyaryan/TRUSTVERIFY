import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function ShareLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-9 w-[150px]" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-[300px] mb-2" />
          <Skeleton className="h-5 w-[400px]" />
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-50 p-4">
                    <Skeleton className="h-6 w-[120px]" />
                  </th>
                  <th className="border border-gray-300 bg-gray-50 p-4">
                    <Skeleton className="h-6 w-[150px]" />
                  </th>
                  <th className="border border-gray-300 bg-gray-50 p-4">
                    <Skeleton className="h-6 w-[150px]" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-4">
                    <Skeleton className="h-6 w-[80px]" />
                  </td>
                  <td className="border border-gray-300 p-4">
                    <Skeleton className="h-10 w-full" />
                  </td>
                  <td className="border border-gray-300 p-4">
                    <Skeleton className="h-10 w-full" />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">
                    <Skeleton className="h-6 w-[80px]" />
                  </td>
                  <td className="border border-gray-300 p-4 text-center">
                    <Skeleton className="h-5 w-5 mx-auto" />
                  </td>
                  <td className="border border-gray-300 p-4 text-center">
                    <Skeleton className="h-5 w-5 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">
                    <Skeleton className="h-6 w-[80px]" />
                  </td>
                  <td className="border border-gray-300 p-4 text-center">
                    <Skeleton className="h-5 w-5 mx-auto" />
                  </td>
                  <td className="border border-gray-300 p-4 text-center">
                    <Skeleton className="h-5 w-5 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[150px]" />
        </CardFooter>
      </Card>
    </div>
  )
}
