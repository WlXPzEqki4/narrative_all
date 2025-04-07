// import React, { useState } from 'react';

// const NarrativePositioningViz = () => {
//   // Sample narrative positioning data from the article
//   const [positioningData] = useState({
//     article: {
//       title: "GOVERNMENT UNVEILS AMBITIOUS CLIMATE TARGETS AMID MIXED REACTIONS",
//       subtitle: "By Jane Smith, Political Correspondent",
//       date: "February 28, 2025",
//       location: "CAPITAL CITY"
//     },
//     narrativeThreads: [
//       {
//         id: 1,
//         thread: "Government Policy Announcement",
//         importance: 0.9,
//         firstMention: 1, // paragraph number
//         lastMention: 8,
//         mentions: [1, 2, 5, 8],
//         closure: "open",
//         nextSteps: "Prime Minister to address nation next week",
//         color: "#4285F4" // Blue
//       },
//       {
//         id: 2,
//         thread: "Opposition Response",
//         importance: 0.7,
//         firstMention: 3,
//         lastMention: 3,
//         mentions: [3],
//         closure: "closed",
//         nextSteps: null,
//         color: "#EA4335" // Red
//       },
//       {
//         id: 3,
//         thread: "Public Protest",
//         importance: 0.5,
//         firstMention: 4,
//         lastMention: 4,
//         mentions: [4],
//         closure: "closed",
//         nextSteps: null,
//         color: "#FBBC05" // Yellow
//       },
//       {
//         id: 4,
//         thread: "Scientific Assessment",
//         importance: 0.6,
//         firstMention: 5,
//         lastMention: 5,
//         mentions: [5],
//         closure: "partial",
//         nextSteps: "Implementation challenges noted",
//         color: "#34A853" // Green
//       },
//       {
//         id: 5,
//         thread: "Political Analysis",
//         importance: 0.4,
//         firstMention: 6,
//         lastMention: 6,
//         mentions: [6],
//         closure: "open",
//         nextSteps: "Election implications",
//         color: "#9C27B0" // Purple
//       },
//       {
//         id: 6,
//         thread: "Industry Reaction",
//         importance: 0.5,
//         firstMention: 7,
//         lastMention: 7,
//         mentions: [7],
//         closure: "closed",
//         nextSteps: null,
//         color: "#FF6D00" // Orange
//       }
//     ],
//     paragraphs: [
//       {
//         id: 1,
//         position: 1,
//         text: "The Government announced a sweeping new climate policy yesterday, setting targets to reduce carbon emissions by 60% before 2035. The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy and gradual phase-out of fossil fuel subsidies.",
//         priority: "primary",
//         narrativeThreads: [1],
//         informationStructure: ["what", "when", "where", "details"]
//       },
//       {
//         id: 2,
//         position: 2,
//         text: "\"This represents our commitment to addressing the climate crisis with the urgency it demands,\" said Environment Minister Elena Reynolds. \"We can no longer afford inaction on this critical issue.\"",
//         priority: "primary",
//         narrativeThreads: [1],
//         informationStructure: ["who", "why"]
//       },
//       {
//         id: 3,
//         position: 3,
//         text: "Opposition leaders immediately opposed the plan, criticising its economic implications. \"This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs,\" said Opposition Leader James Wilson during an emergency press conference. Wilson further warned about potential job losses in traditional energy sectors.",
//         priority: "secondary",
//         narrativeThreads: [2],
//         informationStructure: ["who", "what", "why"]
//       },
//       {
//         id: 4,
//         position: 4,
//         text: "Meanwhile, protesters demonstrated against recent budget cuts to environmental monitoring programmes, gathering outside Parliament with signs reading \"Actions Not Words\" and \"Fund Our Future.\" The demonstration, organised by climate activist group EarthFirst, drew approximately 2,000 participants.",
//         priority: "tertiary",
//         narrativeThreads: [3],
//         informationStructure: ["who", "what", "why", "how many"]
//       },
//       {
//         id: 5,
//         position: 5,
//         text: "Scientists from the National Climate Research Institute largely supported the government's targets. \"The proposed reductions align with what our research findings indicate is necessary,\" explained Dr. Sarah Chen, lead climate researcher at the institute. However, she warned about implementation challenges, noting that \"meeting these targets will require unprecedented coordination across all sectors.\"",
//         priority: "secondary",
//         narrativeThreads: [1, 4],
//         informationStructure: ["who", "what", "qualification"]
//       },
//       {
//         id: 6,
//         position: 6,
//         text: "Media outlets extensively reported on public reaction to the announcement, with national surveys showing divided opinions along urban and rural lines. Political analysts suggest the climate policy could become a central issue in next year's election campaign.",
//         priority: "tertiary",
//         narrativeThreads: [5],
//         informationStructure: ["what", "implication"]
//       },
//       {
//         id: 7,
//         position: 7,
//         text: "Industry representatives criticised specific elements of the proposal, particularly the accelerated timeline. \"While we support climate action, this implementation schedule will create substantial economic disruption,\" said Marcus Lee, spokesperson for the National Business Association.",
//         priority: "secondary",
//         narrativeThreads: [6],
//         informationStructure: ["who", "what", "why"]
//       },
//       {
//         id: 8,
//         position: 8,
//         text: "As debate continues, the Government defended its approach, with the Prime Minister scheduled to address the nation next week regarding what he described as \"the most significant environmental initiative in our country's history.\"",
//         priority: "primary",
//         narrativeThreads: [1],
//         informationStructure: ["what's next", "framing"]
//       }
//     ]
//   });

//   // Priority colour mapping
//   const priorityColors = {
//     primary: "#333333",
//     secondary: "#666666",
//     tertiary: "#999999"
//   };

//   // Calculate narrative thread visibility based on mentions and importance
//   const getThreadVisibility = (thread) => {
//     // Area calculation based on importance and number of mentions
//     const baseSize = 50;
//     const importanceFactor = thread.importance * 100;
//     const mentionsFactor = thread.mentions.length * 10;
//     return baseSize + importanceFactor + mentionsFactor;
//   };

//   // Calculate height for headline elements
//   const getHeadlineHeight = (element) => {
//     if (element === "title") return 60;
//     if (element === "subtitle") return 30;
//     if (element === "date") return 20;
//     return 30;
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-8">
//       {/* Main Title */}
//       <h2 className="text-3xl font-bold text-center mb-6">
//         Narrative Positioning Analysis
//       </h2>

//       {/* Main Content Box */}
//       <div className="bg-white shadow-lg rounded-lg p-4">
//         {/* Headline Analysis */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-3">Headline & Lead Emphasis</h3>
//           <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//             <div className="text-center mb-4">
//               <div className="font-bold text-xl mb-1">
//                 {positioningData.article.title}
//               </div>
//               <div className="text-sm text-gray-600">
//                 {positioningData.article.subtitle}
//               </div>
//               <div className="text-sm text-gray-600">
//                 {positioningData.article.date}
//               </div>
//               <div className="font-medium">
//                 {positioningData.article.location}
//               </div>
//             </div>
            
//             <div className="mt-4">
//               <h4 className="font-medium mb-2">Analysis:</h4>
//               <div className="text-sm space-y-2">
//                 <div>
//                   <span className="font-medium">Title Focus:</span> Government action (subject) + 
//                   policy announcement (topic) + mixed reception (framing)
//                 </div>
//                 <div>
//                   <span className="font-medium">Key Words:</span>{" "}
//                   <span className="bg-yellow-100 px-1">GOVERNMENT</span> (subject),{" "}
//                   <span className="bg-yellow-100 px-1">UNVEILS</span> (active verb),{" "}
//                   <span className="bg-yellow-100 px-1">AMBITIOUS</span> (positive framing),{" "}
//                   <span className="bg-yellow-100 px-1">AMID MIXED REACTIONS</span> (conflict framing)
//                 </div>
//                 <div>
//                   <span className="font-medium">Narrative Position:</span> Establishes government action 
//                   as the primary story, with conflict (mixed reactions) as the secondary element
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Information Hierarchy Visualisation */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-3">Information Hierarchy (Inverted Pyramid)</h3>
//           <div className="relative h-96 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
//             {/* Headline elements */}
//             <div className="absolute top-0 left-0 right-0 flex flex-col items-center">
//               <div
//                 className="w-full bg-gray-800 text-white text-center py-2 px-4 font-bold"
//                 style={{ height: `${getHeadlineHeight("title")}px` }}
//               >
//                 Headline: Sets main focus on government climate policy announcement
//               </div>
//               <div
//                 className="w-5/6 bg-gray-700 text-white text-center py-2 px-4"
//                 style={{ height: `${getHeadlineHeight("subtitle")}px` }}
//               >
//                 Attribution & context
//               </div>
//             </div>
            
//             {/* Inverted pyramid */}
//             <svg viewBox="0 0 400 350" className="w-full h-full mt-16">
//               {/* Pyramid outline */}
//               <path
//                 d="M50,0 L350,0 L300,350 L100,350 Z"
//                 fill="#f8f9fa"
//                 stroke="#ccc"
//                 strokeWidth="1"
//               />
              
//               {/* Top section */}
//               <path
//                 d="M50,0 L350,0 L330,100 L70,100 Z"
//                 fill="#e3f2fd"
//                 stroke="#bbdefb"
//                 strokeWidth="1"
//               />
//               <text x="200" y="50" textAnchor="middle" fill="#333" fontSize="14">
//                 Essential Information (Paragraphs 1-2)
//               </text>
              
//               {/* Middle section */}
//               <path
//                 d="M70,100 L330,100 L310,200 L90,200 Z"
//                 fill="#e8f5e9"
//                 stroke="#c8e6c9"
//                 strokeWidth="1"
//               />
//               <text x="200" y="150" textAnchor="middle" fill="#333" fontSize="14">
//                 Important Details (Paragraphs 3, 5, 7)
//               </text>
              
//               {/* Bottom section */}
//               <path
//                 d="M90,200 L310,200 L300,350 L100,350 Z"
//                 fill="#fff3e0"
//                 stroke="#ffe0b2"
//                 strokeWidth="1"
//               />
//               <text x="200" y="270" textAnchor="middle" fill="#333" fontSize="14">
//                 Additional Context (Paragraphs 4, 6)
//               </text>
              
//               {/* Priority labels */}
//               <text x="30" y="50" textAnchor="end" fill="#333" fontSize="12" fontWeight="bold">
//                 Primary
//               </text>
//               <text x="30" y="150" textAnchor="end" fill="#333" fontSize="12" fontWeight="bold">
//                 Secondary
//               </text>
//               <text x="30" y="270" textAnchor="end" fill="#333" fontSize="12" fontWeight="bold">
//                 Tertiary
//               </text>
//             </svg>
//           </div>
//         </div>

//         {/* Narrative Thread Analysis */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-3">Narrative Thread Positioning</h3>
//           <div className="relative h-96 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 flex items-center pl-2 font-medium">
//               Paragraph Sequence →
//             </div>

//             <svg viewBox="0 0 800 500" className="w-full h-full pt-8">
//               {/* X-axis (paragraph numbers) */}
//               {positioningData.paragraphs.map((para, index) => (
//                 <g key={index}>
//                   <line
//                     x1={100 * (index + 1)}
//                     y1="20"
//                     x2={100 * (index + 1)}
//                     y2="480"
//                     stroke="#e5e5e5"
//                     strokeWidth="1"
//                   />
//                   <text
//                     x={100 * (index + 1)}
//                     y="40"
//                     textAnchor="middle"
//                     fill="#666"
//                     fontSize="12"
//                   >
//                     P{index + 1}
//                   </text>
//                 </g>
//               ))}

//               {/* Narrative threads */}
//               {positioningData.narrativeThreads.map((thread, index) => {
//                 // Vertical position is based on the thread's index
//                 const yPosition = 80 + index * 70;
//                 // First occurrence X position
//                 const firstX = thread.firstMention * 100;
//                 // Last occurrence X position
//                 const lastX = thread.lastMention * 100;
//                 // Thread line width
//                 const width = lastX - firstX;
//                 // Thread visibility (area)
//                 const visibility = getThreadVisibility(thread);

//                 return (
//                   <g key={thread.id}>
//                     {/* Thread name */}
//                     <text
//                       x="20"
//                       y={yPosition}
//                       textAnchor="start"
//                       fill={thread.color}
//                       fontSize="12"
//                       fontWeight="medium"
//                     >
//                       {thread.thread}
//                     </text>

//                     {/* Thread line */}
//                     <line
//                       x1={firstX}
//                       y1={yPosition}
//                       x2={lastX}
//                       y2={yPosition}
//                       stroke={thread.color}
//                       strokeWidth={thread.importance * 10}
//                       strokeLinecap="round"
//                     />

//                     {/* Mention points */}
//                     {thread.mentions.map((paragraph, i) => (
//                       <circle
//                         key={i}
//                         cx={paragraph * 100}
//                         cy={yPosition}
//                         r="6"
//                         fill={thread.color}
//                         stroke="#fff"
//                         strokeWidth="1"
//                       />
//                     ))}

//                     {/* Closure status (dashed line if open) */}
//                     {thread.closure === "open" && (
//                       <path
//                         d={`M ${lastX + 5} ${yPosition} L ${lastX + 15} ${yPosition}`}
//                         stroke={thread.color}
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeDasharray="2 2"
//                       />
//                     )}

//                     {/* Next steps (if open or partial) */}
//                     {thread.nextSteps && (
//                       <text
//                         x={lastX + 20}
//                         y={yPosition + 3}
//                         textAnchor="start"
//                         fill="#666"
//                         fontSize="10"
//                         fontStyle="italic"
//                       >
//                         {thread.nextSteps}
//                       </text>
//                     )}

//                     {/* Thread importance */}
//                     <text
//                       x={firstX - 10}
//                       y={yPosition - 10}
//                       textAnchor="end"
//                       fill="#999"
//                       fontSize="10"
//                     >
//                       {Math.round(thread.importance * 10)}/10
//                     </text>
//                   </g>
//                 );
//               })}
//             </svg>
//           </div>
//         </div>

//         {/* Paragraph Priority Analysis */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-3">Paragraph Priority Analysis</h3>
//           <div className="space-y-4">
//             {positioningData.paragraphs.map((paragraph) => (
//               <div
//                 key={paragraph.id}
//                 className="border rounded-lg overflow-hidden"
//                 style={{ borderColor: priorityColors[paragraph.priority] }}
//               >
//                 <div
//                   className="p-2 text-white text-sm font-medium flex justify-between items-center"
//                   style={{ backgroundColor: priorityColors[paragraph.priority] }}
//                 >
//                   <div>Paragraph {paragraph.position}</div>
//                   <div className="flex items-center">
//                     <span className="mr-2">
//                       Priority: {paragraph.priority}
//                     </span>
//                     {paragraph.narrativeThreads.map((threadId) => {
//                       const thread = positioningData.narrativeThreads.find(
//                         (t) => t.id === threadId
//                       );
//                       return (
//                         <div
//                           key={threadId}
//                           className="w-3 h-3 rounded-full mx-1"
//                           style={{ backgroundColor: thread.color }}
//                           title={thread.thread}
//                         ></div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="p-3">
//                   <div className="text-sm mb-2">{paragraph.text}</div>
//                   <div className="text-xs text-gray-600">
//                     <span className="font-medium">Information structure:</span>{" "}
//                     {paragraph.informationStructure.join(" → ")}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* User Guide (Separate Box) */}
//       <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
//         <h3 className="text-xl font-semibold mb-2">User Guide</h3>
//         <ul className="list-disc ml-5 space-y-1">
//           <li>
//             The Headline Analysis shows how the article’s title and lead position 
//             the central narrative and key actors.
//           </li>
//           <li>
//             The Information Hierarchy visualisation illustrates the “inverted pyramid” 
//             structure, showing which information is prioritised at the top and which 
//             details appear lower in the article.
//           </li>
//           <li>
//             The Narrative Thread Positioning reveals how different storylines weave 
//             through the article, indicating where they begin, where they end, 
//             and which are left open for further development.
//           </li>
//           <li>
//             The Paragraph Priority Analysis breaks down each paragraph by its priority 
//             level, information structure, and which narrative threads it contains.
//           </li>
//           <li>
//             Together, these elements show how the article is structured to guide reader 
//             attention and shape understanding of the events described.
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NarrativePositioningViz;




























// import React, { useState } from 'react';

// const NarrativePositioningViz = () => {
//   // Sample narrative positioning data from the article
//   const [positioningData] = useState({
//     article: {
//       title: "GOVERNMENT UNVEILS AMBITIOUS CLIMATE TARGETS AMID MIXED REACTIONS",
//       subtitle: "By Jane Smith, Political Correspondent",
//       date: "February 28, 2025",
//       location: "CAPITAL CITY"
//     },
//     narrativeThreads: [
//       {
//         id: 1,
//         thread: "Government Policy Announcement",
//         importance: 0.9,
//         firstMention: 1,
//         lastMention: 8,
//         mentions: [1, 2, 5, 8],
//         closure: "open",
//         nextSteps: "Prime Minister to address nation next week",
//         color: "#4285F4" // Blue
//       },
//       {
//         id: 2,
//         thread: "Opposition Response",
//         importance: 0.7,
//         firstMention: 3,
//         lastMention: 3,
//         mentions: [3],
//         closure: "closed",
//         nextSteps: null,
//         color: "#EA4335" // Red
//       },
//       {
//         id: 3,
//         thread: "Public Protest",
//         importance: 0.5,
//         firstMention: 4,
//         lastMention: 4,
//         mentions: [4],
//         closure: "closed",
//         nextSteps: null,
//         color: "#FBBC05" // Yellow
//       },
//       {
//         id: 4,
//         thread: "Scientific Assessment",
//         importance: 0.6,
//         firstMention: 5,
//         lastMention: 5,
//         mentions: [5],
//         closure: "partial",
//         nextSteps: "Implementation challenges noted",
//         color: "#34A853" // Green
//       },
//       {
//         id: 5,
//         thread: "Political Analysis",
//         importance: 0.4,
//         firstMention: 6,
//         lastMention: 6,
//         mentions: [6],
//         closure: "open",
//         nextSteps: "Election implications",
//         color: "#9C27B0" // Purple
//       },
//       {
//         id: 6,
//         thread: "Industry Reaction",
//         importance: 0.5,
//         firstMention: 7,
//         lastMention: 7,
//         mentions: [7],
//         closure: "closed",
//         nextSteps: null,
//         color: "#FF6D00" // Orange
//       }
//     ],
//     paragraphs: [
//       {
//         id: 1,
//         position: 1,
//         text: "The Government announced a sweeping new climate policy yesterday, setting targets to reduce carbon emissions by 60% before 2035. The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy and gradual phase-out of fossil fuel subsidies.",
//         priority: "primary",
//         narrativeThreads: [1],
//         informationStructure: ["what", "when", "where", "details"]
//       },
//       {
//         id: 2,
//         position: 2,
//         text: "\"This represents our commitment to addressing the climate crisis with the urgency it demands,\" said Environment Minister Elena Reynolds. \"We can no longer afford inaction on this critical issue.\"",
//         priority: "primary",
//         narrativeThreads: [1],
//         informationStructure: ["who", "why"]
//       },
//       {
//         id: 3,
//         position: 3,
//         text: "Opposition leaders immediately opposed the plan, criticising its economic implications. \"This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs,\" said Opposition Leader James Wilson during an emergency press conference. Wilson further warned about potential job losses in traditional energy sectors.",
//         priority: "secondary",
//         narrativeThreads: [2],
//         informationStructure: ["who", "what", "why"]
//       },
//       {
//         id: 4,
//         position: 4,
//         text: "Meanwhile, protesters demonstrated against recent budget cuts to environmental monitoring programmes, gathering outside Parliament with signs reading \"Actions Not Words\" and \"Fund Our Future.\" The demonstration, organised by climate activist group EarthFirst, drew approximately 2,000 participants.",
//         priority: "tertiary",
//         narrativeThreads: [3],
//         informationStructure: ["who", "what", "why", "how many"]
//       },
//       {
//         id: 5,
//         position: 5,
//         text: "Scientists from the National Climate Research Institute largely supported the government's targets. \"The proposed reductions align with what our research findings indicate is necessary,\" explained Dr. Sarah Chen, lead climate researcher at the institute. However, she warned about implementation challenges, noting that \"meeting these targets will require unprecedented coordination across all sectors.\"",
//         priority: "secondary",
//         narrativeThreads: [1, 4],
//         informationStructure: ["who", "what", "qualification"]
//       },
//       {
//         id: 6,
//         position: 6,
//         text: "Media outlets extensively reported on public reaction to the announcement, with national surveys showing divided opinions along urban and rural lines. Political analysts suggest the climate policy could become a central issue in next year's election campaign.",
//         priority: "tertiary",
//         narrativeThreads: [5],
//         informationStructure: ["what", "implication"]
//       },
//       {
//         id: 7,
//         position: 7,
//         text: "Industry representatives criticised specific elements of the proposal, particularly the accelerated timeline. \"While we support climate action, this implementation schedule will create substantial economic disruption,\" said Marcus Lee, spokesperson for the National Business Association.",
//         priority: "secondary",
//         narrativeThreads: [6],
//         informationStructure: ["who", "what", "why"]
//       },
//       {
//         id: 8,
//         position: 8,
//         text: "As debate continues, the Government defended its approach, with the Prime Minister scheduled to address the nation next week regarding what he described as \"the most significant environmental initiative in our country's history.\"",
//         priority: "primary",
//         narrativeThreads: [1],
//         informationStructure: ["what's next", "framing"]
//       }
//     ]
//   });

//   // Priority colour mapping
//   const priorityColors = {
//     primary: "#333333",
//     secondary: "#666666",
//     tertiary: "#999999"
//   };

//   // Calculate narrative thread visibility (unchanged from your original code)
//   const getThreadVisibility = (thread) => {
//     const baseSize = 50;
//     const importanceFactor = thread.importance * 100;
//     const mentionsFactor = thread.mentions.length * 10;
//     return baseSize + importanceFactor + mentionsFactor;
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-8">
//       {/* Main Title */}
//       <h2 className="text-3xl font-bold text-center mb-6">
//         Narrative Positioning Analysis
//       </h2>

//       {/* Main Content Box */}
//       <div className="bg-white shadow-lg rounded-lg p-4">
        
//         {/* Headline & Lead Emphasis */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-3">Headline & Lead Emphasis</h3>
//           <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//             <div className="text-center mb-4">
//               <div className="font-bold text-xl mb-1">
//                 {positioningData.article.title}
//               </div>
//               <div className="text-sm text-gray-600">
//                 {positioningData.article.subtitle}
//               </div>
//               <div className="text-sm text-gray-600">
//                 {positioningData.article.date}
//               </div>
//               <div className="font-medium">
//                 {positioningData.article.location}
//               </div>
//             </div>
            
//             <div className="mt-4">
//               <h4 className="font-medium mb-2">Analysis:</h4>
//               <div className="text-sm space-y-2">
//                 <div>
//                   <span className="font-medium">Title Focus:</span> Government action (subject) + 
//                   policy announcement (topic) + mixed reception (framing)
//                 </div>
//                 <div>
//                   <span className="font-medium">Key Words:</span>{" "}
//                   <span className="bg-yellow-100 px-1">GOVERNMENT</span> (subject),{" "}
//                   <span className="bg-yellow-100 px-1">UNVEILS</span> (active verb),{" "}
//                   <span className="bg-yellow-100 px-1">AMBITIOUS</span> (positive framing),{" "}
//                   <span className="bg-yellow-100 px-1">AMID MIXED REACTIONS</span> (conflict framing)
//                 </div>
//                 <div>
//                   <span className="font-medium">Narrative Position:</span> Establishes government action 
//                   as the primary story, with conflict (mixed reactions) as the secondary element
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* NEW: Funnel‐Style Information Hierarchy */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-3">
//             Information Hierarchy (Inverted Pyramid)
//           </h3>
//           <div className="flex flex-col items-center space-y-4">
//             {/* Headline layer */}
//             <div className="bg-gray-800 text-white w-11/12 p-4 text-center rounded-md">
//               <h4 className="font-bold mb-1">Headline</h4>
//               <p className="text-sm">
//                 Sets main focus on government climate policy announcement
//               </p>
//             </div>
//             {/* Essential Info */}
//             <div className="bg-blue-100 w-10/12 p-4 text-center rounded-md">
//               <h4 className="font-bold mb-1">
//                 Essential Information (Paragraphs 1-2)
//               </h4>
//               <p className="text-sm">
//                 Key facts and urgent details introduced here
//               </p>
//             </div>
//             {/* Important Details */}
//             <div className="bg-green-100 w-9/12 p-4 text-center rounded-md">
//               <h4 className="font-bold mb-1">
//                 Important Details (Paragraphs 3, 5, 7)
//               </h4>
//               <p className="text-sm">
//                 Context, quotes, supporting evidence, or secondary points
//               </p>
//             </div>
//             {/* Additional Context */}
//             <div className="bg-yellow-100 w-8/12 p-4 text-center rounded-md">
//               <h4 className="font-bold mb-1">
//                 Additional Context (Paragraphs 4, 6)
//               </h4>
//               <p className="text-sm">
//                 Less critical information or background introduced last
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Narrative Thread Analysis */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-3">Narrative Thread Positioning</h3>
//           <div className="relative h-96 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 flex items-center pl-2 font-medium">
//               Paragraph Sequence →
//             </div>

//             <svg viewBox="0 0 800 500" className="w-full h-full pt-8">
//               {/* X-axis (paragraph numbers) */}
//               {positioningData.paragraphs.map((para, index) => (
//                 <g key={index}>
//                   <line
//                     x1={100 * (index + 1)}
//                     y1="20"
//                     x2={100 * (index + 1)}
//                     y2="480"
//                     stroke="#e5e5e5"
//                     strokeWidth="1"
//                   />
//                   <text
//                     x={100 * (index + 1)}
//                     y="40"
//                     textAnchor="middle"
//                     fill="#666"
//                     fontSize="12"
//                   >
//                     P{index + 1}
//                   </text>
//                 </g>
//               ))}

//               {/* Narrative threads */}
//               {positioningData.narrativeThreads.map((thread, index) => {
//                 // Vertical position is based on the thread's index
//                 const yPosition = 80 + index * 70;
//                 // First occurrence X position
//                 const firstX = thread.firstMention * 100;
//                 // Last occurrence X position
//                 const lastX = thread.lastMention * 100;
//                 // (Optional) You might incorporate getThreadVisibility(thread) if needed

//                 return (
//                   <g key={thread.id}>
//                     {/* Thread name */}
//                     <text
//                       x="20"
//                       y={yPosition}
//                       textAnchor="start"
//                       fill={thread.color}
//                       fontSize="12"
//                       fontWeight="medium"
//                     >
//                       {thread.thread}
//                     </text>

//                     {/* Thread line */}
//                     <line
//                       x1={firstX}
//                       y1={yPosition}
//                       x2={lastX}
//                       y2={yPosition}
//                       stroke={thread.color}
//                       strokeWidth={thread.importance * 10}
//                       strokeLinecap="round"
//                     />

//                     {/* Mention points */}
//                     {thread.mentions.map((paragraph, i) => (
//                       <circle
//                         key={i}
//                         cx={paragraph * 100}
//                         cy={yPosition}
//                         r="6"
//                         fill={thread.color}
//                         stroke="#fff"
//                         strokeWidth="1"
//                       />
//                     ))}

//                     {/* Closure status (dashed line if open) */}
//                     {thread.closure === "open" && (
//                       <path
//                         d={`M ${lastX + 5} ${yPosition} L ${lastX + 15} ${yPosition}`}
//                         stroke={thread.color}
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeDasharray="2 2"
//                       />
//                     )}

//                     {/* Next steps (if open or partial) */}
//                     {thread.nextSteps && (
//                       <text
//                         x={lastX + 20}
//                         y={yPosition + 3}
//                         textAnchor="start"
//                         fill="#666"
//                         fontSize="10"
//                         fontStyle="italic"
//                       >
//                         {thread.nextSteps}
//                       </text>
//                     )}

//                     {/* Thread importance (optional numeric display) */}
//                     <text
//                       x={firstX - 10}
//                       y={yPosition - 10}
//                       textAnchor="end"
//                       fill="#999"
//                       fontSize="10"
//                     >
//                       {Math.round(thread.importance * 10)}/10
//                     </text>
//                   </g>
//                 );
//               })}
//             </svg>
//           </div>
//         </div>

//         {/* Paragraph Priority Analysis */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-3">Paragraph Priority Analysis</h3>
//           <div className="space-y-4">
//             {positioningData.paragraphs.map((paragraph) => (
//               <div
//                 key={paragraph.id}
//                 className="border rounded-lg overflow-hidden"
//                 style={{ borderColor: priorityColors[paragraph.priority] }}
//               >
//                 <div
//                   className="p-2 text-white text-sm font-medium flex justify-between items-center"
//                   style={{ backgroundColor: priorityColors[paragraph.priority] }}
//                 >
//                   <div>Paragraph {paragraph.position}</div>
//                   <div className="flex items-center">
//                     <span className="mr-2">
//                       Priority: {paragraph.priority}
//                     </span>
//                     {paragraph.narrativeThreads.map((threadId) => {
//                       const thread = positioningData.narrativeThreads.find(
//                         (t) => t.id === threadId
//                       );
//                       return (
//                         <div
//                           key={threadId}
//                           className="w-3 h-3 rounded-full mx-1"
//                           style={{ backgroundColor: thread.color }}
//                           title={thread.thread}
//                         ></div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="p-3">
//                   <div className="text-sm mb-2">{paragraph.text}</div>
//                   <div className="text-xs text-gray-600">
//                     <span className="font-medium">Information structure:</span>{" "}
//                     {paragraph.informationStructure.join(" → ")}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* User Guide Box */}
//       <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
//         <h3 className="text-xl font-semibold mb-2">User Guide</h3>
//         <ul className="list-disc ml-5 space-y-1">
//           <li>
//             The <strong>Headline &amp; Lead Emphasis</strong> shows how the 
//             article’s title and lead position the central narrative and key actors.
//           </li>
//           <li>
//             The <strong>Information Hierarchy</strong> now uses a simpler, 
//             funnel‐style layout to illustrate the “inverted pyramid”, showing which 
//             information is prioritised first and which details appear further down.
//           </li>
//           <li>
//             The <strong>Narrative Thread Positioning</strong> reveals how different 
//             storylines weave through the article, indicating where they begin, where 
//             they end, and which are left open for further development.
//           </li>
//           <li>
//             The <strong>Paragraph Priority Analysis</strong> breaks down each paragraph 
//             by its priority level, information structure, and which narrative threads 
//             it contains.
//           </li>
//           <li>
//             Together, these elements show how the article is structured to guide reader 
//             attention and shape understanding of the events described.
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NarrativePositioningViz;






































import React, { useState } from 'react';

const NarrativePositioningViz = () => {
  // Sample narrative positioning data from the article
  const [positioningData] = useState({
    article: {
      title: "GOVERNMENT UNVEILS AMBITIOUS CLIMATE TARGETS AMID MIXED REACTIONS",
      subtitle: "By Jane Smith, Political Correspondent",
      date: "February 28, 2025",
      location: "CAPITAL CITY"
    },
    narrativeThreads: [
      {
        id: 1,
        thread: "Government Policy Announcement",
        importance: 0.9,
        firstMention: 1,
        lastMention: 8,
        mentions: [1, 2, 5, 8],
        closure: "open",
        nextSteps: "Prime Minister to address nation next week",
        color: "#4285F4" // Blue
      },
      {
        id: 2,
        thread: "Opposition Response",
        importance: 0.7,
        firstMention: 3,
        lastMention: 3,
        mentions: [3],
        closure: "closed",
        nextSteps: null,
        color: "#EA4335" // Red
      },
      {
        id: 3,
        thread: "Public Protest",
        importance: 0.5,
        firstMention: 4,
        lastMention: 4,
        mentions: [4],
        closure: "closed",
        nextSteps: null,
        color: "#FBBC05" // Yellow
      },
      {
        id: 4,
        thread: "Scientific Assessment",
        importance: 0.6,
        firstMention: 5,
        lastMention: 5,
        mentions: [5],
        closure: "partial",
        nextSteps: "Implementation challenges noted",
        color: "#34A853" // Green
      },
      {
        id: 5,
        thread: "Political Analysis",
        importance: 0.4,
        firstMention: 6,
        lastMention: 6,
        mentions: [6],
        closure: "open",
        nextSteps: "Election implications",
        color: "#9C27B0" // Purple
      },
      {
        id: 6,
        thread: "Industry Reaction",
        importance: 0.5,
        firstMention: 7,
        lastMention: 7,
        mentions: [7],
        closure: "closed",
        nextSteps: null,
        color: "#FF6D00" // Orange
      }
    ],
    paragraphs: [
      {
        id: 1,
        position: 1,
        text: "The Government announced a sweeping new climate policy yesterday, setting targets to reduce carbon emissions by 60% before 2035. The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy and gradual phase-out of fossil fuel subsidies.",
        priority: "primary",
        narrativeThreads: [1],
        informationStructure: ["what", "when", "where", "details"]
      },
      {
        id: 2,
        position: 2,
        text: "\"This represents our commitment to addressing the climate crisis with the urgency it demands,\" said Environment Minister Elena Reynolds. \"We can no longer afford inaction on this critical issue.\"",
        priority: "primary",
        narrativeThreads: [1],
        informationStructure: ["who", "why"]
      },
      {
        id: 3,
        position: 3,
        text: "Opposition leaders immediately opposed the plan, criticising its economic implications. \"This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs,\" said Opposition Leader James Wilson during an emergency press conference. Wilson further warned about potential job losses in traditional energy sectors.",
        priority: "secondary",
        narrativeThreads: [2],
        informationStructure: ["who", "what", "why"]
      },
      {
        id: 4,
        position: 4,
        text: "Meanwhile, protesters demonstrated against recent budget cuts to environmental monitoring programmes, gathering outside Parliament with signs reading \"Actions Not Words\" and \"Fund Our Future.\" The demonstration, organised by climate activist group EarthFirst, drew approximately 2,000 participants.",
        priority: "tertiary",
        narrativeThreads: [3],
        informationStructure: ["who", "what", "why", "how many"]
      },
      {
        id: 5,
        position: 5,
        text: "Scientists from the National Climate Research Institute largely supported the government's targets. \"The proposed reductions align with what our research findings indicate is necessary,\" explained Dr. Sarah Chen, lead climate researcher at the institute. However, she warned about implementation challenges, noting that \"meeting these targets will require unprecedented coordination across all sectors.\"",
        priority: "secondary",
        narrativeThreads: [1, 4],
        informationStructure: ["who", "what", "qualification"]
      },
      {
        id: 6,
        position: 6,
        text: "Media outlets extensively reported on public reaction to the announcement, with national surveys showing divided opinions along urban and rural lines. Political analysts suggest the climate policy could become a central issue in next year's election campaign.",
        priority: "tertiary",
        narrativeThreads: [5],
        informationStructure: ["what", "implication"]
      },
      {
        id: 7,
        position: 7,
        text: "Industry representatives criticised specific elements of the proposal, particularly the accelerated timeline. \"While we support climate action, this implementation schedule will create substantial economic disruption,\" said Marcus Lee, spokesperson for the National Business Association.",
        priority: "secondary",
        narrativeThreads: [6],
        informationStructure: ["who", "what", "why"]
      },
      {
        id: 8,
        position: 8,
        text: "As debate continues, the Government defended its approach, with the Prime Minister scheduled to address the nation next week regarding what he described as \"the most significant environmental initiative in our country's history.\"",
        priority: "primary",
        narrativeThreads: [1],
        informationStructure: ["what's next", "framing"]
      }
    ]
  });

  // Priority colour mapping
  const priorityColors = {
    primary: "#333333",
    secondary: "#666666",
    tertiary: "#999999"
  };

  // (Optional) Example function from your code (not strictly needed if not used)
  const getThreadVisibility = (thread) => {
    const baseSize = 50;
    const importanceFactor = thread.importance * 100;
    const mentionsFactor = thread.mentions.length * 10;
    return baseSize + importanceFactor + mentionsFactor;
  };

  // Add the hoveredThreadId state here (NEW LINE):
  const [hoveredThreadId, setHoveredThreadId] = useState(null);

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Main Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Narrative Positioning Analysis
      </h2>

      {/* Main Content Box */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        
        {/* Headline & Lead Emphasis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Headline & Lead Emphasis</h3>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="text-center mb-4">
              <div className="font-bold text-xl mb-1">
                {positioningData.article.title}
              </div>
              <div className="text-sm text-gray-600">
                {positioningData.article.subtitle}
              </div>
              <div className="text-sm text-gray-600">
                {positioningData.article.date}
              </div>
              <div className="font-medium">
                {positioningData.article.location}
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Analysis:</h4>
              <div className="text-sm space-y-2">
                <div>
                  <span className="font-medium">Title Focus:</span> Government action (subject) + 
                  policy announcement (topic) + mixed reception (framing)
                </div>
                <div>
                  <span className="font-medium">Key Words:</span>{" "}
                  <span className="bg-yellow-100 px-1">GOVERNMENT</span> (subject),{" "}
                  <span className="bg-yellow-100 px-1">UNVEILS</span> (active verb),{" "}
                  <span className="bg-yellow-100 px-1">AMBITIOUS</span> (positive framing),{" "}
                  <span className="bg-yellow-100 px-1">AMID MIXED REACTIONS</span> (conflict framing)
                </div>
                <div>
                  <span className="font-medium">Narrative Position:</span> Establishes government action 
                  as the primary story, with conflict (mixed reactions) as the secondary element
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Funnel‐Style Information Hierarchy */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">
            Information Hierarchy (Inverted Pyramid)
          </h3>
          <div className="flex flex-col items-center space-y-4">
            {/* Headline layer */}
            <div className="bg-gray-800 text-white w-11/12 p-4 text-center rounded-md">
              <h4 className="font-bold mb-1">Headline</h4>
              <p className="text-sm">
                Sets main focus on government climate policy announcement
              </p>
            </div>
            {/* Essential Info */}
            <div className="bg-blue-100 w-10/12 p-4 text-center rounded-md">
              <h4 className="font-bold mb-1">
                Essential Information (Paragraphs 1-2)
              </h4>
              <p className="text-sm">
                Key facts and urgent details introduced here
              </p>
            </div>
            {/* Important Details */}
            <div className="bg-green-100 w-9/12 p-4 text-center rounded-md">
              <h4 className="font-bold mb-1">
                Important Details (Paragraphs 3, 5, 7)
              </h4>
              <p className="text-sm">
                Context, quotes, supporting evidence, or secondary points
              </p>
            </div>
            {/* Additional Context */}
            <div className="bg-yellow-100 w-8/12 p-4 text-center rounded-md">
              <h4 className="font-bold mb-1">
                Additional Context (Paragraphs 4, 6)
              </h4>
              <p className="text-sm">
                Less critical information or background introduced last
              </p>
            </div>
          </div>
        </div>

        {/* Narrative Thread Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Narrative Thread Positioning</h3>
          <div className="relative h-96 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 flex items-center pl-2 font-medium">
              Paragraph Sequence →
            </div>

            <svg viewBox="0 0 800 500" className="w-full h-full pt-8">
              {/* X-axis (paragraph lines & labels) */}
              {positioningData.paragraphs.map((para, index) => {
                const xPos = 100 * (index + 1);
                return (
                  <g key={para.id}>
                    <line
                      x1={xPos}
                      y1={20}
                      x2={xPos}
                      y2={480}
                      stroke="#e5e5e5"
                      strokeWidth="1"
                    />
                    <text
                      x={xPos}
                      y={40}
                      textAnchor="middle"
                      fill="#666"
                      fontSize="12"
                    >
                      P{para.position}
                    </text>
                  </g>
                );
              })}

              {/* Narrative threads */}
              {positioningData.narrativeThreads.map((thread, index) => {
                const yPosition = 80 + index * 70;
                const firstX = thread.firstMention * 100;
                const lastX = thread.lastMention * 100;

                // Decide if this thread is hovered
                const isHovered = hoveredThreadId === thread.id;
                const lineOpacity = isHovered ? 1 : 0.7;
                const circleRadius = isHovered ? 8 : 6;

                return (
                  <g
                    key={thread.id}
                    onMouseEnter={() => setHoveredThreadId(thread.id)}
                    onMouseLeave={() => setHoveredThreadId(null)}
                  >
                    {/* Thread name (left label) */}
                    <text
                      x={20}
                      y={yPosition}
                      textAnchor="start"
                      fill={thread.color}
                      fontSize="12"
                      fontWeight="medium"
                    >
                      {thread.thread}
                      <title>
                        {`Importance: ${Math.round(thread.importance * 100)}%\nStatus: ${
                          thread.closure === "open" ? "Open" : "Closed/Partial"
                        }`}
                      </title>
                    </text>

                    {/* Main thread line */}
                    <line
                      x1={firstX}
                      y1={yPosition}
                      x2={lastX}
                      y2={yPosition}
                      stroke={thread.color}
                      strokeWidth={thread.importance * 10}
                      strokeOpacity={lineOpacity}
                      strokeLinecap="round"
                    >
                      <title>
                        {`Thread: ${thread.thread}\nMentions: ${thread.mentions.join(
                          ", "
                        )}\nNext Steps: ${thread.nextSteps || "None"}`}
                      </title>
                    </line>

                    {/* Mention circles */}
                    {thread.mentions.map((paragraph, i) => {
                      const cxPos = paragraph * 100;
                      return (
                        <circle
                          key={i}
                          cx={cxPos}
                          cy={yPosition}
                          r={circleRadius}
                          fill={thread.color}
                          stroke="#fff"
                          strokeWidth="1"
                          opacity={lineOpacity}
                        >
                          <title>
                            {`Paragraph P${paragraph}\nThread: ${thread.thread}`}
                          </title>
                        </circle>
                      );
                    })}

                    {/* If thread is open, show dashed line or arrow at the end */}
                    {thread.closure === "open" && (
                      <path
                        d={`M ${lastX + 5} ${yPosition} L ${lastX + 15} ${yPosition}`}
                        stroke={thread.color}
                        strokeWidth="2"
                        strokeOpacity={lineOpacity}
                        strokeLinecap="round"
                        strokeDasharray="2 2"
                      >
                        <title>{`Open thread, continues beyond paragraph ${thread.lastMention}`}</title>
                      </path>
                    )}

                    {/* Next steps (if open or partial) */}
                    {thread.nextSteps && (
                      <text
                        x={lastX + 20}
                        y={yPosition + 3}
                        textAnchor="start"
                        fill="#666"
                        fontSize="10"
                        fontStyle="italic"
                        opacity={lineOpacity}
                      >
                        {thread.nextSteps}
                      </text>
                    )}

                    {/* Show numeric importance near the first mention */}
                    <text
                      x={firstX - 10}
                      y={yPosition - 10}
                      textAnchor="end"
                      fill="#999"
                      fontSize="10"
                      opacity={lineOpacity}
                    >
                      {Math.round(thread.importance * 10)}/10
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Paragraph Priority Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Paragraph Priority Analysis</h3>
          <div className="space-y-4">
            {positioningData.paragraphs.map((paragraph) => (
              <div
                key={paragraph.id}
                className="border rounded-lg overflow-hidden"
                style={{ borderColor: priorityColors[paragraph.priority] }}
              >
                <div
                  className="p-2 text-white text-sm font-medium flex justify-between items-center"
                  style={{ backgroundColor: priorityColors[paragraph.priority] }}
                >
                  <div>Paragraph {paragraph.position}</div>
                  <div className="flex items-center">
                    <span className="mr-2">
                      Priority: {paragraph.priority}
                    </span>
                    {paragraph.narrativeThreads.map((threadId) => {
                      const thread = positioningData.narrativeThreads.find(
                        (t) => t.id === threadId
                      );
                      return (
                        <div
                          key={threadId}
                          className="w-3 h-3 rounded-full mx-1"
                          style={{ backgroundColor: thread.color }}
                          title={thread.thread}
                        ></div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3">
                  <div className="text-sm mb-2">{paragraph.text}</div>
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Information structure:</span>{" "}
                    {paragraph.informationStructure.join(" → ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Guide Box */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
        <h3 className="text-xl font-semibold mb-2">User Guide</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>
            The <strong>Headline &amp; Lead Emphasis</strong> shows how the 
            article’s title and lead position the central narrative and key actors.
          </li>
          <li>
            The <strong>Information Hierarchy</strong> now uses a simpler, 
            funnel‐style layout to illustrate the “inverted pyramid”, showing which 
            information is prioritised first and which details appear further down.
          </li>
          <li>
            The <strong>Narrative Thread Positioning</strong> reveals how different 
            storylines weave through the article, indicating where they begin, where 
            they end, and which are left open for further development.
          </li>
          <li>
            The <strong>Paragraph Priority Analysis</strong> breaks down each paragraph 
            by its priority level, information structure, and which narrative threads 
            it contains.
          </li>
          <li>
            Together, these elements show how the article is structured to guide reader 
            attention and shape understanding of the events described.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NarrativePositioningViz;
