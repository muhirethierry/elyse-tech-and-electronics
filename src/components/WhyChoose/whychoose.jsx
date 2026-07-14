import {
  Award,
  Clock3,
  Headset,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: <Award size={42} />,
    title: "Professional Service",
    description: "Experienced technicians delivering reliable electronics and IT solutions."
  },
  {
    icon: <Clock3 size={42} />,
    title: "Fast Turnaround",
    description: "Quick diagnostics and repairs to minimize downtime."
  },
  {
    icon: <ShieldCheck size={42} />,
    title: "Trusted Quality",
    description: "Quality workmanship and careful handling of every device."
  },
  {
    icon: <Headset size={42} />,
    title: "Customer Support",
    description: "Friendly support before, during, and after every service."
  }
];

function WhyChoose() {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-widest">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Why Customers Trust Elyse Tech
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 text-center hover:bg-cyan-600 transition duration-300"
            >
              <div className="flex justify-center text-cyan-400 mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChoose;