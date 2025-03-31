import Image from 'next/image';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const FoundersSection = () => {
  const founders = [
    {
      name: "Shaurya Rawat",
      role: "Co-Founder",
      image: "/images/shaurubsdk.jpeg",
      linkedin: "https://www.linkedin.com/in/shaurya-rawat-37136a28b/",
      github: "https://github.com/ShauryaRawat27"
    },
    {
        name: "Laksh Raj",
        role: "Co-Founder",
        image: "/images/pitaji.jpg",
        linkedin: "https://www.linkedin.com/in/laksh-raj-9bb6b2274/",
        github: "https://github.com/Lakshraj99"
      },
    {
      name: "Abhinav Singh",
      role: "Co-Founder",
      image: "/images/abhi9.jpeg",
      linkedin: "https://www.linkedin.com/in/abhinav-singh-405a932b6/",
      github: "https://github.com/abhiiii9av"
    }

  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center py-20">
      {/* Background image with opaque overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/travelbg.jpg"
            alt="Travel background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-40"></div> {/* Opaque overlay */}
        </div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 flex-grow flex flex-col justify-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Meet Our Founders</h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            The passionate minds behind our mission to transform your travel experiences.
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {founders.map((founder) => (
              <div 
                key={founder.name}
                className="bg-white bg-opacity-90 rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-xl hover:-translate-y-1 w-80 flex flex-col"
              >
                {/* Founder Image */}
                <div className="relative w-full h-60 overflow-hidden rounded-t-lg">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Founder Details */}
                <div className="p-6 flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold text-gray-800">{founder.name}</h3>
                  <p className="text-gray-600 mb-4">{founder.role}</p>
                  
                  {/* Social Links */}
                  <div className="flex space-x-4">
                    <a 
                      href={founder.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      aria-label={`LinkedIn profile of ${founder.name}`}
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a 
                      href={founder.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-gray-600 transition-colors"
                      aria-label={`GitHub profile of ${founder.name}`}
                    >
                      <FaGithub size={24} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
