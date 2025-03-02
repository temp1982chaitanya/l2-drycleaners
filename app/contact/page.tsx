import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const locations = [
    {
      name: "Main Office",
      address: "Office near Charlapally, Hyderabad, India",
      phone: "9849565575",
      email: "info@l2drycleaners.com",
      hours: "Mon-Sat: 9:00 AM - 8:00 PM",
    },
    {
      name: "ECIL Branch",
      address: "Near ECIL X Roads, Hyderabad, India",
      phone: "9849565575",
      email: "ecil@l2drycleaners.com",
      hours: "Mon-Sat: 9:00 AM - 8:00 PM",
    },
    {
      name: "Uppal Branch",
      address: "Uppal, Hyderabad, India",
      phone: "9849565575",
      email: "uppal@l2drycleaners.com",
      hours: "Mon-Sat: 9:00 AM - 8:00 PM",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map((location, index) => (
          <div key={index} className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">{location.name}</h2>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sky-600 mt-1" />
              <p>{location.address}</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-sky-600" />
              <p>{location.phone}</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-sky-600" />
              <p>{location.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-sky-600" />
              <p>{location.hours}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-4">
          Have questions about our services? Feel free to reach out to us through any of our branches or send us an
          email. We typically respond within 24 hours.
        </p>
        <p className="text-gray-600">
          For emergency requests or same-day service, please call us directly at any of our locations.
        </p>
      </div>
    </div>
  )
}

