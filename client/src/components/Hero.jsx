import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative min-h-screen">

      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex items-center min-h-screen">

        <motion.div
          initial={{ opacity:0,y:50 }}
          animate={{ opacity:1,y:0 }}
          transition={{ duration:0.8 }}
        >

          <h1 className="text-6xl md:text-8xl font-bold leading-tight">

            Drive Your
            <br />

            Dream Car

          </h1>

          <p className="mt-6 text-xl text-gray-300 max-w-xl">
            Rent luxury, sports and economy cars
            at unbeatable prices.
          </p>

          <div className="flex gap-4 mt-8">

            <button className="bg-amber-400 text-black px-8 py-4 rounded-xl font-bold">
              Explore Cars
            </button>

            <button className="border px-8 py-4 rounded-xl">
              Learn More
            </button>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default Hero;