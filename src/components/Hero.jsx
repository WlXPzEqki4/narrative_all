// import React from 'react';

// const Hero = () => {
//   return (
//     <section className="relative flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
//       {/* Top navigation */}
//       <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white shadow-sm">
//         <div className="flex items-center text-lg font-semibold text-gray-700">
//           {/* Location pin icon or similar */}
//           <span>Narrative analysis</span>
//         </div>
//         {/* <div>
//           <a href="#" className="text-gray-700 hover:text-gray-900">
//             Narrative analysis
//           </a>
//         </div> */}
//       </nav>
      
//       {/* Main Hero content */}
//       <div className="px-4">
//         <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
//           Narrative Analysis
//         </h1>
//         <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
//           Explore the most significant diplomatic and cultural venues, from historic sites to modern institutions.
//         </p>
        
//         {/* Category chips */}
//         <div className="mt-6 space-x-2">
//           <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
//             Historical
//           </button>
//           <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
//             Cultural
//           </button>
//           <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
//             Diplomatic
//           </button>
//           <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
//             Educational
//           </button>
//           <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
//             Technological
//           </button>
//         </div>
//       </div>
      
//       {/* Down arrow at the bottom */}
//       <div className="absolute bottom-10 text-gray-600">
//         <svg
//           className="w-6 h-6 animate-bounce"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default Hero;









import React from 'react';

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      {/* Top navigation */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white shadow-sm z-50">
        <div className="flex items-center text-lg font-semibold text-gray-700">
          <span>Narrative analysis</span>
        </div>
        {/* Uncomment if needed:
        <div>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Narrative analysis
          </a>
        </div> */}
      </nav>
      
      {/* Main Hero content */}
      <div className="px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Narrative Analysis
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Exploring a range of modern Narrative Analytic Techniques.
        </p>
        
        {/* Category chips */}
        <div className="mt-6 space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
            Narrative
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
            Topic
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
            Themes
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
            Concept clusters
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
            Fingerprinting
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
            Ideologies
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
            Framing
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
            Sentiment
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300">
            Stakeholders
          </button>
        </div>
      </div>
      
      {/* Down arrow at the bottom */}
      <div className="absolute bottom-10 text-gray-600">
        <svg
          className="w-6 h-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
