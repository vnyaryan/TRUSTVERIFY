"use client"

import { CheckCircle, XCircle } from "lucide-react"

export default function VerificationPage() {
  const verificationData = [
    {
      document: "PAN CARD",
      status: "VERIFIED",
      isVerified: true,
    },
    {
      document: "AADHAAR CARD",
      status: "VERIFIED",
      isVerified: true,
    },
    {
      document: "PASSPORT",
      status: "NOT VERIFIED",
      isVerified: false,
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Verification</h1>

      <div className="space-y-4">
        {verificationData.map((item, index) => (
          <div
            key={index}
            className={`
              border-2 border-black p-6 rounded-none
              ${item.isVerified ? "bg-gray-50" : "bg-white"}
              flex items-center justify-between
            `}
          >
            <div className="flex items-center gap-3">
              {item.isVerified ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className="text-lg font-medium text-black">{item.document}</span>
            </div>

            <span
              className={`
                text-lg font-semibold
                ${item.isVerified ? "text-green-600" : "text-red-600"}
              `}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
