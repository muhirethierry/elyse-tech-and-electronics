import { motion } from "framer-motion";

const portfolioItems = [
  {
    title: "Laptop Repair",
    category: "Hardware Repair",
  },
  {
    title: "Phone Repair",
    category: "Mobile Service",
  },
  {
    title: "Software Installation",
    category: "IT Support",
  },
  {
    title: "Network Setup",
    category: "Networking",
  },
  {
    title: "Data Recovery",
    category: "Recovery",
  },
  {
    title: "System Maintenance",
    category: "Maintenance",
  },
];

const imageUrl =
  "https://plus.unsplash.com/premium_photo-1664301887532-328f07bb2c24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-600 uppercase tracking-widest">
            Our Portfolio
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mt-3">
            Recent Projects
          </h2>

          <p className="text-gray-600 mt-5">
            Some of the professional services delivered by Elyse Tech.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {portfolioItems.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="rounded-2xl overflow-hidden shadow-lg bg-white"
            >

              <div className="overflow-hidden">

                <motion.img
                  src={imageUrl}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="text-cyan-600 mt-2 font-medium">
                  {item.category}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Portfolio;