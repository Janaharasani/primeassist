"use client";
import { motion } from "framer-motion";
import { FaCarSide } from "react-icons/fa";

const OurStory = () => {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Vision
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Founded in 2023, ValetPark emerged from a simple observation: premium parking 
              shouldn't require premium effort. We've transformed urban parking through our 
              proprietary AI dispatch system and concierge-trained attendants.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-600 rounded-lg p-2">
                  <FaCarSide className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">100,000+ Vehicles Parked</h3>
                  <p className="mt-2 text-gray-600">
                    With a 99.7% customer satisfaction rate across major metropolitan areas.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="/team.png"
              alt="Professional valet team"
              className="rounded-xl shadow-2xl aspect-[16/10] w-full object-cover"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-lg shadow-lg w-3/4">
              <h3 className="text-lg font-semibold text-gray-900">Industry Recognition</h3>
              <p className="mt-2 text-gray-600">
                2024 Parking Innovation Award winner for AI integration
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;