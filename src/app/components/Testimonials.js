import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      heading: "Finding Parking Made Easy!",
      message:
        "This platform helped me locate the perfect parking spot within minutes. No more driving in circles!",
      author: " William David",
      designation: "Frequent Traveler",
      image: "/avt1.png",
    },
    {
      id: 2,
      heading: "Stress-Free Parking Reservations.",
      message:
        "With this service, I can book my parking in advance, ensuring a hassle-free experience every time.",
      author: "John Oliver",
      designation: "Business Owner",
      image: "/avt15.png",
    },
    {
      id: 3,
      heading: "Affordable and Convenient Parking.",
      message:
        "I love how easy it is to find cost-effective parking spots near my destination. Highly recommended!",
      author: " James Edward",
      designation: "Daily Commuter",
      image: "/avt14.png",
    },
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-5xl font-bold text-gray-900">
          Reviews
        </h2>
        <p className="text-center text-md text-gray-500 mt-2">
          Don’t take our words for it. Here’s what others have to say about us.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-[97%]">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="py-8 flex rounded-3xl">
              <div className="relative flex flex-col h-[300px] max-w-full rounded-3xl border border-gray-200 p-6 transition hover:border-purple-600 hover:shadow-2xl-purple">
                <h3 className="text-sm text-gray-500">{testimonial.heading}</h3>
                <p className="mt-4 text-xl 2xl:text-2xl font-bold text-gray-900 leading-relaxed">
                  {testimonial.message}
                </p>
                <div className="absolute bottom-5 flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4 mt-1">
                    <p className="text-lg text-purple-600 font-bold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.designation}</p>
                  </div>
                </div>
                <div className="absolute bottom-20 right-6">
                  <Image src="/quotation.png" alt="Quotation" width={40} height={40} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
