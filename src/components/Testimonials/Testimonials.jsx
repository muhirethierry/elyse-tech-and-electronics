import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jean Claude",
    service: "Laptop Repair",
    review:
      "Excellent service! My laptop was repaired quickly and works perfectly.",
  },
  {
    name: "Aline Uwase",
    service: "Phone Repair",
    review:
      "Very professional technicians and affordable prices. Highly recommended.",
  },
  {
    name: "Eric Niyonzima",
    service: "Software Installation",
    review:
      "Fast software installation and great customer support.",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-linear-to-b from-slate-50 via-cyan-50 to-white">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <p className="text-cyan-600 uppercase tracking-widest">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition border border-cyan-100"
            >

              <div className="flex mb-4">
                {[1,2,3,4,5].map((star)=>(
                  <Star
                    key={star}
                    size={20}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              <p className="text-gray-600 italic">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-xl">
                  {item.name}
                </h3>

                <p className="text-cyan-600">
                  {item.service}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;