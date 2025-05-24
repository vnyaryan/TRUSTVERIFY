export async function GET() {
  return Response.json({
    success: true,
    message: "TrustVerify API - App Router Implementation",
    version: "2.0",
    router: "App Router",
    endpoints: {
      test: "/api/test",
      database: "/api/test-db",
      signup: "/api/auth/signup",
      login: "/api/auth/login",
    },
    timestamp: new Date().toISOString(),
  })
}
