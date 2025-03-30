
import  Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import LayoutXPadding from "../components/LayoutXPadding";
import Chatbot from "../components/Chatbot";


export default function Home() {  


  return (
       <div>
        <LayoutXPadding>
          <div className="relative top-6">
            <Navbar />
          </div>
        </LayoutXPadding>

        <Chatbot/>
        <Footer/>
        </div>

    
  );
}
