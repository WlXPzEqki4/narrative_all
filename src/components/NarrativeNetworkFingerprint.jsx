// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const NarrativeNetworkFingerprint = () => {
//   const svgRef = useRef(null);
//   const [networkType, setNetworkType] = useState('actor-action');
//   const [viewMode, setViewMode] = useState('2d');
//   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
//   // Sample data for the narrative fingerprint
//   const narrativeData = {
//     nodes: [
//       // Actors (subjects)
//       { id: "gov", label: "Government", type: "actor", group: 1, sentiment: 0.6, agency: 6.0, mentions: 5 },
//       { id: "opp", label: "Opposition", type: "actor", group: 1, sentiment: -0.4, agency: 3.0, mentions: 3 },
//       { id: "sci", label: "Scientists", type: "actor", group: 1, sentiment: 0.5, agency: 3.0, mentions: 3 },
//       { id: "prot", label: "Protesters", type: "actor", group: 1, sentiment: 0.2, agency: 1.0, mentions: 2 },
//       { id: "ind", label: "Industry", type: "actor", group: 1, sentiment: -0.3, agency: 2.0, mentions: 2 },
//       { id: "med", label: "Media", type: "actor", group: 1, sentiment: 0.0, agency: 1.0, mentions: 1 },

//       // Actions (verbs)
//       { id: "announce", label: "announce", type: "action", group: 2, sentiment: 0.4, mentions: 2 },
//       { id: "oppose", label: "oppose", type: "action", group: 2, sentiment: -0.6, mentions: 2 },
//       { id: "support", label: "support", type: "action", group: 2, sentiment: 0.7, mentions: 1 },
//       { id: "criticize", label: "criticize", type: "action", group: 2, sentiment: -0.5, mentions: 2 },
//       { id: "demonstrate", label: "demonstrate", type: "action", group: 2, sentiment: 0.0, mentions: 1 },
//       { id: "warn", label: "warn", type: "action", group: 2, sentiment: -0.3, mentions: 2 },
//       { id: "defend", label: "defend", type: "action", group: 2, sentiment: 0.3, mentions: 1 },
      
//       // Targets (objects)
//       { id: "cpolicy", label: "Climate Policy", type: "target", group: 3, sentiment: 0.4, agency: 0.29, mentions: 7 },
//       { id: "econ", label: "Economic Impact", type: "target", group: 3, sentiment: -0.5, agency: 0.0, mentions: 3 },
//       { id: "impl", label: "Implementation", type: "target", group: 3, sentiment: -0.1, agency: 0.5, mentions: 3 },
//       { id: "budget", label: "Budget Cuts", type: "target", group: 3, sentiment: -0.4, agency: 0.0, mentions: 1 },
//       { id: "jobs", label: "Jobs", type: "target", group: 3, sentiment: -0.6, agency: 0.0, mentions: 1 },
//       { id: "public", label: "Public Opinion", type: "target", group: 3, sentiment: 0.0, agency: 0.0, mentions: 2 }
//     ],
    
//     links: [
//       // Actor-Action links
//       { source: "gov", target: "announce", value: 2, weight: 1.0, sentiment: 0.5 },
//       { source: "gov", target: "defend", value: 1, weight: 0.8, sentiment: 0.4 },
//       { source: "opp", target: "oppose", value: 1, weight: 0.9, sentiment: -0.6 },
//       { source: "opp", target: "criticize", value: 1, weight: 0.8, sentiment: -0.5 },
//       { source: "opp", target: "warn", value: 1, weight: 0.7, sentiment: -0.6 },
//       { source: "sci", target: "support", value: 1, weight: 0.9, sentiment: 0.6 },
//       { source: "sci", target: "warn", value: 1, weight: 0.7, sentiment: -0.2 },
//       { source: "prot", target: "demonstrate", value: 1, weight: 0.8, sentiment: 0.1 },
//       { source: "ind", target: "criticize", value: 1, weight: 0.8, sentiment: -0.4 },
//       { source: "med", target: "announce", value: 1, weight: 0.6, sentiment: 0.0 },
      
//       // Action-Target links
//       { source: "announce", target: "cpolicy", value: 2, weight: 1.0, sentiment: 0.5 },
//       { source: "oppose", target: "cpolicy", value: 1, weight: 0.9, sentiment: -0.6 },
//       { source: "support", target: "cpolicy", value: 1, weight: 0.9, sentiment: 0.6 },
//       { source: "criticize", target: "cpolicy", value: 1, weight: 0.8, sentiment: -0.5 },
//       { source: "criticize", target: "impl", value: 1, weight: 0.7, sentiment: -0.4 },
//       { source: "demonstrate", target: "budget", value: 1, weight: 0.8, sentiment: -0.3 },
//       { source: "warn", target: "econ", value: 1, weight: 0.8, sentiment: -0.6 },
//       { source: "warn", target: "jobs", value: 1, weight: 0.7, sentiment: -0.6 },
//       { source: "warn", target: "impl", value: 1, weight: 0.7, sentiment: -0.2 },
//       { source: "defend", target: "cpolicy", value: 1, weight: 0.8, sentiment: 0.4 },
//       { source: "announce", target: "public", value: 1, weight: 0.6, sentiment: 0.0 }
//     ],
    
//     // Direct links between actors and targets (for simplified view)
//     directLinks: [
//       { source: "gov", target: "cpolicy", value: 3, weight: 0.9, sentiment: 0.7 },
//       { source: "opp", target: "cpolicy", value: 2, weight: 0.8, sentiment: -0.6 },
//       { source: "opp", target: "econ", value: 2, weight: 0.7, sentiment: -0.5 },
//       { source: "sci", target: "cpolicy", value: 2, weight: 0.8, sentiment: 0.5 },
//       { source: "sci", target: "impl", value: 1, weight: 0.6, sentiment: -0.2 },
//       { source: "ind", target: "impl", value: 2, weight: 0.7, sentiment: -0.4 },
//       { source: "prot", target: "budget", value: 1, weight: 0.6, sentiment: -0.3 },
//       { source: "med", target: "public", value: 1, weight: 0.5, sentiment: 0.0 }
//     ],
    
//     // Narrative dimensions (for 3D positioning)
//     dimensions: [
//       { id: "env_econ", name: "Environmental-Economic", polarity: 0.6 },
//       { id: "auth_acc", name: "Authority-Accountability", polarity: 0.3 },
//       { id: "sci_pol", name: "Scientific-Political", polarity: 0.4 }
//     ]
//   };
  
//   // Calculate color based on sentiment value
//   const getSentimentColor = (sentiment) => {
//     if (sentiment > 0) {
//       return d3.interpolateRgb("#FFFFFF", "#1B5E20")(sentiment);
//     } else if (sentiment < 0) {
//       return d3.interpolateRgb("#FFFFFF", "#B71C1C")(Math.abs(sentiment));
//     }
//     return "#AAAAAA";
//   };

//   // Get node type color
//   const getNodeTypeColor = (type) => {
//     switch(type) {
//       case "actor": return "#2196F3";
//       case "action": return "#FF5722";
//       case "target": return "#4CAF50";
//       default: return "#9E9E9E";
//     }
//   };
  
//   // Calculate node size based on mentions and agency
//   const getNodeSize = (node) => {
//     const baseSizeByType = {
//       "actor": 15,
//       "action": 10,
//       "target": 12
//     };
    
//     const baseSize = baseSizeByType[node.type] || 10;
//     const mentionFactor = node.mentions ? Math.sqrt(node.mentions) * 2 : 1;
//     const agencyFactor = node.agency ? Math.log(node.agency + 1) * 1.5 : 1;
    
//     return baseSize * (node.type === "actor" ? agencyFactor : mentionFactor);
//   };
  
//   // Calculate link width based on weight
//   const getLinkWidth = (link) => {
//     return link.weight * 5;
//   };

//   // Render network graph using D3
//   useEffect(() => {
//     if (!svgRef.current) return;
    
//     // Clear any existing SVG content
//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();
    
//     // Filter nodes and links based on selected network type
//     let filteredNodes = [...narrativeData.nodes];
//     let filteredLinks = [];
    
//     if (networkType === 'actor-action') {
//       filteredLinks = narrativeData.links;
//     } else if (networkType === 'direct') {
//       filteredNodes = narrativeData.nodes.filter(node => node.type !== "action");
//       filteredLinks = narrativeData.directLinks;
//     }
    
//     // Create force simulation
//     const simulation = d3.forceSimulation(filteredNodes)
//       .force("link", d3.forceLink(filteredLinks).id(d => d.id).distance(100))
//       .force("charge", d3.forceManyBody().strength(-300))
//       .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
//       .force("collide", d3.forceCollide().radius(d => getNodeSize(d) + 10));
      
//     // Add links
//     const link = svg.append("g")
//       .selectAll("line")
//       .data(filteredLinks)
//       .enter()
//       .append("line")
//       .attr("stroke-width", d => getLinkWidth(d))
//       .attr("stroke", d => d3.interpolateRgb("#E0E0E0", getSentimentColor(d.sentiment))(Math.abs(d.sentiment)))
//       .attr("opacity", 0.7);
      
//     // Add nodes
//     const node = svg.append("g")
//       .selectAll("g")
//       .data(filteredNodes)
//       .enter()
//       .append("g")
//       .call(d3.drag()
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended));
        
//     // Add circles for nodes
//     node.append("circle")
//       .attr("r", d => getNodeSize(d))
//       .attr("fill", d => viewMode === '2d' ? getNodeTypeColor(d.type) : getSentimentColor(d.sentiment))
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 1.5);
      
//     // Add labels to nodes
//     node.append("text")
//       .attr("dx", d => getNodeSize(d) + 5)
//       .attr("dy", ".35em")
//       .attr("font-size", "12px")
//       .attr("font-family", "Arial")
//       .text(d => d.label);
      
//     // Add title for mouseover info
//     node.append("title")
//       .text(d => `${d.label}\nType: ${d.type}\nSentiment: ${d.sentiment.toFixed(2)}\nMentions: ${d.mentions}`);
      
//     // Update positions on simulation tick
//     simulation.on("tick", () => {
//       link
//         .attr("x1", d => d.source.x)
//         .attr("y1", d => d.source.y)
//         .attr("x2", d => d.target.x)
//         .attr("y2", d => d.target.y);
        
//       node.attr("transform", d => `translate(${d.x}, ${d.y})`);
//     });
    
//     // Drag functions
//     function dragstarted(event) {
//       if (!event.active) simulation.alphaTarget(0.3).restart();
//       event.subject.fx = event.subject.x;
//       event.subject.fy = event.subject.y;
//     }
    
//     function dragged(event) {
//       event.subject.fx = event.x;
//       event.subject.fy = event.y;
//     }
    
//     function dragended(event) {
//       if (!event.active) simulation.alphaTarget(0);
//       event.subject.fx = null;
//       event.subject.fy = null;
//     }
    
//     // Add legend
//     const legend = svg.append("g")
//       .attr("transform", "translate(20, 20)");
      
//     const legendItems = [
//       { label: "Actor (Subject)", color: getNodeTypeColor("actor"), type: "circle" },
//       { label: "Action (Verb)", color: getNodeTypeColor("action"), type: "circle" },
//       { label: "Target (Object)", color: getNodeTypeColor("target"), type: "circle" },
//       { label: "Positive Sentiment", color: getSentimentColor(0.7), type: "line" },
//       { label: "Negative Sentiment", color: getSentimentColor(-0.7), type: "line" }
//     ];
    
//     legendItems.forEach((item, i) => {
//       const legendItem = legend.append("g")
//         .attr("transform", `translate(0, ${i * 25})`);
        
//       if (item.type === "circle") {
//         legendItem.append("circle")
//           .attr("r", 7)
//           .attr("fill", item.color);
//       } else {
//         legendItem.append("line")
//           .attr("x1", 0)
//           .attr("y1", 0)
//           .attr("x2", 20)
//           .attr("y2", 0)
//           .attr("stroke", item.color)
//           .attr("stroke-width", 3);
//       }
      
//       legendItem.append("text")
//         .attr("x", item.type === "circle" ? 15 : 25)
//         .attr("y", 4)
//         .text(item.label)
//         .attr("font-size", "12px")
//         .attr("font-family", "Arial");
//     });
    
//     // Add title
//     svg.append("text")
//       .attr("x", dimensions.width / 2)
//       .attr("y", 30)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "18px")
//       .attr("font-weight", "bold")
//       .attr("font-family", "Arial")
//       .text("Narrative Network Fingerprint");
      
//   }, [networkType, viewMode, dimensions]);
  
//   // Update dimensions on resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (svgRef.current && svgRef.current.parentElement) {
//         setDimensions({
//           width: svgRef.current.parentElement.clientWidth,
//           height: svgRef.current.parentElement.clientWidth * 0.75 // 4:3 aspect ratio
//         });
//       }
//     };
    
//     window.addEventListener('resize', handleResize);
//     handleResize();
    
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-4 text-center">Narrative Network Fingerprint</h1>
      
//       {/* Controls for network visualization */}
//       <div className="mb-4 flex justify-center space-x-4">
//         <div className="inline-block">
//           <label htmlFor="network-type" className="block text-sm font-medium text-gray-700 mb-1">Network Type</label>
//           <select 
//             id="network-type" 
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
//             value={networkType}
//             onChange={(e) => setNetworkType(e.target.value)}
//           >
//             <option value="actor-action">Full SVO Network</option>
//             <option value="direct">Direct Actor-Target</option>
//           </select>
//         </div>
        
//         <div className="inline-block">
//           <label htmlFor="view-mode" className="block text-sm font-medium text-gray-700 mb-1">View Mode</label>
//           <select 
//             id="view-mode" 
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
//             value={viewMode}
//             onChange={(e) => setViewMode(e.target.value)}
//           >
//             <option value="2d">2D (Type Colors)</option>
//             <option value="3d">2D with Sentiment</option>
//           </select>
//         </div>
//       </div>
      
//       {/* Network visualization */}
//       <div className="mb-6 border border-gray-200 rounded-lg bg-gray-50">
//         <svg 
//           ref={svgRef} 
//           width={dimensions.width} 
//           height={dimensions.height}
//           className="w-full h-auto"
//         />
//       </div>
      
//       {/* Narrative metrics */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Narrative Fingerprint Metrics</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {narrativeData.dimensions.map((dim, i) => (
//             <div 
//               key={i}
//               className="p-3 rounded-lg border flex flex-col items-center"
//               style={{ 
//                 backgroundColor: dim.polarity > 0 ? `rgba(76, 175, 80, ${Math.abs(dim.polarity) * 0.2 + 0.1})` : `rgba(244, 67, 54, ${Math.abs(dim.polarity) * 0.2 + 0.1})`,
//                 borderColor: dim.polarity > 0 ? `rgba(76, 175, 80, ${Math.abs(dim.polarity) * 0.5 + 0.2})` : `rgba(244, 67, 54, ${Math.abs(dim.polarity) * 0.5 + 0.2})`
//               }}
//             >
//               <div className="text-lg font-bold">{dim.polarity.toFixed(1)}</div>
//               <div className="text-sm text-center">{dim.name} Axis</div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* 3D Conceptual Space Visualization */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">3D Narrative Positioning</h2>
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2 text-center">
//           <p className="italic text-gray-500 mb-4">
//             This visualization would display a 3D interactive model showing the narrative's position
//             in conceptual space, with axes for Environmental-Economic, Authority-Accountability, and
//             Scientific-Political dimensions.
//           </p>
//           <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded">
//             <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform transition-transform hover:scale-110">
//               Core
//             </div>
//           </div>
//         </div>
//         <div className="text-sm text-gray-600">
//           The 3D visualization would allow exploration of how the narrative positions itself in
//           ideological space, with satellite narratives surrounding the core position. The current position
//           shows a narrative that leans toward environmental action (0.6), slightly favors authority (0.3), 
//           and prioritizes scientific framing (0.4).
//         </div>
//       </div>
      
//       {/* Methodology */}
//       <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
//         <h3 className="font-medium mb-2">Network Fingerprint Methodology</h3>
//         <ol className="list-decimal ml-5 space-y-1">
//           <li>Extract Subject-Verb-Object (SVO) triplets to form network nodes and edges</li>
//           <li>Calculate sentiment polarity for each entity and connection</li>
//           <li>Measure agency distribution through active vs. passive constructions</li>
//           <li>Position narrative in multi-dimensional conceptual space on key axes</li>
//           <li>Visualize relationships through network graph with sizing by importance</li>
//           <li>Color-code by entity type and sentiment polarity</li>
//           <li>Generate composite metrics characterizing the narrative's signature</li>
//         </ol>
//         <p className="mt-3">
//           The resulting network fingerprint provides a visual and quantifiable signature that captures
//           the distinctive patterns of a narrative's structure, agency distribution, sentiment framing,
//           and conceptual positioning.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default NarrativeNetworkFingerprint;














import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NarrativeNetworkFingerprint = () => {
  // Single declaration of svgRef
  const svgRef = useRef(null);
  const [networkType, setNetworkType] = useState('actor-action');
  const [viewMode, setViewMode] = useState('2d');
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Sample data for the narrative fingerprint
  const narrativeData = {
    nodes: [
      // Actors (subjects)
      { id: "gov", label: "Government", type: "actor", group: 1, sentiment: 0.6, agency: 6.0, mentions: 5 },
      { id: "opp", label: "Opposition", type: "actor", group: 1, sentiment: -0.4, agency: 3.0, mentions: 3 },
      { id: "sci", label: "Scientists", type: "actor", group: 1, sentiment: 0.5, agency: 3.0, mentions: 3 },
      { id: "prot", label: "Protesters", type: "actor", group: 1, sentiment: 0.2, agency: 1.0, mentions: 2 },
      { id: "ind", label: "Industry", type: "actor", group: 1, sentiment: -0.3, agency: 2.0, mentions: 2 },
      { id: "med", label: "Media", type: "actor", group: 1, sentiment: 0.0, agency: 1.0, mentions: 1 },

      // Actions (verbs)
      { id: "announce", label: "announce", type: "action", group: 2, sentiment: 0.4, mentions: 2 },
      { id: "oppose", label: "oppose", type: "action", group: 2, sentiment: -0.6, mentions: 2 },
      { id: "support", label: "support", type: "action", group: 2, sentiment: 0.7, mentions: 1 },
      { id: "criticize", label: "criticise", type: "action", group: 2, sentiment: -0.5, mentions: 2 },
      { id: "demonstrate", label: "demonstrate", type: "action", group: 2, sentiment: 0.0, mentions: 1 },
      { id: "warn", label: "warn", type: "action", group: 2, sentiment: -0.3, mentions: 2 },
      { id: "defend", label: "defend", type: "action", group: 2, sentiment: 0.3, mentions: 1 },

      // Targets (objects)
      { id: "cpolicy", label: "Climate Policy", type: "target", group: 3, sentiment: 0.4, agency: 0.29, mentions: 7 },
      { id: "econ", label: "Economic Impact", type: "target", group: 3, sentiment: -0.5, agency: 0.0, mentions: 3 },
      { id: "impl", label: "Implementation", type: "target", group: 3, sentiment: -0.1, agency: 0.5, mentions: 3 },
      { id: "budget", label: "Budget Cuts", type: "target", group: 3, sentiment: -0.4, agency: 0.0, mentions: 1 },
      { id: "jobs", label: "Jobs", type: "target", group: 3, sentiment: -0.6, agency: 0.0, mentions: 1 },
      { id: "public", label: "Public Opinion", type: "target", group: 3, sentiment: 0.0, agency: 0.0, mentions: 2 }
    ],
    
    links: [
      // Actor-Action links
      { source: "gov", target: "announce", value: 2, weight: 1.0, sentiment: 0.5 },
      { source: "gov", target: "defend", value: 1, weight: 0.8, sentiment: 0.4 },
      { source: "opp", target: "oppose", value: 1, weight: 0.9, sentiment: -0.6 },
      { source: "opp", target: "criticize", value: 1, weight: 0.8, sentiment: -0.5 },
      { source: "opp", target: "warn", value: 1, weight: 0.7, sentiment: -0.6 },
      { source: "sci", target: "support", value: 1, weight: 0.9, sentiment: 0.6 },
      { source: "sci", target: "warn", value: 1, weight: 0.7, sentiment: -0.2 },
      { source: "prot", target: "demonstrate", value: 1, weight: 0.8, sentiment: 0.1 },
      { source: "ind", target: "criticize", value: 1, weight: 0.8, sentiment: -0.4 },
      { source: "med", target: "announce", value: 1, weight: 0.6, sentiment: 0.0 },
      
      // Action-Target links
      { source: "announce", target: "cpolicy", value: 2, weight: 1.0, sentiment: 0.5 },
      { source: "oppose", target: "cpolicy", value: 1, weight: 0.9, sentiment: -0.6 },
      { source: "support", target: "cpolicy", value: 1, weight: 0.9, sentiment: 0.6 },
      { source: "criticize", target: "cpolicy", value: 1, weight: 0.8, sentiment: -0.5 },
      { source: "criticize", target: "impl", value: 1, weight: 0.7, sentiment: -0.4 },
      { source: "demonstrate", target: "budget", value: 1, weight: 0.8, sentiment: -0.3 },
      { source: "warn", target: "econ", value: 1, weight: 0.8, sentiment: -0.6 },
      { source: "warn", target: "jobs", value: 1, weight: 0.7, sentiment: -0.6 },
      { source: "warn", target: "impl", value: 1, weight: 0.7, sentiment: -0.2 },
      { source: "defend", target: "cpolicy", value: 1, weight: 0.8, sentiment: 0.4 },
      { source: "announce", target: "public", value: 1, weight: 0.6, sentiment: 0.0 }
    ],
    
    directLinks: [
      { source: "gov", target: "cpolicy", value: 3, weight: 0.9, sentiment: 0.7 },
      { source: "opp", target: "cpolicy", value: 2, weight: 0.8, sentiment: -0.6 },
      { source: "opp", target: "econ", value: 2, weight: 0.7, sentiment: -0.5 },
      { source: "sci", target: "cpolicy", value: 2, weight: 0.8, sentiment: 0.5 },
      { source: "sci", target: "impl", value: 1, weight: 0.6, sentiment: -0.2 },
      { source: "ind", target: "impl", value: 2, weight: 0.7, sentiment: -0.4 },
      { source: "prot", target: "budget", value: 1, weight: 0.6, sentiment: -0.3 },
      { source: "med", target: "public", value: 1, weight: 0.5, sentiment: 0.0 }
    ],
    
    dimensions: [
      { id: "env_econ", name: "Environmental-Economic", polarity: 0.6 },
      { id: "auth_acc", name: "Authority-Accountability", polarity: 0.3 },
      { id: "sci_pol", name: "Scientific-Political", polarity: 0.4 }
    ]
  };
  
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
    switch(type) {
      case "actor": return "#2196F3";
      case "action": return "#FF5722";
      case "target": return "#4CAF50";
      default: return "#9E9E9E";
    }
  };

  // Calculate node size based on mentions and agency
  const getNodeSize = (node) => {
    const baseSizeByType = {
      actor: 15,
      action: 10,
      target: 12
    };
    const baseSize = baseSizeByType[node.type] || 10;
    const mentionFactor = node.mentions ? Math.sqrt(node.mentions) * 2 : 1;
    const agencyFactor = node.agency ? Math.log(node.agency + 1) * 1.5 : 1;
    return baseSize * (node.type === "actor" ? agencyFactor : mentionFactor);
  };

  // Calculate link width based on weight
  const getLinkWidth = (link) => link.weight * 5;

  // Render network graph using D3
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    let filteredNodes = [...narrativeData.nodes];
    let filteredLinks = [];
    
    if (networkType === 'actor-action') {
      filteredLinks = narrativeData.links;
    } else if (networkType === 'direct') {
      filteredNodes = narrativeData.nodes.filter(node => node.type !== "action");
      filteredLinks = narrativeData.directLinks;
    }
    
    const simulation = d3.forceSimulation(filteredNodes)
      .force("link", d3.forceLink(filteredLinks).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force("collide", d3.forceCollide().radius(d => getNodeSize(d) + 10));
      
    // Add links
    const link = svg.append("g")
      .selectAll("line")
      .data(filteredLinks)
      .enter()
      .append("line")
      .attr("stroke-width", d => getLinkWidth(d))
      .attr("stroke", d => d3.interpolateRgb("#E0E0E0", getSentimentColor(d.sentiment))(Math.abs(d.sentiment)))
      .attr("opacity", 0.7);
      
    // Add nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(filteredNodes)
      .enter()
      .append("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
        
    // Add circles for nodes
    node.append("circle")
      .attr("r", d => getNodeSize(d))
      .attr("fill", d => viewMode === '2d' ? getNodeTypeColor(d.type) : getSentimentColor(d.sentiment))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);
      
    // Add labels for nodes with black text
    node.append("text")
      .attr("dx", d => getNodeSize(d) + 5)
      .attr("dy", ".35em")
      .attr("font-size", "12px")
      .attr("font-family", "Arial")
      .attr("fill", "black")
      .text(d => d.label);
      
    node.append("title")
      .text(d => `${d.label}\nType: ${d.type}\nSentiment: ${d.sentiment.toFixed(2)}\nMentions: ${d.mentions}`);
      
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
        
      node.attr("transform", d => `translate(${d.x}, ${d.y})`);
    });
    
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    // Add legend
    const legend = svg.append("g")
      .attr("transform", "translate(20, 20)");
      
    const legendItems = [
      { label: "Actor (Subject)", color: getNodeTypeColor("actor"), type: "circle" },
      { label: "Action (Verb)", color: getNodeTypeColor("action"), type: "circle" },
      { label: "Target (Object)", color: getNodeTypeColor("target"), type: "circle" },
      { label: "Positive Sentiment", color: getSentimentColor(0.7), type: "line" },
      { label: "Negative Sentiment", color: getSentimentColor(-0.7), type: "line" }
    ];
    
    legendItems.forEach((item, i) => {
      const legendItem = legend.append("g")
        .attr("transform", `translate(0, ${i * 25})`);
        
      if (item.type === "circle") {
        legendItem.append("circle")
          .attr("r", 7)
          .attr("fill", item.color);
      } else {
        legendItem.append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 20)
          .attr("y2", 0)
          .attr("stroke", item.color)
          .attr("stroke-width", 3);
      }
      
      legendItem.append("text")
        .attr("x", item.type === "circle" ? 15 : 25)
        .attr("y", 4)
        .text(item.label)
        .attr("font-size", "12px")
        .attr("font-family", "Arial");
    });
    
    svg.append("text")
      .attr("x", dimensions.width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("font-weight", "bold")
      .attr("font-family", "Arial")
      .text("Narrative Network Fingerprint");
      
  }, [networkType, viewMode, dimensions]);
  
  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current && svgRef.current.parentElement) {
        setDimensions({
          width: svgRef.current.parentElement.clientWidth,
          height: svgRef.current.parentElement.clientWidth * 0.75 // 4:3 aspect ratio
        });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Main Title */}
      <h2 className="text-3xl font-bold text-center mb-6">Narrative Network Fingerprint</h2>
      
      {/* Controls */}
      <div className="mb-4 flex justify-center space-x-4">
        <div className="inline-block">
          <label htmlFor="network-type" className="block text-sm font-medium text-gray-700 mb-1">Network Type</label>
          <select
            id="network-type"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            value={networkType}
            onChange={(e) => setNetworkType(e.target.value)}
          >
            <option value="actor-action">Full SVO Network</option>
            <option value="direct">Direct Actor-Target</option>
          </select>
        </div>
        <div className="inline-block">
          <label htmlFor="view-mode" className="block text-sm font-medium text-gray-700 mb-1">View Mode</label>
          <select
            id="view-mode"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option value="2d">2D (Type Colours)</option>
            <option value="3d">2D with Sentiment</option>
          </select>
        </div>
      </div>
      
      {/* Network Visualisation */}
      <div className="mb-6 border border-gray-200 rounded-lg bg-gray-50">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-auto"
        />
      </div>
      
      {/* Narrative Fingerprint Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Narrative Fingerprint Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {narrativeData.dimensions.map((dim, i) => (
            <div
              key={i}
              className="p-3 rounded-lg border flex flex-col items-center"
              style={{
                backgroundColor: dim.polarity > 0
                  ? `rgba(76, 175, 80, ${Math.abs(dim.polarity) * 0.2 + 0.1})`
                  : `rgba(244, 67, 54, ${Math.abs(dim.polarity) * 0.2 + 0.1})`,
                borderColor: dim.polarity > 0
                  ? `rgba(76, 175, 80, ${Math.abs(dim.polarity) * 0.5 + 0.2})`
                  : `rgba(244, 67, 54, ${Math.abs(dim.polarity) * 0.5 + 0.2})`
              }}
            >
              <div className="text-lg font-bold">{dim.polarity.toFixed(1)}</div>
              <div className="text-sm text-center">{dim.name} Axis</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 3D Conceptual Space Visualisation */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3D Narrative Positioning</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2 text-center">
          <p className="italic text-gray-500 mb-4">
            This visualisation would display a 3D interactive model showing the narrative's position
            in conceptual space, with axes for Environmental-Economic, Authority-Accountability, and Scientific-Political dimensions.
          </p>
          <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded">
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-black font-bold shadow-lg transform transition-transform hover:scale-110">
              Core
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          The 3D visualisation allows exploration of how the narrative positions itself in ideological space.
          The current position indicates a leaning towards environmental action (0.6), slightly favours authority (0.3),
          and prioritises scientific framing (0.4).
        </div>
      </div>
      
      {/* Fingerprint Methodology */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 mb-8">
        <h3 className="font-medium mb-2">Network Fingerprint Methodology</h3>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Extract Subject-Verb-Object (SVO) triplets to form network nodes and edges</li>
          <li>Calculate sentiment polarity for each entity and connection</li>
          <li>Measure agency distribution through active vs. passive constructions</li>
          <li>Position narrative in multi-dimensional conceptual space on key axes</li>
          <li>Visualise relationships through network graph with sizing by importance</li>
          <li>Colour-code by entity type and sentiment polarity</li>
          <li>Generate composite metrics characterising the narrative's signature</li>
        </ol>
        <p className="mt-3">
          The resulting fingerprint provides a quantifiable signature that captures the distinctive patterns of the narrative’s structure, agency distribution, sentiment framing, and conceptual positioning.
        </p>
      </div>
      
      {/* User Guide */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
        <h3 className="text-xl font-semibold mb-2">User Guide</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>The <strong>SVO Network</strong> displays key action statements extracted from the article.</li>
          <li>The <strong>Narrative Axis Fingerprint</strong> plots the story's position on core conceptual dimensions.</li>
          <li>The <strong>Action Direction Matrix</strong> shows who acts upon whom, with numbers indicating action frequency and colours reflecting sentiment.</li>
          <li>The <strong>Agency Distribution</strong> visualises the active-to-passive ratio of entities.</li>
          <li>The <strong>Topic Flow</strong> visualisation shows how topics shift across paragraphs.</li>
          <li>The <strong>3D Narrative Positioning</strong> visualisation allows exploration of the narrative's ideological space.</li>
          <li>The <strong>Network Fingerprint Methodology</strong> summarises the steps used to derive the narrative fingerprint.</li>
          <li>Together, these elements provide a quantifiable narrative fingerprint that characterises the article’s distinctive signature.</li>
        </ul>
      </div>
    </div>
  );
};

export default NarrativeNetworkFingerprint;
























