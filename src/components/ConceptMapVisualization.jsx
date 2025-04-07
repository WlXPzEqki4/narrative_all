import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3'; // Import d3 for color interpolation

// Main component
const ConceptMapVisualization = () => {
  // State for tracking the selected concept
  const [selectedConcept, setSelectedConcept] = useState("economic_impact");
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 400 }); // Smaller map dimensions

  // Article paragraphs for context
  const articleParagraphs = [
    "The Government announced a sweeping new climate policy yesterday, setting targets to reduce carbon emissions by 60% before 2035. The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy and gradual phase-out of fossil fuel subsidies.",
    "\"This represents our commitment to addressing the climate crisis with the urgency it demands,\" said Environment Minister Elena Reynolds. \"We can no longer afford inaction on this critical issue.\"",
    "Opposition leaders immediately opposed the plan, criticizing its economic implications. \"This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs,\" said Opposition Leader James Wilson during an emergency press conference. Wilson further warned about potential job losses in traditional energy sectors.",
    "Meanwhile, protesters demonstrated against recent budget cuts to environmental monitoring programs, gathering outside Parliament with signs reading \"Actions Not Words\" and \"Fund Our Future.\" The demonstration, organized by climate activist group EarthFirst, drew approximately 2,000 participants.",
    "Scientists from the National Climate Research Institute largely supported the government's targets. \"The proposed reductions align with what our research findings indicate is necessary,\" explained Dr. Sarah Chen, lead climate researcher at the institute. However, she warned about implementation challenges, noting that \"meeting these targets will require unprecedented coordination across all sectors.\"",
    "Media outlets extensively reported on public reaction to the announcement, with national surveys showing divided opinions along urban and rural lines. Political analysts suggest the climate policy could become a central issue in next year's election campaign.",
    "Industry representatives criticized specific elements of the proposal, particularly the accelerated timeline. \"While we support climate action, this implementation schedule will create substantial economic disruption,\" said Marcus Lee, spokesperson for the National Business Association.",
    "As debate continues, the Government defended its approach, with the Prime Minister scheduled to address the nation next week regarding what he described as \"the most significant environmental initiative in our country's history.\""
  ];

  // Data for concept network visualization
  const concepts = [
    {
      id: "climate_policy",
      label: "Climate Policy",
      type: "target",
      category: "policy",
      x: 400,
      y: 250,
      paragraphs: [0, 1, 2, 4, 5, 6, 7],
      sentiment: 0.4,
      centrality: 0.9,
      frequency: 8,
      description: "The government's plan to reduce carbon emissions by 60% before 2035",
      evidence: [
        { paragraph: 0, text: "sweeping new climate policy" },
        { paragraph: 0, text: "targets to reduce carbon emissions by 60% before 2035" },
        { paragraph: 0, text: "The proposal" },
        { paragraph: 2, text: "the plan" },
        { paragraph: 4, text: "the government's targets" },
        { paragraph: 5, text: "the climate policy" },
        { paragraph: 6, text: "the proposal" },
        { paragraph: 7, text: "the most significant environmental initiative" }
      ]
    },
    {
      id: "economic_impact",
      label: "Economic Impact",
      type: "target",
      category: "economic",
      x: 100,
      y: 150,
      paragraphs: [2, 6],
      sentiment: -0.7,
      centrality: 0.8,
      frequency: 4,
      description: "Potential economic consequences of the climate policy",
      evidence: [
        { paragraph: 2, text: "economic implications" },
        { paragraph: 2, text: "devastate our industrial sectors" },
        { paragraph: 2, text: "burden taxpayers with unsustainable costs" },
        { paragraph: 2, text: "job losses in traditional energy sectors" },
        { paragraph: 6, text: "economic disruption" }
      ]
    },
    {
      id: "scientific_consensus",
      label: "Scientific Consensus",
      type: "target",
      category: "scientific",
      x: 400,
      y: 150,
      paragraphs: [4],
      sentiment: 0.6,
      centrality: 0.7,
      frequency: 2,
      description: "Scientific agreement on necessary climate action",
      evidence: [
        { paragraph: 4, text: "largely supported the government's targets" },
        { paragraph: 4, text: "our research findings indicate is necessary" }
      ]
    },
    {
      id: "implementation_challenges",
      label: "Implementation Challenges",
      type: "target",
      category: "practical",
      x: 400,
      y: 300,
      paragraphs: [4, 6],
      sentiment: -0.4,
      centrality: 0.6,
      frequency: 2,
      description: "Practical challenges in implementing the climate policy",
      evidence: [
        { paragraph: 4, text: "implementation challenges" },
        { paragraph: 4, text: "meeting these targets will require unprecedented coordination across all sectors" },
        { paragraph: 6, text: "accelerated timeline" }
      ]
    },
    {
      id: "public_opinion",
      label: "Public Opinion",
      type: "target",
      category: "social",
      x: 100,
      y: 300,
      paragraphs: [5],
      sentiment: 0.0,
      centrality: 0.5,
      frequency: 2,
      description: "Public reaction to the climate policy announcement",
      evidence: [
        { paragraph: 5, text: "public reaction" },
        { paragraph: 5, text: "divided opinions along urban and rural lines" }
      ]
    }
  ];

  // Relationships between concepts
  const relationships = [
    { source: "climate_policy", target: "economic_impact", label: "creates", weight: 0.8, sentiment: -0.5 },
    { source: "climate_policy", target: "implementation_challenges", label: "faces", weight: 0.6, sentiment: -0.4 },
    { source: "scientific_consensus", target: "climate_policy", label: "supports", weight: 0.9, sentiment: 0.6 },
    { source: "climate_policy", target: "public_opinion", label: "influences", weight: 0.5, sentiment: 0.0 }
  ];

  // Calculate colour based on sentiment using d3.interpolateRgb
  const getSentimentColor = (sentiment) => {
    if (sentiment > 0) {
      return d3.interpolateRgb("#FFFFFF", "#1B5E20")(sentiment);
    } else if (sentiment < 0) {
      return d3.interpolateRgb("#FFFFFF", "#B71C1C")(Math.abs(sentiment));
    }
    return "#AAAAAA";
  };

  // Get node type colour
  const getNodeTypeColor = (type) => {
    switch (type) {
      case "actor": return "#2196F3";
      case "action": return "#FF5722";
      case "target": return "#4CAF50";
      default: return "#9E9E9E";
    }
  };

  // Get concept color based on category
  const getConceptColor = (category) => {
    const categoryColors = {
      "policy": "#4285F4",
      "environmental": "#34A853",
      "economic": "#FBBC05",
      "social": "#EA4335",
      "scientific": "#9C27B0",
      "political": "#00BCD4",
      "practical": "#FF9800"
    };
    return categoryColors[category] || "#ccc";
  };

  // Calculate node size based on mentions and agency
  const getNodeSize = (concept) => {
    const baseSizeByType = {
      actor: 15,
      action: 10,
      target: 12
    };
    const baseSize = baseSizeByType[concept.type] || 10;
    const mentionFactor = concept.frequency ? Math.sqrt(concept.frequency) * 2 : 1;
    const agencyFactor = concept.centrality ? Math.log(concept.centrality + 1) * 1.5 : 1;
    return baseSize * (concept.type === "target" ? agencyFactor : mentionFactor);
  };

  // Calculate link width based on weight
  const getLinkWidth = (link) => link.weight * 5;

  // useEffect hook to handle resizing
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current && svgRef.current.parentElement) {
        setDimensions({
          width: Math.min(500, svgRef.current.parentElement.clientWidth * 0.4),
          height: Math.min(400, svgRef.current.parentElement.clientWidth * 0.3)
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount to set initial dimensions
    return () => window.removeEventListener('resize', handleResize); // Clean up on unmount
  }, []);

  // Highlight evidence in paragraph
  const HighlightedParagraph = ({ paragraph, evidenceItems }) => {
    const text = articleParagraphs[paragraph];
    const fragments = [];
    let position = 0;

    evidenceItems.forEach(item => {
      const index = text.indexOf(item.text, position);
      if (index !== -1) {
        fragments.push(
          <span key={`t-${position}`}>
            {text.substring(position, index)}
          </span>
        );
        fragments.push(
          <mark key={`h-${index}`} className="bg-yellow-200 font-bold">
            {text.substring(index, index + item.text.length)}
          </mark>
        );
        position = index + item.text.length;
      }
    });
    fragments.push(<span key="end">{text.substring(position)}</span>);

    return <p className="text-sm leading-relaxed">{fragments}</p>;
  };

  // Get paragraphs containing evidence for the selected concept
  const getRelevantParagraphs = () => {
    const concept = concepts.find(c => c.id === selectedConcept);
    if (!concept) return [];

    // Group evidence by paragraph
    const evidenceByParagraph = {};
    concept.evidence.forEach(item => {
      if (!evidenceByParagraph[item.paragraph]) {
        evidenceByParagraph[item.paragraph] = [];
      }
      evidenceByParagraph[item.paragraph].push(item);
    });

    return Object.entries(evidenceByParagraph).map(([paragraph, evidence]) => ({
      paragraph: parseInt(paragraph),
      evidence
    }));
  };

  const selectedConceptData = concepts.find(c => c.id === selectedConcept);
  const relevantParagraphs = getRelevantParagraphs();

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Concept Map with Textual Evidence</h1>

      <div className="flex flex-wrap">
        {/* Network visualization */}
        <div className="w-full md:w-1/2 p-4">
          <div className="mb-6 border border-gray-200 rounded-lg bg-gray-50">
            <svg
              ref={svgRef}
              width={dimensions.width}
              height={dimensions.height}
              className="w-full h-auto"
            >
              {/* Draw relationships first so they're behind nodes */}
              {relationships.map((rel, index) => {
                const source = concepts.find(c => c.id === rel.source);
                const target = concepts.find(c => c.id === rel.target);

                // Skip if source or target not found
                if (!source || !target) return null;

                // Calculate mid-point for label
                const midX = (source.x + target.x) / 2;
                const midY = (source.y + target.y) / 2;

                return (
                  <g key={`rel-${index}`}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="#999"
                      strokeWidth={getLinkWidth(rel)}
                      stroke={d3.interpolateRgb("#E0E0E0", getSentimentColor(rel.sentiment))(Math.abs(rel.sentiment))}
                      opacity="0.7"
                    />
                    <text
                      x={midX}
                      y={midY - 5}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#666"
                    >
                      {rel.label}
                    </text>
                  </g>
                );
              })}

              {/* Draw nodes */}
              {concepts.map(concept => (
                <g
                  key={concept.id}
                  transform={`translate(${concept.x}, ${concept.y})`}
                  onClick={() => setSelectedConcept(concept.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    r={getNodeSize(concept)}
                    fill={selectedConcept === concept.id ? "#ff9900" : getConceptColor(concept.category)}
                    stroke="#fff"
                    strokeWidth="2"
                    opacity={selectedConcept === concept.id ? "1" : "0.8"}
                  />
                  <text
                    dy=".35em"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#333"
                    fontWeight={selectedConcept === concept.id ? "bold" : "normal"}
                  >
                    {concept.label}
                  </text>

                  <title>
                    {`${concept.label}\nType: ${concept.type}\nSentiment: ${concept.sentiment.toFixed(2)}\nMentions: ${concept.frequency}`}
                  </title>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Concept Information Panel */}
        <div className="w-full md:w-1/2 p-4">
          {selectedConceptData && (
            <div className="mb-6 p-4 rounded-lg border" style={{ borderColor: getConceptColor(selectedConceptData.category) }}>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: getConceptColor(selectedConceptData.category) }}>
                    {selectedConceptData.label}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    Category: {selectedConceptData.category} |
                    Mentions: {selectedConceptData.frequency} |
                    Paragraphs: {selectedConceptData.paragraphs.map(p => p + 1).join(", ")} |
                    Sentiment: {selectedConceptData.sentiment.toFixed(2)}
                  </p>
                  <p className="text-sm italic">{selectedConceptData.description}</p>
                </div>
              </div>

              {/* Textual evidence */}
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-3">Textual Evidence</h3>
                <div className="space-y-4">
                  {relevantParagraphs.map(({ paragraph, evidence }) => (
                    <div key={paragraph} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">Paragraph {paragraph + 1}</h4>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                          {evidence.length} mention{evidence.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <HighlightedParagraph paragraph={paragraph} evidenceItems={evidence} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
        {/* Legend */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["policy", "economic", "scientific", "practical", "social"].map(category => (
                <div key={category} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: getConceptColor(category) }}
                  ></div>
                  <span className="text-sm capitalize">{category}</span>
                </div>
              ))}
            </div>
          </div>

      {/* Methodology */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <h3 className="font-medium mb-2">Analysis Methodology</h3>
        <p className="mb-2">
          This visualization combines a concept network with textual evidence analysis to show how specific mentions
          in the article contribute to the construction of key concepts.
        </p>
        <p>
          The network view shows relationships between concepts, while the evidence view highlights the exact
          text within paragraphs that form each concept. For example, the "Economic Impact" concept is constructed
          from mentions like "economic implications," "devastate our industrial sectors," and "economic disruption."
        </p>
      </div>
    </div>
  );
};

export default ConceptMapVisualization;