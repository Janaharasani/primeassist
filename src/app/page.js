import ValetBookingForm from "./components/ValetBookingForm";
import  Footer from "./components/Footer";
import StadiumScene from '@/app/components/Stadium/StadiumScene';
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Image from "next/image";
import LayoutXPadding from "./components/LayoutXPadding"
import Testimonials from "./components/Testimonials";
import OurStory from "./components/OurStory";

export default function Home() {  


  return (
       <div>
          <div className="relative  pt-5">
        <div className="absolute inset-0 -z-10">
          <Image
                      src={"/hero-background.png"}
                      alt="career-counseling Hero"
                      width={1920}
                      height={1080}
                      className="h-full w-full object-cover hidden sm:block"
                    />
        </div>

        <LayoutXPadding>
          <div className="relative z-[70]">
            <Navbar />
          </div>
        </LayoutXPadding>

        <Hero/>
      </div>
       <div className="hidden sm:block">
       <StadiumScene  />
       </div>
       <OurStory/>
        <Testimonials/>
        <Footer/>
        </div>

    
  );
}