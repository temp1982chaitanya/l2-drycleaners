import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-sky-600 font-semibold">{service.price}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/register">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Book Now</Button>
        </Link>
      </div>
    </div>
  )
}

