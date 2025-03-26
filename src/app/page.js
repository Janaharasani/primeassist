import ValetBookingForm from "./components/ValetBookingForm";
import Head from 'next/head';
import StadiumScene from '@/app/components/Stadium/StadiumScene';

export default function Home() {
  return (
       <div>
        <Head>
        <title>3D Stadium</title>
        <meta name="description" content="Interactive 3D Stadium" />
      </Head>
       <StadiumScene />
        <ValetBookingForm/>
        </div>

    
  );
}