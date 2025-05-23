"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ImageDebugger() {
  const [imagePath, setImagePath] = useState("/2ND-IMAGE.png")
  const [imageStatus, setImageStatus] = useState<"loading" | "success" | "error">("loading")

  const checkImage = () => {
    setImageStatus("loading")
    const img = new Image()
    img.onload = () => setImageStatus("success")
    img.onerror = () => setImageStatus("error")
    img.src = imagePath
  }

  return (
    <Card className="max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle>Image Path Debugger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input value={imagePath} onChange={(e) => setImagePath(e.target.value)} placeholder="Enter image path" />
          <Button onClick={checkImage}>Check</Button>
        </div>
        {imageStatus === "loading" && <p>Checking image...</p>}
        {imageStatus === "success" && (
          <div className="p-2 bg-green-50 text-green-700 rounded">Image exists and can be loaded!</div>
        )}
        {imageStatus === "error" && (
          <div className="p-2 bg-red-50 text-red-700 rounded">
            Error: Image could not be loaded. Check the path and file existence.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
