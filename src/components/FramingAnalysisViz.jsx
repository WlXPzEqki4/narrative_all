// import React, { useState } from 'react';

// const FramingAnalysisViz = () => {
//   // Sample framing analysis data from the article
//   const [framingData, setFramingData] = useState({
//     mainFrames: [
//       {
//         id: 1,
//         type: "Environmental Urgency",
//         strength: 0.8,
//         language: ["climate crisis", "urgency", "ambitious", "necessary"],
//         quotes: ["addressing the climate crisis with the urgency it demands"],
//         sources: ["Government", "Environment Minister", "Scientists"],
//         color: "#34A853" // Green
//       },
//       {
//         id: 2,
//         type: "Economic Concern",
//         strength: 0.7,
//         language: ["devastate", "burden", "costs", "job losses", "disruption"],
//         quotes: ["devastate our industrial sectors and burden taxpayers with unsustainable costs"],
//         sources: ["Opposition", "Industry"],
//         color: "#EA4335" // Red
//       },
//       {
//         id: 3,
//         type: "Scientific Consensus",
//         strength: 0.6,
//         language: ["research findings", "align", "indicate is necessary"],
//         quotes: ["align with what our research findings indicate is necessary"],
//         sources: ["Scientists", "National Climate Research Institute"],
//         color: "#4285F4" // Blue
//       },
//       {
//         id: 4,
//         type: "Political Calculation",
//         strength: 0.5,
//         language: ["election campaign", "central issue", "debate"],
//         quotes: ["central issue in next year's election campaign"],
//         sources: ["Political analysts", "Media"],
//         color: "#FBBC05" // Yellow
//       },
//       {
//         id: 5,
//         type: "Public Accountability",
//         strength: 0.4,
//         language: ["Actions Not Words", "Fund Our Future"],
//         quotes: ["Actions Not Words", "Fund Our Future"],
//         sources: ["Protesters", "EarthFirst"],
//         color: "#9C27B0" // Purple
//       }
//     ],
//     paragraphFrames: [
//       { id: 1, paragraph: 1, frames: [1, 3], dominantFrame: 1 },
//       { id: 2, paragraph: 2, frames: [1], dominantFrame: 1 },
//       { id: 3, paragraph: 3, frames: [2, 4], dominantFrame: 2 },
//       { id: 4, paragraph: 4, frames: [5], dominantFrame: 5 },
//       { id: 5, paragraph: 5, frames: [1, 3], dominantFrame: 3 },
//       { id: 6, paragraph: 6, frames: [4], dominantFrame: 4 },
//       { id: 7, paragraph: 7, frames: [2], dominantFrame: 2 },
//       { id: 8, paragraph: 8, frames: [1, 4], dominantFrame: 1 }
//     ],
//     articleText: [
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

//   // Calculate the width of a frame block based on its strength
//   const getFrameWidth = (strength) => {
//     return `${Math.round(strength * 100)}%`;
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-4 text-center">News Article Framing Analysis</h1>
      
//       {/* Main Frames */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-3">Dominant Narrative Frames</h2>
//         <div className="space-y-6">
//           {framingData.mainFrames.map(frame => (
//             <div key={frame.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//               <div className="flex items-center mb-2">
//                 <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: frame.color }}></div>
//                 <h3 className="font-medium">{frame.type} Frame</h3>
//                 <div className="ml-auto text-sm text-gray-500">Strength: {Math.round(frame.strength * 100)}%</div>
//               </div>
              
//               <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
//                 <div className="h-2 rounded-full" style={{ width: getFrameWidth(frame.strength), backgroundColor: frame.color }}></div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <div className="font-medium mb-1">Key Language:</div>
//                   <div className="flex flex-wrap gap-1">
//                     {frame.language.map((term, index) => (
//                       <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-xs">{term}</span>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div>
//                   <div className="font-medium mb-1">Sources:</div>
//                   <div className="flex flex-wrap gap-1">
//                     {frame.sources.map((source, index) => (
//                       <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-xs">{source}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
              
//               {frame.quotes.length > 0 && (
//                 <div className="mt-3 text-sm">
//                   <div className="font-medium mb-1">Representative Quotes:</div>
//                   <div className="italic text-gray-700 pl-3 border-l-2" style={{ borderColor: frame.color }}>
//                     "{frame.quotes[0]}"
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Paragraph-by-Paragraph Analysis */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-3">Paragraph-by-Paragraph Frame Analysis</h2>
        
//         {framingData.paragraphFrames.map((pFrame, index) => {
//           // Get the dominant frame data
//           const dominantFrame = framingData.mainFrames.find(f => f.id === pFrame.dominantFrame);
//           // Get all frames for this paragraph
//           const allFrames = pFrame.frames.map(id => framingData.mainFrames.find(f => f.id === id));
          
//           return (
//             <div key={pFrame.id} className="mb-6 last:mb-0">
//               <div className="flex items-center mb-2">
//                 <div className="text-sm font-medium">Paragraph {pFrame.id}</div>
//                 <div className="ml-3 flex">
//                   {allFrames.map(frame => (
//                     <div 
//                       key={frame.id} 
//                       className="w-4 h-4 rounded-full mx-1" 
//                       style={{ 
//                         backgroundColor: frame.color,
//                         border: frame.id === dominantFrame.id ? '2px solid black' : 'none'
//                       }}
//                       title={`${frame.type} Frame`}
//                     ></div>
//                   ))}
//                 </div>
//                 <div className="ml-auto text-sm">
//                   Dominant: <span style={{ color: dominantFrame.color }}>{dominantFrame.type}</span>
//                 </div>
//               </div>
              
//               <div 
//                 className="p-3 text-sm rounded-lg" 
//                 style={{ 
//                   backgroundColor: `${dominantFrame.color}15`, 
//                   borderLeft: `4px solid ${dominantFrame.color}` 
//                 }}
//               >
//                 {framingData.articleText[index]}
//               </div>
//             </div>
//           );
//         })}
//       </div>
      
//       {/* Frame Distribution Visualization */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-3">Frame Distribution</h2>
//         <div className="h-8 w-full flex rounded-lg overflow-hidden">
//           {framingData.paragraphFrames.map(pFrame => {
//             const dominantFrame = framingData.mainFrames.find(f => f.id === pFrame.dominantFrame);
//             return (
//               <div 
//                 key={pFrame.id}
//                 style={{ 
//                   backgroundColor: dominantFrame.color,
//                   width: `${100 / framingData.paragraphFrames.length}%`
//                 }}
//                 title={`Paragraph ${pFrame.id}: ${dominantFrame.type} Frame`}
//                 className="h-full"
//               ></div>
//             );
//           })}
//         </div>
//         <div className="flex justify-between text-xs text-gray-500 mt-1">
//           <div>Beginning of article</div>
//           <div>End of article</div>
//         </div>
//       </div>
      
//       {/* How to Interpret */}
//       <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
//         <h3 className="font-medium mb-2">How to Read This Visualization:</h3>
//         <ul className="list-disc ml-5 space-y-1">
//           <li>The top section shows the main narrative frames identified in the article, with their key language, sources, and representative quotes.</li>
//           <li>The middle section breaks down the article paragraph by paragraph, showing which frames are present in each paragraph and which one is dominant.</li>
//           <li>The bottom bar shows the flow of dominant frames throughout the article, helping visualize the overall narrative structure.</li>
//           <li>This analysis reveals how different perspectives are prioritized, who promotes each frame, and how frames shift throughout the article.</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FramingAnalysisViz;























import React, { useState } from 'react';

const FramingAnalysisViz = () => {
  // Sample framing analysis data from the article
  const [framingData] = useState({
    mainFrames: [
      {
        id: 1,
        type: "Environmental Urgency",
        strength: 0.8,
        language: ["climate crisis", "urgency", "ambitious", "necessary"],
        quotes: ["addressing the climate crisis with the urgency it demands"],
        sources: ["Government", "Environment Minister", "Scientists"],
        color: "#34A853" // Green
      },
      {
        id: 2,
        type: "Economic Concern",
        strength: 0.7,
        language: ["devastate", "burden", "costs", "job losses", "disruption"],
        quotes: ["devastate our industrial sectors and burden taxpayers with unsustainable costs"],
        sources: ["Opposition", "Industry"],
        color: "#EA4335" // Red
      },
      {
        id: 3,
        type: "Scientific Consensus",
        strength: 0.6,
        language: ["research findings", "align", "indicate is necessary"],
        quotes: ["align with what our research findings indicate is necessary"],
        sources: ["Scientists", "National Climate Research Institute"],
        color: "#4285F4" // Blue
      },
      {
        id: 4,
        type: "Political Calculation",
        strength: 0.5,
        language: ["election campaign", "central issue", "debate"],
        quotes: ["central issue in next year's election campaign"],
        sources: ["Political analysts", "Media"],
        color: "#FBBC05" // Yellow
      },
      {
        id: 5,
        type: "Public Accountability",
        strength: 0.4,
        language: ["Actions Not Words", "Fund Our Future"],
        quotes: ["Actions Not Words", "Fund Our Future"],
        sources: ["Protesters", "EarthFirst"],
        color: "#9C27B0" // Purple
      }
    ],
    paragraphFrames: [
      { id: 1, paragraph: 1, frames: [1, 3], dominantFrame: 1 },
      { id: 2, paragraph: 2, frames: [1], dominantFrame: 1 },
      { id: 3, paragraph: 3, frames: [2, 4], dominantFrame: 2 },
      { id: 4, paragraph: 4, frames: [5], dominantFrame: 5 },
      { id: 5, paragraph: 5, frames: [1, 3], dominantFrame: 3 },
      { id: 6, paragraph: 6, frames: [4], dominantFrame: 4 },
      { id: 7, paragraph: 7, frames: [2], dominantFrame: 2 },
      { id: 8, paragraph: 8, frames: [1, 4], dominantFrame: 1 }
    ],
    articleText: [
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

  // Calculate the width of a frame block based on its strength
  const getFrameWidth = (strength) => `${Math.round(strength * 100)}%`;

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        News Article Framing Analysis
      </h2>

      {/* Main Content Box */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        {/* Dominant Narrative Frames */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Dominant Narrative Frames</h3>
          <div className="space-y-6">
            {framingData.mainFrames.map(frame => (
              <div key={frame.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center mb-2">
                  <div 
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: frame.color }}
                  />
                  <h4 className="font-medium">{frame.type} Frame</h4>
                  <div className="ml-auto text-sm text-gray-500">
                    Strength: {Math.round(frame.strength * 100)}%
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="h-2 rounded-full"
                    style={{
                      width: getFrameWidth(frame.strength),
                      backgroundColor: frame.color
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium mb-1">Key Language:</div>
                    <div className="flex flex-wrap gap-1">
                      {frame.language.map((term, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-200 rounded-full text-xs"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-medium mb-1">Sources:</div>
                    <div className="flex flex-wrap gap-1">
                      {frame.sources.map((source, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-200 rounded-full text-xs"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {frame.quotes.length > 0 && (
                  <div className="mt-3 text-sm">
                    <div className="font-medium mb-1">Representative Quotes:</div>
                    <div 
                      className="italic text-gray-700 pl-3 border-l-2" 
                      style={{ borderColor: frame.color }}
                    >
                      "{frame.quotes[0]}"
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Paragraph-by-Paragraph Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Paragraph-by-Paragraph Frame Analysis</h3>
          {framingData.paragraphFrames.map((pFrame, index) => {
            const dominantFrame = framingData.mainFrames.find(f => f.id === pFrame.dominantFrame);
            const allFrames = pFrame.frames.map(
              id => framingData.mainFrames.find(f => f.id === id)
            );

            return (
              <div key={pFrame.id} className="mb-6 last:mb-0">
                <div className="flex items-center mb-2">
                  <div className="text-sm font-medium">Paragraph {pFrame.id}</div>
                  <div className="ml-3 flex">
                    {allFrames.map(frame => (
                      <div
                        key={frame.id}
                        className="w-4 h-4 rounded-full mx-1"
                        style={{
                          backgroundColor: frame.color,
                          border: frame.id === dominantFrame.id
                            ? '2px solid black'
                            : 'none'
                        }}
                        title={`${frame.type} Frame`}
                      />
                    ))}
                  </div>
                  <div className="ml-auto text-sm">
                    Dominant: <span style={{ color: dominantFrame.color }}>
                      {dominantFrame.type}
                    </span>
                  </div>
                </div>

                <div
                  className="p-3 text-sm rounded-lg"
                  style={{
                    backgroundColor: `${dominantFrame.color}15`,
                    borderLeft: `4px solid ${dominantFrame.color}`
                  }}
                >
                  {framingData.articleText[index]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Frame Distribution */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Frame Distribution</h3>
          <div className="h-8 w-full flex rounded-lg overflow-hidden">
            {framingData.paragraphFrames.map(pFrame => {
              const dominantFrame = framingData.mainFrames.find(f => f.id === pFrame.dominantFrame);
              return (
                <div
                  key={pFrame.id}
                  style={{
                    backgroundColor: dominantFrame.color,
                    width: `${100 / framingData.paragraphFrames.length}%`
                  }}
                  title={`Paragraph ${pFrame.id}: ${dominantFrame.type} Frame`}
                  className="h-full"
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <div>Beginning of article</div>
            <div>End of article</div>
          </div>
        </div>
      </div>

      {/* User Guide (aligned with previous style) */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
        <h3 className="text-xl font-semibold mb-2">User Guide</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>
            The top section shows the main narrative frames identified in the article, 
            with their key language, sources, and representative quotes.
          </li>
          <li>
            The middle section breaks down the article paragraph by paragraph, 
            showing which frames are present in each paragraph and which one is dominant.
          </li>
          <li>
            The bottom bar shows the flow of dominant frames throughout the article, 
            helping visualise the overall narrative structure.
          </li>
          <li>
            This analysis reveals how different perspectives are prioritised, who promotes 
            each frame, and how frames shift throughout the article.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FramingAnalysisViz;
