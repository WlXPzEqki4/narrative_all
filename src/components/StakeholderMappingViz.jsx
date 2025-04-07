// import React, { useState } from 'react';

// const StakeholderMappingViz = () => {
//   // Sample stakeholder analysis data from the article
//   const [stakeholderData, setStakeholderData] = useState({
//     stakeholders: [
//       {
//         id: 1,
//         name: "Government",
//         category: "policy maker",
//         individuals: ["Environment Minister Elena Reynolds", "Prime Minister"],
//         textualPower: 0.9, // How strongly their perspective is represented
//         socialPower: 0.95, // Their actual power in the social context
//         articleSpace: 0.3, // Percentage of article space dedicated to them
//         directQuotes: 2,
//         indirectReferences: 3,
//         relationshipToOthers: {
//           "Opposition": "conflict",
//           "Scientists": "alliance",
//           "Protesters": "target of criticism",
//           "Industry": "regulator of",
//           "Media": "information source for"
//         },
//         perspectiveCentered: true,
//         color: "#4285F4" // Blue
//       },
//       {
//         id: 2,
//         name: "Opposition",
//         category: "political actor",
//         individuals: ["Opposition Leader James Wilson"],
//         textualPower: 0.7,
//         socialPower: 0.6,
//         articleSpace: 0.15,
//         directQuotes: 2,
//         indirectReferences: 1,
//         relationshipToOthers: {
//           "Government": "conflict",
//           "Scientists": "neutral",
//           "Protesters": "neutral",
//           "Industry": "alliance",
//           "Media": "information source for"
//         },
//         perspectiveCentered: true,
//         color: "#EA4335" // Red
//       },
//       {
//         id: 3,
//         name: "Scientists",
//         category: "expert",
//         individuals: ["Dr. Sarah Chen", "National Climate Research Institute"],
//         textualPower: 0.75,
//         socialPower: 0.7,
//         articleSpace: 0.15,
//         directQuotes: 2,
//         indirectReferences: 1,
//         relationshipToOthers: {
//           "Government": "alliance",
//           "Opposition": "neutral",
//           "Protesters": "ideological alignment",
//           "Industry": "neutral",
//           "Media": "information source for"
//         },
//         perspectiveCentered: true,
//         color: "#34A853" // Green
//       },
//       {
//         id: 4,
//         name: "Industry",
//         category: "affected stakeholder",
//         individuals: ["Marcus Lee", "National Business Association"],
//         textualPower: 0.6,
//         socialPower: 0.8,
//         articleSpace: 0.1,
//         directQuotes: 1,
//         indirectReferences: 1,
//         relationshipToOthers: {
//           "Government": "regulated by",
//           "Opposition": "alliance",
//           "Scientists": "neutral",
//           "Protesters": "conflict",
//           "Media": "information source for"
//         },
//         perspectiveCentered: false,
//         color: "#FBBC05" // Yellow
//       },
//       {
//         id: 5,
//         name: "Protesters",
//         category: "civil society",
//         individuals: ["EarthFirst", "climate activists"],
//         textualPower: 0.4,
//         socialPower: 0.3,
//         articleSpace: 0.1,
//         directQuotes: 0,
//         indirectReferences: 2,
//         relationshipToOthers: {
//           "Government": "critical of",
//           "Opposition": "neutral",
//           "Scientists": "ideological alignment",
//           "Industry": "conflict",
//           "Media": "information source for"
//         },
//         perspectiveCentered: false,
//         color: "#9C27B0" // Purple
//       },
//       {
//         id: 6,
//         name: "Media",
//         category: "information mediator",
//         individuals: ["political analysts", "national surveys"],
//         textualPower: 0.5,
//         socialPower: 0.7,
//         articleSpace: 0.05,
//         directQuotes: 0,
//         indirectReferences: 2,
//         relationshipToOthers: {
//           "Government": "reports on",
//           "Opposition": "reports on",
//           "Scientists": "reports on",
//           "Industry": "reports on",
//           "Protesters": "reports on"
//         },
//         perspectiveCentered: false,
//         color: "#FF6D00" // Orange
//       },
//       {
//         id: 7,
//         name: "Public",
//         category: "affected stakeholder",
//         individuals: ["taxpayers", "urban and rural populations"],
//         textualPower: 0.2,
//         socialPower: 0.4,
//         articleSpace: 0.05,
//         directQuotes: 0,
//         indirectReferences: 2,
//         relationshipToOthers: {
//           "Government": "governed by",
//           "Opposition": "potential supporters",
//           "Scientists": "neutral",
//           "Industry": "employees/consumers",
//           "Protesters": "subset of",
//           "Media": "audience"
//         },
//         perspectiveCentered: false,
//         color: "#607D8B" // Blue-gray
//       }
//     ],
//     powerDynamics: {
//       representationAxis: {
//         centered: ["Government", "Opposition", "Scientists"],
//         marginalized: ["Protesters", "Industry", "Public"],
//         invisible: ["Low-income communities", "Future generations", "Developing nations"]
//       },
//       powerAxis: {
//         high: ["Government", "Industry"],
//         medium: ["Opposition", "Scientists", "Media"],
//         low: ["Protesters", "Public"]
//       },
//       voicePatterns: {
//         directVoice: ["Government", "Opposition", "Scientists", "Industry"],
//         indirectVoice: ["Protesters", "Media", "Public"],
//         noVoice: ["Low-income communities", "Future generations", "Developing nations"]
//       }
//     },
//     marginalizationPatterns: [
//       {
//         id: 1,
//         pattern: "Absence of direct quotes",
//         affected: ["Protesters", "Public", "Media"],
//         example: "The demonstration, organized by climate activist group EarthFirst, drew approximately 2,000 participants. (No direct quotes from protesters)"
//       },
//       {
//         id: 2,
//         pattern: "Passive voice construction",
//         affected: ["Public", "Protesters"],
//         example: "The demonstration, organized by climate activist group EarthFirst, drew approximately 2,000 participants. (passive voice)"
//       },
//       {
//         id: 3,
//         pattern: "Missing stakeholders",
//         affected: ["Low-income communities", "Global South", "Future generations"],
//         example: "No mention of how climate policy or its economic impacts might differentially affect vulnerable populations"
//       },
//       {
//         id: 4,
//         pattern: "Reduced article space",
//         affected: ["Protesters", "Public", "Media"],
//         example: "Only one paragraph dedicated to protests compared to multiple paragraphs for government and opposition"
//       }
//     ]
//   });

//   // Get size based on a metric (for visualization scaling)
//   const getSize = (value) => {
//     return Math.max(50, value * 150);
//   };

//   // Get width percentage based on a value
//   const getWidthPercentage = (value) => {
//     return `${Math.round(value * 100)}%`;
//   };

//   // Sort stakeholders by social power (descending)
//   const sortedByPower = [...stakeholderData.stakeholders].sort((a, b) => b.socialPower - a.socialPower);
  
//   // Sort stakeholders by textual representation (descending)
//   const sortedByRepresentation = [...stakeholderData.stakeholders].sort((a, b) => b.textualPower - a.textualPower);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-4 text-center">Stakeholder Power Dynamics Analysis</h1>
      
//       {/* Power Dynamics Matrix */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Power-Representation Matrix</h2>
//         <div className="relative h-96 border border-gray-200 rounded-lg bg-gray-50 p-4">
//           {/* Axis labels */}
//           <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 text-sm font-medium" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
//             Social Power
//           </div>
//           <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 text-sm font-medium">
//             Textual Representation
//           </div>
          
//           {/* Quadrant labels */}
//           <div className="absolute top-4 left-4 text-xs text-gray-500">High Power, Low Representation</div>
//           <div className="absolute top-4 right-4 text-xs text-gray-500">High Power, High Representation</div>
//           <div className="absolute bottom-4 left-4 text-xs text-gray-500">Low Power, Low Representation</div>
//           <div className="absolute bottom-4 right-4 text-xs text-gray-500">Low Power, High Representation</div>
          
//           {/* Stakeholder bubbles */}
//           {stakeholderData.stakeholders.map(stakeholder => (
//             <div 
//               key={stakeholder.id}
//               className="absolute rounded-full flex items-center justify-center"
//               style={{
//                 width: `${getSize(stakeholder.articleSpace)}px`,
//                 height: `${getSize(stakeholder.articleSpace)}px`,
//                 backgroundColor: `${stakeholder.color}CC`,
//                 border: stakeholder.perspectiveCentered ? '3px solid black' : 'none',
//                 left: `${stakeholder.textualPower * 100}%`,
//                 top: `${(1 - stakeholder.socialPower) * 100}%`,
//                 transform: 'translate(-50%, -50%)',
//                 transition: 'all 0.3s ease'
//               }}
//             >
//               <div className="text-white text-xs font-medium text-center p-1">
//                 {stakeholder.name}
//                 <div className="text-xs opacity-80">{stakeholder.directQuotes} quotes</div>
//               </div>
//             </div>
//           ))}
          
//           {/* Dividing lines */}
//           <div className="absolute left-1/2 top-0 bottom-0 border-l border-gray-300"></div>
//           <div className="absolute top-1/2 left-0 right-0 border-t border-gray-300"></div>
//         </div>
//         <div className="mt-2 text-xs text-center text-gray-600">
//           Bubble size represents article space allocation. Stakeholders with black borders have centered perspectives.
//         </div>
//       </div>
      
//       {/* Voice Distribution */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Voice Distribution Analysis</h2>
//         <div className="space-y-6">
//           {/* Direct Quotes */}
//           <div>
//             <h3 className="text-lg font-medium mb-2">Direct Voice (Quoted Speech)</h3>
//             <div className="w-full h-8 flex rounded-lg overflow-hidden">
//               {sortedByRepresentation.filter(s => s.directQuotes > 0).map(stakeholder => (
//                 <div 
//                   key={stakeholder.id}
//                   className="h-full flex items-center justify-center text-xs text-white"
//                   style={{ 
//                     backgroundColor: stakeholder.color,
//                     width: `${(stakeholder.directQuotes / sortedByRepresentation.reduce((sum, s) => sum + s.directQuotes, 0)) * 100}%`,
//                     minWidth: stakeholder.directQuotes > 0 ? '40px' : '0'
//                   }}
//                 >
//                   {stakeholder.name}
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Indirect References */}
//           <div>
//             <h3 className="text-lg font-medium mb-2">Indirect Representation</h3>
//             <div className="w-full h-8 flex rounded-lg overflow-hidden">
//               {sortedByRepresentation.map(stakeholder => (
//                 <div 
//                   key={stakeholder.id}
//                   className="h-full flex items-center justify-center text-xs text-white"
//                   style={{ 
//                     backgroundColor: stakeholder.color,
//                     width: `${(stakeholder.indirectReferences / sortedByRepresentation.reduce((sum, s) => sum + s.indirectReferences, 0)) * 100}%`,
//                     minWidth: stakeholder.indirectReferences > 0 ? '40px' : '0'
//                   }}
//                 >
//                   {stakeholder.name}
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Article Space */}
//           <div>
//             <h3 className="text-lg font-medium mb-2">Article Space Allocation</h3>
//             <div className="w-full h-8 flex rounded-lg overflow-hidden">
//               {sortedByRepresentation.map(stakeholder => (
//                 <div 
//                   key={stakeholder.id}
//                   className="h-full flex items-center justify-center text-xs text-white"
//                   style={{ 
//                     backgroundColor: stakeholder.color,
//                     width: getWidthPercentage(stakeholder.articleSpace),
//                     minWidth: '40px'
//                   }}
//                 >
//                   {stakeholder.name}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Relationship Network */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Stakeholder Relationship Network</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="border px-4 py-2 text-sm">Stakeholder</th>
//                 {stakeholderData.stakeholders.map(stakeholder => (
//                   <th 
//                     key={stakeholder.id} 
//                     className="border px-4 py-2 text-sm"
//                     style={{ color: stakeholder.color }}
//                   >
//                     {stakeholder.name}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {stakeholderData.stakeholders.map(stakeholder => (
//                 <tr key={stakeholder.id} className="hover:bg-gray-50">
//                   <td 
//                     className="border px-4 py-2 font-medium text-sm"
//                     style={{ color: stakeholder.color }}
//                   >
//                     {stakeholder.name}
//                   </td>
                  
//                   {stakeholderData.stakeholders.map(otherStakeholder => (
//                     <td key={otherStakeholder.id} className="border px-3 py-2 text-xs">
//                       {stakeholder.id === otherStakeholder.id ? (
//                         <span className="italic text-gray-400">self</span>
//                       ) : (
//                         stakeholder.relationshipToOthers[otherStakeholder.name] || "—"
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
      
//       {/* Marginalization Patterns */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Marginalization & Exclusion Patterns</h2>
        
//         <div className="space-y-4">
//           {stakeholderData.marginalizationPatterns.map(pattern => (
//             <div key={pattern.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//               <h3 className="font-medium mb-2">{pattern.pattern}</h3>
              
//               <div className="mb-2">
//                 <span className="text-sm font-medium">Affects: </span>
//                 <div className="flex flex-wrap gap-1 mt-1">
//                   {pattern.affected.map((stakeholder, index) => {
//                     const stakeObj = stakeholderData.stakeholders.find(s => s.name === stakeholder);
                    
//                     return (
//                       <span 
//                         key={index} 
//                         className="px-2 py-1 text-xs rounded-full text-white"
//                         style={{ backgroundColor: stakeObj ? stakeObj.color : '#888888' }}
//                       >
//                         {stakeholder}
//                       </span>
//                     );
//                   })}
//                 </div>
//               </div>
              
//               <div className="text-sm italic border-l-2 border-gray-300 pl-3 text-gray-700">
//                 Example: {pattern.example}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Missing Perspectives */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Missing Stakeholders & Perspectives</h2>
        
//         <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//           <p className="text-sm mb-3">
//             The following stakeholders are not represented in the article but may have significant interests in the issue:
//           </p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="p-3 bg-gray-100 rounded-lg">
//               <h3 className="font-medium mb-1">Low-income communities</h3>
//               <p className="text-xs">May be disproportionately affected by both climate impacts and policy costs</p>
//             </div>
            
//             <div className="p-3 bg-gray-100 rounded-lg">
//               <h3 className="font-medium mb-1">Future generations</h3>
//               <p className="text-xs">Have significant stake in climate outcomes but no voice in current debate</p>
//             </div>
            
//             <div className="p-3 bg-gray-100 rounded-lg">
//               <h3 className="font-medium mb-1">Developing nations</h3>
//               <p className="text-xs">Often more vulnerable to climate impacts but less represented in policy discussions</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Stakeholder Details */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Stakeholder Profiles</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {stakeholderData.stakeholders.map(stakeholder => (
//             <div 
//               key={stakeholder.id} 
//               className="border rounded-lg overflow-hidden"
//               style={{ borderColor: stakeholder.color }}
//             >
//               <div 
//                 className="p-3 text-white font-medium"
//                 style={{ backgroundColor: stakeholder.color }}
//               >
//                 {stakeholder.name}
//                 <span className="float-right text-sm">
//                   {stakeholder.category}
//                 </span>
//               </div>
              
//               <div className="p-4">
//                 <div className="grid grid-cols-2 gap-4 mb-3">
//                   <div>
//                     <div className="text-sm font-medium mb-1">Textual Power:</div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div 
//                         className="h-2 rounded-full" 
//                         style={{ 
//                           width: getWidthPercentage(stakeholder.textualPower),
//                           backgroundColor: stakeholder.color 
//                         }}
//                       ></div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <div className="text-sm font-medium mb-1">Social Power:</div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div 
//                         className="h-2 rounded-full" 
//                         style={{ 
//                           width: getWidthPercentage(stakeholder.socialPower),
//                           backgroundColor: stakeholder.color 
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="text-sm mb-2">
//                   <span className="font-medium">Represented by:</span> {stakeholder.individuals.join(", ")}
//                 </div>
                
//                 <div className="text-sm mb-2">
//                   <span className="font-medium">Article space:</span> {Math.round(stakeholder.articleSpace * 100)}%
//                 </div>
                
//                 <div className="text-sm">
//                   <span className="font-medium">Voice attribution:</span> {stakeholder.directQuotes} direct quotes, {stakeholder.indirectReferences} indirect references
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* How to Interpret */}
//       <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
//         <h3 className="font-medium mb-2">How to Interpret This Visualization:</h3>
//         <ul className="list-disc ml-5 space-y-1">
//           <li>The Power-Representation Matrix plots stakeholders based on their social power (vertical axis) and textual representation (horizontal axis), revealing which powerful actors might be under- or over-represented.</li>
//           <li>The Voice Distribution Analysis shows how direct quotes, indirect references, and article space are allocated among stakeholders.</li>
//           <li>The Relationship Network maps how different stakeholders are positioned in relation to each other in the narrative.</li>
//           <li>The Marginalization Patterns section identifies how certain stakeholders are subtly deprioritized through linguistic and structural choices.</li>
//           <li>The Missing Stakeholders section highlights perspectives that are completely absent from the discourse.</li>
//           <li>Together, these elements reveal power dynamics in how different actors are represented and whose perspectives are centered or marginalized in the narrative.</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default StakeholderMappingViz;










import React, { useState } from 'react';

const StakeholderMappingViz = () => {
  // Sample stakeholder analysis data from the article
  const [stakeholderData] = useState({
    stakeholders: [
      {
        id: 1,
        name: "Government",
        category: "policy maker",
        individuals: ["Environment Minister Elena Reynolds", "Prime Minister"],
        textualPower: 0.9,
        socialPower: 0.95,
        articleSpace: 0.3,
        directQuotes: 2,
        indirectReferences: 3,
        relationshipToOthers: {
          "Opposition": "conflict",
          "Scientists": "alliance",
          "Protesters": "target of criticism",
          "Industry": "regulator of",
          "Media": "information source for"
        },
        perspectiveCentered: true,
        color: "#4285F4" // Blue
      },
      {
        id: 2,
        name: "Opposition",
        category: "political actor",
        individuals: ["Opposition Leader James Wilson"],
        textualPower: 0.7,
        socialPower: 0.6,
        articleSpace: 0.15,
        directQuotes: 2,
        indirectReferences: 1,
        relationshipToOthers: {
          "Government": "conflict",
          "Scientists": "neutral",
          "Protesters": "neutral",
          "Industry": "alliance",
          "Media": "information source for"
        },
        perspectiveCentered: true,
        color: "#EA4335" // Red
      },
      {
        id: 3,
        name: "Scientists",
        category: "expert",
        individuals: ["Dr. Sarah Chen", "National Climate Research Institute"],
        textualPower: 0.75,
        socialPower: 0.7,
        articleSpace: 0.15,
        directQuotes: 2,
        indirectReferences: 1,
        relationshipToOthers: {
          "Government": "alliance",
          "Opposition": "neutral",
          "Protesters": "ideological alignment",
          "Industry": "neutral",
          "Media": "information source for"
        },
        perspectiveCentered: true,
        color: "#34A853" // Green
      },
      {
        id: 4,
        name: "Industry",
        category: "affected stakeholder",
        individuals: ["Marcus Lee", "National Business Association"],
        textualPower: 0.6,
        socialPower: 0.8,
        articleSpace: 0.1,
        directQuotes: 1,
        indirectReferences: 1,
        relationshipToOthers: {
          "Government": "regulated by",
          "Opposition": "alliance",
          "Scientists": "neutral",
          "Protesters": "conflict",
          "Media": "information source for"
        },
        perspectiveCentered: false,
        color: "#FBBC05" // Yellow
      },
      {
        id: 5,
        name: "Protesters",
        category: "civil society",
        individuals: ["EarthFirst", "climate activists"],
        textualPower: 0.4,
        socialPower: 0.3,
        articleSpace: 0.1,
        directQuotes: 0,
        indirectReferences: 2,
        relationshipToOthers: {
          "Government": "critical of",
          "Opposition": "neutral",
          "Scientists": "ideological alignment",
          "Industry": "conflict",
          "Media": "information source for"
        },
        perspectiveCentered: false,
        color: "#9C27B0" // Purple
      },
      {
        id: 6,
        name: "Media",
        category: "information mediator",
        individuals: ["political analysts", "national surveys"],
        textualPower: 0.5,
        socialPower: 0.7,
        articleSpace: 0.05,
        directQuotes: 0,
        indirectReferences: 2,
        relationshipToOthers: {
          "Government": "reports on",
          "Opposition": "reports on",
          "Scientists": "reports on",
          "Industry": "reports on",
          "Protesters": "reports on"
        },
        perspectiveCentered: false,
        color: "#FF6D00" // Orange
      },
      {
        id: 7,
        name: "Public",
        category: "affected stakeholder",
        individuals: ["taxpayers", "urban and rural populations"],
        textualPower: 0.2,
        socialPower: 0.4,
        articleSpace: 0.05,
        directQuotes: 0,
        indirectReferences: 2,
        relationshipToOthers: {
          "Government": "governed by",
          "Opposition": "potential supporters",
          "Scientists": "neutral",
          "Industry": "employees/consumers",
          "Protesters": "subset of",
          "Media": "audience"
        },
        perspectiveCentered: false,
        color: "#607D8B" // Blue-gray
      }
    ],
    powerDynamics: {
      representationAxis: {
        centered: ["Government", "Opposition", "Scientists"],
        marginalized: ["Protesters", "Industry", "Public"],
        invisible: ["Low-income communities", "Future generations", "Developing nations"]
      },
      powerAxis: {
        high: ["Government", "Industry"],
        medium: ["Opposition", "Scientists", "Media"],
        low: ["Protesters", "Public"]
      },
      voicePatterns: {
        directVoice: ["Government", "Opposition", "Scientists", "Industry"],
        indirectVoice: ["Protesters", "Media", "Public"],
        noVoice: ["Low-income communities", "Future generations", "Developing nations"]
      }
    },
    marginalizationPatterns: [
      {
        id: 1,
        pattern: "Absence of direct quotes",
        affected: ["Protesters", "Public", "Media"],
        example: "The demonstration, organized by climate activist group EarthFirst, drew approximately 2,000 participants. (No direct quotes from protesters)"
      },
      {
        id: 2,
        pattern: "Passive voice construction",
        affected: ["Public", "Protesters"],
        example: "The demonstration, organized by climate activist group EarthFirst, drew approximately 2,000 participants. (passive voice)"
      },
      {
        id: 3,
        pattern: "Missing stakeholders",
        affected: ["Low-income communities", "Global South", "Future generations"],
        example: "No mention of how climate policy or its economic impacts might differentially affect vulnerable populations"
      },
      {
        id: 4,
        pattern: "Reduced article space",
        affected: ["Protesters", "Public", "Media"],
        example: "Only one paragraph dedicated to protests compared to multiple paragraphs for government and opposition"
      }
    ]
  });

  // Utility functions for sizing/scaling
  const getSize = (value) => Math.max(50, value * 150);
  const getWidthPercentage = (value) => `${Math.round(value * 100)}%`;

  // Sort stakeholders by social power (descending)
  const sortedByPower = [...stakeholderData.stakeholders].sort((a, b) => b.socialPower - a.socialPower);
  // Sort stakeholders by textual representation (descending)
  const sortedByRepresentation = [...stakeholderData.stakeholders].sort((a, b) => b.textualPower - a.textualPower);

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Main Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Stakeholder Power Dynamics Analysis
      </h2>

      {/* Main Content Box */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        
        {/* Power-Representation Matrix */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Power-Representation Matrix</h3>
          {/* Increased padding for more space */}
          <div className="relative h-96 border border-gray-200 rounded-lg bg-gray-50 p-8">
            {/* Axis labels */}
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-10 text-sm font-medium"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              Social Power
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 text-sm font-medium">
              Textual Representation
            </div>
            
            {/* Quadrant labels (moved further from edges) */}
            <div className="absolute top-6 left-6 text-xs text-gray-500">
              High Power, Low Representation
            </div>
            <div className="absolute top-6 right-6 text-xs text-gray-500">
              High Power, High Representation
            </div>
            <div className="absolute bottom-6 left-6 text-xs text-gray-500">
              Low Power, Low Representation
            </div>
            <div className="absolute bottom-6 right-6 text-xs text-gray-500">
              Low Power, High Representation
            </div>
            
            {/* Stakeholder bubbles */}
            {stakeholderData.stakeholders.map(stakeholder => (
              <div 
                key={stakeholder.id}
                className="absolute rounded-full flex items-center justify-center"
                style={{
                  width: `${getSize(stakeholder.articleSpace)}px`,
                  height: `${getSize(stakeholder.articleSpace)}px`,
                  backgroundColor: `${stakeholder.color}CC`,
                  border: stakeholder.perspectiveCentered ? '3px solid black' : 'none',
                  left: `${stakeholder.textualPower * 100}%`,
                  top: `${(1 - stakeholder.socialPower) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Changed text colour to black */}
                <div className="text-black text-xs font-medium text-center p-1">
                  {stakeholder.name}
                  <div className="text-xs opacity-80">{stakeholder.directQuotes} quotes</div>
                </div>
              </div>
            ))}
            
            {/* Dividing lines */}
            <div className="absolute left-1/2 top-0 bottom-0 border-l border-gray-300"></div>
            <div className="absolute top-1/2 left-0 right-0 border-t border-gray-300"></div>
          </div>
          <div className="mt-3 text-xs text-center text-gray-600">
            Bubble size represents article space allocation. Stakeholders with black borders have centred perspectives.
          </div>
        </div>
        
        {/* Voice Distribution */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Voice Distribution Analysis</h3>
          <div className="space-y-6">
            {/* Direct Quotes */}
            <div>
              <h4 className="text-lg font-medium mb-2">Direct Voice (Quoted Speech)</h4>
              <div className="w-full h-8 flex rounded-lg overflow-hidden">
                {sortedByRepresentation.filter(s => s.directQuotes > 0).map(stakeholder => (
                  <div 
                    key={stakeholder.id}
                    className="h-full flex items-center justify-center text-xs text-white whitespace-nowrap px-2"
                    style={{ 
                      backgroundColor: stakeholder.color,
                      width: `${
                        (stakeholder.directQuotes /
                          sortedByRepresentation.reduce((sum, s) => sum + s.directQuotes, 0)
                        ) * 100
                      }%`,
                      minWidth: stakeholder.directQuotes > 0 ? '40px' : '0'
                    }}
                  >
                    {stakeholder.name}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Indirect References */}
            <div>
              <h4 className="text-lg font-medium mb-2">Indirect Representation</h4>
              <div className="w-full h-8 flex rounded-lg overflow-hidden">
                {sortedByRepresentation.map(stakeholder => (
                  <div 
                    key={stakeholder.id}
                    className="h-full flex items-center justify-center text-xs text-white whitespace-nowrap px-2"
                    style={{ 
                      backgroundColor: stakeholder.color,
                      width: `${
                        (stakeholder.indirectReferences /
                          sortedByRepresentation.reduce((sum, s) => sum + s.indirectReferences, 0)
                        ) * 100
                      }%`,
                      minWidth: stakeholder.indirectReferences > 0 ? '40px' : '0'
                    }}
                  >
                    {stakeholder.name}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Article Space */}
            <div>
              <h4 className="text-lg font-medium mb-2">Article Space Allocation</h4>
              <div className="w-full h-8 flex rounded-lg overflow-hidden">
                {sortedByRepresentation.map(stakeholder => (
                  <div 
                    key={stakeholder.id}
                    className="h-full flex items-center justify-center text-xs text-white whitespace-nowrap px-2"
                    style={{ 
                      backgroundColor: stakeholder.color,
                      width: getWidthPercentage(stakeholder.articleSpace),
                      minWidth: '40px'
                    }}
                  >
                    {stakeholder.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Relationship Network */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Stakeholder Relationship Network</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-4 py-2 text-sm">Stakeholder</th>
                  {stakeholderData.stakeholders.map(stakeholder => (
                    <th 
                      key={stakeholder.id} 
                      className="border px-4 py-2 text-sm"
                      style={{ color: stakeholder.color }}
                    >
                      {stakeholder.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stakeholderData.stakeholders.map(stakeholder => (
                  <tr key={stakeholder.id} className="hover:bg-gray-50">
                    <td 
                      className="border px-4 py-2 font-medium text-sm"
                      style={{ color: stakeholder.color }}
                    >
                      {stakeholder.name}
                    </td>
                    
                    {stakeholderData.stakeholders.map(otherStakeholder => (
                      <td key={otherStakeholder.id} className="border px-3 py-2 text-xs">
                        {stakeholder.id === otherStakeholder.id ? (
                          <span className="italic text-gray-400">self</span>
                        ) : (
                          stakeholder.relationshipToOthers[otherStakeholder.name] || "—"
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Marginalization Patterns */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Marginalization & Exclusion Patterns</h3>
          <div className="space-y-4">
            {stakeholderData.marginalizationPatterns.map(pattern => (
              <div key={pattern.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-2">{pattern.pattern}</h4>
                
                <div className="mb-2">
                  <span className="text-sm font-medium">Affects: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pattern.affected.map((stakeholder, index) => {
                      const stakeObj = stakeholderData.stakeholders.find(s => s.name === stakeholder);
                      
                      return (
                        <span 
                          key={index} 
                          className="px-2 py-1 text-xs rounded-full text-white"
                          style={{ backgroundColor: stakeObj ? stakeObj.color : '#888888' }}
                        >
                          {stakeholder}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                <div className="text-sm italic border-l-2 border-gray-300 pl-3 text-gray-700">
                  Example: {pattern.example}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Missing Perspectives */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Missing Stakeholders & Perspectives</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm mb-3">
              The following stakeholders are not represented in the article but may have significant interests in the issue:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <h4 className="font-medium mb-1">Low-income communities</h4>
                <p className="text-xs">
                  May be disproportionately affected by both climate impacts and policy costs
                </p>
              </div>
              
              <div className="p-3 bg-gray-100 rounded-lg">
                <h4 className="font-medium mb-1">Future generations</h4>
                <p className="text-xs">
                  Have significant stake in climate outcomes but no voice in current debate
                </p>
              </div>
              
              <div className="p-3 bg-gray-100 rounded-lg">
                <h4 className="font-medium mb-1">Developing nations</h4>
                <p className="text-xs">
                  Often more vulnerable to climate impacts but less represented in policy discussions
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stakeholder Profiles */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Stakeholder Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stakeholderData.stakeholders.map(stakeholder => (
              <div 
                key={stakeholder.id} 
                className="border rounded-lg overflow-hidden"
                style={{ borderColor: stakeholder.color }}
              >
                <div 
                  className="p-3 text-white font-medium"
                  style={{ backgroundColor: stakeholder.color }}
                >
                  {stakeholder.name}
                  <span className="float-right text-sm">
                    {stakeholder.category}
                  </span>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm font-medium mb-1">Textual Power:</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: getWidthPercentage(stakeholder.textualPower),
                            backgroundColor: stakeholder.color 
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Social Power:</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: getWidthPercentage(stakeholder.socialPower),
                            backgroundColor: stakeholder.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm mb-2">
                    <span className="font-medium">Represented by:</span>{" "}
                    {stakeholder.individuals.join(", ")}
                  </div>
                  
                  <div className="text-sm mb-2">
                    <span className="font-medium">Article space:</span>{" "}
                    {Math.round(stakeholder.articleSpace * 100)}%
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">Voice attribution:</span>{" "}
                    {stakeholder.directQuotes} direct quotes,{" "}
                    {stakeholder.indirectReferences} indirect references
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Guide (Separate Box) */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
        <h3 className="text-xl font-semibold mb-2">How to Interpret This Visualization:</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>
            The <strong>Power-Representation Matrix</strong> plots stakeholders based on 
            their social power (vertical axis) and textual representation (horizontal axis), 
            revealing which powerful actors might be under- or over-represented.
          </li>
          <li>
            The <strong>Voice Distribution Analysis</strong> shows how direct quotes, 
            indirect references, and article space are allocated among stakeholders.
          </li>
          <li>
            The <strong>Relationship Network</strong> maps how different stakeholders are 
            positioned in relation to each other in the narrative.
          </li>
          <li>
            The <strong>Marginalization Patterns</strong> section identifies how certain 
            stakeholders are subtly deprioritised through linguistic and structural choices.
          </li>
          <li>
            The <strong>Missing Stakeholders</strong> section highlights perspectives that 
            are completely absent from the discourse.
          </li>
          <li>
            Together, these elements reveal power dynamics in how different actors are 
            represented and whose perspectives are centred or marginalised in the narrative.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StakeholderMappingViz;






























