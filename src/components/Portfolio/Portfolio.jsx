import { motion } from "framer-motion";
import repair1 from "../../assets/Portifolio/repair1.jpg";
import repair2 from "../../assets/Portifolio/repair2.jpg";
import repair3 from "../../assets/Portifolio/repair3.jpg";
import repair4 from "../../assets/Portifolio/repair4.jpg";
import repair5 from "../../assets/Portifolio/repair5.jpg";
import repair6 from "../../assets/Portifolio/repair6.jpg";

const portfolioItems = [
  {
    title: "Laptop Repair",
    category: "Hardware Repair",
    image: repair1,
  },
  {
    title: "Phone Repair",
    category: "Mobile Service",
    image: repair2,
  },
  {
    title: "Software Installation",
    category: "IT Support",
    image: repair3,
  },
  {
    title: "Network Setup",
    category: "Networking",
    image: repair4,
  },
  {
    title: "Data Recovery",
    category: "Recovery",
    image: repair5,
  },
  {
    title: "System Maintenance",
    category: "Maintenance",
    image: repair6,
  },
];

function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-linear-to-b from-white via-cyan-50 to-sky-50">
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
              className="rounded-2xl overflow-hidden shadow-lg bg-linear-to-b from-white via-cyan-50 to-sky-50 border border-cyan-100"
            >

              <div className="overflow-hidden">

                <motion.img
                  src={item.image}
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