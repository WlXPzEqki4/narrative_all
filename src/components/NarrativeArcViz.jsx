// import React, { useState } from 'react';

// const NarrativeArcViz = () => {
//   // Sample narrative arc analysis data from the article
//   const [narrativeData, setNarrativeData] = useState({
//     // Main narrative structure
//     mainNarrativeArc: {
//       exposition: {
//         paragraphs: [1, 2],
//         summary: "Introduction of government climate policy announcement",
//         tension: 0.2
//       },
//       risingAction: {
//         paragraphs: [3, 4],
//         summary: "Opposition and protest responses create conflict",
//         tension: 0.6
//       },
//       climax: {
//         paragraphs: [5],
//         summary: "Scientific assessment validates government position",
//         tension: 0.8
//       },
//       fallingAction: {
//         paragraphs: [6, 7],
//         summary: "Media analysis and industry response",
//         tension: 0.5
//       },
//       resolution: {
//         paragraphs: [8],
//         summary: "Government reaffirms position and signals future action",
//         tension: 0.3
//       }
//     },
//     // Competing narrative threads
//     narrativeThreads: [
//       {
//         id: 1,
//         name: "Climate Action Narrative",
//         summary: "Ambitious climate action is necessary and supported by science",
//         paragraphs: [1, 2, 5, 8],
//         dominance: 0.8,
//         actors: ["Government", "Scientists"],
//         tension: [0.2, 0.3, 0.7, 0.4],
//         arc: "complete",
//         color: "#4CAF50" // Green
//       },
//       {
//         id: 2,
//         name: "Economic Concern Narrative",
//         summary: "Climate policy will harm economy and burden taxpayers",
//         paragraphs: [3, 7],
//         dominance: 0.6,
//         actors: ["Opposition", "Industry"],
//         tension: [0.8, 0.6],
//         arc: "incomplete",
//         color: "#FF9800" // Orange
//       },
//       {
//         id: 3,
//         name: "Public Accountability Narrative",
//         summary: "Government's words need to be matched with adequate action",
//         paragraphs: [4],
//         dominance: 0.4,
//         actors: ["Protesters"],
//         tension: [0.7],
//         arc: "truncated",
//         color: "#9C27B0" // Purple
//       },
//       {
//         id: 4,
//         name: "Political Strategy Narrative",
//         summary: "Climate policy is significant for electoral positioning",
//         paragraphs: [6, 8],
//         dominance: 0.5,
//         actors: ["Media", "Government"],
//         tension: [0.4, 0.3],
//         arc: "incomplete",
//         color: "#2196F3" // Blue
//       }
//     ],
//     // Narrative Tension Points
//     tensionPoints: [
//       {
//         id: 1,
//         paragraph: 3,
//         description: "Opposition directly challenges government narrative",
//         intensity: 0.8,
//         narrativeClash: ["Climate Action Narrative", "Economic Concern Narrative"]
//       },
//       {
//         id: 2,
//         paragraph: 4,
//         description: "Protesters introduce accountability critique",
//         intensity: 0.7,
//         narrativeClash: ["Climate Action Narrative", "Public Accountability Narrative"]
//       },
//       {
//         id: 3,
//         paragraph: 5,
//         description: "Scientific validation reinforces government position",
//         intensity: 0.6,
//         narrativeClash: ["Climate Action Narrative", "Economic Concern Narrative"]
//       },
//       {
//         id: 4,
//         paragraph: 7,
//         description: "Industry criticism reintroduces economic concerns",
//         intensity: 0.5,
//         narrativeClash: ["Climate Action Narrative", "Economic Concern Narrative"]
//       }
//     ],
//     // Paragraph text for reference
//     paragraphs: [
//       "The Government announced a sweeping new climate policy yesterday, setting targets to reduce carbon emissions by 60% before 2035. The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy and gradual phase-out of fossil fuel subsidies.",
//       "\"This represents our commitment to addressing the climate crisis with the urgency it demands,\" said Environment Minister Elena Reynolds. \"We can no longer afford inaction on this critical issue.\"",
//       "Opposition leaders immediately opposed the plan, criticizing its economic implications. \"This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs,\" said Opposition Leader James Wilson during an emergency press conference. Wilson further warned about potential job losses in traditional energy sectors.",
//       "Meanwhile, protesters demonstrated against recent budget cuts to environmental monitoring programs, gathering outside Parliament with signs reading \"Actions Not Words\" and \"Fund Our Future.\" The demonstration, organized by climate activist group EarthFirst, drew approximately 2,000 participants.",
//       "Scientists from the National Climate Research Institute largely supported the government's targets. \"The proposed reductions align with what our research findings indicate is necessary,\" explained Dr. Sarah Chen, lead climate researcher at the institute. However, she warned about implementation challenges, noting that \"meeting these targets will require unprecedented coordination across all sectors.\"",
//       "Media outlets extensively reported on public reaction to the announcement, with national surveys showing divided opinions along urban and rural lines. Political analysts suggest the climate policy could become a central issue in next year's election campaign.",
//       "Industry representatives criticized specific elements of the proposal, particularly the accelerated timeline. \"While we support climate action, this implementation schedule will create substantial economic disruption,\" said Marcus Lee, spokesperson for the National Business Association.",
//       "As debate continues, the Government defended its approach, with the Prime Minister scheduled to address the nation next week regarding what he described as \"the most significant environmental initiative in our country's history.\""
//     ]
//   });

//   // Convert tension level to y-position for arc visualization
//   const getTensionPosition = (tension) => {
//     // Reverse the scale (higher tension = lower position on y-axis)
//     return 100 - (tension * 100);
//   };

//   // Calculate width percentage based on number of paragraphs
//   const getWidthPercentage = (paragraphCount) => {
//     return `${(paragraphCount / narrativeData.paragraphs.length) * 100}%`;
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-4 text-center">Narrative Arc Analysis</h1>
      
//       {/* Classic Narrative Structure */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Classical Narrative Structure</h2>
//         <div className="flex w-full bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
//           {/* Exposition */}
//           <div 
//             className="p-3 bg-blue-50 border-r border-gray-200"
//             style={{ width: getWidthPercentage(narrativeData.mainNarrativeArc.exposition.paragraphs.length) }}
//           >
//             <div className="font-medium text-blue-800 mb-1">Exposition</div>
//             <div className="text-xs">
//               {narrativeData.mainNarrativeArc.exposition.summary}
//             </div>
//             <div className="text-xs mt-1 text-gray-500">
//               Paragraphs: {narrativeData.mainNarrativeArc.exposition.paragraphs.join(", ")}
//             </div>
//           </div>
          
//           {/* Rising Action */}
//           <div 
//             className="p-3 bg-yellow-50 border-r border-gray-200"
//             style={{ width: getWidthPercentage(narrativeData.mainNarrativeArc.risingAction.paragraphs.length) }}
//           >
//             <div className="font-medium text-yellow-800 mb-1">Rising Action</div>
//             <div className="text-xs">
//               {narrativeData.mainNarrativeArc.risingAction.summary}
//             </div>
//             <div className="text-xs mt-1 text-gray-500">
//               Paragraphs: {narrativeData.mainNarrativeArc.risingAction.paragraphs.join(", ")}
//             </div>
//           </div>
          
//           {/* Climax */}
//           <div 
//             className="p-3 bg-red-50 border-r border-gray-200"
//             style={{ width: getWidthPercentage(narrativeData.mainNarrativeArc.climax.paragraphs.length) }}
//           >
//             <div className="font-medium text-red-800 mb-1">Climax</div>
//             <div className="text-xs">
//               {narrativeData.mainNarrativeArc.climax.summary}
//             </div>
//             <div className="text-xs mt-1 text-gray-500">
//               Paragraphs: {narrativeData.mainNarrativeArc.climax.paragraphs.join(", ")}
//             </div>
//           </div>
          
//           {/* Falling Action */}
//           <div 
//             className="p-3 bg-green-50 border-r border-gray-200"
//             style={{ width: getWidthPercentage(narrativeData.mainNarrativeArc.fallingAction.paragraphs.length) }}
//           >
//             <div className="font-medium text-green-800 mb-1">Falling Action</div>
//             <div className="text-xs">
//               {narrativeData.mainNarrativeArc.fallingAction.summary}
//             </div>
//             <div className="text-xs mt-1 text-gray-500">
//               Paragraphs: {narrativeData.mainNarrativeArc.fallingAction.paragraphs.join(", ")}
//             </div>
//           </div>
          
//           {/* Resolution */}
//           <div 
//             className="p-3 bg-purple-50"
//             style={{ width: getWidthPercentage(narrativeData.mainNarrativeArc.resolution.paragraphs.length) }}
//           >
//             <div className="font-medium text-purple-800 mb-1">Resolution</div>
//             <div className="text-xs">
//               {narrativeData.mainNarrativeArc.resolution.summary}
//             </div>
//             <div className="text-xs mt-1 text-gray-500">
//               Paragraphs: {narrativeData.mainNarrativeArc.resolution.paragraphs.join(", ")}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Narrative Tension Graph */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Narrative Tension Arc</h2>
//         <div className="relative h-64 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
//           {/* Y-axis label */}
//           <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 text-sm font-medium" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
//             Narrative Tension
//           </div>
          
//           {/* X-axis (paragraph numbers) */}
//           <div className="absolute left-0 right-0 bottom-0 flex">
//             {narrativeData.paragraphs.map((_, index) => (
//               <div 
//                 key={index} 
//                 className="flex-1 text-center text-xs text-gray-600 border-t border-gray-200 pt-1"
//               >
//                 P{index + 1}
//               </div>
//             ))}
//           </div>
          
//           {/* Tension line for main narrative */}
//           <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
//             <defs>
//               <linearGradient id="tensionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.8" />
//                 <stop offset="50%" stopColor="#FF9800" stopOpacity="0.8" />
//                 <stop offset="100%" stopColor="#2196F3" stopOpacity="0.8" />
//               </linearGradient>
//             </defs>
            
//             <polyline
//               points={`
//                 ${100/8 * 0.5},${getTensionPosition(narrativeData.mainNarrativeArc.exposition.tension)}% 
//                 ${100/8 * 1.5},${getTensionPosition(narrativeData.mainNarrativeArc.exposition.tension)}% 
//                 ${100/8 * 2.5},${getTensionPosition(narrativeData.mainNarrativeArc.risingAction.tension)}% 
//                 ${100/8 * 3.5},${getTensionPosition(narrativeData.mainNarrativeArc.risingAction.tension)}% 
//                 ${100/8 * 4.5},${getTensionPosition(narrativeData.mainNarrativeArc.climax.tension)}% 
//                 ${100/8 * 5.5},${getTensionPosition(narrativeData.mainNarrativeArc.fallingAction.tension)}% 
//                 ${100/8 * 6.5},${getTensionPosition(narrativeData.mainNarrativeArc.fallingAction.tension)}% 
//                 ${100/8 * 7.5},${getTensionPosition(narrativeData.mainNarrativeArc.resolution.tension)}% 
//               `}
//               fill="none"
//               stroke="url(#tensionGradient)"
//               strokeWidth="3"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
            
//             {/* Tension point markers */}
//             {narrativeData.tensionPoints.map(point => (
//               <circle
//                 key={point.id}
//                 cx={`${100/8 * (point.paragraph - 0.5)}%`}
//                 cy={`${getTensionPosition(point.intensity)}%`}
//                 r="6"
//                 fill="#FF5722"
//                 stroke="#fff"
//                 strokeWidth="2"
//               />
//             ))}
//           </svg>
          
//           {/* Tension labels on right side */}
//           <div className="absolute top-2 right-2 text-xs">High Tension</div>
//           <div className="absolute bottom-8 right-2 text-xs">Low Tension</div>
          
//           {/* Narrative structure labels */}
//           <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
//             Exposition → Rising Action → Climax → Falling Action → Resolution
//           </div>
//         </div>
        
//         {/* Tension points legend */}
//         <div className="mt-2 text-sm">
//           <div className="font-medium mb-1">Key Tension Points:</div>
//           <div className="space-y-1">
//             {narrativeData.tensionPoints.map(point => (
//               <div key={point.id} className="flex items-start">
//                 <div className="w-4 h-4 rounded-full bg-red-500 mt-0.5 mr-2 flex-shrink-0"></div>
//                 <div className="text-xs">
//                   <span className="font-medium">P{point.paragraph}:</span> {point.description} 
//                   <span className="text-gray-500 ml-1">
//                     (Clash: {point.narrativeClash.join(" vs. ")})
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       {/* Competing Narrative Threads */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Competing Narrative Threads</h2>
        
//         <div className="space-y-6">
//           {narrativeData.narrativeThreads.map(thread => (
//             <div 
//               key={thread.id} 
//               className="border rounded-lg overflow-hidden"
//               style={{ 
//                 borderColor: thread.color,
//                 opacity: thread.dominance * 0.5 + 0.5 // Make dominant narratives more opaque
//               }}
//             >
//               <div 
//                 className="p-3 text-white flex justify-between items-center"
//                 style={{ backgroundColor: thread.color }}
//               >
//                 <div className="font-medium">{thread.name}</div>
//                 <div className="text-xs bg-white bg-opacity-30 px-2 py-1 rounded">
//                   Dominance: {Math.round(thread.dominance * 10)}/10
//                 </div>
//               </div>
              
//               <div className="p-4">
//                 <div className="text-sm mb-3">{thread.summary}</div>
                
//                 <div className="mb-3">
//                   <div className="text-sm font-medium mb-1">Narrative Arc:</div>
//                   <div className="flex h-8 bg-gray-100 rounded-lg overflow-hidden">
//                     {thread.paragraphs.map((paragraph, index) => (
//                       <div 
//                         key={index}
//                         className="flex-1 h-full flex items-end"
//                         style={{ backgroundColor: `${thread.color}20` }}
//                       >
//                         <div 
//                           className="w-full rounded-t-sm transition-all duration-300"
//                           style={{ 
//                             height: `${thread.tension[index] * 100}%`,
//                             backgroundColor: thread.color
//                           }}
//                         ></div>
//                       </div>
//                     ))}
                    
//                     {/* Add empty slots for paragraphs where this narrative doesn't appear */}
//                     {Array.from({ length: 8 - thread.paragraphs.length }).map((_, index) => (
//                       <div 
//                         key={`empty-${index}`}
//                         className="flex-1 h-full bg-gray-200"
//                       ></div>
//                     ))}
//                   </div>
//                   <div className="flex justify-between mt-1 text-xs text-gray-500">
//                     <div>P1</div>
//                     <div>P2</div>
//                     <div>P3</div>
//                     <div>P4</div>
//                     <div>P5</div>
//                     <div>P6</div>
//                     <div>P7</div>
//                     <div>P8</div>
//                   </div>
//                 </div>
                
//                 <div className="text-sm mb-2">
//                   <span className="font-medium">Carried by:</span> {thread.actors.join(", ")}
//                 </div>
                
//                 <div className="text-sm">
//                   <span className="font-medium">Arc status:</span>{" "}
//                   <span className={`${
//                     thread.arc === "complete" ? "text-green-600" : 
//                     thread.arc === "incomplete" ? "text-orange-600" : 
//                     "text-red-600"
//                   }`}>
//                     {thread.arc === "complete" ? "Complete (beginning, middle, end)" : 
//                      thread.arc === "incomplete" ? "Incomplete (no resolution)" : 
//                      "Truncated (appears briefly)"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Narrative Dominance Across Article */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Narrative Dominance Flow</h2>
        
//         <div className="relative h-16 bg-gray-100 rounded-lg overflow-hidden">
//           {narrativeData.paragraphs.map((_, index) => {
//             // Find which narrative thread dominates this paragraph
//             let dominantThread = null;
//             let highestDominance = 0;
            
//             narrativeData.narrativeThreads.forEach(thread => {
//               if (thread.paragraphs.includes(index + 1) && thread.dominance > highestDominance) {
//                 dominantThread = thread;
//                 highestDominance = thread.dominance;
//               }
//             });
            
//             return (
//               <div 
//                 key={index}
//                 className="absolute h-full flex items-center justify-center text-white text-xs font-medium"
//                 style={{ 
//                   backgroundColor: dominantThread ? dominantThread.color : "#ccc",
//                   left: `${(index / narrativeData.paragraphs.length) * 100}%`,
//                   width: `${(1 / narrativeData.paragraphs.length) * 100}%`
//                 }}
//               >
//                 P{index + 1}
//               </div>
//             );
//           })}
//         </div>
        
//         <div className="flex justify-between mt-2">
//           {narrativeData.narrativeThreads.map(thread => (
//             <div key={thread.id} className="flex items-center">
//               <div 
//                 className="w-3 h-3 rounded-full mr-1"
//                 style={{ backgroundColor: thread.color }}
//               ></div>
//               <span className="text-xs">{thread.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Paragraph-Level Narrative Analysis */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Paragraph-Level Narrative Analysis</h2>
        
//         <div className="space-y-4">
//           {narrativeData.paragraphs.map((paragraph, index) => {
//             // Find all narrative threads in this paragraph
//             const threadsInParagraph = narrativeData.narrativeThreads.filter(thread => 
//               thread.paragraphs.includes(index + 1)
//             );
            
//             // Find dominant thread
//             const dominantThread = threadsInParagraph.length > 0 ? 
//               threadsInParagraph.reduce((prev, current) => 
//                 prev.dominance > current.dominance ? prev : current
//               ) : null;
            
//             // Find tension point if any
//             const tensionPoint = narrativeData.tensionPoints.find(point => 
//               point.paragraph === index + 1
//             );
            
//             // Find narrative stage
//             let stage = "";
//             Object.entries(narrativeData.mainNarrativeArc).forEach(([key, value]) => {
//               if (value.paragraphs.includes(index + 1)) {
//                 stage = key;
//               }
//             });
            
//             return (
//               <div 
//                 key={index}
//                 className="border border-gray-200 rounded-lg p-4 bg-gray-50"
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <div className="font-medium">Paragraph {index + 1}</div>
//                   <div className="flex items-center">
//                     <span className="text-xs mr-2">
//                       Stage: <span className="font-medium capitalize">{stage}</span>
//                     </span>
//                     {tensionPoint && (
//                       <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
//                         Tension Point
//                       </span>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="text-sm italic mb-3 border-l-2 pl-3 border-gray-300">
//                   {paragraph}
//                 </div>
                
//                 <div className="flex flex-wrap gap-2 mb-2">
//                   {threadsInParagraph.map(thread => (
//                     <div 
//                       key={thread.id}
//                       className="text-xs px-2 py-1 rounded-full text-white"
//                       style={{ 
//                         backgroundColor: thread.color,
//                         opacity: thread === dominantThread ? 1 : 0.6
//                       }}
//                     >
//                       {thread.name}
//                       {thread === dominantThread && (
//                         <span className="ml-1">(Dominant)</span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
                
//                 {tensionPoint && (
//                   <div className="text-xs text-gray-600">
//                     <span className="font-medium">Narrative Clash:</span> {tensionPoint.narrativeClash.join(" vs. ")}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
      
//       {/* How to Interpret */}
//       <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
//         <h3 className="font-medium mb-2">How to Interpret This Visualization:</h3>
//         <ul className="list-disc ml-5 space-y-1">
//           <li>The Classical Narrative Structure section maps the article to the traditional dramatic arc (exposition, rising action, climax, falling action, resolution).</li>
//           <li>The Narrative Tension Arc shows how conflict and emotional intensity rise and fall throughout the article, with key tension points highlighted.</li>
//           <li>The Competing Narrative Threads section identifies the different storylines present in the article, showing which are dominant and which are marginalized.</li>
//           <li>The Narrative Dominance Flow visualizes which narrative dominates each paragraph, revealing how the article shifts between different perspectives.</li>
//           <li>The Paragraph-Level Analysis provides detailed examination of how different narratives interact within each paragraph.</li>
//           <li>Together, these elements reveal the dramatic structure of the news article and how different storylines compete for prominence within it.</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NarrativeArcViz;









import React, { useState } from 'react';

const NarrativeArcViz = () => {
  // Sample narrative arc analysis data from the article
  const [narrativeData] = useState({
    // Main narrative structure
    mainNarrativeArc: {
      exposition: {
        paragraphs: [1, 2],
        summary: "Introduction of government climate policy announcement",
        tension: 0.2
      },
      risingAction: {
        paragraphs: [3, 4],
        summary: "Opposition and protest responses create conflict",
        tension: 0.6
      },
      climax: {
        paragraphs: [5],
        summary: "Scientific assessment validates government position",
        tension: 0.8
      },
      fallingAction: {
        paragraphs: [6, 7],
        summary: "Media analysis and industry response",
        tension: 0.5
      },
      resolution: {
        paragraphs: [8],
        summary: "Government reaffirms position and signals future action",
        tension: 0.3
      }
    },
    // Competing narrative threads
    narrativeThreads: [
      {
        id: 1,
        name: "Climate Action Narrative",
        summary: "Ambitious climate action is necessary and supported by science",
        paragraphs: [1, 2, 5, 8],
        dominance: 0.8,
        actors: ["Government", "Scientists"],
        tension: [0.2, 0.3, 0.7, 0.4],
        arc: "complete",
        color: "#4CAF50" // Green
      },
      {
        id: 2,
        name: "Economic Concern Narrative",
        summary: "Climate policy will harm economy and burden taxpayers",
        paragraphs: [3, 7],
        dominance: 0.6,
        actors: ["Opposition", "Industry"],
        tension: [0.8, 0.6],
        arc: "incomplete",
        color: "#FF9800" // Orange
      },
      {
        id: 3,
        name: "Public Accountability Narrative",
        summary: "Government's words need to be matched with adequate action",
        paragraphs: [4],
        dominance: 0.4,
        actors: ["Protesters"],
        tension: [0.7],
        arc: "truncated",
        color: "#9C27B0" // Purple
      },
      {
        id: 4,
        name: "Political Strategy Narrative",
        summary: "Climate policy is significant for electoral positioning",
        paragraphs: [6, 8],
        dominance: 0.5,
        actors: ["Media", "Government"],
        tension: [0.4, 0.3],
        arc: "incomplete",
        color: "#2196F3" // Blue
      }
    ],
    // Narrative Tension Points
    tensionPoints: [
      {
        id: 1,
        paragraph: 3,
        description: "Opposition directly challenges government narrative",
        intensity: 0.8,
        narrativeClash: ["Climate Action Narrative", "Economic Concern Narrative"]
      },
      {
        id: 2,
        paragraph: 4,
        description: "Protesters introduce accountability critique",
        intensity: 0.7,
        narrativeClash: ["Climate Action Narrative", "Public Accountability Narrative"]
      },
      {
        id: 3,
        paragraph: 5,
        description: "Scientific validation reinforces government position",
        intensity: 0.6,
        narrativeClash: ["Climate Action Narrative", "Economic Concern Narrative"]
      },
      {
        id: 4,
        paragraph: 7,
        description: "Industry criticism reintroduces economic concerns",
        intensity: 0.5,
        narrativeClash: ["Climate Action Narrative", "Economic Concern Narrative"]
      }
    ],
    // Paragraph text for reference
    paragraphs: [
      "The Government announced a sweeping new climate policy yesterday, setting targets to reduce carbon emissions by 60% before 2035. The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy and gradual phase-out of fossil fuel subsidies.",
      "\"This represents our commitment to addressing the climate crisis with the urgency it demands,\" said Environment Minister Elena Reynolds. \"We can no longer afford inaction on this critical issue.\"",
      "Opposition leaders immediately opposed the plan, criticizing its economic implications. \"This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs,\" said Opposition Leader James Wilson during an emergency press conference. Wilson further warned about potential job losses in traditional energy sectors.",
      "Meanwhile, protesters demonstrated against recent budget cuts to environmental monitoring programs, gathering outside Parliament with signs reading \"Actions Not Words\" and \"Fund Our Future.\" The demonstration, organized by climate activist group EarthFirst, drew approximately 2,000 participants.",
      "Scientists from the National Climate Research Institute largely supported the government's targets. \"The proposed reductions align with what our research findings indicate is necessary,\" explained Dr. Sarah Chen, lead climate researcher at the institute. However, she warned about implementation challenges, noting that \"meeting these targets will require unprecedented coordination across all sectors.\"",
      "Media outlets extensively reported on public reaction to the announcement, with national surveys showing divided opinions along urban and rural lines. Political analysts suggest the climate policy could become a central issue in next year's election campaign.",
      "Industry representatives criticized specific elements of the proposal, particularly the accelerated timeline. \"While we support climate action, this implementation schedule will create substantial economic disruption,\" said Marcus Lee, spokesperson for the National Business Association.",
      "As debate continues, the Government defended its approach, with the Prime Minister scheduled to address the nation next week regarding what he described as \"the most significant environmental initiative in our country's history.\""
    ]
  });

  // Convert tension level to y-position for arc visualisation
  const getTensionPosition = (tension) => {
    // Reverse the scale (higher tension = lower y-position)
    return 100 - tension * 100;
  };

  // Calculate width percentage based on number of paragraphs
  const getWidthPercentage = (paragraphCount) => {
    return `${(paragraphCount / narrativeData.paragraphs.length) * 100}%`;
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Main Title */}
      <h2 className="text-3xl font-bold text-center mb-6">Narrative Arc Analysis</h2>

      {/* Main Content Box */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        
        {/* Classical Narrative Structure */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Classical Narrative Structure</h3>
          <div className="flex w-full bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            {/* Exposition */}
            <div 
              className="p-3 bg-blue-50 border-r border-gray-200"
              style={{ width: getWidthPercentage(narrativeData.mainNarrativeArc.exposition.paragraphs.length) }}
            >
              <div className="font-medium text-blue-800 mb-1">Exposition</div>
              <div className="text-xs">{narrativeData.mainNarrativeArc.exposition.summary}</div>
              <div className="text-xs mt-1 text-gray-500">
                Paragraphs: {narrativeData.mainNarrativeArc.exposition.paragraphs.join(", ")}
              </div>
            </div>

            {/* Rising Action */}
            <div 
              className="p-3 bg-yellow-50 border-r border-gray-200"
              style={{ width: getWidthPercentage(narrativeData.mainNarrativeArc.risingAction.paragraphs.length) }}
            >
              <div className="font-medium text-yellow-800 mb-1">Rising Action</div>
              <div className="text-xs">{narrativeData.mainNarrativeArc.risingAction.summary}</div>
              <div className="text-xs mt-1 text-gray-500">
                Paragraphs: {narrativeData.mainNarrativeArc.risingAction.paragraphs.join(", ")}
              </div>
            </div>

            {/* Climax */}
            <div 
              className="p-3 bg-red-50 border-r border-gray-200"
              style={{ width: getWidthPercentage(narrativeData.mainNarrativeArc.climax.paragraphs.length) }}
            >
              <div className="font-medium text-red-800 mb-1">Climax</div>
              <div className="text-xs">{narrativeData.mainNarrativeArc.climax.summary}</div>
              <div className="text-xs mt-1 text-gray-500">
                Paragraphs: {narrativeData.mainNarrativeArc.climax.paragraphs.join(", ")}
              </div>
            </div>

            {/* Falling Action */}
            <div 
              className="p-3 bg-green-50 border-r border-gray-200"
              style={{ width: getWidthPercentage(narrativeData.mainNarrativeArc.fallingAction.paragraphs.length) }}
            >
              <div className="font-medium text-green-800 mb-1">Falling Action</div>
              <div className="text-xs">{narrativeData.mainNarrativeArc.fallingAction.summary}</div>
              <div className="text-xs mt-1 text-gray-500">
                Paragraphs: {narrativeData.mainNarrativeArc.fallingAction.paragraphs.join(", ")}
              </div>
            </div>

            {/* Resolution */}
            <div 
              className="p-3 bg-purple-50"
              style={{ width: getWidthPercentage(narrativeData.mainNarrativeArc.resolution.paragraphs.length) }}
            >
              <div className="font-medium text-purple-800 mb-1">Resolution</div>
              <div className="text-xs">{narrativeData.mainNarrativeArc.resolution.summary}</div>
              <div className="text-xs mt-1 text-gray-500">
                Paragraphs: {narrativeData.mainNarrativeArc.resolution.paragraphs.join(", ")}
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Tension Graph */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Narrative Tension Arc</h3>
          <div className="relative h-64 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden p-4">
            {/* Y-axis label */}
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 text-sm font-medium" 
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              Narrative Tension
            </div>

            {/* X-axis (paragraph numbers) */}
            <div className="absolute left-0 right-0 bottom-0 flex">
              {narrativeData.paragraphs.map((_, index) => (
                <div 
                  key={index} 
                  className="flex-1 text-center text-xs text-gray-600 border-t border-gray-200 pt-1"
                >
                  P{index + 1}
                </div>
              ))}
            </div>

            {/* Tension line for main narrative */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tensionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FF9800" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2196F3" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <polyline
                points={`
                  ${100/8 * 0.5},${getTensionPosition(narrativeData.mainNarrativeArc.exposition.tension)} 
                  ${100/8 * 1.5},${getTensionPosition(narrativeData.mainNarrativeArc.exposition.tension)} 
                  ${100/8 * 2.5},${getTensionPosition(narrativeData.mainNarrativeArc.risingAction.tension)} 
                  ${100/8 * 3.5},${getTensionPosition(narrativeData.mainNarrativeArc.risingAction.tension)} 
                  ${100/8 * 4.5},${getTensionPosition(narrativeData.mainNarrativeArc.climax.tension)} 
                  ${100/8 * 5.5},${getTensionPosition(narrativeData.mainNarrativeArc.fallingAction.tension)} 
                  ${100/8 * 6.5},${getTensionPosition(narrativeData.mainNarrativeArc.fallingAction.tension)} 
                  ${100/8 * 7.5},${getTensionPosition(narrativeData.mainNarrativeArc.resolution.tension)}
                `}
                fill="none"
                stroke="url(#tensionGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Tension point markers */}
              {narrativeData.tensionPoints.map(point => (
                <circle
                  key={point.id}
                  cx={`${(100/8) * (point.paragraph - 0.5)}%`}
                  cy={`${getTensionPosition(point.intensity)}%`}
                  r="6"
                  fill="#FF5722"
                  stroke="#fff"
                  strokeWidth="2"
                />
              ))}
            </svg>

            {/* Tension labels on right side */}
            <div className="absolute top-2 right-2 text-xs">High Tension</div>
            <div className="absolute bottom-8 right-2 text-xs">Low Tension</div>
            
            {/* Narrative structure labels */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
              Exposition → Rising Action → Climax → Falling Action → Resolution
            </div>
          </div>
          
          {/* Tension points legend with extra spacing to avoid overlap */}
          <div className="mt-4 text-sm">
            <div className="font-medium mb-1">Key Tension Points:</div>
            <div className="space-y-1">
              {narrativeData.tensionPoints.map(point => (
                <div key={point.id} className="flex items-start">
                  <div className="w-4 h-4 rounded-full bg-red-500 mt-0.5 mr-2 flex-shrink-0"></div>
                  <div className="text-xs">
                    <span className="font-medium">P{point.paragraph}:</span> {point.description} 
                    <span className="text-gray-500 ml-1">(Clash: {point.narrativeClash.join(" vs. ")})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competing Narrative Threads */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Competing Narrative Threads</h3>
          <div className="space-y-6">
            {narrativeData.narrativeThreads.map(thread => (
              <div 
                key={thread.id} 
                className="border rounded-lg overflow-hidden"
                style={{ 
                  borderColor: thread.color,
                  opacity: thread.dominance * 0.5 + 0.5
                }}
              >
                <div 
                  className="p-3 text-white flex justify-between items-center"
                  style={{ backgroundColor: thread.color }}
                >
                  <div className="font-medium">{thread.name}</div>
                  <div className="text-xs bg-white bg-opacity-30 px-2 py-1 rounded">
                    Dominance: {Math.round(thread.dominance * 10)}/10
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm mb-3">{thread.summary}</div>
                  <div className="mb-3">
                    <div className="text-sm font-medium mb-1">Narrative Arc:</div>
                    <div className="flex h-8 bg-gray-100 rounded-lg overflow-hidden">
                      {thread.paragraphs.map((paragraph, index) => (
                        <div 
                          key={index}
                          className="flex-1 h-full flex items-end"
                          style={{ backgroundColor: `${thread.color}20` }}
                        >
                          <div 
                            className="w-full rounded-t-sm transition-all duration-300"
                            style={{ 
                              height: `${thread.tension[index] * 100}%`,
                              backgroundColor: thread.color
                            }}
                          ></div>
                        </div>
                      ))}
                      {Array.from({ length: 8 - thread.paragraphs.length }).map((_, index) => (
                        <div 
                          key={`empty-${index}`}
                          className="flex-1 h-full bg-gray-200"
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <div>P1</div>
                      <div>P2</div>
                      <div>P3</div>
                      <div>P4</div>
                      <div>P5</div>
                      <div>P6</div>
                      <div>P7</div>
                      <div>P8</div>
                    </div>
                  </div>
                  <div className="text-sm mb-2">
                    <span className="font-medium">Carried by:</span> {thread.actors.join(", ")}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Arc status:</span>{" "}
                    <span className={`${
                      thread.arc === "complete" ? "text-green-600" : 
                      thread.arc === "incomplete" ? "text-orange-600" : 
                      "text-red-600"
                    }`}>
                      {thread.arc === "complete"
                        ? "Complete (beginning, middle, end)"
                        : thread.arc === "incomplete"
                        ? "Incomplete (no resolution)"
                        : "Truncated (appears briefly)"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Dominance Flow */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Narrative Dominance Flow</h3>
          <div className="relative h-16 bg-gray-100 rounded-lg overflow-hidden py-2">
            {narrativeData.paragraphs.map((_, index) => {
              let dominantThread = null;
              let highestDominance = 0;
              narrativeData.narrativeThreads.forEach(thread => {
                if (thread.paragraphs.includes(index + 1) && thread.dominance > highestDominance) {
                  dominantThread = thread;
                  highestDominance = thread.dominance;
                }
              });
              return (
                <div 
                  key={index}
                  className="absolute h-full flex items-center justify-center text-black text-xs font-medium"
                  style={{ 
                    backgroundColor: dominantThread ? dominantThread.color : "#ccc",
                    left: `${(index / narrativeData.paragraphs.length) * 100}%`,
                    width: `${(1 / narrativeData.paragraphs.length) * 100}%`
                  }}
                >
                  P{index + 1}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-3">
            {narrativeData.narrativeThreads.map(thread => (
              <div key={thread.id} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: thread.color }}></div>
                <span className="text-xs">{thread.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Paragraph-Level Narrative Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Paragraph-Level Narrative Analysis</h3>
          <div className="space-y-4">
            {narrativeData.paragraphs.map((paragraph, index) => {
              const threadsInParagraph = narrativeData.narrativeThreads.filter(thread => 
                thread.paragraphs.includes(index + 1)
              );
              const dominantThread = threadsInParagraph.length > 0 ? 
                threadsInParagraph.reduce((prev, current) => 
                  prev.dominance > current.dominance ? prev : current
                ) : null;
              const tensionPoint = narrativeData.tensionPoints.find(point => 
                point.paragraph === index + 1
              );
              let stage = "";
              Object.entries(narrativeData.mainNarrativeArc).forEach(([key, value]) => {
                if (value.paragraphs.includes(index + 1)) {
                  stage = key;
                }
              });
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">Paragraph {index + 1}</div>
                    <div className="flex items-center">
                      <span className="text-xs mr-2">
                        Stage: <span className="font-medium capitalize">{stage}</span>
                      </span>
                      {tensionPoint && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          Tension Point
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm italic mb-3 border-l-2 pl-3 border-gray-300">
                    {paragraph}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {threadsInParagraph.map(thread => (
                      <div 
                        key={thread.id}
                        className="text-xs px-2 py-1 rounded-full text-white"
                        style={{ 
                          backgroundColor: thread.color,
                          opacity: thread === dominantThread ? 1 : 0.6
                        }}
                      >
                        {thread.name}
                        {thread === dominantThread && (
                          <span className="ml-1">(Dominant)</span>
                        )}
                      </div>
                    ))}
                  </div>
                  {tensionPoint && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Narrative Clash:</span> {tensionPoint.narrativeClash.join(" vs. ")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Guide */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
        <h3 className="text-xl font-semibold mb-2">User Guide</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>
            The <strong>Classical Narrative Structure</strong> section maps the article to a traditional dramatic arc (exposition, rising action, climax, falling action, resolution).
          </li>
          <li>
            The <strong>Narrative Tension Arc</strong> shows how conflict and tension fluctuate across the article, with key tension points highlighted.
          </li>
          <li>
            The <strong>Competing Narrative Threads</strong> section identifies the various storylines present in the article, noting which are dominant.
          </li>
          <li>
            The <strong>Narrative Dominance Flow</strong> visualises which narrative dominates each paragraph – the dot labels are now black for clarity.
          </li>
          <li>
            The <strong>Paragraph-Level Narrative Analysis</strong> details how different narratives interact within each paragraph.
          </li>
          <li>
            Together, these elements reveal the dramatic structure of the article and how competing narratives vie for prominence.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NarrativeArcViz;





































