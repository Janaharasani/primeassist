import Image from "next/image";


export default function Home() {  
  return (
       <div>
          <Image
                      src={"/hero-background.png"}
                      alt="career-counseling Hero"
                      width={1920}
                      height={1080}
                      className="h-full w-full object-cover hidden sm:block"
                    />
        </div>
    
  );
}