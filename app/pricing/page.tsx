import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Pricing</h1>
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Basic",
            price: "₹499",
            description: "Perfect for occasional dry cleaning needs",
            features: [
              "5 garments per month",
              "Standard 3-day turnaround",
              "Free pickup and delivery",
              "Basic stain removal",
            ],
          },
          {
            title: "Premium",
            price: "₹999",
            description: "Ideal for regular dry cleaning users",
            features: [
              "10 garments per month",
              "48-hour turnaround",
              "Free pickup and delivery",
              "Advanced stain removal",
              "Minor repairs included",
            ],
          },
          {
            title: "VIP",
            price: "₹1999",
            description: "For those who demand the best care for their wardrobe",
            features: [
              "Unlimited garments",
              "24-hour turnaround",
              "Priority pickup and delivery",
              "Expert stain removal",
              "Alterations included",
              "Garment storage service",
            ],
          },
        ].map((plan, index) => (
          <div key={index} className="border rounded-lg p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
            <p className="text-4xl font-bold mb-4">
              {plan.price}
              <span className="text-base font-normal">/month</span>
            </p>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            <ul className="space-y-2 mb-6 flex-grow">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="/register"
              className="block text-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
            >
              Choose Plan
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

