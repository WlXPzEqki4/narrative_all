// import React, { useState } from 'react';

// const IdeologicalThemeViz = () => {
//   // Sample ideological analysis data from the article
//   const [themeData, setThemeData] = useState({
//     // Core value systems identified in the article
//     valueFrameworks: [
//       {
//         id: 1,
//         name: "Environmental Responsibility",
//         description: "Prioritizes ecological sustainability and climate action as moral imperatives",
//         strength: 0.85,
//         evidenceCount: 7,
//         color: "#4CAF50", // Green
//         proponents: ["Government", "Scientists", "Protesters"],
//         opposers: []
//       },
//       {
//         id: 2,
//         name: "Economic Pragmatism",
//         description: "Prioritizes economic stability, jobs, and business interests",
//         strength: 0.75,
//         evidenceCount: 5,
//         color: "#F57C00", // Orange
//         proponents: ["Opposition", "Industry"],
//         opposers: []
//       },
//       {
//         id: 3,
//         name: "Scientific Authority",
//         description: "Defers to scientific expertise and evidence-based decision making",
//         strength: 0.65,
//         evidenceCount: 3,
//         color: "#2196F3", // Blue
//         proponents: ["Government", "Scientists"],
//         opposers: []
//       },
//       {
//         id: 4,
//         name: "Democratic Accountability",
//         description: "Emphasizes government responsiveness to public interests",
//         strength: 0.5,
//         evidenceCount: 2,
//         color: "#9C27B0", // Purple
//         proponents: ["Protesters"],
//         opposers: []
//       },
//       {
//         id: 5,
//         name: "Political Pragmatism",
//         description: "Focuses on electoral consequences and political positioning",
//         strength: 0.4,
//         evidenceCount: 1,
//         color: "#607D8B", // Blue-gray
//         proponents: ["Media"],
//         opposers: []
//       }
//     ],
//     // Specific ideological markers found in the text
//     ideologicalMarkers: [
//       {
//         id: 1,
//         text: "climate crisis",
//         valueFramework: 1,
//         type: "Terminology",
//         explanation: "Frames climate change as an urgent emergency requiring immediate action",
//         alternativeFramings: ["climate change", "global warming", "weather patterns"],
//         paragraph: 2
//       },
//       {
//         id: 2,
//         text: "We can no longer afford inaction",
//         valueFramework: 1,
//         type: "Presupposition",
//         explanation: "Presupposes that action is necessary and delay is harmful",
//         alternativeFramings: ["We should consider our options", "We need to balance priorities"],
//         paragraph: 2
//       },
//       {
//         id: 3,
//         text: "devastate our industrial sectors",
//         valueFramework: 2,
//         type: "Metaphor",
//         explanation: "Uses catastrophic language to frame economic impacts",
//         alternativeFramings: ["affect our industrial sectors", "require industrial adaptation"],
//         paragraph: 3
//       },
//       {
//         id: 4,
//         text: "burden taxpayers",
//         valueFramework: 2,
//         type: "Loaded Language",
//         explanation: "Frames costs as unfair impositions rather than investments",
//         alternativeFramings: ["require investment from", "be funded by"],
//         paragraph: 3
//       },
//       {
//         id: 5,
//         text: "research findings indicate is necessary",
//         valueFramework: 3,
//         type: "Authority Appeal",
//         explanation: "Positions scientific findings as determinants of policy necessity",
//         alternativeFramings: ["research suggests might be beneficial", "some studies support"],
//         paragraph: 5
//       },
//       {
//         id: 6,
//         text: "Actions Not Words",
//         valueFramework: 4,
//         type: "Slogan",
//         explanation: "Frames government accountability as requiring concrete action over rhetoric",
//         alternativeFramings: ["Thoughtful Policy", "Balanced Approach"],
//         paragraph: 4
//       },
//       {
//         id: 7,
//         text: "central issue in next year's election campaign",
//         valueFramework: 5,
//         type: "Political Framing",
//         explanation: "Frames climate policy primarily as electoral strategy",
//         alternativeFramings: ["long-term policy challenge", "national priority"],
//         paragraph: 6
//       },
//       {
//         id: 8,
//         text: "the most significant environmental initiative in our country's history",
//         valueFramework: 1,
//         type: "Historical Framing",
//         explanation: "Uses historical superlative to emphasize environmental importance",
//         alternativeFramings: ["an important policy change", "a new approach to environmental issues"],
//         paragraph: 8
//       }
//     ],
//     // Ideological binaries/tensions in the text
//     binaryOppositions: [
//       {
//         id: 1,
//         opposition: "Environmental Protection vs. Economic Growth",
//         description: "Presents environmental action and economic prosperity as competing rather than compatible goals",
//         evidenceA: ["climate crisis", "addressing... urgency", "necessary"],
//         evidenceB: ["devastate industrial sectors", "burden taxpayers", "job losses", "economic disruption"],
//         paragraphs: [2, 3, 7]
//       },
//       {
//         id: 2,
//         opposition: "Scientific Expertise vs. Political/Economic Interests",
//         description: "Positions scientific judgment against political and economic considerations",
//         evidenceA: ["research findings indicate is necessary", "lead climate researcher"],
//         evidenceB: ["election campaign", "criticized specific elements", "accelerated timeline"],
//         paragraphs: [5, 6, 7]
//       },
//       {
//         id: 3,
//         opposition: "Government Action vs. Public Oversight",
//         description: "Contrasts government initiatives with public demands for accountability",
//         evidenceA: ["Government announced", "the Government defended its approach"],
//         evidenceB: ["Actions Not Words", "Fund Our Future", "protesters demonstrated against"],
//         paragraphs: [1, 4, 8]
//       }
//     ],
//     // Presuppositions: what knowledge is assumed rather than stated
//     presuppositions: [
//       {
//         id: 1,
//         presupposition: "Climate change requires government intervention",
//         explanation: "The article never questions whether government should act on climate, only how",
//         evidence: "Framing focuses on policy specifics rather than whether government action is appropriate",
//         paragraphs: [1, 2, 8]
//       },
//       {
//         id: 2,
//         presupposition: "Economic impacts are measurable and predictable",
//         explanation: "Both sides assume they can accurately predict economic consequences",
//         evidence: "\"will devastate\", \"will create substantial economic disruption\"",
//         paragraphs: [3, 7]
//       },
//       {
//         id: 3,
//         presupposition: "Scientific consensus exists on climate targets",
//         explanation: "Scientists' position is presented as unified rather than debated",
//         evidence: "\"largely supported\", \"align with what our research findings indicate is necessary\"",
//         paragraphs: [5]
//       },
//       {
//         id: 4,
//         presupposition: "Climate policy is electorally significant",
//         explanation: "Assumes voters care enough about climate to influence voting decisions",
//         evidence: "\"could become a central issue in next year's election campaign\"",
//         paragraphs: [6]
//       }
//     ]
//   });

//   // Get width percentage based on strength
//   const getWidthPercentage = (strength) => {
//     return `${Math.round(strength * 100)}%`;
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-4 text-center">Ideological Theme Analysis</h1>
      
//       {/* Value Frameworks Section */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Underlying Value Frameworks</h2>
//         <div className="space-y-4">
//           {themeData.valueFrameworks.map(framework => (
//             <div 
//               key={framework.id} 
//               className="border rounded-lg overflow-hidden"
//               style={{ borderColor: framework.color }}
//             >
//               <div 
//                 className="p-3 text-white font-medium"
//                 style={{ backgroundColor: framework.color }}
//               >
//                 {framework.name}
//                 <span className="float-right text-sm">
//                   Strength: {Math.round(framework.strength * 100)}%
//                 </span>
//               </div>
              
//               <div className="p-4">
//                 <div className="text-sm mb-3">{framework.description}</div>
                
//                 <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
//                   <div 
//                     className="h-2 rounded-full" 
//                     style={{ 
//                       width: getWidthPercentage(framework.strength),
//                       backgroundColor: framework.color 
//                     }}
//                   ></div>
//                 </div>
                
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   <div className="text-sm font-medium mr-1">Proponents:</div>
//                   {framework.proponents.map((proponent, index) => (
//                     <span 
//                       key={index} 
//                       className="px-2 py-1 text-xs rounded-full text-white"
//                       style={{ backgroundColor: framework.color }}
//                     >
//                       {proponent}
//                     </span>
//                   ))}
//                 </div>
                
//                 <div className="text-xs text-gray-600">
//                   Based on {framework.evidenceCount} textual indicators
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Ideological Binary Oppositions */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Ideological Binary Oppositions</h2>
        
//         <div className="space-y-6">
//           {themeData.binaryOppositions.map(opposition => (
//             <div key={opposition.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//               <h3 className="font-medium text-lg mb-2">{opposition.opposition}</h3>
//               <p className="text-sm mb-3">{opposition.description}</p>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//                   <div className="font-medium text-sm mb-2 text-blue-800">Position A</div>
//                   <ul className="list-disc list-inside text-sm space-y-1">
//                     {opposition.evidenceA.map((evidence, index) => (
//                       <li key={index} className="text-gray-700">"{evidence}"</li>
//                     ))}
//                   </ul>
//                 </div>
                
//                 <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
//                   <div className="font-medium text-sm mb-2 text-orange-800">Position B</div>
//                   <ul className="list-disc list-inside text-sm space-y-1">
//                     {opposition.evidenceB.map((evidence, index) => (
//                       <li key={index} className="text-gray-700">"{evidence}"</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
              
//               <div className="text-xs text-gray-500 mt-2">
//                 Appears in paragraphs: {opposition.paragraphs.join(", ")}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Ideological Markers in Text */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Ideological Markers in Text</h2>
        
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="border px-4 py-2 text-left text-sm font-medium text-gray-500">Text</th>
//                 <th className="border px-4 py-2 text-left text-sm font-medium text-gray-500">Value Framework</th>
//                 <th className="border px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
//                 <th className="border px-4 py-2 text-left text-sm font-medium text-gray-500">Explanation</th>
//                 <th className="border px-4 py-2 text-left text-sm font-medium text-gray-500">Alternative Framings</th>
//               </tr>
//             </thead>
//             <tbody>
//               {themeData.ideologicalMarkers.map(marker => {
//                 const framework = themeData.valueFrameworks.find(f => f.id === marker.valueFramework);
                
//                 return (
//                   <tr key={marker.id} className="hover:bg-gray-50">
//                     <td className="border px-4 py-2 text-sm">
//                       <span className="font-medium">"{marker.text}"</span>
//                       <span className="text-xs text-gray-500 ml-1">(P{marker.paragraph})</span>
//                     </td>
//                     <td className="border px-4 py-2">
//                       <span 
//                         className="inline-block px-2 py-1 rounded-full text-xs text-white"
//                         style={{ backgroundColor: framework.color }}
//                       >
//                         {framework.name}
//                       </span>
//                     </td>
//                     <td className="border px-4 py-2 text-sm">{marker.type}</td>
//                     <td className="border px-4 py-2 text-sm">{marker.explanation}</td>
//                     <td className="border px-4 py-2 text-sm">
//                       <ul className="list-disc list-inside text-xs text-gray-600">
//                         {marker.alternativeFramings.map((alt, index) => (
//                           <li key={index}>"{alt}"</li>
//                         ))}
//                       </ul>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
      
//       {/* Presuppositions */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Unquestioned Assumptions & Presuppositions</h2>
        
//         <div className="space-y-4">
//           {themeData.presuppositions.map(presupposition => (
//             <div key={presupposition.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//               <h3 className="font-medium mb-2">{presupposition.presupposition}</h3>
//               <p className="text-sm mb-2">{presupposition.explanation}</p>
//               <div className="text-sm italic border-l-2 border-gray-300 pl-3">
//                 Evidence: {presupposition.evidence}
//               </div>
//               <div className="text-xs text-gray-500 mt-2">
//                 Found in paragraphs: {presupposition.paragraphs.join(", ")}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* How to Interpret */}
//       <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
//         <h3 className="font-medium mb-2">How to Interpret This Visualization:</h3>
//         <ul className="list-disc ml-5 space-y-1">
//           <li>The Value Frameworks section identifies the major ideological systems that structure how the story is told and understood.</li>
//           <li>The Binary Oppositions section reveals how the article positions certain values or interests against each other, creating ideological tensions.</li>
//           <li>The Ideological Markers section highlights specific language choices that reflect underlying values and assumptions.</li>
//           <li>The Presuppositions section exposes what knowledge or values are taken for granted rather than explicitly stated or questioned.</li>
//           <li>Together, these elements reveal the implicit worldviews that shape how the news is presented and how readers are guided to interpret events.</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default IdeologicalThemeViz;






import React, { useState } from 'react';

const IdeologicalThemeViz = () => {
  // Sample ideological analysis data from the article
  const [themeData] = useState({
    // Core value systems identified in the article
    valueFrameworks: [
      {
        id: 1,
        name: "Environmental Responsibility",
        // Changed "Prioritizes" → "Prioritises"
        description: "Prioritises ecological sustainability and climate action as moral imperatives",
        strength: 0.85,
        evidenceCount: 7,
        color: "#4CAF50", // Green
        proponents: ["Government", "Scientists", "Protesters"],
        opposers: []
      },
      {
        id: 2,
        name: "Economic Pragmatism",
        description: "Prioritises economic stability, jobs, and business interests",
        strength: 0.75,
        evidenceCount: 5,
        color: "#F57C00", // Orange
        proponents: ["Opposition", "Industry"],
        opposers: []
      },
      {
        id: 3,
        name: "Scientific Authority",
        description: "Defers to scientific expertise and evidence-based decision-making",
        strength: 0.65,
        evidenceCount: 3,
        color: "#2196F3", // Blue
        proponents: ["Government", "Scientists"],
        opposers: []
      },
      {
        id: 4,
        name: "Democratic Accountability",
        // Changed "Emphasizes" → "Emphasises"
        description: "Emphasises government responsiveness to public interests",
        strength: 0.5,
        evidenceCount: 2,
        color: "#9C27B0", // Purple
        proponents: ["Protesters"],
        opposers: []
      },
      {
        id: 5,
        name: "Political Pragmatism",
        // "Focuses" is already correct in both dialects
        description: "Focuses on electoral consequences and political positioning",
        strength: 0.4,
        evidenceCount: 1,
        color: "#607D8B", // Blue-gray
        proponents: ["Media"],
        opposers: []
      }
    ],
    // Specific ideological markers found in the text
    ideologicalMarkers: [
      {
        id: 1,
        text: "climate crisis",
        valueFramework: 1,
        type: "Terminology",
        explanation: "Frames climate change as an urgent emergency requiring immediate action",
        alternativeFramings: ["climate change", "global warming", "weather patterns"],
        paragraph: 2
      },
      {
        id: 2,
        text: "We can no longer afford inaction",
        valueFramework: 1,
        type: "Presupposition",
        explanation: "Presupposes that action is necessary and delay is harmful",
        alternativeFramings: ["We should consider our options", "We need to balance priorities"],
        paragraph: 2
      },
      {
        id: 3,
        text: "devastate our industrial sectors",
        valueFramework: 2,
        type: "Metaphor",
        explanation: "Uses catastrophic language to frame economic impacts",
        alternativeFramings: ["affect our industrial sectors", "require industrial adaptation"],
        paragraph: 3
      },
      {
        id: 4,
        text: "burden taxpayers",
        valueFramework: 2,
        type: "Loaded Language",
        explanation: "Frames costs as unfair impositions rather than investments",
        alternativeFramings: ["require investment from", "be funded by"],
        paragraph: 3
      },
      {
        id: 5,
        text: "research findings indicate is necessary",
        valueFramework: 3,
        type: "Authority Appeal",
        explanation: "Positions scientific findings as determinants of policy necessity",
        alternativeFramings: ["research suggests might be beneficial", "some studies support"],
        paragraph: 5
      },
      {
        id: 6,
        text: "Actions Not Words",
        valueFramework: 4,
        type: "Slogan",
        explanation: "Frames government accountability as requiring concrete action over rhetoric",
        alternativeFramings: ["Thoughtful Policy", "Balanced Approach"],
        paragraph: 4
      },
      {
        id: 7,
        text: "central issue in next year's election campaign",
        valueFramework: 5,
        type: "Political Framing",
        explanation: "Frames climate policy primarily as electoral strategy",
        alternativeFramings: ["long-term policy challenge", "national priority"],
        paragraph: 6
      },
      {
        id: 8,
        text: "the most significant environmental initiative in our country's history",
        valueFramework: 1,
        type: "Historical Framing",
        explanation: "Uses historical superlative to emphasise environmental importance",
        alternativeFramings: ["an important policy change", "a new approach to environmental issues"],
        paragraph: 8
      }
    ],
    // Ideological binaries/tensions in the text
    binaryOppositions: [
      {
        id: 1,
        opposition: "Environmental Protection vs. Economic Growth",
        description: "Presents environmental action and economic prosperity as competing rather than compatible goals",
        evidenceA: ["climate crisis", "addressing... urgency", "necessary"],
        evidenceB: ["devastate industrial sectors", "burden taxpayers", "job losses", "economic disruption"],
        paragraphs: [2, 3, 7]
      },
      {
        id: 2,
        opposition: "Scientific Expertise vs. Political/Economic Interests",
        description: "Positions scientific judgement against political and economic considerations",
        evidenceA: ["research findings indicate is necessary", "lead climate researcher"],
        evidenceB: ["election campaign", "criticized specific elements", "accelerated timeline"],
        paragraphs: [5, 6, 7]
      },
      {
        id: 3,
        opposition: "Government Action vs. Public Oversight",
        description: "Contrasts government initiatives with public demands for accountability",
        evidenceA: ["Government announced", "the Government defended its approach"],
        evidenceB: ["Actions Not Words", "Fund Our Future", "protesters demonstrated against"],
        paragraphs: [1, 4, 8]
      }
    ],
    // Presuppositions: what knowledge is assumed rather than stated
    presuppositions: [
      {
        id: 1,
        presupposition: "Climate change requires government intervention",
        explanation: "The article never questions whether government should act on climate, only how",
        evidence: "Framing focuses on policy specifics rather than whether government action is appropriate",
        paragraphs: [1, 2, 8]
      },
      {
        id: 2,
        presupposition: "Economic impacts are measurable and predictable",
        explanation: "Both sides assume they can accurately predict economic consequences",
        evidence: "\"will devastate\", \"will create substantial economic disruption\"",
        paragraphs: [3, 7]
      },
      {
        id: 3,
        presupposition: "Scientific consensus exists on climate targets",
        explanation: "Scientists' position is presented as unified rather than debated",
        evidence: "\"largely supported\", \"align with what our research findings indicate is necessary\"",
        paragraphs: [5]
      },
      {
        id: 4,
        presupposition: "Climate policy is electorally significant",
        explanation: "Assumes voters care enough about climate to influence voting decisions",
        evidence: "\"could become a central issue in next year's election campaign\"",
        paragraphs: [6]
      }
    ]
  });

  // Get width percentage based on strength
  const getWidthPercentage = (strength) => {
    return `${Math.round(strength * 100)}%`;
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Main Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Ideological Theme Analysis
      </h2>

      {/* Main Content Box */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        
        {/* Value Frameworks Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Underlying Value Frameworks</h3>
          <div className="space-y-4">
            {themeData.valueFrameworks.map((framework) => (
              <div
                key={framework.id}
                className="border rounded-lg overflow-hidden"
                style={{ borderColor: framework.color }}
              >
                <div
                  className="p-3 text-white font-medium"
                  style={{ backgroundColor: framework.color }}
                >
                  {framework.name}
                  <span className="float-right text-sm">
                    Strength: {Math.round(framework.strength * 100)}%
                  </span>
                </div>

                <div className="p-4">
                  <div className="text-sm mb-3">{framework.description}</div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: getWidthPercentage(framework.strength),
                        backgroundColor: framework.color,
                      }}
                    ></div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="text-sm font-medium mr-1">Proponents:</div>
                    {framework.proponents.map((proponent, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: framework.color }}
                      >
                        {proponent}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-gray-600">
                    Based on {framework.evidenceCount} textual indicators
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ideological Binary Oppositions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Ideological Binary Oppositions</h3>
          <div className="space-y-6">
            {themeData.binaryOppositions.map((opposition) => (
              <div
                key={opposition.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <h4 className="font-medium text-lg mb-2">{opposition.opposition}</h4>
                <p className="text-sm mb-3">{opposition.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="font-medium text-sm mb-2 text-blue-800">Position A</div>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {opposition.evidenceA.map((evidence, index) => (
                        <li key={index} className="text-gray-700">
                          "{evidence}"
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <div className="font-medium text-sm mb-2 text-orange-800">Position B</div>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {opposition.evidenceB.map((evidence, index) => (
                        <li key={index} className="text-gray-700">
                          "{evidence}"
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  Appears in paragraphs: {opposition.paragraphs.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ideological Markers in Text */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Ideological Markers in Text</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Text
                  </th>
                  <th className="border px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Value Framework
                  </th>
                  <th className="border px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Type
                  </th>
                  <th className="border px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Explanation
                  </th>
                  <th className="border px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Alternative Framings
                  </th>
                </tr>
              </thead>
              <tbody>
                {themeData.ideologicalMarkers.map((marker) => {
                  const framework = themeData.valueFrameworks.find(
                    (f) => f.id === marker.valueFramework
                  );

                  return (
                    <tr key={marker.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2 text-sm">
                        <span className="font-medium">"{marker.text}"</span>
                        <span className="text-xs text-gray-500 ml-1">
                          (P{marker.paragraph})
                        </span>
                      </td>
                      <td className="border px-4 py-2">
                        <span
                          className="inline-block px-2 py-1 rounded-full text-xs text-white"
                          style={{ backgroundColor: framework.color }}
                        >
                          {framework.name}
                        </span>
                      </td>
                      <td className="border px-4 py-2 text-sm">{marker.type}</td>
                      <td className="border px-4 py-2 text-sm">{marker.explanation}</td>
                      <td className="border px-4 py-2 text-sm">
                        <ul className="list-disc list-inside text-xs text-gray-600">
                          {marker.alternativeFramings.map((alt, index) => (
                            <li key={index}>"{alt}"</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Presuppositions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Unquestioned Assumptions & Presuppositions</h3>
          <div className="space-y-4">
            {themeData.presuppositions.map((presupposition) => (
              <div
                key={presupposition.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <h4 className="font-medium mb-2">{presupposition.presupposition}</h4>
                <p className="text-sm mb-2">{presupposition.explanation}</p>
                <div className="text-sm italic border-l-2 border-gray-300 pl-3">
                  Evidence: {presupposition.evidence}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Found in paragraphs: {presupposition.paragraphs.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Guide (Separate Box) */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
        <h3 className="text-xl font-semibold mb-2">User Guide</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>
            The <strong>Value Frameworks</strong> section identifies the major ideological 
            systems that structure how the story is told and understood.
          </li>
          <li>
            The <strong>Binary Oppositions</strong> section reveals how the article positions 
            certain values or interests against each other, creating ideological tensions.
          </li>
          <li>
            The <strong>Ideological Markers</strong> section highlights specific language 
            choices that reflect underlying values and assumptions.
          </li>
          <li>
            The <strong>Presuppositions</strong> section exposes what knowledge or values 
            are taken for granted rather than explicitly stated or questioned.
          </li>
          <li>
            Together, these elements reveal the implicit worldviews that shape how the news 
            is presented and how readers are guided to interpret events.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IdeologicalThemeViz;





























