// import React, { useState } from 'react';

// const TopicalFocusViz = () => {
//   // Sample topical analysis data from the article
//   const [topicalData, setTopicalData] = useState({
//     // Main topics identified in the article
//     topics: [
//       {
//         id: 1,
//         name: "Climate Policy",
//         keywords: ["climate policy", "targets", "carbon emissions", "reduce", "environmental"],
//         occurrences: 9,
//         paragraphPresence: [1, 2, 3, 5, 6, 7, 8],
//         color: "#4CAF50" // Green
//       },
//       {
//         id: 2,
//         name: "Economic Impacts",
//         keywords: ["economic", "industrial sectors", "costs", "taxpayers", "jobs", "disruption"],
//         occurrences: 7,
//         paragraphPresence: [3, 7],
//         color: "#FF9800" // Orange
//       },
//       {
//         id: 3,
//         name: "Political Process",
//         keywords: ["announced", "opposed", "criticized", "defended", "election campaign"],
//         occurrences: 8,
//         paragraphPresence: [1, 3, 6, 8],
//         color: "#2196F3" // Blue
//       },
//       {
//         id: 4,
//         name: "Scientific Research",
//         keywords: ["research findings", "scientist", "institute", "indicates", "targets"],
//         occurrences: 4,
//         paragraphPresence: [5],
//         color: "#9C27B0" // Purple
//       },
//       {
//         id: 5,
//         name: "Public Response",
//         keywords: ["protesters", "demonstrated", "public reaction", "divided opinions"],
//         occurrences: 5,
//         paragraphPresence: [4, 6],
//         color: "#F44336" // Red
//       },
//       {
//         id: 6,
//         name: "Implementation Details",
//         keywords: ["investments", "renewable energy", "phase-out", "implementation", "timeline"],
//         occurrences: 6,
//         paragraphPresence: [1, 5, 7],
//         color: "#00BCD4" // Teal
//       }
//     ],
//     // Topic categories for broader analysis
//     topicCategories: [
//       {
//         id: 1,
//         name: "Environmental",
//         topics: ["Climate Policy", "Implementation Details"],
//         totalOccurrences: 15,
//         color: "#4CAF50" // Green
//       },
//       {
//         id: 2,
//         name: "Economic",
//         topics: ["Economic Impacts"],
//         totalOccurrences: 7,
//         color: "#FF9800" // Orange
//       },
//       {
//         id: 3,
//         name: "Political",
//         topics: ["Political Process", "Public Response"],
//         totalOccurrences: 13,
//         color: "#2196F3" // Blue
//       },
//       {
//         id: 4,
//         name: "Scientific",
//         topics: ["Scientific Research"],
//         totalOccurrences: 4,
//         color: "#9C27B0" // Purple
//       }
//     ],
//     // Paragraph-level analysis
//     paragraphs: [
//       {
//         id: 1,
//         position: 1,
//         text: "The Government announced a sweeping new climate policy yesterday, setting targets to reduce carbon emissions by 60% before 2035. The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy and gradual phase-out of fossil fuel subsidies.",
//         dominantTopic: "Climate Policy",
//         topics: ["Climate Policy", "Political Process", "Implementation Details"],
//         temporalFocus: "present-future"
//       },
//       {
//         id: 2,
//         position: 2,
//         text: "\"This represents our commitment to addressing the climate crisis with the urgency it demands,\" said Environment Minister Elena Reynolds. \"We can no longer afford inaction on this critical issue.\"",
//         dominantTopic: "Climate Policy",
//         topics: ["Climate Policy"],
//         temporalFocus: "present-future"
//       },
//       {
//         id: 3,
//         position: 3,
//         text: "Opposition leaders immediately opposed the plan, criticizing its economic implications. \"This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs,\" said Opposition Leader James Wilson during an emergency press conference. Wilson further warned about potential job losses in traditional energy sectors.",
//         dominantTopic: "Economic Impacts",
//         topics: ["Climate Policy", "Economic Impacts", "Political Process"],
//         temporalFocus: "future"
//       },
//       {
//         id: 4,
//         position: 4,
//         text: "Meanwhile, protesters demonstrated against recent budget cuts to environmental monitoring programs, gathering outside Parliament with signs reading \"Actions Not Words\" and \"Fund Our Future.\" The demonstration, organized by climate activist group EarthFirst, drew approximately 2,000 participants.",
//         dominantTopic: "Public Response",
//         topics: ["Public Response"],
//         temporalFocus: "present-past"
//       },
//       {
//         id: 5,
//         position: 5,
//         text: "Scientists from the National Climate Research Institute largely supported the government's targets. \"The proposed reductions align with what our research findings indicate is necessary,\" explained Dr. Sarah Chen, lead climate researcher at the institute. However, she warned about implementation challenges, noting that \"meeting these targets will require unprecedented coordination across all sectors.\"",
//         dominantTopic: "Scientific Research",
//         topics: ["Climate Policy", "Scientific Research", "Implementation Details"],
//         temporalFocus: "present-future"
//       },
//       {
//         id: 6,
//         position: 6,
//         text: "Media outlets extensively reported on public reaction to the announcement, with national surveys showing divided opinions along urban and rural lines. Political analysts suggest the climate policy could become a central issue in next year's election campaign.",
//         dominantTopic: "Political Process",
//         topics: ["Climate Policy", "Political Process", "Public Response"],
//         temporalFocus: "present-future"
//       },
//       {
//         id: 7,
//         position: 7,
//         text: "Industry representatives criticized specific elements of the proposal, particularly the accelerated timeline. \"While we support climate action, this implementation schedule will create substantial economic disruption,\" said Marcus Lee, spokesperson for the National Business Association.",
//         dominantTopic: "Economic Impacts",
//         topics: ["Climate Policy", "Economic Impacts", "Implementation Details"],
//         temporalFocus: "future"
//       },
//       {
//         id: 8,
//         position: 8,
//         text: "As debate continues, the Government defended its approach, with the Prime Minister scheduled to address the nation next week regarding what he described as \"the most significant environmental initiative in our country's history.\"",
//         dominantTopic: "Political Process",
//         topics: ["Climate Policy", "Political Process"],
//         temporalFocus: "present-future"
//       }
//     ],
//     // Temporal framing analysis
//     temporalFraming: {
//       past: 1, // Count of paragraphs with primarily past focus
//       present: 2, // Count of paragraphs with primarily present focus
//       future: 2, // Count of paragraphs with primarily future focus
//       presentPast: 1, // Count of paragraphs with present-past focus
//       presentFuture: 4, // Count of paragraphs with present-future focus
//       distribution: [
//         { frame: "Past events", count: 1 },
//         { frame: "Current actions", count: 2 },
//         { frame: "Future implications", count: 2 },
//         { frame: "Present-past", count: 1 },
//         { frame: "Present-future", count: 4 }
//       ]
//     },
//     // Terms with highest frequency
//     keyTerms: [
//       { term: "policy", count: 10, category: "Political" },
//       { term: "climate", count: 8, category: "Environmental" },
//       { term: "government", count: 6, category: "Political" },
//       { term: "economic", count: 5, category: "Economic" },
//       { term: "targets", count: 4, category: "Environmental" },
//       { term: "implementation", count: 3, category: "Implementation" },
//       { term: "scientists", count: 2, category: "Scientific" },
//       { term: "protests", count: 2, category: "Public Response" }
//     ]
//   });

//   // Calculate percentage for width visualization
//   const getPercentage = (count, total) => {
//     return `${Math.round((count / total) * 100)}%`;
//   };

//   // Get total occurrences across all topics
//   const totalTopicOccurrences = topicalData.topics.reduce((sum, topic) => sum + topic.occurrences, 0);

//   // Calculate color intensity for heatmap
//   const getHeatMapColor = (count, max) => {
//     // normalized between 0 and 1
//     const intensity = count / max;
//     return `rgba(255, 99, 71, ${0.2 + intensity * 0.8})`;
//   };

//   // Get maximum topic presence for heatmap scaling
//   const maxTopicPresence = Math.max(...topicalData.topics.map(topic => topic.paragraphPresence.length));

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-4 text-center">Topical Focus Analysis</h1>
      
//       {/* Topic Distribution */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Topic Distribution</h2>
//         <div className="space-y-4">
//           {topicalData.topics.map(topic => (
//             <div key={topic.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center">
//                   <div 
//                     className="w-4 h-4 rounded-full mr-2" 
//                     style={{ backgroundColor: topic.color }}
//                   ></div>
//                   <h3 className="font-medium">{topic.name}</h3>
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {topic.occurrences} mentions ({Math.round((topic.occurrences / totalTopicOccurrences) * 100)}%)
//                 </div>
//               </div>
              
//               <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
//                 <div 
//                   className="h-2 rounded-full" 
//                   style={{ 
//                     width: getPercentage(topic.occurrences, totalTopicOccurrences),
//                     backgroundColor: topic.color 
//                   }}
//                 ></div>
//               </div>
              
//               <div className="text-sm">
//                 <span className="font-medium">Keywords:</span> {topic.keywords.join(", ")}
//               </div>
              
//               <div className="text-sm mt-1">
//                 <span className="font-medium">Appears in paragraphs:</span> {topic.paragraphPresence.join(", ")}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Broader Category Distribution */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Topic Category Distribution</h2>
//         <div className="w-full bg-gray-100 h-16 rounded-lg overflow-hidden flex">
//           {topicalData.topicCategories.map(category => (
//             <div 
//               key={category.id}
//               className="h-full flex items-center justify-center text-white"
//               style={{ 
//                 backgroundColor: category.color,
//                 width: getPercentage(category.totalOccurrences, 
//                   topicalData.topicCategories.reduce((sum, cat) => sum + cat.totalOccurrences, 0))
//               }}
//             >
//               <div className="text-sm font-medium">
//                 {category.name}
//                 <div className="text-xs">{Math.round((category.totalOccurrences / 
//                   topicalData.topicCategories.reduce((sum, cat) => sum + cat.totalOccurrences, 0)) * 100)}%</div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="text-sm text-center mt-2 text-gray-600">
//           Distribution of broader topic categories across the article
//         </div>
//       </div>
      
//       {/* Paragraph Topic Heatmap */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Topic Heat Map by Paragraph</h2>
        
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse mb-2">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Paragraph</th>
//                 {topicalData.topics.map(topic => (
//                   <th 
//                     key={topic.id} 
//                     className="border px-4 py-2 text-sm"
//                     style={{ color: topic.color }}
//                   >
//                     {topic.name}
//                   </th>
//                 ))}
//                 <th className="border px-4 py-2 text-sm">Temporal Frame</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topicalData.paragraphs.map(paragraph => (
//                 <tr key={paragraph.id} className="hover:bg-gray-50">
//                   <td className="border px-4 py-2 font-medium">{paragraph.position}</td>
                  
//                   {topicalData.topics.map(topic => {
//                     const isPresent = paragraph.topics.includes(topic.name);
//                     const isDominant = paragraph.dominantTopic === topic.name;
                    
//                     return (
//                       <td 
//                         key={topic.id} 
//                         className="border px-4 py-2 text-center"
//                         style={{ 
//                           backgroundColor: isPresent ? 
//                             (isDominant ? topic.color : `${topic.color}40`) : 
//                             'transparent'
//                         }}
//                       >
//                         {isDominant ? '●' : (isPresent ? '○' : '')}
//                       </td>
//                     );
//                   })}
                  
//                   <td className="border px-4 py-2 text-sm text-center">
//                     {paragraph.temporalFocus}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="text-sm text-gray-600">
//           ● = Dominant topic in paragraph, ○ = Topic present but not dominant
//         </div>
//       </div>
      
//       {/* Temporal Framing Analysis */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Temporal Framing Analysis</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Temporal Distribution */}
//           <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//             <h3 className="font-medium mb-3">Temporal Frame Distribution</h3>
            
//             <div className="space-y-3">
//               {topicalData.temporalFraming.distribution.map((item, index) => (
//                 <div key={index}>
//                   <div className="flex justify-between text-sm mb-1">
//                     <div>{item.frame}</div>
//                     <div>{item.count} paragraphs</div>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div 
//                       className="h-2 rounded-full bg-indigo-500" 
//                       style={{ 
//                         width: getPercentage(
//                           item.count, 
//                           topicalData.temporalFraming.distribution.reduce((sum, i) => sum + i.count, 0)
//                         )
//                       }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Temporal Focus Timeline */}
//           <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//             <h3 className="font-medium mb-3">Paragraph Temporal Focus</h3>
            
//             <div className="relative h-60">
//               {/* Timeline base */}
//               <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2"></div>
              
//               {/* Label for Past */}
//               <div className="absolute top-0 left-0 text-sm font-medium text-gray-600">Past</div>
              
//               {/* Label for Present */}
//               <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-sm font-medium text-gray-600">Present</div>
              
//               {/* Label for Future */}
//               <div className="absolute bottom-0 left-0 text-sm font-medium text-gray-600">Future</div>
              
//               {/* Paragraph markers */}
//               {topicalData.paragraphs.map((paragraph, index) => {
//                 // Calculate vertical position based on temporal focus
//                 let position;
//                 switch(paragraph.temporalFocus) {
//                   case "past": position = "top-0"; break;
//                   case "present": position = "top-1/2 -translate-y-1/2"; break;
//                   case "future": position = "bottom-0"; break;
//                   case "present-past": position = "top-1/4 -translate-y-1/2"; break;
//                   case "present-future": position = "top-3/4 -translate-y-1/2"; break;
//                   default: position = "top-1/2 -translate-y-1/2";
//                 }
                
//                 // Calculate horizontal position to spread out markers
//                 const left = 50 + (index % 2 === 0 ? 15 : -15);
                
//                 const dominantTopic = topicalData.topics.find(t => t.name === paragraph.dominantTopic);
                
//                 return (
//                   <div 
//                     key={paragraph.id}
//                     className={`absolute transform -translate-x-1/2 ${position}`}
//                     style={{ left: `${left}%` }}
//                   >
//                     <div 
//                       className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-white text-white text-xs"
//                       style={{ backgroundColor: dominantTopic.color }}
//                     >
//                       {paragraph.position}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
            
//             <div className="text-xs text-center mt-2 text-gray-600">
//               Visualization of each paragraph's temporal orientation from past to future
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Key Terms Analysis */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Key Terms Frequency</h2>
        
//         <div className="flex flex-wrap gap-2">
//           {topicalData.keyTerms.map((term, index) => {
//             // Calculate size based on frequency
//             const size = 14 + (term.count * 2);
            
//             // Select color based on category
//             let color;
//             switch(term.category) {
//               case "Political": color = "#2196F3"; break;
//               case "Environmental": color = "#4CAF50"; break;
//               case "Economic": color = "#FF9800"; break;
//               case "Scientific": color = "#9C27B0"; break;
//               case "Implementation": color = "#00BCD4"; break;
//               case "Public Response": color = "#F44336"; break;
//               default: color = "#607D8B";
//             }
            
//             return (
//               <div 
//                 key={index}
//                 className="px-3 py-2 rounded-full text-white"
//                 style={{ 
//                   backgroundColor: color,
//                   fontSize: `${size}px`
//                 }}
//               >
//                 {term.term}
//                 <span className="ml-1 text-xs align-text-top">({term.count})</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
      
//       {/* Paragraph-by-Paragraph Analysis */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Paragraph-by-Paragraph Analysis</h2>
        
//         <div className="space-y-4">
//           {topicalData.paragraphs.map(paragraph => {
//             const dominantTopic = topicalData.topics.find(t => t.name === paragraph.dominantTopic);
            
//             return (
//               <div 
//                 key={paragraph.id}
//                 className="border rounded-lg overflow-hidden"
//                 style={{ borderColor: dominantTopic.color }}
//               >
//                 <div 
//                   className="p-2 text-white text-sm flex justify-between items-center"
//                   style={{ backgroundColor: dominantTopic.color }}
//                 >
//                   <div>Paragraph {paragraph.position}</div>
//                   <div className="flex items-center">
//                     <span className="mr-2">Dominant: {paragraph.dominantTopic}</span>
//                     <span className="text-xs border border-white rounded px-1">
//                       {paragraph.temporalFocus}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="p-3">
//                   <div className="text-sm mb-2">{paragraph.text}</div>
//                   <div className="flex flex-wrap gap-1">
//                     {paragraph.topics.map((topicName, index) => {
//                       const topic = topicalData.topics.find(t => t.name === topicName);
//                       const isDominant = paragraph.dominantTopic === topicName;
                      
//                       return (
//                         <span 
//                           key={index}
//                           className="px-2 py-1 text-xs rounded-full"
//                           style={{ 
//                             backgroundColor: isDominant ? topic.color : `${topic.color}30`,
//                             color: isDominant ? 'white' : 'black'
//                           }}
//                         >
//                           {topicName}
//                         </span>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
      
//       {/* How to Interpret */}
//       <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
//         <h3 className="font-medium mb-2">How to Interpret This Visualization:</h3>
//         <ul className="list-disc ml-5 space-y-1">
//           <li>The Topic Distribution section shows which topics receive the most attention in the article, with keywords and paragraph references.</li>
//           <li>The Topic Category Distribution visualizes the broader balance between environmental, economic, political, and scientific content.</li>
//           <li>The Topic Heat Map reveals which topics appear in which paragraphs, with dominant topics highlighted with full color.</li>
//           <li>The Temporal Framing Analysis shows how the article balances references to past events, present actions, and future implications.</li>
//           <li>The Key Terms Frequency visualization displays the most common terms sized by frequency and colored by category.</li>
//           <li>Together, these elements reveal which topics the article prioritizes, how topics are distributed throughout the text, and how different temporal frames are employed in the narrative.</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TopicalFocusViz;






















import React, { useState } from 'react';

const TopicalFocusViz = () => {
  // Sample topical analysis data from the article
  const [topicalData] = useState({
    // Main topics identified in the article
    topics: [
      {
        id: 1,
        name: "Climate Policy",
        keywords: ["climate policy", "targets", "carbon emissions", "reduce", "environmental"],
        occurrences: 9,
        paragraphPresence: [1, 2, 3, 5, 6, 7, 8],
        color: "#4CAF50" // Green
      },
      {
        id: 2,
        name: "Economic Impacts",
        keywords: ["economic", "industrial sectors", "costs", "taxpayers", "jobs", "disruption"],
        occurrences: 7,
        paragraphPresence: [3, 7],
        color: "#FF9800" // Orange
      },
      {
        id: 3,
        name: "Political Process",
        keywords: ["announced", "opposed", "criticized", "defended", "election campaign"],
        occurrences: 8,
        paragraphPresence: [1, 3, 6, 8],
        color: "#2196F3" // Blue
      },
      {
        id: 4,
        name: "Scientific Research",
        keywords: ["research findings", "scientist", "institute", "indicates", "targets"],
        occurrences: 4,
        paragraphPresence: [5],
        color: "#9C27B0" // Purple
      },
      {
        id: 5,
        name: "Public Response",
        keywords: ["protesters", "demonstrated", "public reaction", "divided opinions"],
        occurrences: 5,
        paragraphPresence: [4, 6],
        color: "#F44336" // Red
      },
      {
        id: 6,
        name: "Implementation Details",
        keywords: ["investments", "renewable energy", "phase-out", "implementation", "timeline"],
        occurrences: 6,
        paragraphPresence: [1, 5, 7],
        color: "#00BCD4" // Teal
      }
    ],
    // Topic categories for broader analysis
    topicCategories: [
      {
        id: 1,
        name: "Environmental",
        topics: ["Climate Policy", "Implementation Details"],
        totalOccurrences: 15,
        color: "#4CAF50" // Green
      },
      {
        id: 2,
        name: "Economic",
        topics: ["Economic Impacts"],
        totalOccurrences: 7,
        color: "#FF9800" // Orange
      },
      {
        id: 3,
        name: "Political",
        topics: ["Political Process", "Public Response"],
        totalOccurrences: 13,
        color: "#2196F3" // Blue
      },
      {
        id: 4,
        name: "Scientific",
        topics: ["Scientific Research"],
        totalOccurrences: 4,
        color: "#9C27B0" // Purple
      }
    ],
    // Paragraph-level analysis
    paragraphs: [
      {
        id: 1,
        position: 1,
        text: "The Government announced a sweeping new climate policy yesterday, setting targets to reduce carbon emissions by 60% before 2035. The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy and gradual phase-out of fossil fuel subsidies.",
        dominantTopic: "Climate Policy",
        topics: ["Climate Policy", "Political Process", "Implementation Details"],
        temporalFocus: "present-future"
      },
      {
        id: 2,
        position: 2,
        text: "\"This represents our commitment to addressing the climate crisis with the urgency it demands,\" said Environment Minister Elena Reynolds. \"We can no longer afford inaction on this critical issue.\"",
        dominantTopic: "Climate Policy",
        topics: ["Climate Policy"],
        temporalFocus: "present-future"
      },
      {
        id: 3,
        position: 3,
        text: "Opposition leaders immediately opposed the plan, criticizing its economic implications. \"This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs,\" said Opposition Leader James Wilson during an emergency press conference. Wilson further warned about potential job losses in traditional energy sectors.",
        dominantTopic: "Economic Impacts",
        topics: ["Climate Policy", "Economic Impacts", "Political Process"],
        temporalFocus: "future"
      },
      {
        id: 4,
        position: 4,
        text: "Meanwhile, protesters demonstrated against recent budget cuts to environmental monitoring programs, gathering outside Parliament with signs reading \"Actions Not Words\" and \"Fund Our Future.\" The demonstration, organized by climate activist group EarthFirst, drew approximately 2,000 participants.",
        dominantTopic: "Public Response",
        topics: ["Public Response"],
        temporalFocus: "present-past"
      },
      {
        id: 5,
        position: 5,
        text: "Scientists from the National Climate Research Institute largely supported the government's targets. \"The proposed reductions align with what our research findings indicate is necessary,\" explained Dr. Sarah Chen, lead climate researcher at the institute. However, she warned about implementation challenges, noting that \"meeting these targets will require unprecedented coordination across all sectors.\"",
        dominantTopic: "Scientific Research",
        topics: ["Climate Policy", "Scientific Research", "Implementation Details"],
        temporalFocus: "present-future"
      },
      {
        id: 6,
        position: 6,
        text: "Media outlets extensively reported on public reaction to the announcement, with national surveys showing divided opinions along urban and rural lines. Political analysts suggest the climate policy could become a central issue in next year's election campaign.",
        dominantTopic: "Political Process",
        topics: ["Climate Policy", "Political Process", "Public Response"],
        temporalFocus: "present-future"
      },
      {
        id: 7,
        position: 7,
        text: "Industry representatives criticized specific elements of the proposal, particularly the accelerated timeline. \"While we support climate action, this implementation schedule will create substantial economic disruption,\" said Marcus Lee, spokesperson for the National Business Association.",
        dominantTopic: "Economic Impacts",
        topics: ["Climate Policy", "Economic Impacts", "Implementation Details"],
        temporalFocus: "future"
      },
      {
        id: 8,
        position: 8,
        text: "As debate continues, the Government defended its approach, with the Prime Minister scheduled to address the nation next week regarding what he described as \"the most significant environmental initiative in our country's history.\"",
        dominantTopic: "Political Process",
        topics: ["Climate Policy", "Political Process"],
        temporalFocus: "present-future"
      }
    ],
    // Temporal framing analysis
    temporalFraming: {
      past: 1,
      present: 2,
      future: 2,
      presentPast: 1,
      presentFuture: 4,
      distribution: [
        { frame: "Past events", count: 1 },
        { frame: "Current actions", count: 2 },
        { frame: "Future implications", count: 2 },
        { frame: "Present-past", count: 1 },
        { frame: "Present-future", count: 4 }
      ]
    },
    // Terms with highest frequency
    keyTerms: [
      { term: "policy", count: 10, category: "Political" },
      { term: "climate", count: 8, category: "Environmental" },
      { term: "government", count: 6, category: "Political" },
      { term: "economic", count: 5, category: "Economic" },
      { term: "targets", count: 4, category: "Environmental" },
      { term: "implementation", count: 3, category: "Implementation" },
      { term: "scientists", count: 2, category: "Scientific" },
      { term: "protests", count: 2, category: "Public Response" }
    ]
  });

  // Calculate percentage for width visualisation
  const getPercentage = (count, total) => {
    return `${Math.round((count / total) * 100)}%`;
  };

  // Get total occurrences across all topics
  const totalTopicOccurrences = topicalData.topics.reduce((sum, topic) => sum + topic.occurrences, 0);

  // Heatmap colour function (not used heavily but kept for reference)
  const getHeatMapColor = (count, max) => {
    // normalised between 0 and 1
    const intensity = count / max;
    return `rgba(255, 99, 71, ${0.2 + intensity * 0.8})`;
  };

  // Get maximum topic presence for heatmap scaling
  const maxTopicPresence = Math.max(...topicalData.topics.map(topic => topic.paragraphPresence.length));

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Main Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Topical Focus Analysis
      </h2>

      {/* Main Content Box */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        
        {/* Topic Distribution */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Topic Distribution</h3>
          <div className="space-y-4">
            {topicalData.topics.map(topic => (
              <div 
                key={topic.id} 
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: topic.color }}
                    ></div>
                    <h4 className="font-medium">{topic.name}</h4>
                  </div>
                  <div className="text-sm text-gray-500">
                    {topic.occurrences} mentions (
                    {Math.round((topic.occurrences / totalTopicOccurrences) * 100)}%)
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: getPercentage(topic.occurrences, totalTopicOccurrences),
                      backgroundColor: topic.color
                    }}
                  ></div>
                </div>

                <div className="text-sm">
                  <span className="font-medium">Keywords:</span> {topic.keywords.join(", ")}
                </div>
                <div className="text-sm mt-1">
                  <span className="font-medium">Appears in paragraphs:</span> {topic.paragraphPresence.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Broader Category Distribution */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Topic Category Distribution</h3>
          <div className="w-full bg-gray-100 h-16 rounded-lg overflow-hidden flex">
            {topicalData.topicCategories.map(category => (
              <div
                key={category.id}
                className="h-full flex items-center justify-center text-white"
                style={{
                  backgroundColor: category.color,
                  width: getPercentage(
                    category.totalOccurrences,
                    topicalData.topicCategories.reduce((sum, cat) => sum + cat.totalOccurrences, 0)
                  )
                }}
              >
                <div className="text-sm font-medium text-center px-2">
                  {category.name}
                  <div className="text-xs">
                    {Math.round(
                      (category.totalOccurrences /
                        topicalData.topicCategories.reduce((sum, cat) => sum + cat.totalOccurrences, 0)) *
                        100
                    )}
                    %
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-sm text-center mt-2 text-gray-600">
            Distribution of broader topic categories across the article
          </div>
        </div>

        {/* Paragraph Topic Heat Map */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Topic Heat Map by Paragraph</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse mb-2">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Paragraph</th>
                  {topicalData.topics.map(topic => (
                    <th
                      key={topic.id}
                      className="border px-4 py-2 text-sm"
                      style={{ color: topic.color }}
                    >
                      {topic.name}
                    </th>
                  ))}
                  <th className="border px-4 py-2 text-sm">Temporal Frame</th>
                </tr>
              </thead>
              <tbody>
                {topicalData.paragraphs.map(paragraph => (
                  <tr key={paragraph.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 font-medium">{paragraph.position}</td>

                    {topicalData.topics.map(topic => {
                      const isPresent = paragraph.topics.includes(topic.name);
                      const isDominant = paragraph.dominantTopic === topic.name;

                      return (
                        <td
                          key={topic.id}
                          className="border px-4 py-2 text-center"
                          style={{
                            backgroundColor: isPresent
                              ? isDominant
                                ? topic.color
                                : `${topic.color}40`
                              : "transparent"
                          }}
                        >
                          {isDominant ? "●" : isPresent ? "○" : ""}
                        </td>
                      );
                    })}

                    <td className="border px-4 py-2 text-sm text-center">
                      {paragraph.temporalFocus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-sm text-gray-600">
            ● = Dominant topic in paragraph, ○ = Topic present but not dominant
          </div>
        </div>

        {/* Temporal Framing Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Temporal Framing Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Temporal Distribution */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium mb-3">Temporal Frame Distribution</h4>
              <div className="space-y-3">
                {topicalData.temporalFraming.distribution.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <div>{item.frame}</div>
                      <div>{item.count} paragraphs</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-indigo-500"
                        style={{
                          width: getPercentage(
                            item.count,
                            topicalData.temporalFraming.distribution.reduce((sum, i) => sum + i.count, 0)
                          )
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Temporal Focus Timeline */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium mb-3">Paragraph Temporal Focus</h4>
              <div className="relative h-60">
                {/* Timeline base */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2"></div>

                {/* Label for Past */}
                <div className="absolute top-0 left-0 text-sm font-medium text-gray-600">Past</div>

                {/* Label for Present */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-sm font-medium text-gray-600">
                  Present
                </div>

                {/* Label for Future */}
                <div className="absolute bottom-0 left-0 text-sm font-medium text-gray-600">Future</div>

                {/* Paragraph markers */}
                {topicalData.paragraphs.map((paragraph, index) => {
                  let position;
                  switch (paragraph.temporalFocus) {
                    case "past":
                      position = "top-0";
                      break;
                    case "present":
                      position = "top-1/2 -translate-y-1/2";
                      break;
                    case "future":
                      position = "bottom-0";
                      break;
                    case "present-past":
                      position = "top-1/4 -translate-y-1/2";
                      break;
                    case "present-future":
                      position = "top-3/4 -translate-y-1/2";
                      break;
                    default:
                      position = "top-1/2 -translate-y-1/2";
                  }

                  const left = 50 + (index % 2 === 0 ? 15 : -15);
                  const dominantTopic = topicalData.topics.find(
                    (t) => t.name === paragraph.dominantTopic
                  );

                  return (
                    <div
                      key={paragraph.id}
                      className={`absolute transform -translate-x-1/2 ${position}`}
                      style={{ left: `${left}%` }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-white text-white text-xs"
                        style={{ backgroundColor: dominantTopic.color }}
                      >
                        {paragraph.position}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-xs text-center mt-2 text-gray-600">
                Visualisation of each paragraph's temporal orientation from past to future
              </div>
            </div>
          </div>
        </div>

        {/* Key Terms Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Key Terms Frequency</h3>
          <div className="flex flex-wrap gap-2">
            {topicalData.keyTerms.map((term, index) => {
              // Calculate size based on frequency
              const size = 14 + term.count * 2;

              // Select colour based on category
              let color;
              switch (term.category) {
                case "Political":
                  color = "#2196F3";
                  break;
                case "Environmental":
                  color = "#4CAF50";
                  break;
                case "Economic":
                  color = "#FF9800";
                  break;
                case "Scientific":
                  color = "#9C27B0";
                  break;
                case "Implementation":
                  color = "#00BCD4";
                  break;
                case "Public Response":
                  color = "#F44336";
                  break;
                default:
                  color = "#607D8B";
              }

              return (
                <div
                  key={index}
                  className="px-3 py-2 rounded-full text-white"
                  style={{
                    backgroundColor: color,
                    fontSize: `${size}px`
                  }}
                >
                  {term.term}
                  <span className="ml-1 text-xs align-text-top">({term.count})</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Paragraph-by-Paragraph Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Paragraph-by-Paragraph Analysis</h3>
          <div className="space-y-4">
            {topicalData.paragraphs.map((paragraph) => {
              const dominantTopic = topicalData.topics.find(
                (t) => t.name === paragraph.dominantTopic
              );

              return (
                <div
                  key={paragraph.id}
                  className="border rounded-lg overflow-hidden"
                  style={{ borderColor: dominantTopic.color }}
                >
                  <div
                    className="p-2 text-white text-sm flex justify-between items-center"
                    style={{ backgroundColor: dominantTopic.color }}
                  >
                    <div>Paragraph {paragraph.position}</div>
                    <div className="flex items-center">
                      <span className="mr-2">Dominant: {paragraph.dominantTopic}</span>
                      <span className="text-xs border border-white rounded px-1">
                        {paragraph.temporalFocus}
                      </span>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="text-sm mb-2">{paragraph.text}</div>
                    <div className="flex flex-wrap gap-1">
                      {paragraph.topics.map((topicName, index) => {
                        const topic = topicalData.topics.find((t) => t.name === topicName);
                        const isDominant = paragraph.dominantTopic === topicName;

                        return (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: isDominant ? topic.color : `${topic.color}30`,
                              color: isDominant ? "white" : "black"
                            }}
                          >
                            {topicName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Guide (Separate Box) */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
        <h3 className="text-xl font-semibold mb-2">User Guide</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>
            The <strong>Topic Distribution</strong> section shows which topics receive 
            the most attention in the article, with keywords and paragraph references.
          </li>
          <li>
            The <strong>Topic Category Distribution</strong> visualises the broader 
            balance between environmental, economic, political, and scientific content.
          </li>
          <li>
            The <strong>Topic Heat Map</strong> reveals which topics appear in which 
            paragraphs, with dominant topics highlighted with full colour.
          </li>
          <li>
            The <strong>Temporal Framing Analysis</strong> shows how the article balances 
            references to past events, present actions, and future implications.
          </li>
          <li>
            The <strong>Key Terms Frequency</strong> visualisation displays the most 
            common terms sized by frequency and coloured by category.
          </li>
          <li>
            Together, these elements reveal which topics the article prioritises, 
            how topics are distributed throughout the text, and how different temporal 
            frames are employed in the narrative.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopicalFocusViz;
