// import React, { useState } from 'react';

// const NarrativeFingerprint = () => {
//   const [narrativeData, setNarrativeData] = useState({
//     // Core SVO patterns extracted from the article
//     svoPatterns: [
//       { subject: "Government", verb: "announced", object: "climate policy", weight: 1.0, paragraph: 1 },
//       { subject: "Government", verb: "setting", object: "targets", weight: 0.9, paragraph: 1 },
//       { subject: "Government", verb: "unveiled", object: "proposal", weight: 0.8, paragraph: 1 },
//       { subject: "Proposal", verb: "includes", object: "investments", weight: 0.7, paragraph: 1 },
//       { subject: "Minister", verb: "said", object: "commitment", weight: 0.8, paragraph: 2 },
//       { subject: "We", verb: "afford", object: "inaction", weight: 0.7, paragraph: 2 },
//       { subject: "Opposition", verb: "opposed", object: "plan", weight: 0.9, paragraph: 3 },
//       { subject: "Opposition", verb: "criticizing", object: "implications", weight: 0.8, paragraph: 3 },
//       { subject: "Policy", verb: "devastate", object: "sectors", weight: 0.7, paragraph: 3 },
//       { subject: "Policy", verb: "burden", object: "taxpayers", weight: 0.7, paragraph: 3 },
//       { subject: "Wilson", verb: "warned", object: "job losses", weight: 0.6, paragraph: 3 },
//       { subject: "Protesters", verb: "demonstrated", object: "budget cuts", weight: 0.8, paragraph: 4 },
//       { subject: "Scientists", verb: "supported", object: "targets", weight: 0.9, paragraph: 5 },
//       { subject: "Reductions", verb: "align", object: "findings", weight: 0.7, paragraph: 5 },
//       { subject: "Chen", verb: "warned", object: "challenges", weight: 0.6, paragraph: 5 },
//       { subject: "Media", verb: "reported", object: "reaction", weight: 0.7, paragraph: 6 },
//       { subject: "Analysts", verb: "suggest", object: "central issue", weight: 0.6, paragraph: 6 },
//       { subject: "Industry", verb: "criticized", object: "elements", weight: 0.8, paragraph: 7 },
//       { subject: "Schedule", verb: "create", object: "disruption", weight: 0.7, paragraph: 7 },
//       { subject: "Government", verb: "defended", object: "approach", weight: 0.9, paragraph: 8 },
//       { subject: "Prime Minister", verb: "scheduled", object: "address", weight: 0.7, paragraph: 8 },
//       { subject: "He", verb: "described", object: "initiative", weight: 0.6, paragraph: 8 }
//     ],
    
//     // Sentiment polarity for main entities
//     sentimentValues: {
//       "Government": 0.6,
//       "Opposition": -0.4,
//       "Scientists": 0.5,
//       "Protesters": 0.2,
//       "Industry": -0.3,
//       "Media": 0.0,
//       "Climate Policy": 0.4,
//       "Economic Impact": -0.5
//     },
    
//     // Action direction matrix (who acts on whom)
//     actionDirections: [
//       { actor: "Government", target: "Climate Policy", actions: 4, weight: 0.9, sentiment: 0.7 },
//       { actor: "Opposition", target: "Climate Policy", actions: 2, weight: 0.8, sentiment: -0.6 },
//       { actor: "Opposition", target: "Economic Impact", actions: 2, weight: 0.7, sentiment: -0.5 },
//       { actor: "Scientists", target: "Climate Policy", actions: 2, weight: 0.8, sentiment: 0.5 },
//       { actor: "Scientists", target: "Implementation", actions: 1, weight: 0.6, sentiment: -0.2 },
//       { actor: "Industry", target: "Implementation", actions: 2, weight: 0.7, sentiment: -0.4 },
//       { actor: "Protesters", target: "Government", actions: 1, weight: 0.6, sentiment: -0.3 },
//       { actor: "Media", target: "Public", actions: 1, weight: 0.5, sentiment: 0.0 }
//     ],
    
//     // Core narrative conflict axes
//     narrativeAxes: [
//       { 
//         axis: "Environmental Action vs. Economic Concern",
//         polarity: 0.6, // Positive means environmental action is emphasized
//         evidenceCount: 12,
//         dominance: 0.8
//       },
//       { 
//         axis: "Government Authority vs. Public Accountability",
//         polarity: 0.3, // Slightly favors government authority
//         evidenceCount: 8,
//         dominance: 0.6
//       },
//       { 
//         axis: "Scientific Consensus vs. Political Expediency",
//         polarity: 0.4, // Favors scientific consensus
//         evidenceCount: 5,
//         dominance: 0.5
//       },
//       { 
//         axis: "Present Action vs. Future Implications",
//         polarity: 0.2, // Balanced with slight emphasis on present
//         evidenceCount: 10,
//         dominance: 0.7
//       }
//     ],
    
//     // Distribution of agency (who gets to act vs. be acted upon)
//     agencyDistribution: [
//       { entity: "Government", active: 6, passive: 1, ratio: 6.0 },
//       { entity: "Opposition", active: 3, passive: 0, ratio: 3.0 },
//       { entity: "Scientists", active: 3, passive: 0, ratio: 3.0 },
//       { entity: "Protesters", active: 1, passive: 0, ratio: 1.0 },
//       { entity: "Industry", active: 2, passive: 0, ratio: 2.0 },
//       { entity: "Media", active: 1, passive: 0, ratio: 1.0 },
//       { entity: "Climate Policy", active: 2, passive: 7, ratio: 0.29 },
//       { entity: "Economic Impact", active: 0, passive: 3, ratio: 0.0 },
//       { entity: "Public", active: 0, passive: 2, ratio: 0.0 }
//     ],
    
//     // Topic distribution by paragraph
//     topicFlow: [
//       { paragraph: 1, topics: { "climate policy": 0.7, "government action": 0.3 } },
//       { paragraph: 2, topics: { "climate urgency": 0.8, "government commitment": 0.2 } },
//       { paragraph: 3, topics: { "economic concern": 0.6, "opposition response": 0.4 } },
//       { paragraph: 4, topics: { "public protest": 0.7, "accountability": 0.3 } },
//       { paragraph: 5, topics: { "scientific validation": 0.6, "implementation challenges": 0.4 } },
//       { paragraph: 6, topics: { "public opinion": 0.5, "political impact": 0.5 } },
//       { paragraph: 7, topics: { "industry response": 0.6, "economic disruption": 0.4 } },
//       { paragraph: 8, topics: { "government defense": 0.6, "future action": 0.4 } }
//     ],
    
//     // Narrative closure stats (which threads are resolved)
//     narrativeClosure: {
//       "Government Action": { initiated: true, developed: true, resolved: true, score: 1.0 },
//       "Opposition Response": { initiated: true, developed: true, resolved: false, score: 0.67 },
//       "Public Protest": { initiated: true, developed: false, resolved: false, score: 0.33 },
//       "Scientific Assessment": { initiated: true, developed: true, resolved: false, score: 0.67 },
//       "Industry Concern": { initiated: true, developed: false, resolved: false, score: 0.33 },
//       "Media Analysis": { initiated: true, developed: false, resolved: false, score: 0.33 }
//     }
//   });

//   // Utility functions for visualization
//   const calculateColor = (value) => {
//     // Generate color from red (-1) to green (1) with white at 0
//     if (value > 0) {
//       // Green with intensity based on value
//       return `rgba(0, ${Math.floor(150 + value * 105)}, 0, 0.8)`;
//     } else if (value < 0) {
//       // Red with intensity based on absolute value
//       return `rgba(${Math.floor(150 + Math.abs(value) * 105)}, 0, 0, 0.8)`;
//     }
//     return 'rgba(150, 150, 150, 0.8)'; // Neutral gray
//   };
  
//   const calculateSize = (weight) => {
//     return 20 + (weight * 30);
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-6 text-center">Narrative Fingerprint</h1>
      
//       {/* Core SVO Network Visualization */}
//       <div className="mb-10">
//         <h2 className="text-xl font-semibold mb-4">Subject-Verb-Object Network</h2>
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2 h-64 relative">
//           {/* This would be a full network visualization in a real implementation */}
//           {/* Simplified representation for demonstration */}
//           <div className="text-center text-sm text-gray-500 mb-4">
//             Core SVO patterns from the article (simplified visualization)
//           </div>
          
//           <div className="flex flex-wrap justify-center">
//             {narrativeData.svoPatterns.slice(0, 6).map((pattern, index) => (
//               <div key={index} className="m-2 p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs">
//                 <strong>{pattern.subject}</strong> {pattern.verb} <strong>{pattern.object}</strong>
//               </div>
//             ))}
//           </div>
          
//           <div className="absolute bottom-2 right-2 text-xs text-gray-500">
//             Showing 6 of {narrativeData.svoPatterns.length} patterns
//           </div>
//         </div>
//         <div className="text-sm text-gray-600">
//           This network captures the key action statements in the text. The full visualization 
//           would show how subjects, verbs, and objects connect in the narrative.
//         </div>
//       </div>
      
//       {/* Narrative Axis Fingerprint - Key Visualization */}
//       <div className="mb-10">
//         <h2 className="text-xl font-semibold mb-4">Narrative Axis Fingerprint</h2>
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2">
//           <div className="w-full h-64 relative">
//             {/* Create axes */}
//             <div className="absolute left-1/2 top-0 bottom-0 border-l border-gray-300"></div>
//             <div className="absolute top-1/2 left-0 right-0 border-t border-gray-300"></div>
            
//             {/* Axis labels */}
//             <div className="absolute text-xs text-center w-full top-1">Environmental Action</div>
//             <div className="absolute text-xs text-center w-full bottom-1">Economic Concern</div>
//             <div className="absolute text-xs h-full flex items-center left-1" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Government Authority</div>
//             <div className="absolute text-xs h-full flex items-center right-1" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Public Accountability</div>
            
//             {/* Plot the narrative position */}
//             <div className="absolute bg-blue-500 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold"
//                  style={{ 
//                    width: '60px', 
//                    height: '60px',
//                    left: `calc(50% + ${narrativeData.narrativeAxes[1].polarity * 40}%)`,
//                    top: `calc(50% - ${narrativeData.narrativeAxes[0].polarity * 40}%)`,
//                    transform: 'translate(-50%, -50%)'
//                  }}>
//               Core
//             </div>
            
//             {/* Satellite points for secondary narrative elements */}
//             <div className="absolute bg-green-500 rounded-full border-2 border-white shadow-md w-8 h-8"
//                  style={{ 
//                    left: `calc(60% + ${narrativeData.narrativeAxes[2].polarity * 20}%)`,
//                    top: `calc(40% - ${narrativeData.narrativeAxes[0].polarity * 30}%)`,
//                    transform: 'translate(-50%, -50%)'
//                  }}>
//             </div>
            
//             <div className="absolute bg-orange-500 rounded-full border-2 border-white shadow-md w-8 h-8"
//                  style={{ 
//                    left: `calc(40% + ${narrativeData.narrativeAxes[1].polarity * 10}%)`,
//                    top: `calc(60% - ${narrativeData.narrativeAxes[3].polarity * 25}%)`,
//                    transform: 'translate(-50%, -50%)'
//                  }}>
//             </div>
//           </div>
//         </div>
//         <div className="text-sm text-gray-600">
//           The Narrative Axis Fingerprint plots the story's position on key conceptual dimensions. 
//           This article leans toward environmental action over economic concern, and slightly favors 
//           government authority over public accountability. The core narrative position is shown in blue, 
//           with satellite narratives in other colors.
//         </div>
//       </div>
      
//       {/* Action Direction Matrix */}
//       <div className="mb-10">
//         <h2 className="text-xl font-semibold mb-4">Action Direction Matrix</h2>
//         <div className="overflow-x-auto mb-2">
//           <table className="min-w-full border-collapse border border-gray-200 text-sm">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="p-2 border">Actor / Target</th>
//                 {Array.from(new Set(narrativeData.actionDirections.map(d => d.target))).map((target, i) => (
//                   <th key={i} className="p-2 border">{target}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {Array.from(new Set(narrativeData.actionDirections.map(d => d.actor))).map((actor, i) => (
//                 <tr key={i}>
//                   <td className="p-2 border font-medium">{actor}</td>
//                   {Array.from(new Set(narrativeData.actionDirections.map(d => d.target))).map((target, j) => {
//                     const cell = narrativeData.actionDirections.find(d => d.actor === actor && d.target === target);
//                     return (
//                       <td key={j} className="p-2 border text-center">
//                         {cell ? (
//                           <div 
//                             className="w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white"
//                             style={{
//                               backgroundColor: calculateColor(cell.sentiment),
//                               fontSize: '0.75rem'
//                             }}
//                           >
//                             {cell.actions}
//                           </div>
//                         ) : "—"}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="text-sm text-gray-600">
//           This matrix shows who acts upon whom in the narrative. The number indicates action frequency, 
//           while the color shows sentiment (green for positive, red for negative). The government 
//           primarily acts on climate policy (positive), while opposition acts on climate policy and 
//           economic impact (negative).
//         </div>
//       </div>
      
//       {/* Agency Distribution */}
//       <div className="mb-10">
//         <h2 className="text-xl font-semibold mb-4">Agency Distribution</h2>
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2">
//           <div className="flex flex-wrap justify-center gap-3">
//             {narrativeData.agencyDistribution.map((entity, index) => (
//               <div key={index} className="text-center">
//                 <div 
//                   className="rounded-full mx-auto flex items-center justify-center"
//                   style={{
//                     width: `${calculateSize(entity.ratio > 1 ? Math.min(entity.ratio/3, 2) : 0.5)}px`,
//                     height: `${calculateSize(entity.ratio > 1 ? Math.min(entity.ratio/3, 2) : 0.5)}px`,
//                     backgroundColor: entity.ratio > 1 ? '#4CAF50' : '#F44336',
//                     color: 'white',
//                     fontSize: '0.7rem',
//                     opacity: entity.active + entity.passive > 2 ? 1 : 0.7
//                   }}
//                 >
//                   {entity.ratio.toFixed(1)}
//                 </div>
//                 <div className="text-xs mt-1">{entity.entity}</div>
//                 <div className="text-xs text-gray-500">
//                   {entity.active}:{entity.passive}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="text-sm text-gray-600">
//           The Agency Distribution shows the active-to-passive ratio for each entity. Larger, green circles 
//           indicate entities that primarily act (agents), while smaller, red circles show entities that are 
//           primarily acted upon (patients). The government has the highest agency in this narrative, while 
//           climate policy and economic impact are primarily acted upon.
//         </div>
//       </div>
      
//       {/* Topic Flow */}
//       <div className="mb-10">
//         <h2 className="text-xl font-semibold mb-4">Topic Flow</h2>
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2">
//           <div className="w-full h-64 relative">
//             {narrativeData.topicFlow.map((paragraph, i) => {
//               const topics = Object.entries(paragraph.topics);
//               const startY = (i / narrativeData.topicFlow.length) * 100;
//               const height = (1 / narrativeData.topicFlow.length) * 100;
              
//               return (
//                 <div key={i} className="absolute left-0 right-0" style={{ top: `${startY}%`, height: `${height}%` }}>
//                   <div className="h-full flex">
//                     {topics.map(([topic, weight], j) => (
//                       <div 
//                         key={j}
//                         className="h-full flex items-center justify-center text-xs text-white font-medium px-1 truncate"
//                         style={{ 
//                           width: `${weight * 100}%`,
//                           backgroundColor: j === 0 ? '#3F51B5' : '#7986CB'
//                         }}
//                       >
//                         {topic}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
            
//             {/* Paragraph labels */}
//             <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between">
//               {narrativeData.topicFlow.map((_, i) => (
//                 <div key={i} className="text-xs text-gray-500">P{i+1}</div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="text-sm text-gray-600">
//           The Topic Flow visualization shows how topics shift across paragraphs. Each horizontal bar 
//           represents a paragraph, with colored segments showing the proportion of different topics. 
//           This article begins with climate policy, shifts to economic concerns and various responses, 
//           then returns to government action.
//         </div>
//       </div>
      
//       {/* Narrative Closure */}
//       <div className="mb-10">
//         <h2 className="text-xl font-semibold mb-4">Narrative Closure</h2>
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2">
//           <div className="space-y-3">
//             {Object.entries(narrativeData.narrativeClosure).map(([narrative, status], index) => (
//               <div key={index}>
//                 <div className="flex justify-between text-sm mb-1">
//                   <div>{narrative}</div>
//                   <div>{(status.score * 100).toFixed(0)}% closed</div>
//                 </div>
//                 <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full rounded-full"
//                     style={{ 
//                       width: `${status.score * 100}%`,
//                       backgroundColor: status.score === 1 ? '#4CAF50' : status.score > 0.5 ? '#FF9800' : '#F44336'
//                     }}
//                   ></div>
//                 </div>
//                 <div className="flex text-xs text-gray-500 mt-1 space-x-4">
//                   <div>
//                     <span className={status.initiated ? "text-green-600" : "text-gray-400"}>●</span> Initiated
//                   </div>
//                   <div>
//                     <span className={status.developed ? "text-green-600" : "text-gray-400"}>●</span> Developed
//                   </div>
//                   <div>
//                     <span className={status.resolved ? "text-green-600" : "text-gray-400"}>●</span> Resolved
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="text-sm text-gray-600">
//           The Narrative Closure visualization shows which storylines are fully developed and resolved. 
//           Only the Government Action narrative receives complete closure in this article, while others 
//           are left partially or mostly unresolved, indicating bias toward government perspective.
//         </div>
//       </div>
      
//       {/* Overall Narrative Fingerprint Metrics */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-4">Narrative Fingerprint Metrics</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//             <div className="text-lg font-bold text-blue-800">0.6</div>
//             <div className="text-sm">Environmental-Economic Bias</div>
//           </div>
//           <div className="bg-green-50 p-3 rounded-lg border border-green-100">
//             <div className="text-lg font-bold text-green-800">0.3</div>
//             <div className="text-sm">Authority-Accountability Bias</div>
//           </div>
//           <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
//             <div className="text-lg font-bold text-purple-800">3.5</div>
//             <div className="text-sm">Agency Concentration</div>
//           </div>
//           <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
//             <div className="text-lg font-bold text-orange-800">0.56</div>
//             <div className="text-sm">Narrative Closure Bias</div>
//           </div>
//         </div>
//       </div>
      
//       {/* Methodology */}
//       <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
//         <h3 className="font-medium mb-2">Fingerprint Methodology</h3>
//         <ol className="list-decimal ml-5 space-y-1">
//           <li>Extract SVO triplets from each sentence to identify key actors and actions</li>
//           <li>Calculate sentiment polarity for each entity and action</li>
//           <li>Identify primary narrative axes of conflict/tension</li>
//           <li>Measure agency distribution by tabulating active vs. passive constructions</li>
//           <li>Track topic flow across paragraph structure</li>
//           <li>Evaluate narrative closure for different storylines</li>
//           <li>Generate composite metrics that characterize the narrative's distinctive signature</li>
//         </ol>
//         <p className="mt-3">
//           The resulting "fingerprint" provides a quantifiable signature that can be compared across 
//           articles, identifying patterns of narrative construction, bias, and framing.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default NarrativeFingerprint;







































import React, { useState } from 'react';

const NarrativeFingerprint = () => {
  const [narrativeData, setNarrativeData] = useState({
    // Core SVO patterns extracted from the article
    svoPatterns: [
      { subject: "Government", verb: "announced", object: "climate policy", weight: 1.0, paragraph: 1 },
      { subject: "Government", verb: "setting", object: "targets", weight: 0.9, paragraph: 1 },
      { subject: "Government", verb: "unveiled", object: "proposal", weight: 0.8, paragraph: 1 },
      { subject: "Proposal", verb: "includes", object: "investments", weight: 0.7, paragraph: 1 },
      { subject: "Minister", verb: "said", object: "commitment", weight: 0.8, paragraph: 2 },
      { subject: "We", verb: "afford", object: "inaction", weight: 0.7, paragraph: 2 },
      { subject: "Opposition", verb: "opposed", object: "plan", weight: 0.9, paragraph: 3 },
      { subject: "Opposition", verb: "criticizing", object: "implications", weight: 0.8, paragraph: 3 },
      { subject: "Policy", verb: "devastate", object: "sectors", weight: 0.7, paragraph: 3 },
      { subject: "Policy", verb: "burden", object: "taxpayers", weight: 0.7, paragraph: 3 },
      { subject: "Wilson", verb: "warned", object: "job losses", weight: 0.6, paragraph: 3 },
      { subject: "Protesters", verb: "demonstrated", object: "budget cuts", weight: 0.8, paragraph: 4 },
      { subject: "Scientists", verb: "supported", object: "targets", weight: 0.9, paragraph: 5 },
      { subject: "Reductions", verb: "align", object: "findings", weight: 0.7, paragraph: 5 },
      { subject: "Chen", verb: "warned", object: "challenges", weight: 0.6, paragraph: 5 },
      { subject: "Media", verb: "reported", object: "reaction", weight: 0.7, paragraph: 6 },
      { subject: "Analysts", verb: "suggest", object: "central issue", weight: 0.6, paragraph: 6 },
      { subject: "Industry", verb: "criticized", object: "elements", weight: 0.8, paragraph: 7 },
      { subject: "Schedule", verb: "create", object: "disruption", weight: 0.7, paragraph: 7 },
      { subject: "Government", verb: "defended", object: "approach", weight: 0.9, paragraph: 8 },
      { subject: "Prime Minister", verb: "scheduled", object: "address", weight: 0.7, paragraph: 8 },
      { subject: "He", verb: "described", object: "initiative", weight: 0.6, paragraph: 8 }
    ],
    // Sentiment polarity for main entities
    sentimentValues: {
      "Government": 0.6,
      "Opposition": -0.4,
      "Scientists": 0.5,
      "Protesters": 0.2,
      "Industry": -0.3,
      "Media": 0.0,
      "Climate Policy": 0.4,
      "Economic Impact": -0.5
    },
    // Action direction matrix (who acts on whom)
    actionDirections: [
      { actor: "Government", target: "Climate Policy", actions: 4, weight: 0.9, sentiment: 0.7 },
      { actor: "Opposition", target: "Climate Policy", actions: 2, weight: 0.8, sentiment: -0.6 },
      { actor: "Opposition", target: "Economic Impact", actions: 2, weight: 0.7, sentiment: -0.5 },
      { actor: "Scientists", target: "Climate Policy", actions: 2, weight: 0.8, sentiment: 0.5 },
      { actor: "Scientists", target: "Implementation", actions: 1, weight: 0.6, sentiment: -0.2 },
      { actor: "Industry", target: "Implementation", actions: 2, weight: 0.7, sentiment: -0.4 },
      { actor: "Protesters", target: "Government", actions: 1, weight: 0.6, sentiment: -0.3 },
      { actor: "Media", target: "Public", actions: 1, weight: 0.5, sentiment: 0.0 }
    ],
    // Core narrative conflict axes
    narrativeAxes: [
      { 
        axis: "Environmental Action vs. Economic Concern",
        polarity: 0.6,
        evidenceCount: 12,
        dominance: 0.8
      },
      { 
        axis: "Government Authority vs. Public Accountability",
        polarity: 0.3,
        evidenceCount: 8,
        dominance: 0.6
      },
      { 
        axis: "Scientific Consensus vs. Political Expediency",
        polarity: 0.4,
        evidenceCount: 5,
        dominance: 0.5
      },
      { 
        axis: "Present Action vs. Future Implications",
        polarity: 0.2,
        evidenceCount: 10,
        dominance: 0.7
      }
    ],
    // Distribution of agency (who gets to act vs. be acted upon)
    agencyDistribution: [
      { entity: "Government", active: 6, passive: 1, ratio: 6.0 },
      { entity: "Opposition", active: 3, passive: 0, ratio: 3.0 },
      { entity: "Scientists", active: 3, passive: 0, ratio: 3.0 },
      { entity: "Protesters", active: 1, passive: 0, ratio: 1.0 },
      { entity: "Industry", active: 2, passive: 0, ratio: 2.0 },
      { entity: "Media", active: 1, passive: 0, ratio: 1.0 },
      { entity: "Climate Policy", active: 2, passive: 7, ratio: 0.29 },
      { entity: "Economic Impact", active: 0, passive: 3, ratio: 0.0 },
      { entity: "Public", active: 0, passive: 2, ratio: 0.0 }
    ],
    // Topic distribution by paragraph
    topicFlow: [
      { paragraph: 1, topics: { "climate policy": 0.7, "government action": 0.3 } },
      { paragraph: 2, topics: { "climate urgency": 0.8, "government commitment": 0.2 } },
      { paragraph: 3, topics: { "economic concern": 0.6, "opposition response": 0.4 } },
      { paragraph: 4, topics: { "public protest": 0.7, "accountability": 0.3 } },
      { paragraph: 5, topics: { "scientific validation": 0.6, "implementation challenges": 0.4 } },
      { paragraph: 6, topics: { "public opinion": 0.5, "political impact": 0.5 } },
      { paragraph: 7, topics: { "industry response": 0.6, "economic disruption": 0.4 } },
      { paragraph: 8, topics: { "government defense": 0.6, "future action": 0.4 } }
    ],
    // Narrative closure stats
    narrativeClosure: {
      "Government Action": { initiated: true, developed: true, resolved: true, score: 1.0 },
      "Opposition Response": { initiated: true, developed: true, resolved: false, score: 0.67 },
      "Public Protest": { initiated: true, developed: false, resolved: false, score: 0.33 },
      "Scientific Assessment": { initiated: true, developed: true, resolved: false, score: 0.67 },
      "Industry Concern": { initiated: true, developed: false, resolved: false, score: 0.33 },
      "Media Analysis": { initiated: true, developed: false, resolved: false, score: 0.33 }
    }
  });

  // Utility functions for visualization
  const calculateColor = (value) => {
    // Generate color from red (-1) to green (1) with white at 0
    if (value > 0) {
      return `rgba(0, ${Math.floor(150 + value * 105)}, 0, 0.8)`;
    } else if (value < 0) {
      return `rgba(${Math.floor(150 + Math.abs(value) * 105)}, 0, 0, 0.8)`;
    }
    return 'rgba(150, 150, 150, 0.8)';
  };

  const calculateSize = (weight) => {
    return 20 + weight * 30;
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Main Title */}
      <h2 className="text-3xl font-bold text-center mb-6">Narrative Fingerprint</h2>
      
      {/* Core SVO Network Visualization */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Subject-Verb-Object Network</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2 h-64 relative">
          <div className="text-center text-sm text-gray-500 mb-4">
            Core SVO patterns from the article (simplified visualisation)
          </div>
          <div className="flex flex-wrap justify-center">
            {narrativeData.svoPatterns.slice(0, 6).map((pattern, index) => (
              <div key={index} className="m-2 p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs">
                <strong>{pattern.subject}</strong> {pattern.verb} <strong>{pattern.object}</strong>
              </div>
            ))}
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            Showing 6 of {narrativeData.svoPatterns.length} patterns
          </div>
        </div>
        <div className="text-sm text-gray-600">
          This network captures key action statements in the text. A full visualisation would show all SVO connections.
        </div>
      </div>
      
      {/* Narrative Axis Fingerprint */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Narrative Axis Fingerprint</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2">
          <div className="w-full h-64 relative">
            {/* Axes */}
            <div className="absolute left-1/2 top-0 bottom-0 border-l border-gray-300"></div>
            <div className="absolute top-1/2 left-0 right-0 border-t border-gray-300"></div>
            {/* Axis Labels */}
            <div className="absolute text-xs text-center w-full top-1">Environmental Action</div>
            <div className="absolute text-xs text-center w-full bottom-1">Economic Concern</div>
            <div className="absolute text-xs h-full flex items-center left-1" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Government Authority</div>
            <div className="absolute text-xs h-full flex items-center right-1" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Public Accountability</div>
            {/* Core Narrative Position */}
            <div className="absolute bg-blue-500 rounded-full border-2 border-white shadow-md flex items-center justify-center text-black font-bold"
                 style={{ 
                   width: '60px', 
                   height: '60px',
                   left: `calc(50% + ${narrativeData.narrativeAxes[1].polarity * 40}%)`,
                   top: `calc(50% - ${narrativeData.narrativeAxes[0].polarity * 40}%)`,
                   transform: 'translate(-50%, -50%)'
                 }}>
              Core
            </div>
            {/* Satellite Points */}
            <div className="absolute bg-green-500 rounded-full border-2 border-white shadow-md w-8 h-8"
                 style={{ 
                   left: `calc(60% + ${narrativeData.narrativeAxes[2].polarity * 20}%)`,
                   top: `calc(40% - ${narrativeData.narrativeAxes[0].polarity * 30}%)`,
                   transform: 'translate(-50%, -50%)'
                 }}></div>
            <div className="absolute bg-orange-500 rounded-full border-2 border-white shadow-md w-8 h-8"
                 style={{ 
                   left: `calc(40% + ${narrativeData.narrativeAxes[1].polarity * 10}%)`,
                   top: `calc(60% - ${narrativeData.narrativeAxes[3].polarity * 25}%)`,
                   transform: 'translate(-50%, -50%)'
                 }}></div>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          The Narrative Axis Fingerprint plots the story's position on key conceptual dimensions. This article leans towards environmental action over economic concern, and slightly favours government authority over public accountability. The core position is shown in blue, with satellite narratives in other colours.
        </div>
      </div>
      
      {/* Action Direction Matrix */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Action Direction Matrix</h3>
        <div className="overflow-x-auto mb-2">
          <table className="min-w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 border">Actor / Target</th>
                {Array.from(new Set(narrativeData.actionDirections.map(d => d.target))).map((target, i) => (
                  <th key={i} className="p-2 border">{target}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(new Set(narrativeData.actionDirections.map(d => d.actor))).map((actor, i) => (
                <tr key={i}>
                  <td className="p-2 border font-medium">{actor}</td>
                  {Array.from(new Set(narrativeData.actionDirections.map(d => d.target))).map((target, j) => {
                    const cell = narrativeData.actionDirections.find(d => d.actor === actor && d.target === target);
                    return (
                      <td key={j} className="p-2 border text-center">
                        {cell ? (
                          <div 
                            className="w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white"
                            style={{
                              backgroundColor: calculateColor(cell.sentiment),
                              fontSize: '0.75rem'
                            }}
                          >
                            {cell.actions}
                          </div>
                        ) : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-sm text-gray-600">
          This matrix shows who acts upon whom in the narrative. The number indicates action frequency, while the colour indicates sentiment.
        </div>
      </div>
      
      {/* Agency Distribution */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Agency Distribution</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2">
          <div className="flex flex-wrap justify-center gap-3">
            {narrativeData.agencyDistribution.map((entity, index) => (
              <div key={index} className="text-center">
                <div 
                  className="rounded-full mx-auto flex items-center justify-center"
                  style={{
                    width: `${calculateSize(entity.ratio > 1 ? Math.min(entity.ratio/3, 2) : 0.5)}px`,
                    height: `${calculateSize(entity.ratio > 1 ? Math.min(entity.ratio/3, 2) : 0.5)}px`,
                    backgroundColor: entity.ratio > 1 ? '#4CAF50' : '#F44336',
                    color: 'white',
                    fontSize: '0.7rem',
                    opacity: (entity.active + entity.passive) > 2 ? 1 : 0.7
                  }}
                >
                  {entity.ratio.toFixed(1)}
                </div>
                <div className="text-xs mt-1">{entity.entity}</div>
                <div className="text-xs text-gray-500">
                  {entity.active}:{entity.passive}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-600">
          The Agency Distribution shows the active-to-passive ratio for each entity. Larger, green circles indicate agents; smaller, red circles indicate patients.
        </div>
      </div>
      
      {/* Topic Flow */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Topic Flow</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2">
          <div className="w-full h-64 relative">
            {narrativeData.topicFlow.map((paragraph, i) => {
              const topics = Object.entries(paragraph.topics);
              const startY = (i / narrativeData.topicFlow.length) * 100;
              const height = (1 / narrativeData.topicFlow.length) * 100;
              return (
                <div key={i} className="absolute left-0 right-0" style={{ top: `${startY}%`, height: `${height}%` }}>
                  <div className="h-full flex">
                    {topics.map(([topic, weight], j) => (
                      <div 
                        key={j}
                        className="h-full flex items-center justify-center text-xs text-white font-medium px-1 truncate"
                        style={{ 
                          width: `${weight * 100}%`,
                          backgroundColor: j === 0 ? '#3F51B5' : '#7986CB'
                        }}
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between">
              {narrativeData.topicFlow.map((_, i) => (
                <div key={i} className="text-xs text-gray-500">P{i + 1}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          The Topic Flow visualisation shows how topics shift across paragraphs. Each bar represents a paragraph with coloured segments indicating topic proportion.
        </div>
      </div>
      
      {/* Narrative Closure */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Narrative Closure</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2">
          <div className="space-y-3">
            {Object.entries(narrativeData.narrativeClosure).map(([narrative, status], index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <div>{narrative}</div>
                  <div>{(status.score * 100).toFixed(0)}% closed</div>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${status.score * 100}%`,
                      backgroundColor: status.score === 1 ? '#4CAF50' : status.score > 0.5 ? '#FF9800' : '#F44336'
                    }}
                  ></div>
                </div>
                <div className="flex text-xs text-gray-500 mt-1 space-x-4">
                  <div>
                    <span className={status.initiated ? "text-green-600" : "text-gray-400"}>●</span> Initiated
                  </div>
                  <div>
                    <span className={status.developed ? "text-green-600" : "text-gray-400"}>●</span> Developed
                  </div>
                  <div>
                    <span className={status.resolved ? "text-green-600" : "text-gray-400"}>●</span> Resolved
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-600">
          The Narrative Closure visualisation shows how fully each narrative thread is resolved. Only the Government Action narrative is completely closed.
        </div>
      </div>
      
      {/* Narrative Fingerprint Metrics */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Narrative Fingerprint Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="text-lg font-bold text-blue-800">0.6</div>
            <div className="text-sm">Environmental-Economic Bias</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <div className="text-lg font-bold text-green-800">0.3</div>
            <div className="text-sm">Authority-Accountability Bias</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
            <div className="text-lg font-bold text-purple-800">3.5</div>
            <div className="text-sm">Agency Concentration</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
            <div className="text-lg font-bold text-orange-800">0.56</div>
            <div className="text-sm">Narrative Closure Bias</div>
          </div>
        </div>
      </div>
      
      {/* Fingerprint Methodology */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <h3 className="font-medium mb-2">Fingerprint Methodology</h3>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Extract SVO triplets from each sentence to identify key actors and actions.</li>
          <li>Calculate sentiment polarity for each entity and action.</li>
          <li>Identify primary narrative axes of conflict/tension.</li>
          <li>Measure agency distribution by tabulating active vs. passive constructions.</li>
          <li>Track topic flow across paragraph structure.</li>
          <li>Evaluate narrative closure for different storylines.</li>
          <li>Generate composite metrics to characterise the narrative's distinctive fingerprint.</li>
        </ol>
        <p className="mt-3">
          The resulting fingerprint provides a quantifiable signature that can be compared across articles to reveal patterns in narrative construction, bias, and framing.
        </p>
      </div>
      
      {/* User Guide */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
        <h3 className="text-xl font-semibold mb-2">User Guide</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>The <strong>SVO Network</strong> displays core action statements extracted from the article.</li>
          <li>The <strong>Narrative Axis Fingerprint</strong> plots the story's position on key conceptual dimensions.</li>
          <li>The <strong>Action Direction Matrix</strong> shows who acts upon whom and with what sentiment.</li>
          <li>The <strong>Agency Distribution</strong> visualises the active-to-passive ratio of entities.</li>
          <li>The <strong>Topic Flow</strong> visualisation shows the shifting focus of topics across paragraphs.</li>
          <li>The <strong>Narrative Closure</strong> section reveals how fully narrative threads are resolved.</li>
          <li>The <strong>Narrative Fingerprint Metrics</strong> summarise composite narrative biases and concentrations.</li>
          <li>Together, these elements provide a quantifiable narrative fingerprint that characterises the article's distinctive signature.</li>
        </ul>
      </div>
    </div>
  );
};

export default NarrativeFingerprint;






