import ValetBookingForm from "./components/ValetBookingForm";
import Head from 'next/head';
import StadiumScene from '@/app/components/Stadium/StadiumScene';
import  Chatbot from './components/Chatbot';
import Hero from "./components/Hero";

export default function Home() {  


  return (
       <div>
       <Hero/>
       <StadiumScene  />
        <ValetBookingForm/>
        <Chatbot/>
        </div>

    
  );
}