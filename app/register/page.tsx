import { redirect } from "next/navigation"

export default function RegisterPage() {
  // Redirect to the correct signup page
  redirect("/signup")
}
