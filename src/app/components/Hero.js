import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative overflow-hidden min-h-[250px] sm:min-h-[400px] md:min-h-[420px] lg:min-h-[500px] xl:min-h-[500px] ">
      <div className="absolute inset-0 -z-10">
          <Image
            src={"/hero-background.png"}
            alt="career-counseling Hero"
            width={1920}
            height={1080}
            className="h-full w-full object-cover hidden sm:block"
          />
        </div>
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-50 text-center sm:px-4">
        <div className="relative top-12 md:top-6 w-[80%] sm:w-[80%] md:w-[70%] lg:w-[64%] xl:w-[60%]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-medium text-black font-satoshi ">
           Effortless Parking Starts Here with 
            <span className="text-indigo-600 font-semibold font-satoshi"> Professional Valet  </span>
            Service!
          </h1>
          <p className="mt-4 text-gray-600 text-xs sm:text-base font-satoshi">
          Save time and enjoy seamless valet service at major venues for ultimate convenience.
          </p>
        
        </div>
      </div>
    </div>
  );
};

export default Hero;