import Image from "next/image"
import { Clock, MapPin, PhoneCall } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">How It Works</h1>
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Schedule",
              description: "Book a pickup time that works for you through our app or website.",
              icon: <Clock className="h-12 w-12 text-sky-600" />,
            },
            {
              title: "Pickup",
              description: "Our friendly staff will collect your clothes from your doorstep.",
              icon: <MapPin className="h-12 w-12 text-sky-600" />,
            },
            {
              title: "Clean",
              description: "Your clothes are cleaned and cared for by our expert team.",
              icon: <Image src="/cleaning-icon.svg" alt="Cleaning" width={48} height={48} />,
            },
            {
              title: "Deliver",
              description: "We'll return your fresh, clean clothes right to your door.",
              icon: <PhoneCall className="h-12 w-12 text-sky-600" />,
            },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-yellow-100 p-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg mb-4">It's that simple! Experience the convenience of L2 Dry Cleaners today.</p>
          <a
            href="/register"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  )
}

