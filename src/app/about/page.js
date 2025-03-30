"use client";
import { motion } from "framer-motion";
import { FaCarSide, FaClock, FaShieldAlt, FaConciergeBell } from "react-icons/fa";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import LayoutXPadding from "../components/LayoutXPadding"
import OurStory from "../components/OurStory";

export default function AboutPage() {
  const features = [
    {
      icon: <FaCarSide className="w-8 h-8" />,
      title: "Instant Parking",
      description: "30-second reservations with our AI-powered system"
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Book anytime, anywhere with our mobile-first platform"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure & Insured",
      description: "Fully licensed with $2M liability coverage"
    },
    {
      icon: <FaConciergeBell className="w-8 h-8" />,
      title: "White-Glove Service",
      description: "Professional attendants with 5-star training"
    }
  ];

  return (
    <div className="bg-white">
      <section className="relative  bg-gray-900 text-white">
        <div className="absolute inset-0  bg-[url('/car.png')] bg-cover bg-center" />
        <LayoutXPadding>
          <div className="relative  top-3 z-[70] ">
            <Navbar />
          </div>
        </LayoutXPadding>
        <div className="relative max-w-7xl flex flex-col text-center justify-center mx-auto px-6 py-24 sm:py-32 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Redefining Parking Excellence
            </h1>
            <p className="mt-6 text-xl text-center mx-auto">
              Where cutting-edge technology meets luxury valet service for the modern driver.
            </p>
          
        </div>
      </section>

      {/* Our Story */}
      <OurStory/>

      {/* Features */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The ValetPark Difference
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Why thousands choose us for their premium parking needs
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-blue-50 rounded-lg w-12 h-12 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}