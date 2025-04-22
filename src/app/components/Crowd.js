import Head from 'next/head';
import Image from 'next/image';

export default function Crowd() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Head>
        <title>TensorFollow | AI-Powered Crowd Intelligence</title>
        <meta name="description" content="AI-assisted crowd monitoring and seamless routing in stadiums using TensorFollow algorithms." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src="https://images.squarespace-cdn.com/content/v1/5ccedd5b0cf57d4ffa03d88a/1651682609609-0ABCS4C64JLNK9U0C0XD/02_Public-Eye-Promo%28sm%29.gif?format=2500w"
          alt="AI Stadium Monitoring"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute bottom-0 z-20 w-full p-8 md:p-16 text-white">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Seamless Stadium Navigation</h1>
            <p className="text-lg md:text-xl max-w-3xl">
              AI-assisted crowd monitoring to guide visitors from entrance to seat — faster, safer, smarter.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">About the Project</h2>
        <p className="text-lg leading-relaxed max-w-4xl">
          Our system leverages **TensorFollow AI algorithms** to dynamically monitor crowd density and movement patterns in real time.
          From the moment fans enter the stadium, our platform optimally routes them to **parking areas**, **entry gates**, and **seating levels**,
          ensuring minimal congestion and reduced waiting times — even during peak influx.
        </p>
        <p className="text-lg mt-6 max-w-4xl">
          The platform adapts to crowd surges by analyzing zones with **maximum and minimum footfall**, offering real-time guidance on the safest, fastest path through any area in the stadium.
        </p>
        <div className="mt-12 rounded overflow-hidden">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/5ccedd5b0cf57d4ffa03d88a/c98d75cb-eaf7-4e2b-8588-54b80a2c1934/3D+animation.gif"
            alt="TensorFollow AI Demo"
            width={1200}
            height={675}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Key Features</h2>
          <p className="text-lg leading-relaxed max-w-4xl mb-12">
            Designed for real-time decision-making, our system blends AI vision, urban sensing, and crowd analytics to deliver a high-efficiency venue experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-5 rounded shadow">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/5ccedd5b0cf57d4ffa03d88a/849d4eaf-cb75-4e85-a36f-c0947e8cb4b5/Features+-+Directions+-+Dark%402x.png"
                alt="Smart Routing"
                width={500}
                height={500}
                className="w-full h-auto mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">Dynamic Wayfinding</h3>
              <p className="text-sm text-gray-600">Real-time directions based on live crowd flow and congestion analytics.</p>
            </div>
            <div className="bg-white p-5 rounded shadow">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/5ccedd5b0cf57d4ffa03d88a/70f0e564-d9d4-48e1-bc33-3d48247c1d67/Features+-+Crowd+Size%402x.png"
                alt="Crowd Visualization"
                width={500}
                height={500}
                className="w-full h-auto mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">Live Density Mapping</h3>
              <p className="text-sm text-gray-600">Visualize high-traffic and low-density areas across multiple zones.</p>
            </div>
            <div className="bg-white p-5 rounded shadow">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/5ccedd5b0cf57d4ffa03d88a/67177033-d999-4990-87e6-edec750fc0a4/Features+-+Density%402x.png"
                alt="Tensor AI"
                width={500}
                height={500}
                className="w-full h-auto mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">TensorFollow AI</h3>
              <p className="text-sm text-gray-600">Trained on crowd behavior to predict flows and optimize human movement efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">Technology Stack</h2>
            <p className="text-lg leading-relaxed">
              Powered by edge computing and AI, the system integrates:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-700 text-base">
              <li>TensorFlow & YOLO for real-time crowd detection</li>
              <li>RTSP video stream analysis</li>
              <li>Custom pathfinding algorithms with live rerouting</li>
              <li>Secure data collection and GDPR-compliant analytics</li>
            </ul>
          </div>
          <div className="overflow-hidden rounded">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/5ccedd5b0cf57d4ffa03d88a/576d6bd5-438c-4902-836f-3a97f07ea5b6/ValueProp+-+RTSP%402x.png"
              alt="Technology Stack"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Impact & Outcomes</h2>
          <p className="text-lg max-w-4xl mb-12">
            With deployment at multiple football venues, the system has reduced average navigation time by <strong>up to 37%</strong>, decreased crowd bottlenecks, and improved visitor satisfaction scores.
          </p>
          <div className="rounded overflow-hidden">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/5ccedd5b0cf57d4ffa03d88a/c0a66964-8e91-40d9-a40e-ee6bb69bce91/Screen+Shot+2022-12-12+at+12.20.47.png"
              alt="Results Dashboard"
              width={1200}
              height={687}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
