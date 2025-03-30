
import ValetBookingForm from "../components/ValetBookingForm";
import  Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Image from "next/image";
import LayoutXPadding from "../components/LayoutXPadding"


export default function Home() {  


  return (
       <div>
        <LayoutXPadding>
          <div className="relative top-6">
            <Navbar />
          </div>
        </LayoutXPadding>

        <ValetBookingForm/>
        <Footer/>
        </div>

    
  );
}




