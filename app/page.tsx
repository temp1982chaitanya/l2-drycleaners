import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PhoneCall, MapPin, Clock, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/Navbar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-sky-100 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Premium Dry Cleaning Service at Your Doorstep
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We pick up your clothes, clean them with care, and deliver them back to you fresh and clean.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Book Now</Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] relative">
                <Image
                  src="/l2-drycleaning.jpg"
                  alt="Dry cleaning service"
                  width={500}
                  height={500}
                  className="rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a wide range of dry cleaning and laundry services to meet your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  title: "Dry Cleaning",
                  description: "Professional dry cleaning for all your delicate garments.",
                  icon: "👔",
                  price: "₹200/pair",
                },
                {
                  title: "Wash & Fold",
                  description: "Regular laundry service with perfect folding.",
                  icon: "👕",
                  price: "₹150/kg",
                },
                {
                  title: "Express Service",
                  description: "Quick turnaround for urgent cleaning needs.",
                  icon: "⚡",
                  price: "₹300/pair",
                },
                {
                  title: "Stain Removal",
                  description: "Specialized treatment for tough stains.",
                  icon: "🧴",
                  price: "₹100/item",
                },
                {
                  title: "Ironing",
                  description: "Professional pressing and ironing service.",
                  icon: "🔥",
                  price: "₹50/item",
                },
                {
                  title: "Alterations",
                  description: "Basic alterations and repairs for your garments.",
                  icon: "🧵",
                  price: "₹150/item",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border p-6 hover:border-sky-200 hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-gray-500 mt-2">{service.description}</p>
                  <p className="text-sky-600 font-semibold mt-2">{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 bg-sky-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple 4-step process to get your clothes cleaned.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Schedule",
                  description: "Book a pickup time that works for you.",
                  icon: <Clock className="h-10 w-10 text-sky-600" />,
                },
                {
                  title: "Pickup",
                  description: "We'll collect your clothes from your doorstep.",
                  icon: <MapPin className="h-10 w-10 text-sky-600" />,
                },
                {
                  title: "Clean",
                  description: "Your clothes are cleaned with utmost care.",
                  icon: <Image src="/cleaning-icon.svg" alt="Cleaning" width={40} height={40} />,
                },
                {
                  title: "Deliver",
                  description: "Clean clothes delivered back to your doorstep.",
                  icon: <PhoneCall className="h-10 w-10 text-sky-600" />,
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-yellow-100 p-4">{step.icon}</div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-500 mt-2">{step.description}</p>
                  {index < 3 && <ArrowRight className="h-6 w-6 mt-4 text-yellow-400 hidden lg:block" />}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/register">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Book Now</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get in touch with us for any queries or support.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Main Office</h3>
                <p>Office near Charlapally, Hyderabad, India</p>
                <p className="mt-2">Phone: 9849565575</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Branch 1</h3>
                <p>Near ECIL X Roads, Hyderabad, India</p>
                <p className="mt-2">Phone: 9849565575</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Branch 2</h3>
                <p>Uppal, Hyderabad, India</p>
                <p className="mt-2">Phone: 9849565575</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-white py-6">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image src="/blue-lotus-logo.svg" alt="L2 Dry Cleaners Logo" width={60} height={60} className="rounded-full" />
                <span className="text-xl font-bold text-sky-600">L2 Dry Cleaners</span>
              </div>
              <p className="text-gray-500">Premium dry cleaning service at your doorstep.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-500 hover:text-sky-600">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-gray-500 hover:text-sky-600">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-it-works" className="text-gray-500 hover:text-sky-600">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-gray-500 hover:text-sky-600">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-sky-600 mt-0.5" />
                    <span className="text-gray-500">Office near Charlapally, Hyderabad, India</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <PhoneCall className="h-5 w-5 text-sky-600" />
                    <span className="text-gray-500">9849565575</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Subscribe</h3>
              <p className="text-gray-500">Subscribe to our newsletter for updates and offers.</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} L2 Dry Cleaners. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

