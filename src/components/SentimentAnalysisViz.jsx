// import React, { useState } from 'react';

// const SentimentAnalysisViz = () => {
//   // Sample article text analysis data (pre-analysed)
//   const [sentimentData] = useState({
//     entities: [
//       { id: 1, name: "Government", mentions: 4, averageSentiment: 0.1 },
//       { id: 2, name: "Opposition", mentions: 3, averageSentiment: -0.6 },
//       { id: 3, name: "Protesters", mentions: 2, averageSentiment: -0.3 },
//       { id: 4, name: "Scientists", mentions: 3, averageSentiment: 0.4 },
//       { id: 5, name: "Media", mentions: 1, averageSentiment: 0.0 },
//       { id: 6, name: "Industry", mentions: 2, averageSentiment: -0.5 },
//       { id: 7, name: "Environment Minister", mentions: 1, averageSentiment: 0.7 },
//       { id: 8, name: "Climate Policy", mentions: 5, averageSentiment: 0.2 },
//       { id: 9, name: "Budget Cuts", mentions: 2, averageSentiment: -0.8 },
//       { id: 10, name: "Research Findings", mentions: 1, averageSentiment: 0.6 }
//     ],
//     sentences: [
//       {
//         id: 1,
//         text: "The Government announced a sweeping new climate policy yesterday, setting targets to reduce carbon emissions by 60% before 2035.",
//         entities: ["Government", "Climate Policy"],
//         sentiment: 0.5,
//         paragraph: 1
//       },
//       {
//         id: 2,
//         text: "The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy and gradual phase-out of fossil fuel subsidies.",
//         entities: ["Climate Policy"],
//         sentiment: 0.4,
//         paragraph: 1
//       },
//       {
//         id: 3,
//         text: "\"This represents our commitment to addressing the climate crisis with the urgency it demands,\" said Environment Minister Elena Reynolds.",
//         entities: ["Environment Minister", "Climate Policy"],
//         sentiment: 0.7,
//         paragraph: 2
//       },
//       {
//         id: 4,
//         text: "\"We can no longer afford inaction on this critical issue.\"",
//         entities: ["Environment Minister"],
//         sentiment: 0.6,
//         paragraph: 2
//       },
//       {
//         id: 5,
//         text: "Opposition leaders immediately opposed the plan, criticising its economic implications.",
//         entities: ["Opposition", "Climate Policy"],
//         sentiment: -0.6,
//         paragraph: 3
//       },
//       {
//         id: 6,
//         text: "\"This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs,\" said Opposition Leader James Wilson during an emergency press conference.",
//         entities: ["Opposition", "Climate Policy"],
//         sentiment: -0.8,
//         paragraph: 3
//       },
//       {
//         id: 7,
//         text: "Wilson further warned about potential job losses in traditional energy sectors.",
//         entities: ["Opposition"],
//         sentiment: -0.7,
//         paragraph: 3
//       },
//       {
//         id: 8,
//         text: "Meanwhile, protesters demonstrated against recent budget cuts to environmental monitoring programmes, gathering outside Parliament with signs reading \"Actions Not Words\" and \"Fund Our Future.\"",
//         entities: ["Protesters", "Budget Cuts"],
//         sentiment: -0.4,
//         paragraph: 4
//       },
//       {
//         id: 9,
//         text: "The demonstration, organised by climate activist group EarthFirst, drew approximately 2,000 participants.",
//         entities: ["Protesters"],
//         sentiment: -0.2,
//         paragraph: 4
//       },
//       {
//         id: 10,
//         text: "Scientists from the National Climate Research Institute largely supported the government's targets.",
//         entities: ["Scientists", "Government", "Climate Policy"],
//         sentiment: 0.5,
//         paragraph: 5
//       },
//       {
//         id: 11,
//         text: "\"The proposed reductions align with what our research findings indicate is necessary,\" explained Dr. Sarah Chen, lead climate researcher at the institute.",
//         entities: ["Scientists", "Research Findings", "Climate Policy"],
//         sentiment: 0.6,
//         paragraph: 5
//       },
//       {
//         id: 12,
//         text: "However, she warned about implementation challenges, noting that \"meeting these targets will require unprecedented coordination across all sectors.\"",
//         entities: ["Scientists"],
//         sentiment: -0.3,
//         paragraph: 5
//       },
//       {
//         id: 13,
//         text: "Media outlets extensively reported on public reaction to the announcement, with national surveys showing divided opinions along urban and rural lines.",
//         entities: ["Media"],
//         sentiment: 0.0,
//         paragraph: 6
//       },
//       {
//         id: 14,
//         text: "Political analysts suggest the climate policy could become a central issue in next year's election campaign.",
//         entities: ["Climate Policy"],
//         sentiment: 0.1,
//         paragraph: 6
//       },
//       {
//         id: 15,
//         text: "Industry representatives criticised specific elements of the proposal, particularly the accelerated timeline.",
//         entities: ["Industry", "Climate Policy"],
//         sentiment: -0.5,
//         paragraph: 7
//       },
//       {
//         id: 16,
//         text: "\"While we support climate action, this implementation schedule will create substantial economic disruption,\" said Marcus Lee, spokesperson for the National Business Association.",
//         entities: ["Industry"],
//         sentiment: -0.4,
//         paragraph: 7
//       },
//       {
//         id: 17,
//         text: "As debate continues, the Government defended its approach, with the Prime Minister scheduled to address the nation next week regarding what he described as \"the most significant environmental initiative in our country's history.\"",
//         entities: ["Government", "Climate Policy"],
//         sentiment: 0.3,
//         paragraph: 8
//       }
//     ]
//   });

//   // Calculate sentiment colour based on value
//   const getSentimentColor = (sentiment) => {
//     // Colour scale: red (negative) → grey (neutral) → green (positive)
//     if (sentiment > 0) {
//       // Positive: increasing green intensity
//       const greenIntensity = Math.min(255, Math.round(100 + (sentiment * 155)));
//       return `rgb(0, ${greenIntensity}, 0)`;
//     } else if (sentiment < 0) {
//       // Negative: increasing red intensity
//       const redIntensity = Math.min(255, Math.round(100 + (Math.abs(sentiment) * 155)));
//       return `rgb(${redIntensity}, 0, 0)`;
//     } else {
//       // Neutral
//       return "rgb(128, 128, 128)";
//     }
//   };

//   // Scale the size of entity circles based on mention frequency
//   const getEntitySize = (mentions) => {
//     return 30 + (mentions * 10);
//   };

//   // Text colour (kept simple, always white for contrast)
//   const getTextColor = () => "white";

//   return (
//     <div className="max-w-7xl mx-auto py-8">
//       {/* Title */}
//       <h2 className="text-3xl font-bold text-center mb-6">
//         News Article Sentiment Analysis
//       </h2>

//       {/* Main Box */}
//       <div className="bg-white shadow-lg rounded-lg p-4">
//         {/* Entity Sentiment Overview */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-3">Entity Sentiment Overview</h3>
//           <div className="flex flex-wrap justify-center gap-3">
//             {sentimentData.entities.map(entity => (
//               <div 
//                 key={entity.id}
//                 className="rounded-full flex items-center justify-center text-center p-2"
//                 style={{ 
//                   width: `${getEntitySize(entity.mentions)}px`, 
//                   height: `${getEntitySize(entity.mentions)}px`,
//                   backgroundColor: getSentimentColor(entity.averageSentiment),
//                   color: getTextColor()
//                 }}
//               >
//                 <div className="text-xs">{entity.name}</div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-center mt-4 items-center text-sm">
//             <span className="text-red-600 font-medium">Negative</span>
//             <div className="w-32 h-2 mx-2 bg-gradient-to-r from-red-600 via-gray-500 to-green-600 rounded"></div>
//             <span className="text-green-600 font-medium">Positive</span>
//             <span className="ml-6">Circle size = mention frequency</span>
//           </div>
//         </div>
        
//         {/* Sentence-by-Sentence Analysis */}
//         <div>
//           <h3 className="text-xl font-semibold mb-3">Sentence-Level Sentiment Flow</h3>
//           <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//             {sentimentData.sentences.map(sentence => (
//               <div key={sentence.id} className="mb-3 last:mb-0">
//                 <div className="flex items-center gap-2 mb-1">
//                   <div 
//                     className="w-4 h-4 rounded-full flex-shrink-0" 
//                     style={{ backgroundColor: getSentimentColor(sentence.sentiment) }}
//                   ></div>
//                   <div className="text-xs text-gray-600">
//                     Sentiment: {sentence.sentiment.toFixed(1)} | 
//                     Entities: {sentence.entities.join(", ")}
//                   </div>
//                 </div>
//                 <div
//                   className="text-sm"
//                   style={{ 
//                     borderLeft: `3px solid ${getSentimentColor(sentence.sentiment)}`,
//                     paddingLeft: '12px'
//                   }}
//                 >
//                   {sentence.text}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* User Guide (aligned with earlier example) */}
//       <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
//         <h3 className="text-xl font-semibold mb-2">User Guide</h3>
//         <ul className="list-disc ml-5 space-y-1">
//           <li>The circles at the top represent key entities mentioned in the article, with size indicating frequency of mentions.</li>
//           <li>Colour indicates sentiment: green for positive, red for negative, and grey for neutral framing.</li>
//           <li>The sentence-level analysis above shows how sentiment flows throughout the article, with coloured indicators demonstrating the emotional tone of each sentence.</li>
//           <li>This visualisation helps identify which entities are framed positively or negatively and how the emotional tone shifts throughout the narrative.</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SentimentAnalysisViz;




















import React, { useState } from 'react';

const SentimentAnalysisViz = () => {
  // Sample article text analysis data (pre-analysed)
  const [sentimentData] = useState({
    entities: [
      { id: 1, name: "Government", mentions: 4, averageSentiment: 0.1 },
      { id: 2, name: "Opposition", mentions: 3, averageSentiment: -0.6 },
      { id: 3, name: "Protesters", mentions: 2, averageSentiment: -0.3 },
      { id: 4, name: "Scientists", mentions: 3, averageSentiment: 0.4 },
      { id: 5, name: "Media", mentions: 1, averageSentiment: 0.0 },
      { id: 6, name: "Industry", mentions: 2, averageSentiment: -0.5 },
      { id: 7, name: "Environment Minister", mentions: 1, averageSentiment: 0.7 },
      { id: 8, name: "Climate Policy", mentions: 5, averageSentiment: 0.2 },
      { id: 9, name: "Budget Cuts", mentions: 2, averageSentiment: -0.8 },
      { id: 10, name: "Research Findings", mentions: 1, averageSentiment: 0.6 }
    ],
    sentences: [
      {
        id: 1,
        text: "The Government announced a sweeping new climate policy yesterday, setting targets to reduce carbon emissions by 60% before 2035.",
        entities: ["Government", "Climate Policy"],
        sentiment: 0.5
      },
      {
        id: 2,
        text: "The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy and gradual phase-out of fossil fuel subsidies.",
        entities: ["Climate Policy"],
        sentiment: 0.4
      },
      {
        id: 3,
        text: "\"This represents our commitment to addressing the climate crisis with the urgency it demands,\" said Environment Minister Elena Reynolds.",
        entities: ["Environment Minister", "Climate Policy"],
        sentiment: 0.7
      },
      {
        id: 4,
        text: "\"We can no longer afford inaction on this critical issue.\"",
        entities: ["Environment Minister"],
        sentiment: 0.6
      },
      {
        id: 5,
        text: "Opposition leaders immediately opposed the plan, criticizing its economic implications.",
        entities: ["Opposition", "Climate Policy"],
        sentiment: -0.6
      },
      {
        id: 6,
        text: "\"This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs,\" said Opposition Leader James Wilson during an emergency press conference.",
        entities: ["Opposition", "Climate Policy"],
        sentiment: -0.8
      },
      {
        id: 7,
        text: "Wilson further warned about potential job losses in traditional energy sectors.",
        entities: ["Opposition"],
        sentiment: -0.7
      },
      {
        id: 8,
        text: "Meanwhile, protesters demonstrated against recent budget cuts to environmental monitoring programs, gathering outside Parliament with signs reading \"Actions Not Words\" and \"Fund Our Future.\"",
        entities: ["Protesters", "Budget Cuts"],
        sentiment: -0.4
      },
      {
        id: 9,
        text: "The demonstration, organized by climate activist group EarthFirst, drew approximately 2,000 participants.",
        entities: ["Protesters"],
        sentiment: -0.2
      },
      {
        id: 10,
        text: "Scientists from the National Climate Research Institute largely supported the government's targets.",
        entities: ["Scientists", "Government", "Climate Policy"],
        sentiment: 0.5
      },
      {
        id: 11,
        text: "\"The proposed reductions align with what our research findings indicate is necessary,\" explained Dr. Sarah Chen, lead climate researcher at the institute.",
        entities: ["Scientists", "Research Findings", "Climate Policy"],
        sentiment: 0.6
      },
      {
        id: 12,
        text: "However, she warned about implementation challenges, noting that \"meeting these targets will require unprecedented coordination across all sectors.\"",
        entities: ["Scientists"],
        sentiment: -0.3
      },
      {
        id: 13,
        text: "Media outlets extensively reported on public reaction to the announcement, with national surveys showing divided opinions along urban and rural lines.",
        entities: ["Media"],
        sentiment: 0.0
      },
      {
        id: 14,
        text: "Political analysts suggest the climate policy could become a central issue in next year's election campaign.",
        entities: ["Climate Policy"],
        sentiment: 0.1
      },
      {
        id: 15,
        text: "Industry representatives criticized specific elements of the proposal, particularly the accelerated timeline.",
        entities: ["Industry", "Climate Policy"],
        sentiment: -0.5
      },
      {
        id: 16,
        text: "\"While we support climate action, this implementation schedule will create substantial economic disruption,\" said Marcus Lee, spokesperson for the National Business Association.",
        entities: ["Industry"],
        sentiment: -0.4
      },
      {
        id: 17,
        text: "As debate continues, the Government defended its approach, with the Prime Minister scheduled to address the nation next week regarding what he described as \"the most significant environmental initiative in our country's history.\"",
        entities: ["Government", "Climate Policy"],
        sentiment: 0.3
      }
    ]
  });

  // Calculate sentiment colour based on value
  const getSentimentColor = (sentiment) => {
    // Colour scale: red (negative) → grey (neutral) → green (positive)
    if (sentiment > 0) {
      // Positive: increasing green intensity
      const greenIntensity = Math.min(255, Math.round(100 + (sentiment * 155)));
      return `rgb(0, ${greenIntensity}, 0)`;
    } else if (sentiment < 0) {
      // Negative: increasing red intensity
      const redIntensity = Math.min(255, Math.round(100 + (Math.abs(sentiment) * 155)));
      return `rgb(${redIntensity}, 0, 0)`;
    } else {
      // Neutral
      return "rgb(128, 128, 128)";
    }
  };

  // Scale entity circles by mention frequency
  const getEntitySize = (mentions) => 30 + (mentions * 10);

  // Text colour for entity labels (kept simple)
  const getTextColor = () => "white";

  // Original news article content
  const articleTitle = "GOVERNMENT UNVEILS AMBITIOUS CLIMATE TARGETS AMID MIXED REACTIONS";
  const articleAuthor = "By Jane Smith, Political Correspondent";
  const articleDate = "February 28, 2025";
  const articleParagraphs = [
    "CAPITAL CITY — The Government announced a sweeping new climate policy yesterday, setting targets to reduce carbon emissions by 60% before 2035. The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy and gradual phase-out of fossil fuel subsidies.",
    "\"This represents our commitment to addressing the climate crisis with the urgency it demands,\" said Environment Minister Elena Reynolds. \"We can no longer afford inaction on this critical issue.\"",
    "Opposition leaders immediately opposed the plan, criticizing its economic implications. \"This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs,\" said Opposition Leader James Wilson during an emergency press conference. Wilson further warned about potential job losses in traditional energy sectors.",
    "Meanwhile, protesters demonstrated against recent budget cuts to environmental monitoring programs, gathering outside Parliament with signs reading \"Actions Not Words\" and \"Fund Our Future.\" The demonstration, organized by climate activist group EarthFirst, drew approximately 2,000 participants.",
    "Scientists from the National Climate Research Institute largely supported the government's targets. \"The proposed reductions align with what our research findings indicate is necessary,\" explained Dr. Sarah Chen, lead climate researcher at the institute. However, she warned about implementation challenges, noting that \"meeting these targets will require unprecedented coordination across all sectors.\"",
    "Media outlets extensively reported on public reaction to the announcement, with national surveys showing divided opinions along urban and rural lines. Political analysts suggest the climate policy could become a central issue in next year's election campaign.",
    "Industry representatives criticized specific elements of the proposal, particularly the accelerated timeline. \"While we support climate action, this implementation schedule will create substantial economic disruption,\" said Marcus Lee, spokesperson for the National Business Association.",
    "As debate continues, the Government defended its approach, with the Prime Minister scheduled to address the nation next week regarding what he described as \"the most significant environmental initiative in our country's history.\""
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        News Article Sentiment Analysis
      </h2>

      {/* Two-column layout for the article (left) and the analysis (right) */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Panel: Original Article */}
        <div className="md:w-1/3 w-full">
          <div className="bg-white shadow-lg rounded-lg p-4 text-gray-800 text-sm">
            <h3 className="text-xl font-semibold mb-2">{articleTitle}</h3>
            <p className="italic text-xs mb-1">{articleAuthor}</p>
            <p className="text-xs text-gray-500 mb-4">{articleDate}</p>
            {articleParagraphs.map((para, idx) => (
              <p key={idx} className="mb-4 last:mb-0">{para}</p>
            ))}
          </div>
        </div>

        {/* Right Panel: Sentiment Analysis */}
        <div className="md:w-2/3 w-full">
          {/* Main Box */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            {/* Entity Sentiment Overview */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Entity Sentiment Overview</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {sentimentData.entities.map(entity => (
                  <div
                    key={entity.id}
                    className="rounded-full flex items-center justify-center text-center p-2"
                    style={{
                      width: `${getEntitySize(entity.mentions)}px`,
                      height: `${getEntitySize(entity.mentions)}px`,
                      backgroundColor: getSentimentColor(entity.averageSentiment),
                      color: getTextColor()
                    }}
                  >
                    <div className="text-xs">{entity.name}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4 items-center text-sm">
                <span className="text-red-600 font-medium">Negative</span>
                <div className="w-32 h-2 mx-2 bg-gradient-to-r from-red-600 via-gray-500 to-green-600 rounded"></div>
                <span className="text-green-600 font-medium">Positive</span>
                <span className="ml-6">Circle size = mention frequency</span>
              </div>
            </div>

            {/* Sentence-by-Sentence Analysis */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Sentence-Level Sentiment Flow</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                {sentimentData.sentences.map(sentence => (
                  <div key={sentence.id} className="mb-3 last:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getSentimentColor(sentence.sentiment) }}
                      />
                      <div className="text-xs text-gray-600">
                        Sentiment: {sentence.sentiment.toFixed(1)} | 
                        Entities: {sentence.entities.join(", ")}
                      </div>
                    </div>
                    <div
                      className="text-sm"
                      style={{
                        borderLeft: `3px solid ${getSentimentColor(sentence.sentiment)}`,
                        paddingLeft: "12px"
                      }}
                    >
                      {sentence.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Guide */}
          <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
            <h3 className="text-xl font-semibold mb-2">User Guide</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>The circles at the top represent key entities mentioned in the article, with size indicating frequency of mentions.</li>
              <li>Colour indicates sentiment: green for positive, red for negative, and grey for neutral framing.</li>
              <li>The sentence-level analysis above shows how sentiment flows throughout the article, with coloured indicators demonstrating the emotional tone of each sentence.</li>
              <li>This visualisation helps identify which entities are framed positively or negatively and how the emotional tone shifts throughout the narrative.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisViz;
