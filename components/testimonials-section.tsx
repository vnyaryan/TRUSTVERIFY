import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ResponsiveImage } from "@/components/ui/responsive-image"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "TrustVerify helped me establish credibility on dating platforms. Sharing my verified profile gave potential partners confidence in who I am.",
      name: "Priya Sharma",
      role: "Software Engineer",
      avatar: "/professional-woman-headshot.png",
    },
    {
      quote:
        "The trust score feature was a game-changer. I could easily share my verified background with matches across different platforms.",
      name: "Rahul Patel",
      role: "Marketing Director",
      avatar: "/professional-man-headshot.png",
    },
    {
      quote:
        "As someone concerned about safety in online dating, TrustVerify gave me peace of mind when connecting with new people.",
      name: "Ananya Gupta",
      role: "Healthcare Professional",
      avatar: "/professional-woman-portrait.png",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Success Stories</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from users who built trust through our verification platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border shadow-sm">
              <CardContent className="p-6">
                <p className="text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 p-6 pt-0">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <ResponsiveImage
                    src={testimonial.avatar}
                    width={40}
                    height={40}
                    alt={testimonial.name}
                    className="w-full h-full"
                    objectFit="cover"
                    fallbackSrc="/thoughtful-artist.png"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
