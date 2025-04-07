// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const Narrative3DFingerprint = () => {
//   const svgRef = useRef(null);
//   const [viewAngle, setViewAngle] = useState(45);
//   const [tiltAngle, setTiltAngle] = useState(30);
//   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
//   const [showLabels, setShowLabels] = useState(true);
//   const [highlightedAxis, setHighlightedAxis] = useState(null);

//   // Sample data for the 3D narrative fingerprint
//   const narrativeData = {
//     // Core narrative position in 3D space [x, y, z] where each dimension is -1 to 1
//     corePosition: [0.6, 0.3, 0.4], // [Environmental-Economic, Authority-Accountability, Scientific-Political]
    
//     // Axis definitions
//     axes: [
//       { 
//         id: "env_econ", 
//         name: "Environmental-Economic",
//         positive: "Environmental Action",
//         negative: "Economic Concern",
//         value: 0.6, // Positive means toward environmental action
//         color: "#4CAF50"
//       },
//       { 
//         id: "auth_acc", 
//         name: "Authority-Accountability",
//         positive: "Government Authority",
//         negative: "Public Accountability",
//         value: 0.3, // Positive means toward government authority
//         color: "#2196F3"
//       },
//       { 
//         id: "sci_pol", 
//         name: "Scientific-Political",
//         positive: "Scientific Consensus",
//         negative: "Political Expediency",
//         value: 0.4, // Positive means toward scientific consensus
//         color: "#9C27B0"
//       }
//     ],
    
//     // Key narrative elements as satellite nodes
//     narrativeElements: [
//       {
//         id: "gov_action",
//         label: "Government Action",
//         position: [0.7, 0.5, 0.3],
//         sentiment: 0.6,
//         prominence: 0.9,
//         closure: 1.0
//       },
//       {
//         id: "opp_criticism",
//         label: "Opposition Criticism",
//         position: [0.0, 0.2, 0.0],
//         sentiment: -0.4,
//         prominence: 0.6,
//         closure: 0.67
//       },
//       {
//         id: "sci_support",
//         label: "Scientific Support",
//         position: [0.5, 0.1, 0.8],
//         sentiment: 0.5,
//         prominence: 0.7,
//         closure: 0.67
//       },
//       {
//         id: "econ_concern",
//         label: "Economic Concerns",
//         position: [-0.7, 0.2, 0.1],
//         sentiment: -0.5,
//         prominence: 0.5,
//         closure: 0.67
//       },
//       {
//         id: "climate_urgency",
//         label: "Climate Urgency",
//         position: [0.8, 0.0, 0.5],
//         sentiment: 0.7,
//         prominence: 0.8,
//         closure: 0.67
//       },
//       {
//         id: "public_protest",
//         label: "Public Protest",
//         position: [0.3, -0.6, 0.2],
//         sentiment: 0.2,
//         prominence: 0.4,
//         closure: 0.33
//       },
//       {
//         id: "impl_challenges",
//         label: "Implementation Challenges",
//         position: [0.4, 0.4, 0.1],
//         sentiment: -0.2,
//         prominence: 0.5,
//         closure: 0.33
//       }
//     ],
    
//     // Comparative narratives (from other sources on same topic)
//     comparativeNarratives: [
//       {
//         id: "business_press",
//         label: "Business Press",
//         position: [-0.3, 0.4, 0.1],
//         color: "#FF9800"
//       },
//       {
//         id: "environmental_org",
//         label: "Environmental Org",
//         position: [0.8, -0.5, 0.6],
//         color: "#009688"
//       },
//       {
//         id: "scientific_journal",
//         label: "Scientific Journal",
//         position: [0.3, 0.2, 0.8],
//         color: "#3F51B5"
//       }
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
  
//   // Calculate node size based on prominence
//   const getNodeSize = (prominence) => {
//     return 5 + (prominence * 15);
//   };
  
//   // Project 3D coordinates to 2D based on current view angle
//   const project3Dto2D = (x, y, z, width, height) => {
//     // Convert angles to radians
//     const angleRad = (viewAngle * Math.PI) / 180;
//     const tiltRad = (tiltAngle * Math.PI) / 180;
    
//     // Project 3D to 2D with perspective
//     const scale = 0.7; // Scale factor for 3D effect
//     const projectionScale = 300; // Scale for overall size
    
//     // Rotate around Y-axis first (view angle)
//     const rotX = x * Math.cos(angleRad) + z * Math.sin(angleRad);
//     const rotZ = -x * Math.sin(angleRad) + z * Math.cos(angleRad);
    
//     // Then rotate around X-axis (tilt)
//     const rotY = y * Math.cos(tiltRad) - rotZ * Math.sin(tiltRad);
//     const finalZ = y * Math.sin(tiltRad) + rotZ * Math.cos(tiltRad);
    
//     // Apply perspective (objects further away appear smaller)
//     const perspective = 1 + (finalZ * 0.3);
    
//     // Convert to screen coordinates
//     const screenX = (width / 2) + (rotX * projectionScale) / perspective;
//     const screenY = (height / 2) + (rotY * projectionScale) / perspective;
    
//     // Return 2D coordinates and z-depth for draw order
//     return { x: screenX, y: screenY, z: finalZ };
//   };
  
//   // Map value from -1...1 space to screen coordinates
//   const mapCoordinate = (value, dimension) => {
//     const center = dimension / 2;
//     const scale = dimension * 0.4; // Leave some margin
//     return center + (value * scale);
//   };
  
//   // Render 3D visualization using D3
//   useEffect(() => {
//     if (!svgRef.current) return;
    
//     // Clear any existing SVG content
//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();
    
//     const width = dimensions.width;
//     const height = dimensions.height;
    
//     // Create a group for the 3D visualization
//     const g = svg.append("g");
    
//     // Draw coordinate axes first (so they're behind everything else)
//     const axesGroup = g.append("g").attr("class", "axes");
    
//     narrativeData.axes.forEach((axis, i) => {
//       // Calculate 3D start and end points for axes
//       const axisVectors = [
//         [0, 0, 0], // Origin
//         [0, 0, 0]  // Will be set based on axis index
//       ];
      
//       // Set the appropriate dimension to 1 or -1 based on axis
//       if (i === 0) { // X-axis (Environmental-Economic)
//         axisVectors[1][0] = 1;  // Positive end
        
//         // Draw negative x-axis
//         const negVector = [-1, 0, 0];
//         const negProjected = project3Dto2D(negVector[0], negVector[1], negVector[2], width, height);
        
//         const originProjected = project3Dto2D(0, 0, 0, width, height);
        
//         axesGroup.append("line")
//           .attr("x1", originProjected.x)
//           .attr("y1", originProjected.y)
//           .attr("x2", negProjected.x)
//           .attr("y2", negProjected.y)
//           .attr("stroke", axis.color)
//           .attr("stroke-width", 1)
//           .attr("stroke-dasharray", "5,3")
//           .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);
          
//         // Negative axis label
//         if (showLabels) {
//           axesGroup.append("text")
//             .attr("x", negProjected.x)
//             .attr("y", negProjected.y + 15)
//             .attr("text-anchor", "middle")
//             .attr("font-size", "10px")
//             .attr("fill", axis.color)
//             .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//             .text(axis.negative);
//         }
//       }
//       else if (i === 1) { // Y-axis (Authority-Accountability)
//         axisVectors[1][1] = 1;  // Positive end
        
//         // Draw negative y-axis
//         const negVector = [0, -1, 0];
//         const negProjected = project3Dto2D(negVector[0], negVector[1], negVector[2], width, height);
        
//         const originProjected = project3Dto2D(0, 0, 0, width, height);
        
//         axesGroup.append("line")
//           .attr("x1", originProjected.x)
//           .attr("y1", originProjected.y)
//           .attr("x2", negProjected.x)
//           .attr("y2", negProjected.y)
//           .attr("stroke", axis.color)
//           .attr("stroke-width", 1)
//           .attr("stroke-dasharray", "5,3")
//           .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);
          
//         // Negative axis label
//         if (showLabels) {
//           axesGroup.append("text")
//             .attr("x", negProjected.x)
//             .attr("y", negProjected.y)
//             .attr("text-anchor", "middle")
//             .attr("font-size", "10px")
//             .attr("fill", axis.color)
//             .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//             .text(axis.negative);
//         }
//       }
//       else if (i === 2) { // Z-axis (Scientific-Political)
//         axisVectors[1][2] = 1;  // Positive end
        
//         // Draw negative z-axis
//         const negVector = [0, 0, -1];
//         const negProjected = project3Dto2D(negVector[0], negVector[1], negVector[2], width, height);
        
//         const originProjected = project3Dto2D(0, 0, 0, width, height);
        
//         axesGroup.append("line")
//           .attr("x1", originProjected.x)
//           .attr("y1", originProjected.y)
//           .attr("x2", negProjected.x)
//           .attr("y2", negProjected.y)
//           .attr("stroke", axis.color)
//           .attr("stroke-width", 1)
//           .attr("stroke-dasharray", "5,3")
//           .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);
          
//         // Negative axis label
//         if (showLabels) {
//           axesGroup.append("text")
//             .attr("x", negProjected.x)
//             .attr("y", negProjected.y)
//             .attr("text-anchor", "middle")
//             .attr("font-size", "10px")
//             .attr("fill", axis.color)
//             .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//             .text(axis.negative);
//         }
//       }
      
//       // Project 3D points to 2D
//       const startProjected = project3Dto2D(axisVectors[0][0], axisVectors[0][1], axisVectors[0][2], width, height);
//       const endProjected = project3Dto2D(axisVectors[1][0], axisVectors[1][1], axisVectors[1][2], width, height);
      
//       // Draw axis line
//       axesGroup.append("line")
//         .attr("x1", startProjected.x)
//         .attr("y1", startProjected.y)
//         .attr("x2", endProjected.x)
//         .attr("y2", endProjected.y)
//         .attr("stroke", axis.color)
//         .attr("stroke-width", 1.5)
//         .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);
        
//       // Axis label
//       if (showLabels) {
//         axesGroup.append("text")
//           .attr("x", endProjected.x)
//           .attr("y", endProjected.y - 10)
//           .attr("text-anchor", "middle")
//           .attr("font-size", "10px")
//           .attr("fill", axis.color)
//           .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//           .text(axis.positive);
//       }
//     });
    
//     // Draw origin point
//     const originProjected = project3Dto2D(0, 0, 0, width, height);
//     g.append("circle")
//       .attr("cx", originProjected.x)
//       .attr("cy", originProjected.y)
//       .attr("r", 3)
//       .attr("fill", "#666");
    
//     // Project and sort narrative elements by z-depth (for proper drawing order)
//     const projectedElements = narrativeData.narrativeElements.map(elem => {
//       const projected = project3Dto2D(elem.position[0], elem.position[1], elem.position[2], width, height);
//       return {
//         ...elem,
//         ...projected
//       };
//     }).sort((a, b) => a.z - b.z); // Sort by z to draw back-to-front
    
//     // Draw connections from core to narrative elements
//     const coreProjected = project3Dto2D(
//       narrativeData.corePosition[0], 
//       narrativeData.corePosition[1], 
//       narrativeData.corePosition[2], 
//       width, 
//       height
//     );
    
//     // Draw narrative elements
//     const elementsGroup = g.append("g").attr("class", "narrative-elements");
    
//     projectedElements.forEach(elem => {
//       // Line connecting to core
//       elementsGroup.append("line")
//         .attr("x1", coreProjected.x)
//         .attr("y1", coreProjected.y)
//         .attr("x2", elem.x)
//         .attr("y2", elem.y)
//         .attr("stroke", getSentimentColor(elem.sentiment))
//         .attr("stroke-width", 1)
//         .attr("stroke-opacity", 0.5);
      
//       // Node
//       elementsGroup.append("circle")
//         .attr("cx", elem.x)
//         .attr("cy", elem.y)
//         .attr("r", getNodeSize(elem.prominence))
//         .attr("fill", getSentimentColor(elem.sentiment))
//         .attr("stroke", "#fff")
//         .attr("stroke-width", 1);
      
//       // Closure indicator (ring around node if fully closed)
//       if (elem.closure > 0.8) {
//         elementsGroup.append("circle")
//           .attr("cx", elem.x)
//           .attr("cy", elem.y)
//           .attr("r", getNodeSize(elem.prominence) + 3)
//           .attr("fill", "none")
//           .attr("stroke", "#333")
//           .attr("stroke-width", 1);
//       }
      
//       // Label
//       if (showLabels) {
//         elementsGroup.append("text")
//           .attr("x", elem.x)
//           .attr("y", elem.y + getNodeSize(elem.prominence) + 10)
//           .attr("text-anchor", "middle")
//           .attr("font-size", "10px")
//           .attr("fill", "#333")
//           .text(elem.label);
//       }
//     });
    
//     // Draw core narrative position
//     const coreGroup = g.append("g").attr("class", "core-narrative");
    
//     coreGroup.append("circle")
//       .attr("cx", coreProjected.x)
//       .attr("cy", coreProjected.y)
//       .attr("r", 20)
//       .attr("fill", "#1565C0")
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 2);
      
//     coreGroup.append("text")
//       .attr("x", coreProjected.x)
//       .attr("y", coreProjected.y + 5)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "12px")
//       .attr("fill", "#fff")
//       .attr("font-weight", "bold")
//       .text("Core");
      
//     // Draw comparative narratives (from other sources)
//     const comparativeGroup = g.append("g").attr("class", "comparative-narratives");
    
//     narrativeData.comparativeNarratives.forEach(comp => {
//       const projected = project3Dto2D(comp.position[0], comp.position[1], comp.position[2], width, height);
      
//       // Draw diamond shape for comparative narrative
//       const diamondSize = 10;
//       const diamondPath = `
//         M ${projected.x} ${projected.y - diamondSize}
//         L ${projected.x + diamondSize} ${projected.y}
//         L ${projected.x} ${projected.y + diamondSize}
//         L ${projected.x - diamondSize} ${projected.y}
//         Z
//       `;
      
//       comparativeGroup.append("path")
//         .attr("d", diamondPath)
//         .attr("fill", comp.color)
//         .attr("stroke", "#fff")
//         .attr("stroke-width", 1);
        
//       if (showLabels) {
//         comparativeGroup.append("text")
//           .attr("x", projected.x)
//           .attr("y", projected.y + diamondSize + 12)
//           .attr("text-anchor", "middle")
//           .attr("font-size", "10px")
//           .attr("fill", "#333")
//           .text(comp.label);
//       }
//     });
    
//     // Position axis indicators
//     svg.append("g")
//       .attr("transform", `translate(${width - 120}, 20)`)
//       .append("text")
//       .attr("font-size", "12px")
//       .attr("font-weight", "bold")
//       .text("Narrative Positioning");
      
//     narrativeData.axes.forEach((axis, i) => {
//       const axisGroup = svg.append("g")
//         .attr("transform", `translate(${width - 110}, ${50 + i * 25})`)
//         .on("mouseover", () => setHighlightedAxis(axis.id))
//         .on("mouseout", () => setHighlightedAxis(null))
//         .style("cursor", "pointer");
        
//       axisGroup.append("rect")
//         .attr("x", -5)
//         .attr("y", -15)
//         .attr("width", 110)
//         .attr("height", 20)
//         .attr("fill", "transparent");
        
//       axisGroup.append("circle")
//         .attr("r", 5)
//         .attr("fill", axis.color);
        
//       axisGroup.append("text")
//         .attr("x", 10)
//         .attr("y", 4)
//         .attr("font-size", "11px")
//         .text(`${axis.name}: ${axis.value > 0 ? '+' : ''}${axis.value.toFixed(1)}`);
//     });
    
//     // Add title
//     svg.append("text")
//       .attr("x", width / 2)
//       .attr("y", 25)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "18px")
//       .attr("font-weight", "bold")
//       .text("3D Narrative Fingerprint");
      
//   }, [viewAngle, tiltAngle, dimensions, showLabels, highlightedAxis]);
  
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
//       <h1 className="text-2xl font-bold mb-4 text-center">3D Narrative Fingerprint</h1>
      
//       {/* Controls for 3D visualization */}
//       <div className="mb-4 flex flex-wrap justify-center gap-4">
//         <div className="inline-block">
//           <label htmlFor="view-angle" className="block text-sm font-medium text-gray-700 mb-1">Rotation (°)</label>
//           <input 
//             id="view-angle" 
//             type="range" 
//             min="0" 
//             max="360" 
//             value={viewAngle} 
//             onChange={(e) => setViewAngle(parseInt(e.target.value))}
//             className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//           />
//           <span className="ml-2 text-sm">{viewAngle}°</span>
//         </div>
        
//         <div className="inline-block">
//           <label htmlFor="tilt-angle" className="block text-sm font-medium text-gray-700 mb-1">Tilt (°)</label>
//           <input 
//             id="tilt-angle" 
//             type="range" 
//             min="0" 
//             max="90" 
//             value={tiltAngle} 
//             onChange={(e) => setTiltAngle(parseInt(e.target.value))}
//             className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//           />
//           <span className="ml-2 text-sm">{tiltAngle}°</span>
//         </div>
        
//         <div className="inline-block flex items-end">
//           <label className="inline-flex items-center">
//             <input 
//               type="checkbox" 
//               checked={showLabels} 
//               onChange={(e) => setShowLabels(e.target.checked)}
//               className="form-checkbox h-4 w-4 text-blue-600"
//             />
//             <span className="ml-2 text-sm text-gray-700">Show Labels</span>
//           </label>
//         </div>
//       </div>
      
//       {/* 3D visualization */}
//       <div className="mb-6 border border-gray-200 rounded-lg bg-gray-50">
//         <svg 
//           ref={svgRef} 
//           width={dimensions.width} 
//           height={dimensions.height}
//           className="w-full h-auto"
//         />
//       </div>
      
//       {/* Legend */}
//       <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="p-3 bg-gray-50 rounded-lg">
//           <h3 className="text-sm font-medium mb-2">Node Types</h3>
//           <div className="flex items-center mb-1">
//             <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
//             <span className="text-sm">Core Narrative Position</span>
//           </div>
//           <div className="flex items-center mb-1">
//             <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
//             <span className="text-sm">Positive Narrative Element</span>
//           </div>
//           <div className="flex items-center mb-1">
//             <div className="w-4 h-4 rounded-full bg-red-600 mr-2"></div>
//             <span className="text-sm">Negative Narrative Element</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 transform rotate-45 bg-orange-500 mr-2"></div>
//             <span className="text-sm">Comparative Narrative</span>
//           </div>
//         </div>
        
//         <div className="p-3 bg-gray-50 rounded-lg">
//           <h3 className="text-sm font-medium mb-2">Node Properties</h3>
//           <div className="flex items-center mb-1">
//             <span className="text-sm">Size = Prominence in text</span>
//           </div>
//           <div className="flex items-center mb-1">
//             <span className="text-sm">Color Intensity = Sentiment strength</span>
//           </div>
//           <div className="flex items-center">
//             <span className="text-sm">Ring = Narrative closure</span>
//           </div>
//         </div>
        
//         <div className="p-3 bg-gray-50 rounded-lg">
//           <h3 className="text-sm font-medium mb-2">Axis Dimensions</h3>
//           <div className="flex items-center mb-1">
//             <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div>
//             <span className="text-sm">Environmental ↔ Economic</span>
//           </div>
//           <div className="flex items-center mb-1">
//             <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
//             <span className="text-sm">Authority ↔ Accountability</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
//             <span className="text-sm">Scientific ↔ Political</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Explanation */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">How to Read This Visualization</h2>
//         <p className="text-sm text-gray-600">
//           This 3D visualization positions the narrative in conceptual space along three key axes:
//           Environmental-Economic, Authority-Accountability, and Scientific-Political. The core narrative
//           position (blue sphere) shows the central perspective of the article, while satellite nodes
//           represent specific narrative elements sized by prominence and colored by sentiment.
//           Comparative positions from other narratives on the same topic are shown as diamonds.
//           You can rotate and tilt the view to explore different perspectives of the narrative's position.
//         </p>
//       </div>
      
//       {/* Key Metrics */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Key Narrative Positioning Metrics</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           {narrativeData.axes.map((axis, i) => (
//             <div 
//               key={i}
//               className="p-3 rounded-lg border flex flex-col items-center"
//               style={{ 
//                 backgroundColor: `${axis.color}15`,
//                 borderColor: axis.color
//               }}
//             >
//               <div className="text-lg font-bold">{axis.value > 0 ? '+' : ''}{axis.value.toFixed(1)}</div>
//               <div className="text-sm text-center">{axis.name}</div>
//               <div className="text-xs text-center mt-1">
//                 {axis.value > 0 ? `Leans toward ${axis.positive}` : `Leans toward ${axis.negative}`}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Methodology */}
//       <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
//         <h3 className="font-medium mb-2">3D Fingerprint Methodology</h3>
//         <ol className="list-decimal ml-5 space-y-1">
//           <li>Position the narrative in 3D conceptual space along three key axes of tension</li>
//           <li>Place individual narrative elements as satellite nodes around the core position</li>
//           <li>Represent sentiment through color (green = positive, red = negative)</li>
//           <li>Size nodes according to their prominence in the text</li>
//           <li>Indicate narrative closure with rings around fully resolved elements</li>
//           <li>Compare with other narratives on the same topic (diamonds)</li>
//           <li>Allow interactive rotation to explore the narrative from different angles</li>
//         </ol>
//         <p className="mt-3">
//           This 3D fingerprint creates a spatial representation of the narrative's ideological positioning
//           and internal structure, making it possible to visually compare different narratives and
//           identify patterns across sources, topics, or time periods.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Narrative3DFingerprint;



























// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const Narrative3DFingerprint = () => {
//   const svgRef = useRef(null);
  
//   // Controls for the 3D projection angles
//   const [viewAngle, setViewAngle] = useState(45);
//   const [tiltAngle, setTiltAngle] = useState(30);
  
//   // SVG dimensions (automatically updated on window resize)
//   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
//   // Whether to show labels on nodes
//   const [showLabels, setShowLabels] = useState(true);
  
//   // Which axis is highlighted (if any)
//   const [highlightedAxis, setHighlightedAxis] = useState(null);

//   // Sample data for the 3D narrative fingerprint
//   const narrativeData = {
//     // Core narrative position in 3D space [x, y, z]
//     corePosition: [0.6, 0.3, 0.4],
    
//     // Axis definitions
//     axes: [
//       { 
//         id: "env_econ", 
//         name: "Environmental-Economic",
//         positive: "Environmental Action",
//         negative: "Economic Concern",
//         value: 0.6,
//         color: "#4CAF50"
//       },
//       { 
//         id: "auth_acc", 
//         name: "Authority-Accountability",
//         positive: "Government Authority",
//         negative: "Public Accountability",
//         value: 0.3,
//         color: "#2196F3"
//       },
//       { 
//         id: "sci_pol", 
//         name: "Scientific-Political",
//         positive: "Scientific Consensus",
//         negative: "Political Expediency",
//         value: 0.4,
//         color: "#9C27B0"
//       }
//     ],
    
//     // Key narrative elements as satellite nodes
//     narrativeElements: [
//       {
//         id: "gov_action",
//         label: "Government Action",
//         position: [0.7, 0.5, 0.3],
//         sentiment: 0.6,
//         prominence: 0.9,
//         closure: 1.0
//       },
//       {
//         id: "opp_criticism",
//         label: "Opposition Criticism",
//         position: [0.0, 0.2, 0.0],
//         sentiment: -0.4,
//         prominence: 0.6,
//         closure: 0.67
//       },
//       {
//         id: "sci_support",
//         label: "Scientific Support",
//         position: [0.5, 0.1, 0.8],
//         sentiment: 0.5,
//         prominence: 0.7,
//         closure: 0.67
//       },
//       {
//         id: "econ_concern",
//         label: "Economic Concerns",
//         position: [-0.7, 0.2, 0.1],
//         sentiment: -0.5,
//         prominence: 0.5,
//         closure: 0.67
//       },
//       {
//         id: "climate_urgency",
//         label: "Climate Urgency",
//         position: [0.8, 0.0, 0.5],
//         sentiment: 0.7,
//         prominence: 0.8,
//         closure: 0.67
//       },
//       {
//         id: "public_protest",
//         label: "Public Protest",
//         position: [0.3, -0.6, 0.2],
//         sentiment: 0.2,
//         prominence: 0.4,
//         closure: 0.33
//       },
//       {
//         id: "impl_challenges",
//         label: "Implementation Challenges",
//         position: [0.4, 0.4, 0.1],
//         sentiment: -0.2,
//         prominence: 0.5,
//         closure: 0.33
//       }
//     ],
    
//     // Comparative narratives
//     comparativeNarratives: [
//       {
//         id: "business_press",
//         label: "Business Press",
//         position: [-0.3, 0.4, 0.1],
//         color: "#FF9800"
//       },
//       {
//         id: "environmental_org",
//         label: "Environmental Org",
//         position: [0.8, -0.5, 0.6],
//         color: "#009688"
//       },
//       {
//         id: "scientific_journal",
//         label: "Scientific Journal",
//         position: [0.3, 0.2, 0.8],
//         color: "#3F51B5"
//       }
//     ]
//   };

//   // Colour based on sentiment
//   const getSentimentColor = (sentiment) => {
//     if (sentiment > 0) {
//       return d3.interpolateRgb("#FFFFFF", "#1B5E20")(sentiment);
//     } else if (sentiment < 0) {
//       return d3.interpolateRgb("#FFFFFF", "#B71C1C")(Math.abs(sentiment));
//     }
//     return "#AAAAAA";
//   };
  
//   // Node size based on prominence
//   const getNodeSize = (prominence) => {
//     return 5 + (prominence * 15);
//   };
  
//   // Project 3D coordinates to 2D based on current view angle & tilt
//   const project3Dto2D = (x, y, z, width, height) => {
//     const angleRad = (viewAngle * Math.PI) / 180;
//     const tiltRad = (tiltAngle * Math.PI) / 180;
    
//     const projectionScale = 300; // Scale for overall size

//     // Rotate around Y-axis by angleRad
//     const rotX = x * Math.cos(angleRad) + z * Math.sin(angleRad);
//     const rotZ = -x * Math.sin(angleRad) + z * Math.cos(angleRad);

//     // Rotate around X-axis by tiltRad
//     const rotY = y * Math.cos(tiltRad) - rotZ * Math.sin(tiltRad);
//     const finalZ = y * Math.sin(tiltRad) + rotZ * Math.cos(tiltRad);

//     // Apply perspective (objects further away appear smaller)
//     const perspective = 1 + (finalZ * 0.3);

//     // Convert to screen coordinates
//     const screenX = (width / 2) + (rotX * projectionScale) / perspective;
//     const screenY = (height / 2) + (rotY * projectionScale) / perspective;
    
//     // Return 2D coords plus z-depth for sorting
//     return { x: screenX, y: screenY, z: finalZ };
//   };

//   // D3 rendering
//   useEffect(() => {
//     if (!svgRef.current) return;
    
//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();
    
//     const width = dimensions.width;
//     const height = dimensions.height;

//     // Add a main group to allow pan/zoom
//     const mainGroup = svg.append("g").attr("class", "main-group");

//     // Set up D3 zoom for pan/zoom with mouse
//     const zoom = d3.zoom()
//       .scaleExtent([0.5, 5])   // Min and max zoom scale
//       .on("zoom", (event) => {
//         mainGroup.attr("transform", event.transform);
//       });
//     svg.call(zoom);

//     // Draw axes in a sub-group
//     const axesGroup = mainGroup.append("g").attr("class", "axes-group");
    
//     // Draw each axis
//     narrativeData.axes.forEach((axis, i) => {
//       // We'll draw from -1 to +1 on each axis dimension
//       // but in two separate lines: origin→+1 and origin→-1
//       const axisVectors = [
//         [0, 0, 0],  // origin
//         [0, 0, 0],  // positive end
//         [0, 0, 0]   // negative end
//       ];
      
//       if (i === 0) { // X-axis
//         axisVectors[1][0] = 1;
//         axisVectors[2][0] = -1;
//       } else if (i === 1) { // Y-axis
//         axisVectors[1][1] = 1;
//         axisVectors[2][1] = -1;
//       } else { // Z-axis
//         axisVectors[1][2] = 1;
//         axisVectors[2][2] = -1;
//       }

//       const origin2D = project3Dto2D(0,0,0,width,height);
//       const pos2D = project3Dto2D(axisVectors[1][0], axisVectors[1][1], axisVectors[1][2], width, height);
//       const neg2D = project3Dto2D(axisVectors[2][0], axisVectors[2][1], axisVectors[2][2], width, height);

//       // Draw negative axis
//       axesGroup.append("line")
//         .attr("x1", origin2D.x)
//         .attr("y1", origin2D.y)
//         .attr("x2", neg2D.x)
//         .attr("y2", neg2D.y)
//         .attr("stroke", axis.color)
//         .attr("stroke-width", 1)
//         .attr("stroke-dasharray", "5,3")
//         .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);
      
//       // Negative label
//       if (showLabels) {
//         axesGroup.append("text")
//           .attr("x", neg2D.x)
//           .attr("y", neg2D.y + 15)
//           .attr("font-size", "10px")
//           .attr("fill", axis.color)
//           .attr("text-anchor", "middle")
//           .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//           .text(axis.negative);
//       }

//       // Draw positive axis
//       axesGroup.append("line")
//         .attr("x1", origin2D.x)
//         .attr("y1", origin2D.y)
//         .attr("x2", pos2D.x)
//         .attr("y2", pos2D.y)
//         .attr("stroke", axis.color)
//         .attr("stroke-width", 1.5)
//         .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);

//       // Positive label
//       if (showLabels) {
//         axesGroup.append("text")
//           .attr("x", pos2D.x)
//           .attr("y", pos2D.y - 10)
//           .attr("font-size", "10px")
//           .attr("fill", axis.color)
//           .attr("text-anchor", "middle")
//           .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//           .text(axis.positive);
//       }
//     });

//     // Draw origin
//     const origin2D = project3Dto2D(0,0,0,width,height);
//     mainGroup.append("circle")
//       .attr("cx", origin2D.x)
//       .attr("cy", origin2D.y)
//       .attr("r", 3)
//       .attr("fill", "#666");

//     // Project & sort narrative elements
//     const projectedElements = narrativeData.narrativeElements.map(elem => {
//       const projected = project3Dto2D(elem.position[0], elem.position[1], elem.position[2], width, height);
//       return { ...elem, ...projected };
//     }).sort((a, b) => a.z - b.z);

//     // Project core position
//     const coreProjected = project3Dto2D(
//       narrativeData.corePosition[0], 
//       narrativeData.corePosition[1], 
//       narrativeData.corePosition[2], 
//       width, 
//       height
//     );

//     // Draw narrative elements
//     const elementsGroup = mainGroup.append("g").attr("class", "narrative-elements");
//     projectedElements.forEach(elem => {
//       // Line from core to element
//       elementsGroup.append("line")
//         .attr("x1", coreProjected.x)
//         .attr("y1", coreProjected.y)
//         .attr("x2", elem.x)
//         .attr("y2", elem.y)
//         .attr("stroke", getSentimentColor(elem.sentiment))
//         .attr("stroke-width", 1)
//         .attr("stroke-opacity", 0.5);

//       // Node circle
//       elementsGroup.append("circle")
//         .attr("cx", elem.x)
//         .attr("cy", elem.y)
//         .attr("r", getNodeSize(elem.prominence))
//         .attr("fill", getSentimentColor(elem.sentiment))
//         .attr("stroke", "#fff")
//         .attr("stroke-width", 1);

//       // If closure > 0.8, ring around node
//       if (elem.closure > 0.8) {
//         elementsGroup.append("circle")
//           .attr("cx", elem.x)
//           .attr("cy", elem.y)
//           .attr("r", getNodeSize(elem.prominence) + 3)
//           .attr("fill", "none")
//           .attr("stroke", "#333")
//           .attr("stroke-width", 1);
//       }

//       // Label if enabled
//       if (showLabels) {
//         elementsGroup.append("text")
//           .attr("x", elem.x)
//           .attr("y", elem.y + getNodeSize(elem.prominence) + 10)
//           .attr("font-size", "10px")
//           .attr("fill", "#333")
//           .attr("text-anchor", "middle")
//           .text(elem.label);
//       }
//     });

//     // Core narrative node
//     const coreGroup = mainGroup.append("g").attr("class", "core-narrative");
//     coreGroup.append("circle")
//       .attr("cx", coreProjected.x)
//       .attr("cy", coreProjected.y)
//       .attr("r", 20)
//       .attr("fill", "#1565C0")
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 2);

//     coreGroup.append("text")
//       .attr("x", coreProjected.x)
//       .attr("y", coreProjected.y + 5)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "12px")
//       .attr("fill", "#fff")
//       .attr("font-weight", "bold")
//       .text("Core");

//     // Draw comparative narratives
//     const compGroup = mainGroup.append("g").attr("class", "comparative-narratives");
//     narrativeData.comparativeNarratives.forEach(comp => {
//       const projected = project3Dto2D(comp.position[0], comp.position[1], comp.position[2], width, height);
      
//       // Diamond path
//       const diamondSize = 10;
//       const diamondPath = `
//         M ${projected.x} ${projected.y - diamondSize}
//         L ${projected.x + diamondSize} ${projected.y}
//         L ${projected.x} ${projected.y + diamondSize}
//         L ${projected.x - diamondSize} ${projected.y}
//         Z
//       `;
//       compGroup.append("path")
//         .attr("d", diamondPath)
//         .attr("fill", comp.color)
//         .attr("stroke", "#fff")
//         .attr("stroke-width", 1);

//       if (showLabels) {
//         compGroup.append("text")
//           .attr("x", projected.x)
//           .attr("y", projected.y + diamondSize + 12)
//           .attr("font-size", "10px")
//           .attr("fill", "#333")
//           .attr("text-anchor", "middle")
//           .text(comp.label);
//       }
//     });

//     // Axis label / legend for axes
//     svg.append("text")
//       .attr("x", width - 120)
//       .attr("y", 20)
//       .attr("font-size", "12px")
//       .attr("font-weight", "bold")
//       .text("Narrative Positioning");

//     narrativeData.axes.forEach((axis, i) => {
//       const axisGroup = svg.append("g")
//         .attr("transform", `translate(${width - 110}, ${50 + i * 25})`)
//         .on("mouseover", () => setHighlightedAxis(axis.id))
//         .on("mouseout", () => setHighlightedAxis(null))
//         .style("cursor", "pointer");

//       axisGroup.append("rect")
//         .attr("x", -5)
//         .attr("y", -15)
//         .attr("width", 110)
//         .attr("height", 20)
//         .attr("fill", "transparent");
      
//       axisGroup.append("circle")
//         .attr("r", 5)
//         .attr("fill", axis.color);
      
//       axisGroup.append("text")
//         .attr("x", 10)
//         .attr("y", 4)
//         .attr("font-size", "11px")
//         .text(`${axis.name}: ${axis.value > 0 ? '+' : ''}${axis.value.toFixed(1)}`);
//     });

//     // Title
//     svg.append("text")
//       .attr("x", width / 2)
//       .attr("y", 25)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "18px")
//       .attr("font-weight", "bold")
//       .text("3D Narrative Fingerprint");

//   }, [viewAngle, tiltAngle, dimensions, showLabels, highlightedAxis]);

//   // Update dimensions on resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (svgRef.current && svgRef.current.parentElement) {
//         setDimensions({
//           width: svgRef.current.parentElement.clientWidth,
//           height: svgRef.current.parentElement.clientWidth * 0.75
//         });
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto py-8">
//       {/* Main Title */}
//       <h2 className="text-3xl font-bold text-center mb-6">3D Narrative Fingerprint</h2>

//       {/* Main Content Box */}
//       <div className="bg-white shadow-lg rounded-lg p-4">
        
//         {/* Controls for 3D Visualization */}
//         <div className="mb-4 flex flex-wrap justify-center gap-4">
//           <div className="inline-block">
//             <label htmlFor="view-angle" className="block text-sm font-medium text-gray-700 mb-1">
//               Rotation (°)
//             </label>
//             <input
//               id="view-angle"
//               type="range"
//               min="0"
//               max="360"
//               value={viewAngle}
//               onChange={(e) => setViewAngle(parseInt(e.target.value))}
//               className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//             <span className="ml-2 text-sm">{viewAngle}°</span>
//           </div>
          
//           <div className="inline-block">
//             <label htmlFor="tilt-angle" className="block text-sm font-medium text-gray-700 mb-1">
//               Tilt (°)
//             </label>
//             <input
//               id="tilt-angle"
//               type="range"
//               min="0"
//               max="90"
//               value={tiltAngle}
//               onChange={(e) => setTiltAngle(parseInt(e.target.value))}
//               className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//             <span className="ml-2 text-sm">{tiltAngle}°</span>
//           </div>
          
//           <div className="inline-block flex items-end">
//             <label className="inline-flex items-center">
//               <input
//                 type="checkbox"
//                 checked={showLabels}
//                 onChange={(e) => setShowLabels(e.target.checked)}
//                 className="form-checkbox h-4 w-4 text-blue-600"
//               />
//               <span className="ml-2 text-sm text-gray-700">Show Labels</span>
//             </label>
//           </div>
//         </div>

//         {/* 3D Visualization with Pan/Zoom */}
//         <div className="mb-6 border border-gray-200 rounded-lg bg-gray-50">
//           <svg
//             ref={svgRef}
//             width={dimensions.width}
//             height={dimensions.height}
//             className="w-full h-auto"
//           />
//         </div>

//         {/* Legend */}
//         <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="p-3 bg-gray-50 rounded-lg">
//             <h3 className="text-sm font-medium mb-2">Node Types</h3>
//             <div className="flex items-center mb-1">
//               <div className="w-4 h-4 rounded-full bg-blue-600 mr-2" />
//               <span className="text-sm">Core Narrative Position</span>
//             </div>
//             <div className="flex items-center mb-1">
//               <div className="w-4 h-4 rounded-full bg-green-600 mr-2" />
//               <span className="text-sm">Positive Narrative Element</span>
//             </div>
//             <div className="flex items-center mb-1">
//               <div className="w-4 h-4 rounded-full bg-red-600 mr-2" />
//               <span className="text-sm">Negative Narrative Element</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-4 h-4 transform rotate-45 bg-orange-500 mr-2" />
//               <span className="text-sm">Comparative Narrative</span>
//             </div>
//           </div>
          
//           <div className="p-3 bg-gray-50 rounded-lg">
//             <h3 className="text-sm font-medium mb-2">Node Properties</h3>
//             <div className="flex items-center mb-1">
//               <span className="text-sm">Size = Prominence in text</span>
//             </div>
//             <div className="flex items-center mb-1">
//               <span className="text-sm">Colour intensity = Sentiment strength</span>
//             </div>
//             <div className="flex items-center">
//               <span className="text-sm">Ring = Narrative closure</span>
//             </div>
//           </div>
          
//           <div className="p-3 bg-gray-50 rounded-lg">
//             <h3 className="text-sm font-medium mb-2">Axis Dimensions</h3>
//             <div className="flex items-center mb-1">
//               <div className="w-2 h-2 rounded-full bg-green-600 mr-2" />
//               <span className="text-sm">Environmental ↔ Economic</span>
//             </div>
//             <div className="flex items-center mb-1">
//               <div className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
//               <span className="text-sm">Authority ↔ Accountability</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-2 h-2 rounded-full bg-purple-600 mr-2" />
//               <span className="text-sm">Scientific ↔ Political</span>
//             </div>
//           </div>
//         </div>

//         {/* Explanation */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">How to Read This Visualization</h2>
//           <p className="text-sm text-gray-600">
//             This 3D visualization positions the narrative in conceptual space along three key axes:
//             Environmental-Economic, Authority-Accountability, and Scientific-Political. The core narrative
//             position (blue sphere) shows the article’s central perspective, while satellite nodes
//             represent specific narrative elements sized by prominence and coloured by sentiment.
//             Comparative positions from other sources appear as diamond shapes.  
//             <strong> You can rotate and tilt the view with the sliders, and also pan/zoom using your mouse.</strong>
//           </p>
//         </div>

//         {/* Key Metrics */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Key Narrative Positioning Metrics</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {narrativeData.axes.map((axis, i) => (
//               <div 
//                 key={i}
//                 className="p-3 rounded-lg border flex flex-col items-center"
//                 style={{ 
//                   backgroundColor: `${axis.color}15`,
//                   borderColor: axis.color
//                 }}
//               >
//                 <div className="text-lg font-bold">
//                   {axis.value > 0 ? '+' : ''}{axis.value.toFixed(1)}
//                 </div>
//                 <div className="text-sm text-center">{axis.name}</div>
//                 <div className="text-xs text-center mt-1">
//                   {axis.value > 0 
//                     ? `Leans toward ${axis.positive}`
//                     : `Leans toward ${axis.negative}`
//                   }
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Methodology / Explanation Box */}
//       <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
//         <h3 className="font-medium mb-2">3D Fingerprint Methodology</h3>
//         <ol className="list-decimal ml-5 space-y-1">
//           <li>Position the narrative in 3D conceptual space along three key axes of tension.</li>
//           <li>Place individual narrative elements as satellite nodes around the core position.</li>
//           <li>Represent sentiment through colour (green = positive, red = negative).</li>
//           <li>Size nodes according to their prominence in the text.</li>
//           <li>Indicate narrative closure with rings around fully resolved elements.</li>
//           <li>Compare with other narratives on the same topic (diamond shapes).</li>
//           <li>Allow interactive rotation via sliders, plus pan/zoom with the mouse.</li>
//         </ol>
//         <p className="mt-3">
//           This 3D fingerprint creates a spatial representation of the narrative’s ideological
//           positioning and internal structure, making it possible to visually compare different
//           narratives and identify patterns across sources, topics, or time periods.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Narrative3DFingerprint;







// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const Narrative3DFingerprint = () => {
//   const svgRef = useRef(null);

//   // Angles controlling the 3D rotation
//   const [viewAngle, setViewAngle] = useState(45); // Y-axis rotation
//   const [tiltAngle, setTiltAngle] = useState(30); // X-axis tilt

//   // Zoom (scale) factor for the 3D projection
//   const [zoomScale, setZoomScale] = useState(1);

//   // Whether to show labels on the nodes
//   const [showLabels, setShowLabels] = useState(true);

//   // Which axis is highlighted (if any)
//   const [highlightedAxis, setHighlightedAxis] = useState(null);

//   // Track whether we are dragging to rotate
//   const isDraggingRef = useRef(false);
//   const startMouseRef = useRef({ x: 0, y: 0 });
//   const startAnglesRef = useRef({ view: 45, tilt: 30 });

//   // Dimensions for the SVG
//   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

//   // Sample data for the 3D narrative fingerprint
//   const narrativeData = {
//     corePosition: [0.6, 0.3, 0.4],
//     axes: [
//       { 
//         id: "env_econ", 
//         name: "Environmental-Economic",
//         positive: "Environmental Action",
//         negative: "Economic Concern",
//         value: 0.6,
//         color: "#4CAF50"
//       },
//       { 
//         id: "auth_acc", 
//         name: "Authority-Accountability",
//         positive: "Government Authority",
//         negative: "Public Accountability",
//         value: 0.3,
//         color: "#2196F3"
//       },
//       { 
//         id: "sci_pol", 
//         name: "Scientific-Political",
//         positive: "Scientific Consensus",
//         negative: "Political Expediency",
//         value: 0.4,
//         color: "#9C27B0"
//       }
//     ],
//     narrativeElements: [
//       {
//         id: "gov_action",
//         label: "Government Action",
//         position: [0.7, 0.5, 0.3],
//         sentiment: 0.6,
//         prominence: 0.9,
//         closure: 1.0
//       },
//       {
//         id: "opp_criticism",
//         label: "Opposition Criticism",
//         position: [0.0, 0.2, 0.0],
//         sentiment: -0.4,
//         prominence: 0.6,
//         closure: 0.67
//       },
//       {
//         id: "sci_support",
//         label: "Scientific Support",
//         position: [0.5, 0.1, 0.8],
//         sentiment: 0.5,
//         prominence: 0.7,
//         closure: 0.67
//       },
//       {
//         id: "econ_concern",
//         label: "Economic Concerns",
//         position: [-0.7, 0.2, 0.1],
//         sentiment: -0.5,
//         prominence: 0.5,
//         closure: 0.67
//       },
//       {
//         id: "climate_urgency",
//         label: "Climate Urgency",
//         position: [0.8, 0.0, 0.5],
//         sentiment: 0.7,
//         prominence: 0.8,
//         closure: 0.67
//       },
//       {
//         id: "public_protest",
//         label: "Public Protest",
//         position: [0.3, -0.6, 0.2],
//         sentiment: 0.2,
//         prominence: 0.4,
//         closure: 0.33
//       },
//       {
//         id: "impl_challenges",
//         label: "Implementation Challenges",
//         position: [0.4, 0.4, 0.1],
//         sentiment: -0.2,
//         prominence: 0.5,
//         closure: 0.33
//       }
//     ],
//     comparativeNarratives: [
//       {
//         id: "business_press",
//         label: "Business Press",
//         position: [-0.3, 0.4, 0.1],
//         color: "#FF9800"
//       },
//       {
//         id: "environmental_org",
//         label: "Environmental Org",
//         position: [0.8, -0.5, 0.6],
//         color: "#009688"
//       },
//       {
//         id: "scientific_journal",
//         label: "Scientific Journal",
//         position: [0.3, 0.2, 0.8],
//         color: "#3F51B5"
//       }
//     ]
//   };

//   // Colour based on sentiment
//   const getSentimentColor = (sentiment) => {
//     if (sentiment > 0) {
//       return d3.interpolateRgb("#FFFFFF", "#1B5E20")(sentiment);
//     } else if (sentiment < 0) {
//       return d3.interpolateRgb("#FFFFFF", "#B71C1C")(Math.abs(sentiment));
//     }
//     return "#AAAAAA";
//   };

//   // Node size based on prominence
//   const getNodeSize = (prominence) => 5 + (prominence * 15);

//   // Project 3D coordinates to 2D based on angles & zoom
//   const project3Dto2D = (x, y, z, width, height) => {
//     const angleRad = (viewAngle * Math.PI) / 180;
//     const tiltRad = (tiltAngle * Math.PI) / 180;
//     const projectionScale = 300; // base scale

//     // Y-axis rotation
//     const rotX = x * Math.cos(angleRad) + z * Math.sin(angleRad);
//     const rotZ = -x * Math.sin(angleRad) + z * Math.cos(angleRad);

//     // X-axis tilt
//     const rotY = y * Math.cos(tiltRad) - rotZ * Math.sin(tiltRad);
//     const finalZ = y * Math.sin(tiltRad) + rotZ * Math.cos(tiltRad);

//     // perspective factor
//     const perspective = 1 + (finalZ * 0.3);
//     const scaledProjection = projectionScale * zoomScale;

//     // screen coords
//     const screenX = (width / 2) + (rotX * scaledProjection) / perspective;
//     const screenY = (height / 2) + (rotY * scaledProjection) / perspective;
//     return { x: screenX, y: screenY, z: finalZ };
//   };

//   // Main D3 drawing
//   useEffect(() => {
//     if (!svgRef.current) return;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();

//     const width = dimensions.width;
//     const height = dimensions.height;

//     // main group
//     const mainGroup = svg.append("g").attr("class", "main-group");

//     // Axes group
//     const axesGroup = mainGroup.append("g").attr("class", "axes-group");

//     // Draw each axis
//     narrativeData.axes.forEach((axis, i) => {
//       const origin2D = project3Dto2D(0,0,0,width,height);
//       let pos2D, neg2D;

//       if (i === 0) {
//         pos2D = project3Dto2D(1,0,0,width,height);
//         neg2D = project3Dto2D(-1,0,0,width,height);
//       } else if (i === 1) {
//         pos2D = project3Dto2D(0,1,0,width,height);
//         neg2D = project3Dto2D(0,-1,0,width,height);
//       } else {
//         pos2D = project3Dto2D(0,0,1,width,height);
//         neg2D = project3Dto2D(0,0,-1,width,height);
//       }

//       // Negative axis
//       axesGroup.append("line")
//         .attr("x1", origin2D.x)
//         .attr("y1", origin2D.y)
//         .attr("x2", neg2D.x)
//         .attr("y2", neg2D.y)
//         .attr("stroke", axis.color)
//         .attr("stroke-width", 1)
//         .attr("stroke-dasharray", "5,3")
//         .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);

//       if (showLabels) {
//         axesGroup.append("text")
//           .attr("x", neg2D.x)
//           .attr("y", neg2D.y + 15)
//           .attr("font-size", "10px")
//           .attr("fill", axis.color)
//           .attr("text-anchor", "middle")
//           .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//           .text(axis.negative);
//       }

//       // Positive axis
//       axesGroup.append("line")
//         .attr("x1", origin2D.x)
//         .attr("y1", origin2D.y)
//         .attr("x2", pos2D.x)
//         .attr("y2", pos2D.y)
//         .attr("stroke", axis.color)
//         .attr("stroke-width", 1.5)
//         .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);

//       if (showLabels) {
//         axesGroup.append("text")
//           .attr("x", pos2D.x)
//           .attr("y", pos2D.y - 10)
//           .attr("font-size", "10px")
//           .attr("fill", axis.color)
//           .attr("text-anchor", "middle")
//           .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//           .text(axis.positive);
//       }
//     });

//     // Draw origin
//     const origin2D = project3Dto2D(0,0,0,width,height);
//     mainGroup.append("circle")
//       .attr("cx", origin2D.x)
//       .attr("cy", origin2D.y)
//       .attr("r", 3)
//       .attr("fill", "#666");

//     // Project narrative elements
//     const projectedElements = narrativeData.narrativeElements.map(elem => {
//       const p = project3Dto2D(elem.position[0], elem.position[1], elem.position[2], width, height);
//       return { ...elem, ...p };
//     }).sort((a,b) => a.z - b.z);

//     // Project core
//     const coreProjected = project3Dto2D(
//       narrativeData.corePosition[0],
//       narrativeData.corePosition[1],
//       narrativeData.corePosition[2],
//       width,
//       height
//     );

//     // Draw narrative elements
//     const elementsGroup = mainGroup.append("g").attr("class", "narrative-elements");
//     projectedElements.forEach(elem => {
//       // line from core
//       elementsGroup.append("line")
//         .attr("x1", coreProjected.x)
//         .attr("y1", coreProjected.y)
//         .attr("x2", elem.x)
//         .attr("y2", elem.y)
//         .attr("stroke", getSentimentColor(elem.sentiment))
//         .attr("stroke-width", 1)
//         .attr("stroke-opacity", 0.5);

//       // circle
//       elementsGroup.append("circle")
//         .attr("cx", elem.x)
//         .attr("cy", elem.y)
//         .attr("r", getNodeSize(elem.prominence))
//         .attr("fill", getSentimentColor(elem.sentiment))
//         .attr("stroke", "#fff")
//         .attr("stroke-width", 1);

//       // closure ring if needed
//       if (elem.closure > 0.8) {
//         elementsGroup.append("circle")
//           .attr("cx", elem.x)
//           .attr("cy", elem.y)
//           .attr("r", getNodeSize(elem.prominence) + 3)
//           .attr("fill", "none")
//           .attr("stroke", "#333")
//           .attr("stroke-width", 1);
//       }

//       if (showLabels) {
//         elementsGroup.append("text")
//           .attr("x", elem.x)
//           .attr("y", elem.y + getNodeSize(elem.prominence) + 10)
//           .attr("font-size", "10px")
//           .attr("fill", "#333")
//           .attr("text-anchor", "middle")
//           .text(elem.label);
//       }
//     });

//     // Core node
//     const coreGroup = mainGroup.append("g").attr("class", "core-narrative");
//     coreGroup.append("circle")
//       .attr("cx", coreProjected.x)
//       .attr("cy", coreProjected.y)
//       .attr("r", 20)
//       .attr("fill", "#1565C0")
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 2);

//     coreGroup.append("text")
//       .attr("x", coreProjected.x)
//       .attr("y", coreProjected.y + 5)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "12px")
//       .attr("fill", "#fff")
//       .attr("font-weight", "bold")
//       .text("Core");

//     // Comparative narratives
//     const compGroup = mainGroup.append("g").attr("class", "comparative-narratives");
//     narrativeData.comparativeNarratives.forEach(comp => {
//       const p = project3Dto2D(comp.position[0], comp.position[1], comp.position[2], width, height);
//       const diamondSize = 10;
//       const diamondPath = `
//         M ${p.x} ${p.y - diamondSize}
//         L ${p.x + diamondSize} ${p.y}
//         L ${p.x} ${p.y + diamondSize}
//         L ${p.x - diamondSize} ${p.y}
//         Z
//       `;
//       compGroup.append("path")
//         .attr("d", diamondPath)
//         .attr("fill", comp.color)
//         .attr("stroke", "#fff")
//         .attr("stroke-width", 1);

//       if (showLabels) {
//         compGroup.append("text")
//           .attr("x", p.x)
//           .attr("y", p.y + diamondSize + 12)
//           .attr("font-size", "10px")
//           .attr("fill", "#333")
//           .attr("text-anchor", "middle")
//           .text(comp.label);
//       }
//     });

//     // Axis label / legend
//     svg.append("text")
//       .attr("x", width - 120)
//       .attr("y", 20)
//       .attr("font-size", "12px")
//       .attr("font-weight", "bold")
//       .text("Narrative Positioning");

//     narrativeData.axes.forEach((axis, i) => {
//       const axisGroup = svg.append("g")
//         .attr("transform", `translate(${width - 110}, ${50 + i * 25})`)
//         .on("mouseover", () => setHighlightedAxis(axis.id))
//         .on("mouseout", () => setHighlightedAxis(null))
//         .style("cursor", "pointer");
      
//       axisGroup.append("rect")
//         .attr("x", -5)
//         .attr("y", -15)
//         .attr("width", 110)
//         .attr("height", 20)
//         .attr("fill", "transparent");
      
//       axisGroup.append("circle")
//         .attr("r", 5)
//         .attr("fill", axis.color);
      
//       axisGroup.append("text")
//         .attr("x", 10)
//         .attr("y", 4)
//         .attr("font-size", "11px")
//         .text(`${axis.name}: ${axis.value > 0 ? '+' : ''}${axis.value.toFixed(1)}`);
//     });

//     // Title
//     svg.append("text")
//       .attr("x", width / 2)
//       .attr("y", 25)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "18px")
//       .attr("font-weight", "bold")
//       .text("3D Narrative Fingerprint");

//   }, [viewAngle, tiltAngle, zoomScale, dimensions, showLabels, highlightedAxis]);

//   // Update dimensions on resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (svgRef.current && svgRef.current.parentElement) {
//         setDimensions({
//           width: svgRef.current.parentElement.clientWidth,
//           height: svgRef.current.parentElement.clientWidth * 0.75
//         });
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Mouse event handlers for 3D rotation + wheel for zoom
//   const handleMouseDown = (e) => {
//     isDraggingRef.current = true;
//     startMouseRef.current = { x: e.clientX, y: e.clientY };
//     startAnglesRef.current = { view: viewAngle, tilt: tiltAngle };
//   };
//   const handleMouseUp = () => {
//     isDraggingRef.current = false;
//   };
//   const handleMouseMove = (e) => {
//     if (!isDraggingRef.current) return;
//     const dx = e.clientX - startMouseRef.current.x;
//     const dy = e.clientY - startMouseRef.current.y;
//     setViewAngle(startAnglesRef.current.view + dx * 0.3);
//     setTiltAngle(startAnglesRef.current.tilt - dy * 0.3);
//   };
//   const handleWheel = (e) => {
//     e.preventDefault();
//     setZoomScale((old) => {
//       let newScale = old - e.deltaY * 0.001;
//       if (newScale < 0.1) newScale = 0.1;
//       if (newScale > 5) newScale = 5;
//       return newScale;
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-8">
//       {/* Main Title */}
//       <h2 className="text-3xl font-bold text-center mb-6">3D Narrative Fingerprint</h2>

//       {/* Main Content Box */}
//       <div className="bg-white shadow-lg rounded-lg p-4">

//         {/* Controls for 3D Visualization */}
//         <div className="mb-4 flex flex-wrap justify-center gap-4">
//           <div className="inline-block">
//             <label htmlFor="view-angle" className="block text-sm font-medium text-gray-700 mb-1">
//               Rotation (°)
//             </label>
//             <input
//               id="view-angle"
//               type="range"
//               min="0"
//               max="360"
//               value={viewAngle}
//               onChange={(e) => setViewAngle(parseInt(e.target.value))}
//               className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//             <span className="ml-2 text-sm">{viewAngle}°</span>
//           </div>
          
//           <div className="inline-block">
//             <label htmlFor="tilt-angle" className="block text-sm font-medium text-gray-700 mb-1">
//               Tilt (°)
//             </label>
//             <input
//               id="tilt-angle"
//               type="range"
//               min="0"
//               max="90"
//               value={tiltAngle}
//               onChange={(e) => setTiltAngle(parseInt(e.target.value))}
//               className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//             <span className="ml-2 text-sm">{tiltAngle}°</span>
//           </div>
          
//           <div className="inline-block flex items-end">
//             <label className="inline-flex items-center">
//               <input
//                 type="checkbox"
//                 checked={showLabels}
//                 onChange={(e) => setShowLabels(e.target.checked)}
//                 className="form-checkbox h-4 w-4 text-blue-600"
//               />
//               <span className="ml-2 text-sm text-gray-700">Show Labels</span>
//             </label>
//           </div>
//         </div>

//         {/* 3D Visualization with Mouse Drag & Wheel Zoom */}
//         <div
//           className="mb-6 border border-gray-200 rounded-lg bg-gray-50 relative"
//           style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
//           onMouseDown={handleMouseDown}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}
//           onWheel={handleWheel}
//         >
//           <svg
//             ref={svgRef}
//             width={dimensions.width}
//             height={dimensions.height}
//             className="w-full h-auto block"
//             style={{ 
//               userSelect: 'none', 
//               cursor: isDraggingRef.current ? 'grabbing' : 'grab' 
//             }}
//           />
//         </div>

//         {/* Legend */}
//         <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="p-3 bg-gray-50 rounded-lg">
//             <h3 className="text-sm font-medium mb-2">Node Types</h3>
//             <div className="flex items-center mb-1">
//               <div className="w-4 h-4 rounded-full bg-blue-600 mr-2" />
//               <span className="text-sm">Core Narrative Position</span>
//             </div>
//             <div className="flex items-center mb-1">
//               <div className="w-4 h-4 rounded-full bg-green-600 mr-2" />
//               <span className="text-sm">Positive Narrative Element</span>
//             </div>
//             <div className="flex items-center mb-1">
//               <div className="w-4 h-4 rounded-full bg-red-600 mr-2" />
//               <span className="text-sm">Negative Narrative Element</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-4 h-4 transform rotate-45 bg-orange-500 mr-2" />
//               <span className="text-sm">Comparative Narrative</span>
//             </div>
//           </div>
          
//           <div className="p-3 bg-gray-50 rounded-lg">
//             <h3 className="text-sm font-medium mb-2">Node Properties</h3>
//             <div className="flex items-center mb-1">
//               <span className="text-sm">Size = Prominence in text</span>
//             </div>
//             <div className="flex items-center mb-1">
//               <span className="text-sm">Colour intensity = Sentiment strength</span>
//             </div>
//             <div className="flex items-center">
//               <span className="text-sm">Ring = Narrative closure</span>
//             </div>
//           </div>
          
//           <div className="p-3 bg-gray-50 rounded-lg">
//             <h3 className="text-sm font-medium mb-2">Axis Dimensions</h3>
//             <div className="flex items-center mb-1">
//               <div className="w-2 h-2 rounded-full bg-green-600 mr-2" />
//               <span className="text-sm">Environmental ↔ Economic</span>
//             </div>
//             <div className="flex items-center mb-1">
//               <div className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
//               <span className="text-sm">Authority ↔ Accountability</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-2 h-2 rounded-full bg-purple-600 mr-2" />
//               <span className="text-sm">Scientific ↔ Political</span>
//             </div>
//           </div>
//         </div>

//         {/* Explanation */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">How to Read This Visualization</h2>
//           <p className="text-sm text-gray-600">
//             This 3D visualization positions the narrative in conceptual space along three key axes:
//             Environmental-Economic, Authority-Accountability, and Scientific-Political. The core narrative
//             position (blue sphere) shows the article’s central perspective, while satellite nodes
//             represent specific narrative elements sized by prominence and coloured by sentiment.
//             Comparative positions from other sources appear as diamond shapes.
//             <br/><br/>
//             <strong>Controls:</strong> Use the sliders to rotate and tilt the view, 
//             or <strong>click‐and‐drag</strong> to freely rotate in 3D. 
//             Scroll (mouse wheel or trackpad) to zoom in and out.
//           </p>
//         </div>

//         {/* Key Metrics */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Key Narrative Positioning Metrics</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {narrativeData.axes.map((axis, i) => (
//               <div 
//                 key={i}
//                 className="p-3 rounded-lg border flex flex-col items-center"
//                 style={{ 
//                   backgroundColor: `${axis.color}15`,
//                   borderColor: axis.color
//                 }}
//               >
//                 <div className="text-lg font-bold">
//                   {axis.value > 0 ? '+' : ''}{axis.value.toFixed(1)}
//                 </div>
//                 <div className="text-sm text-center">{axis.name}</div>
//                 <div className="text-xs text-center mt-1">
//                   {axis.value > 0 
//                     ? `Leans toward ${axis.positive}`
//                     : `Leans toward ${axis.negative}`
//                   }
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Methodology / Explanation Box */}
//       <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
//         <h3 className="font-medium mb-2">3D Fingerprint Methodology</h3>
//         <ol className="list-decimal ml-5 space-y-1">
//           <li>Position the narrative in 3D conceptual space along three key axes of tension.</li>
//           <li>Place individual narrative elements as satellite nodes around the core position.</li>
//           <li>Represent sentiment through colour (green = positive, red = negative).</li>
//           <li>Size nodes according to their prominence in the text.</li>
//           <li>Indicate narrative closure with rings around fully resolved elements.</li>
//           <li>Compare with other narratives on the same topic (diamond shapes).</li>
//           <li>
//             <strong>Drag with mouse to rotate freely in 3D</strong>, use the sliders for 
//             manual angle control, and scroll to zoom.
//           </li>
//         </ol>
//         <p className="mt-3">
//           This 3D fingerprint creates a spatial representation of the narrative’s ideological
//           positioning and internal structure, making it possible to visually compare different
//           narratives and identify patterns across sources, topics, or time periods.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Narrative3DFingerprint;

























// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const Narrative3DFingerprint = () => {
//   const svgRef = useRef(null);

//   // Angles for 3D rotation
//   const [viewAngle, setViewAngle] = useState(45);  // Y-axis rotation
//   const [tiltAngle, setTiltAngle] = useState(30);  // X-axis tilt

//   // Zoom scale for 3D projection
//   const [zoomScale, setZoomScale] = useState(1);

//   // Whether to show labels on nodes
//   const [showLabels, setShowLabels] = useState(true);

//   // Which axis is highlighted (if any)
//   const [highlightedAxis, setHighlightedAxis] = useState(null);

//   // Which node is currently selected (for info panel)
//   const [selectedNode, setSelectedNode] = useState(null);

//   // Mouse-based rotation
//   const isDraggingRef = useRef(false);
//   const startMouseRef = useRef({ x: 0, y: 0 });
//   const startAnglesRef = useRef({ view: 45, tilt: 30 });

//   // SVG dimensions
//   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

//   // Sample data
//   const narrativeData = {
//     corePosition: [0.6, 0.3, 0.4],
//     axes: [
//       {
//         id: "env_econ",
//         name: "Environmental-Economic",
//         positive: "Environmental Action",
//         negative: "Economic Concern",
//         value: 0.6,
//         color: "#4CAF50"
//       },
//       {
//         id: "auth_acc",
//         name: "Authority-Accountability",
//         positive: "Government Authority",
//         negative: "Public Accountability",
//         value: 0.3,
//         color: "#2196F3"
//       },
//       {
//         id: "sci_pol",
//         name: "Scientific-Political",
//         positive: "Scientific Consensus",
//         negative: "Political Expediency",
//         value: 0.4,
//         color: "#9C27B0"
//       }
//     ],
//     narrativeElements: [
//       {
//         id: "gov_action",
//         label: "Government Action",
//         position: [0.7, 0.5, 0.3],
//         sentiment: 0.6,
//         prominence: 0.9,
//         closure: 1.0
//       },
//       {
//         id: "opp_criticism",
//         label: "Opposition Criticism",
//         position: [0.0, 0.2, 0.0],
//         sentiment: -0.4,
//         prominence: 0.6,
//         closure: 0.67
//       },
//       {
//         id: "sci_support",
//         label: "Scientific Support",
//         position: [0.5, 0.1, 0.8],
//         sentiment: 0.5,
//         prominence: 0.7,
//         closure: 0.67
//       },
//       {
//         id: "econ_concern",
//         label: "Economic Concerns",
//         position: [-0.7, 0.2, 0.1],
//         sentiment: -0.5,
//         prominence: 0.5,
//         closure: 0.67
//       },
//       {
//         id: "climate_urgency",
//         label: "Climate Urgency",
//         position: [0.8, 0.0, 0.5],
//         sentiment: 0.7,
//         prominence: 0.8,
//         closure: 0.67
//       },
//       {
//         id: "public_protest",
//         label: "Public Protest",
//         position: [0.3, -0.6, 0.2],
//         sentiment: 0.2,
//         prominence: 0.4,
//         closure: 0.33
//       },
//       {
//         id: "impl_challenges",
//         label: "Implementation Challenges",
//         position: [0.4, 0.4, 0.1],
//         sentiment: -0.2,
//         prominence: 0.5,
//         closure: 0.33
//       }
//     ],
//     comparativeNarratives: [
//       {
//         id: "business_press",
//         label: "Business Press",
//         position: [-0.3, 0.4, 0.1],
//         color: "#FF9800"
//       },
//       {
//         id: "environmental_org",
//         label: "Environmental Org",
//         position: [0.8, -0.5, 0.6],
//         color: "#009688"
//       },
//       {
//         id: "scientific_journal",
//         label: "Scientific Journal",
//         position: [0.3, 0.2, 0.8],
//         color: "#3F51B5"
//       }
//     ]
//   };

//   // Colour from sentiment
//   const getSentimentColor = (sentiment) => {
//     if (sentiment > 0) {
//       return d3.interpolateRgb("#FFFFFF", "#1B5E20")(sentiment);
//     } else if (sentiment < 0) {
//       return d3.interpolateRgb("#FFFFFF", "#B71C1C")(Math.abs(sentiment));
//     }
//     return "#AAAAAA";
//   };

//   // Node size from prominence
//   const getNodeSize = (prominence) => 5 + (prominence * 15);

//   // Project 3D coords to 2D
//   const project3Dto2D = (x, y, z, width, height) => {
//     const angleRad = (viewAngle * Math.PI) / 180;
//     const tiltRad = (tiltAngle * Math.PI) / 180;
//     const projectionScale = 300;

//     // Y-axis rotation
//     const rotX = x * Math.cos(angleRad) + z * Math.sin(angleRad);
//     const rotZ = -x * Math.sin(angleRad) + z * Math.cos(angleRad);

//     // X-axis tilt
//     const rotY = y * Math.cos(tiltRad) - rotZ * Math.sin(tiltRad);
//     const finalZ = y * Math.sin(tiltRad) + rotZ * Math.cos(tiltRad);

//     // perspective
//     const perspective = 1 + (finalZ * 0.3);
//     const scaledProjection = projectionScale * zoomScale;

//     const screenX = (width / 2) + (rotX * scaledProjection) / perspective;
//     const screenY = (height / 2) + (rotY * scaledProjection) / perspective;
//     return { x: screenX, y: screenY, z: finalZ };
//   };

//   // D3 drawing
//   useEffect(() => {
//     if (!svgRef.current) return;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();

//     const width = dimensions.width;
//     const height = dimensions.height;

//     // main group
//     const mainGroup = svg.append("g").attr("class", "main-group");

//     // Axes group
//     const axesGroup = mainGroup.append("g").attr("class", "axes-group");

//     // Draw axes
//     narrativeData.axes.forEach((axis, i) => {
//       const origin2D = project3Dto2D(0,0,0,width,height);
//       let pos2D, neg2D;
//       if (i === 0) {
//         pos2D = project3Dto2D(1,0,0,width,height);
//         neg2D = project3Dto2D(-1,0,0,width,height);
//       } else if (i === 1) {
//         pos2D = project3Dto2D(0,1,0,width,height);
//         neg2D = project3Dto2D(0,-1,0,width,height);
//       } else {
//         pos2D = project3Dto2D(0,0,1,width,height);
//         neg2D = project3Dto2D(0,0,-1,width,height);
//       }

//       // Negative axis
//       axesGroup.append("line")
//         .attr("x1", origin2D.x)
//         .attr("y1", origin2D.y)
//         .attr("x2", neg2D.x)
//         .attr("y2", neg2D.y)
//         .attr("stroke", axis.color)
//         .attr("stroke-width", 1)
//         .attr("stroke-dasharray", "5,3")
//         .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);

//       // Negative label
//       if (showLabels) {
//         axesGroup.append("text")
//           .attr("x", neg2D.x)
//           .attr("y", neg2D.y + 15)
//           .attr("font-size", "10px")
//           .attr("fill", axis.color)
//           .attr("text-anchor", "middle")
//           .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//           .text(axis.negative);
//       }

//       // Positive axis
//       axesGroup.append("line")
//         .attr("x1", origin2D.x)
//         .attr("y1", origin2D.y)
//         .attr("x2", pos2D.x)
//         .attr("y2", pos2D.y)
//         .attr("stroke", axis.color)
//         .attr("stroke-width", 1.5)
//         .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);

//       // Positive label
//       if (showLabels) {
//         axesGroup.append("text")
//           .attr("x", pos2D.x)
//           .attr("y", pos2D.y - 10)
//           .attr("font-size", "10px")
//           .attr("fill", axis.color)
//           .attr("text-anchor", "middle")
//           .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//           .text(axis.positive);
//       }
//     });

//     // Origin
//     const origin2D = project3Dto2D(0,0,0,width,height);
//     mainGroup.append("circle")
//       .attr("cx", origin2D.x)
//       .attr("cy", origin2D.y)
//       .attr("r", 3)
//       .attr("fill", "#666");

//     // Project narrative elements
//     const projectedElements = narrativeData.narrativeElements.map(elem => {
//       const p = project3Dto2D(elem.position[0], elem.position[1], elem.position[2], width, height);
//       return { ...elem, ...p, type: "element" };
//     }).sort((a,b) => a.z - b.z);

//     // Project core
//     const coreProjected = project3Dto2D(
//       narrativeData.corePosition[0],
//       narrativeData.corePosition[1],
//       narrativeData.corePosition[2],
//       width,
//       height
//     );
//     // We'll treat the core as a node object for consistent click logic
//     const coreNode = {
//       id: "core_node",
//       label: "Core Narrative",
//       type: "core",
//       x: coreProjected.x,
//       y: coreProjected.y,
//       z: coreProjected.z
//     };

//     // Project comparative narratives
//     const compNodes = narrativeData.comparativeNarratives.map(comp => {
//       const p = project3Dto2D(comp.position[0], comp.position[1], comp.position[2], width, height);
//       return { ...comp, ...p, type: "comparative" };
//     });

//     // Combine them for easier iteration
//     const allNodes = [coreNode, ...projectedElements, ...compNodes];

//     // Draw lines from core to elements
//     const elementsGroup = mainGroup.append("g").attr("class", "narrative-elements");
//     projectedElements.forEach(elem => {
//       elementsGroup.append("line")
//         .attr("x1", coreNode.x)
//         .attr("y1", coreNode.y)
//         .attr("x2", elem.x)
//         .attr("y2", elem.y)
//         .attr("stroke", getSentimentColor(elem.sentiment))
//         .attr("stroke-width", 1)
//         .attr("stroke-opacity", 0.5);
//     });

//     // Draw circles for narrative elements, diamond for comparative, big circle for core
//     allNodes.forEach(nodeData => {
//       if (nodeData.type === "core") {
//         // Draw the big blue circle
//         elementsGroup.append("circle")
//           .attr("cx", nodeData.x)
//           .attr("cy", nodeData.y)
//           .attr("r", 20)
//           .attr("fill", "#1565C0")
//           .attr("stroke", "#fff")
//           .attr("stroke-width", 2)
//           .on("click", () => {
//             setSelectedNode(nodeData);
//           });
//         elementsGroup.append("text")
//           .attr("x", nodeData.x)
//           .attr("y", nodeData.y + 5)
//           .attr("text-anchor", "middle")
//           .attr("font-size", "12px")
//           .attr("fill", "#fff")
//           .attr("font-weight", "bold")
//           .text("Core")
//           .on("click", () => {
//             setSelectedNode(nodeData);
//           });
//       }
//       else if (nodeData.type === "element") {
//         // Draw a circle
//         elementsGroup.append("circle")
//           .attr("cx", nodeData.x)
//           .attr("cy", nodeData.y)
//           .attr("r", getNodeSize(nodeData.prominence))
//           .attr("fill", getSentimentColor(nodeData.sentiment))
//           .attr("stroke", "#fff")
//           .attr("stroke-width", 1)
//           .on("click", () => {
//             setSelectedNode(nodeData);
//           });

//         // If closure > 0.8, ring around node
//         if (nodeData.closure > 0.8) {
//           elementsGroup.append("circle")
//             .attr("cx", nodeData.x)
//             .attr("cy", nodeData.y)
//             .attr("r", getNodeSize(nodeData.prominence) + 3)
//             .attr("fill", "none")
//             .attr("stroke", "#333")
//             .attr("stroke-width", 1)
//             .on("click", () => {
//               setSelectedNode(nodeData);
//             });
//         }

//         if (showLabels) {
//           elementsGroup.append("text")
//             .attr("x", nodeData.x)
//             .attr("y", nodeData.y + getNodeSize(nodeData.prominence) + 10)
//             .attr("font-size", "10px")
//             .attr("fill", "#333")
//             .attr("text-anchor", "middle")
//             .text(nodeData.label)
//             .on("click", () => {
//               setSelectedNode(nodeData);
//             });
//         }
//       }
//       else if (nodeData.type === "comparative") {
//         // Diamond path
//         const diamondSize = 10;
//         const diamondPath = `
//           M ${nodeData.x} ${nodeData.y - diamondSize}
//           L ${nodeData.x + diamondSize} ${nodeData.y}
//           L ${nodeData.x} ${nodeData.y + diamondSize}
//           L ${nodeData.x - diamondSize} ${nodeData.y}
//           Z
//         `;
//         elementsGroup.append("path")
//           .attr("d", diamondPath)
//           .attr("fill", nodeData.color)
//           .attr("stroke", "#fff")
//           .attr("stroke-width", 1)
//           .on("click", () => {
//             setSelectedNode(nodeData);
//           });

//         if (showLabels) {
//           elementsGroup.append("text")
//             .attr("x", nodeData.x)
//             .attr("y", nodeData.y + diamondSize + 12)
//             .attr("font-size", "10px")
//             .attr("fill", "#333")
//             .attr("text-anchor", "middle")
//             .text(nodeData.label)
//             .on("click", () => {
//               setSelectedNode(nodeData);
//             });
//         }
//       }
//     });

//     // Axis label / legend
//     svg.append("text")
//       .attr("x", width - 120)
//       .attr("y", 20)
//       .attr("font-size", "12px")
//       .attr("font-weight", "bold")
//       .text("Narrative Position");

//     narrativeData.axes.forEach((axis, i) => {
//       const axisGroup = svg.append("g")
//         .attr("transform", `translate(${width - 110}, ${50 + i * 25})`)
//         .on("mouseover", () => setHighlightedAxis(axis.id))
//         .on("mouseout", () => setHighlightedAxis(null))
//         .style("cursor", "pointer");
      
//       axisGroup.append("rect")
//         .attr("x", -5)
//         .attr("y", -15)
//         .attr("width", 110)
//         .attr("height", 20)
//         .attr("fill", "transparent");
      
//       axisGroup.append("circle")
//         .attr("r", 5)
//         .attr("fill", axis.color);
      
//       axisGroup.append("text")
//         .attr("x", 10)
//         .attr("y", 4)
//         .attr("font-size", "11px")
//         .text(`${axis.name}: ${axis.value > 0 ? '+' : ''}${axis.value.toFixed(1)}`);
//     });

//     // Title
//     svg.append("text")
//       .attr("x", width / 2)
//       .attr("y", 25)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "18px")
//       .attr("font-weight", "bold")
//       .text("3D Narrative Fingerprint");

//   }, [viewAngle, tiltAngle, zoomScale, dimensions, showLabels, highlightedAxis]);

//   // Update dimensions on resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (svgRef.current && svgRef.current.parentElement) {
//         setDimensions({
//           width: svgRef.current.parentElement.clientWidth,
//           height: svgRef.current.parentElement.clientWidth * 0.75
//         });
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Mouse event handlers for 3D rotation + wheel for zoom
//   const handleMouseDown = (e) => {
//     isDraggingRef.current = true;
//     startMouseRef.current = { x: e.clientX, y: e.clientY };
//     startAnglesRef.current = { view: viewAngle, tilt: tiltAngle };
//   };
//   const handleMouseUp = () => {
//     isDraggingRef.current = false;
//   };
//   const handleMouseMove = (e) => {
//     if (!isDraggingRef.current) return;
//     const dx = e.clientX - startMouseRef.current.x;
//     const dy = e.clientY - startMouseRef.current.y;
//     setViewAngle(startAnglesRef.current.view + dx * 0.3);
//     setTiltAngle(startAnglesRef.current.tilt - dy * 0.3);
//   };
//   const handleWheel = (e) => {
//     e.preventDefault();
//     setZoomScale((old) => {
//       let newScale = old - e.deltaY * 0.001;
//       if (newScale < 0.1) newScale = 0.1;
//       if (newScale > 5) newScale = 5;
//       return newScale;
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-8">
//       {/* Main Title */}
//       <h2 className="text-3xl font-bold text-center mb-6">3D Narrative Fingerprint</h2>

//       {/* Layout: left = 3D Viz, right = Info Panel */}
//       <div className="flex flex-col md:flex-row gap-6">
        
//         {/* Main Content Box: 3D Viz + Controls */}
//         <div className="bg-white shadow-lg rounded-lg p-4 flex-1">
//           {/* Controls */}
//           <div className="mb-4 flex flex-wrap justify-center gap-4">
//             <div className="inline-block">
//               <label htmlFor="view-angle" className="block text-sm font-medium text-gray-700 mb-1">
//                 Rotation (°)
//               </label>
//               <input
//                 id="view-angle"
//                 type="range"
//                 min="0"
//                 max="360"
//                 value={viewAngle}
//                 onChange={(e) => setViewAngle(parseInt(e.target.value))}
//                 className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//               />
//               <span className="ml-2 text-sm">{viewAngle}°</span>
//             </div>
            
//             <div className="inline-block">
//               <label htmlFor="tilt-angle" className="block text-sm font-medium text-gray-700 mb-1">
//                 Tilt (°)
//               </label>
//               <input
//                 id="tilt-angle"
//                 type="range"
//                 min="0"
//                 max="90"
//                 value={tiltAngle}
//                 onChange={(e) => setTiltAngle(parseInt(e.target.value))}
//                 className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//               />
//               <span className="ml-2 text-sm">{tiltAngle}°</span>
//             </div>
            
//             <div className="inline-block flex items-end">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={showLabels}
//                   onChange={(e) => setShowLabels(e.target.checked)}
//                   className="form-checkbox h-4 w-4 text-blue-600"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Show Labels</span>
//               </label>
//             </div>
//           </div>

//           {/* 3D Visualization with Mouse Drag & Wheel Zoom */}
//           <div
//             className="mb-6 border border-gray-200 rounded-lg bg-gray-50 relative"
//             style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
//             onMouseDown={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             onMouseMove={handleMouseMove}
//             onWheel={handleWheel}
//           >
//             <svg
//               ref={svgRef}
//               width={dimensions.width}
//               height={dimensions.height}
//               className="w-full h-auto block"
//               style={{ 
//                 userSelect: 'none', 
//                 cursor: isDraggingRef.current ? 'grabbing' : 'grab' 
//               }}
//             />
//           </div>

//           {/* Explanation */}
//           <div className="mb-4">
//             <h2 className="text-xl font-semibold mb-2">How to Read This Visualization</h2>
//             <p className="text-sm text-gray-600">
//               This 3D visualization positions the narrative in conceptual space along three key axes:
//               Environmental-Economic, Authority-Accountability, and Scientific-Political. The core narrative
//               position (blue sphere) shows the article’s central perspective, while satellite nodes
//               represent specific narrative elements sized by prominence and coloured by sentiment.
//               Comparative positions from other sources appear as diamond shapes.
//               <br/><br/>
//               <strong>Controls:</strong> Use the sliders to rotate and tilt the view, 
//               or <strong>click‐and‐drag</strong> to freely rotate in 3D. 
//               Scroll (mouse wheel) to zoom in and out. Clicking any node shows more info in the panel on the right.
//             </p>
//           </div>

//           {/* Key Metrics */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Key Narrative Positioning Metrics</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {narrativeData.axes.map((axis, i) => (
//                 <div 
//                   key={i}
//                   className="p-3 rounded-lg border flex flex-col items-center"
//                   style={{ 
//                     backgroundColor: `${axis.color}15`,
//                     borderColor: axis.color
//                   }}
//                 >
//                   <div className="text-lg font-bold">
//                     {axis.value > 0 ? '+' : ''}{axis.value.toFixed(1)}
//                   </div>
//                   <div className="text-sm text-center">{axis.name}</div>
//                   <div className="text-xs text-center mt-1">
//                     {axis.value > 0 
//                       ? `Leans toward ${axis.positive}`
//                       : `Leans toward ${axis.negative}`
//                     }
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Legend */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="p-3 bg-gray-50 rounded-lg">
//               <h3 className="text-sm font-medium mb-2">Node Types</h3>
//               <div className="flex items-center mb-1">
//                 <div className="w-4 h-4 rounded-full bg-blue-600 mr-2" />
//                 <span className="text-sm">Core Narrative Position</span>
//               </div>
//               <div className="flex items-center mb-1">
//                 <div className="w-4 h-4 rounded-full bg-green-600 mr-2" />
//                 <span className="text-sm">Positive Narrative Element</span>
//               </div>
//               <div className="flex items-center mb-1">
//                 <div className="w-4 h-4 rounded-full bg-red-600 mr-2" />
//                 <span className="text-sm">Negative Narrative Element</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-4 h-4 transform rotate-45 bg-orange-500 mr-2" />
//                 <span className="text-sm">Comparative Narrative</span>
//               </div>
//             </div>
            
//             <div className="p-3 bg-gray-50 rounded-lg">
//               <h3 className="text-sm font-medium mb-2">Node Properties</h3>
//               <div className="flex items-center mb-1">
//                 <span className="text-sm">Size = Prominence in text</span>
//               </div>
//               <div className="flex items-center mb-1">
//                 <span className="text-sm">Colour intensity = Sentiment strength</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-sm">Ring = Narrative closure</span>
//               </div>
//             </div>
            
//             <div className="p-3 bg-gray-50 rounded-lg">
//               <h3 className="text-sm font-medium mb-2">Axis Dimensions</h3>
//               <div className="flex items-center mb-1">
//                 <div className="w-2 h-2 rounded-full bg-green-600 mr-2" />
//                 <span className="text-sm">Environmental ↔ Economic</span>
//               </div>
//               <div className="flex items-center mb-1">
//                 <div className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
//                 <span className="text-sm">Authority ↔ Accountability</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 rounded-full bg-purple-600 mr-2" />
//                 <span className="text-sm">Scientific ↔ Political</span>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Info Panel on the right */}
//         <div className="w-full md:w-72 flex-shrink-0 p-4 bg-white border border-gray-200 rounded-lg h-max">
//           {selectedNode ? (
//             <div>
//               <h3 className="text-lg font-medium mb-2">Node Details</h3>
//               <p className="text-sm mb-2">
//                 <strong>Label:</strong> {selectedNode.label}
//               </p>
//               {selectedNode.sentiment !== undefined && (
//                 <p className="text-sm mb-2">
//                   <strong>Sentiment:</strong> {selectedNode.sentiment.toFixed(2)}
//                 </p>
//               )}
//               {selectedNode.prominence !== undefined && (
//                 <p className="text-sm mb-2">
//                   <strong>Prominence:</strong> {selectedNode.prominence}
//                 </p>
//               )}
//               {selectedNode.closure !== undefined && (
//                 <p className="text-sm mb-2">
//                   <strong>Closure:</strong> {selectedNode.closure}
//                 </p>
//               )}
//               {selectedNode.color && (
//                 <p className="text-sm mb-2">
//                   <strong>Colour:</strong> {selectedNode.color}
//                 </p>
//               )}
//               {/* Example bullet list */}
//               <ul className="list-disc ml-5 space-y-1 text-sm mt-3">
//                 <li>Additional details can be added here.</li>
//                 <li>Use data from your structure as needed.</li>
//               </ul>
//               <button
//                 className="mt-4 px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
//                 onClick={() => setSelectedNode(null)}
//               >
//                 Close
//               </button>
//             </div>
//           ) : (
//             <div className="text-sm text-gray-600">
//               <h3 className="text-lg font-medium mb-2">No Node Selected</h3>
//               <p>Click on any node in the 3D space to see more details here.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Methodology / Explanation Box */}
//       <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
//         <h3 className="font-medium mb-2">3D Fingerprint Methodology</h3>
//         <ol className="list-decimal ml-5 space-y-1">
//           <li>Position the narrative in 3D conceptual space along three key axes of tension.</li>
//           <li>Place individual narrative elements as satellite nodes around the core position.</li>
//           <li>Represent sentiment through colour (green = positive, red = negative).</li>
//           <li>Size nodes according to their prominence in the text.</li>
//           <li>Indicate narrative closure with rings around fully resolved elements.</li>
//           <li>Compare with other narratives on the same topic (diamond shapes).</li>
//           <li>
//             <strong>Drag with mouse to rotate freely in 3D</strong>, use the sliders for 
//             manual angle control, and scroll to zoom.
//           </li>
//         </ol>
//         <p className="mt-3">
//           This 3D fingerprint creates a spatial representation of the narrative’s ideological
//           positioning and internal structure, making it possible to visually compare different
//           narratives and identify patterns across sources, topics, or time periods.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Narrative3DFingerprint;















// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const Narrative3DFingerprint = () => {
//   const svgRef = useRef(null);

//   // Angles for 3D rotation
//   const [viewAngle, setViewAngle] = useState(45);  // Y-axis rotation
//   const [tiltAngle, setTiltAngle] = useState(30);  // X-axis tilt

//   // Zoom scale for 3D projection
//   const [zoomScale, setZoomScale] = useState(1);

//   // Whether to show labels on nodes
//   const [showLabels, setShowLabels] = useState(true);

//   // Which axis is highlighted (if any)
//   const [highlightedAxis, setHighlightedAxis] = useState(null);

//   // Which node is currently selected (for info panel)
//   const [selectedNode, setSelectedNode] = useState(null);

//   // Mouse-based rotation
//   const isDraggingRef = useRef(false);
//   const startMouseRef = useRef({ x: 0, y: 0 });
//   const startAnglesRef = useRef({ view: 45, tilt: 30 });

//   // SVG dimensions
//   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

//   // Sample data
//   const narrativeData = {
//     corePosition: [0.6, 0.3, 0.4],
//     axes: [
//       {
//         id: "env_econ",
//         name: "Environmental-Economic",
//         positive: "Environmental Action",
//         negative: "Economic Concern",
//         value: 0.6,
//         color: "#4CAF50"
//       },
//       {
//         id: "auth_acc",
//         name: "Authority-Accountability",
//         positive: "Government Authority",
//         negative: "Public Accountability",
//         value: 0.3,
//         color: "#2196F3"
//       },
//       {
//         id: "sci_pol",
//         name: "Scientific-Political",
//         positive: "Scientific Consensus",
//         negative: "Political Expediency",
//         value: 0.4,
//         color: "#9C27B0"
//       }
//     ],
//     narrativeElements: [
//       {
//         id: "gov_action",
//         label: "Government Action",
//         position: [0.7, 0.5, 0.3],
//         sentiment: 0.6,
//         prominence: 0.9,
//         closure: 1.0
//       },
//       {
//         id: "opp_criticism",
//         label: "Opposition Criticism",
//         position: [0.0, 0.2, 0.0],
//         sentiment: -0.4,
//         prominence: 0.6,
//         closure: 0.67
//       },
//       {
//         id: "sci_support",
//         label: "Scientific Support",
//         position: [0.5, 0.1, 0.8],
//         sentiment: 0.5,
//         prominence: 0.7,
//         closure: 0.67
//       },
//       {
//         id: "econ_concern",
//         label: "Economic Concerns",
//         position: [-0.7, 0.2, 0.1],
//         sentiment: -0.5,
//         prominence: 0.5,
//         closure: 0.67
//       },
//       {
//         id: "climate_urgency",
//         label: "Climate Urgency",
//         position: [0.8, 0.0, 0.5],
//         sentiment: 0.7,
//         prominence: 0.8,
//         closure: 0.67
//       },
//       {
//         id: "public_protest",
//         label: "Public Protest",
//         position: [0.3, -0.6, 0.2],
//         sentiment: 0.2,
//         prominence: 0.4,
//         closure: 0.33
//       },
//       {
//         id: "impl_challenges",
//         label: "Implementation Challenges",
//         position: [0.4, 0.4, 0.1],
//         sentiment: -0.2,
//         prominence: 0.5,
//         closure: 0.33
//       }
//     ],
//     comparativeNarratives: [
//       {
//         id: "business_press",
//         label: "Business Press",
//         position: [-0.3, 0.4, 0.1],
//         color: "#FF9800"
//       },
//       {
//         id: "environmental_org",
//         label: "Environmental Org",
//         position: [0.8, -0.5, 0.6],
//         color: "#009688"
//       },
//       {
//         id: "scientific_journal",
//         label: "Scientific Journal",
//         position: [0.3, 0.2, 0.8],
//         color: "#3F51B5"
//       }
//     ]
//   };

//   // Colour from sentiment
//   const getSentimentColor = (sentiment) => {
//     if (sentiment > 0) {
//       return d3.interpolateRgb("#FFFFFF", "#1B5E20")(sentiment);
//     } else if (sentiment < 0) {
//       return d3.interpolateRgb("#FFFFFF", "#B71C1C")(Math.abs(sentiment));
//     }
//     return "#AAAAAA";
//   };

//   // Node size from prominence
//   const getNodeSize = (prominence) => 5 + (prominence * 15);

//   // Project 3D coords to 2D
//   const project3Dto2D = (x, y, z, width, height) => {
//     const angleRad = (viewAngle * Math.PI) / 180;
//     const tiltRad = (tiltAngle * Math.PI) / 180;
//     const projectionScale = 300;

//     // Y-axis rotation
//     const rotX = x * Math.cos(angleRad) + z * Math.sin(angleRad);
//     const rotZ = -x * Math.sin(angleRad) + z * Math.cos(angleRad);

//     // X-axis tilt
//     const rotY = y * Math.cos(tiltRad) - rotZ * Math.sin(tiltRad);
//     const finalZ = y * Math.sin(tiltRad) + rotZ * Math.cos(tiltRad);

//     // perspective
//     const perspective = 1 + (finalZ * 0.3);
//     const scaledProjection = projectionScale * zoomScale;

//     const screenX = (width / 2) + (rotX * scaledProjection) / perspective;
//     const screenY = (height / 2) + (rotY * scaledProjection) / perspective;
//     return { x: screenX, y: screenY, z: finalZ };
//   };

//   // D3 drawing
//   useEffect(() => {
//     if (!svgRef.current) return;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();

//     const width = dimensions.width;
//     const height = dimensions.height;

//     // main group
//     const mainGroup = svg.append("g").attr("class", "main-group");

//     // Axes group
//     const axesGroup = mainGroup.append("g").attr("class", "axes-group");

//     // Draw axes
//     narrativeData.axes.forEach((axis, i) => {
//       const origin2D = project3Dto2D(0,0,0,width,height);
//       let pos2D, neg2D;
//       if (i === 0) {
//         pos2D = project3Dto2D(1,0,0,width,height);
//         neg2D = project3Dto2D(-1,0,0,width,height);
//       } else if (i === 1) {
//         pos2D = project3Dto2D(0,1,0,width,height);
//         neg2D = project3Dto2D(0,-1,0,width,height);
//       } else {
//         pos2D = project3Dto2D(0,0,1,width,height);
//         neg2D = project3Dto2D(0,0,-1,width,height);
//       }

//       // Negative axis
//       axesGroup.append("line")
//         .attr("x1", origin2D.x)
//         .attr("y1", origin2D.y)
//         .attr("x2", neg2D.x)
//         .attr("y2", neg2D.y)
//         .attr("stroke", axis.color)
//         .attr("stroke-width", 1)
//         .attr("stroke-dasharray", "5,3")
//         .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);

//       // Negative label
//       if (showLabels) {
//         axesGroup.append("text")
//           .attr("x", neg2D.x)
//           .attr("y", neg2D.y + 15)
//           .attr("font-size", "10px")
//           .attr("fill", axis.color)
//           .attr("text-anchor", "middle")
//           .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//           .text(axis.negative);
//       }

//       // Positive axis
//       axesGroup.append("line")
//         .attr("x1", origin2D.x)
//         .attr("y1", origin2D.y)
//         .attr("x2", pos2D.x)
//         .attr("y2", pos2D.y)
//         .attr("stroke", axis.color)
//         .attr("stroke-width", 1.5)
//         .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);

//       // Positive label
//       if (showLabels) {
//         axesGroup.append("text")
//           .attr("x", pos2D.x)
//           .attr("y", pos2D.y - 10)
//           .attr("font-size", "10px")
//           .attr("fill", axis.color)
//           .attr("text-anchor", "middle")
//           .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//           .text(axis.positive);
//       }
//     });

//     // Origin
//     const origin2D = project3Dto2D(0,0,0,width,height);
//     mainGroup.append("circle")
//       .attr("cx", origin2D.x)
//       .attr("cy", origin2D.y)
//       .attr("r", 3)
//       .attr("fill", "#666");

//     // Project narrative elements
//     const projectedElements = narrativeData.narrativeElements.map(elem => {
//       const p = project3Dto2D(elem.position[0], elem.position[1], elem.position[2], width, height);
//       return { ...elem, ...p, type: "element" };
//     }).sort((a,b) => a.z - b.z);

//     // Project core
//     const coreProjected = project3Dto2D(
//       narrativeData.corePosition[0],
//       narrativeData.corePosition[1],
//       narrativeData.corePosition[2],
//       width,
//       height
//     );
//     // We'll treat the core as a node object for consistent click logic
//     const coreNode = {
//       id: "core_node",
//       label: "Core Narrative",
//       type: "core",
//       x: coreProjected.x,
//       y: coreProjected.y,
//       z: coreProjected.z
//     };

//     // Project comparative narratives
//     const compNodes = narrativeData.comparativeNarratives.map(comp => {
//       const p = project3Dto2D(comp.position[0], comp.position[1], comp.position[2], width, height);
//       return { ...comp, ...p, type: "comparative" };
//     });

//     // Combine them for easier iteration
//     const allNodes = [coreNode, ...projectedElements, ...compNodes];

//     // Draw lines from core to elements
//     const elementsGroup = mainGroup.append("g").attr("class", "narrative-elements");
//     projectedElements.forEach(elem => {
//       elementsGroup.append("line")
//         .attr("x1", coreNode.x)
//         .attr("y1", coreNode.y)
//         .attr("x2", elem.x)
//         .attr("y2", elem.y)
//         .attr("stroke", getSentimentColor(elem.sentiment))
//         .attr("stroke-width", 1)
//         .attr("stroke-opacity", 0.5);
//     });

//     // Draw circles for narrative elements, diamond for comparative, big circle for core
//     allNodes.forEach(nodeData => {
//       if (nodeData.type === "core") {
//         // Draw the big blue circle
//         elementsGroup.append("circle")
//           .attr("cx", nodeData.x)
//           .attr("cy", nodeData.y)
//           .attr("r", 20)
//           .attr("fill", "#1565C0")
//           .attr("stroke", "#fff")
//           .attr("stroke-width", 2)
//           .on("click", () => {
//             setSelectedNode(nodeData);
//           });
//         elementsGroup.append("text")
//           .attr("x", nodeData.x)
//           .attr("y", nodeData.y + 5)
//           .attr("text-anchor", "middle")
//           .attr("font-size", "12px")
//           .attr("fill", "#fff")
//           .attr("font-weight", "bold")
//           .text("Core")
//           .on("click", () => {
//             setSelectedNode(nodeData);
//           });
//       }
//       else if (nodeData.type === "element") {
//         // Draw a circle
//         elementsGroup.append("circle")
//           .attr("cx", nodeData.x)
//           .attr("cy", nodeData.y)
//           .attr("r", getNodeSize(nodeData.prominence))
//           .attr("fill", getSentimentColor(nodeData.sentiment))
//           .attr("stroke", "#fff")
//           .attr("stroke-width", 1)
//           .on("click", () => {
//             setSelectedNode(nodeData);
//           });

//         // If closure > 0.8, ring around node
//         if (nodeData.closure > 0.8) {
//           elementsGroup.append("circle")
//             .attr("cx", nodeData.x)
//             .attr("cy", nodeData.y)
//             .attr("r", getNodeSize(nodeData.prominence) + 3)
//             .attr("fill", "none")
//             .attr("stroke", "#333")
//             .attr("stroke-width", 1)
//             .on("click", () => {
//               setSelectedNode(nodeData);
//             });
//         }

//         if (showLabels) {
//           elementsGroup.append("text")
//             .attr("x", nodeData.x)
//             .attr("y", nodeData.y + getNodeSize(nodeData.prominence) + 10)
//             .attr("font-size", "10px")
//             .attr("fill", "#333")
//             .attr("text-anchor", "middle")
//             .text(nodeData.label)
//             .on("click", () => {
//               setSelectedNode(nodeData);
//             });
//         }
//       }
//       else if (nodeData.type === "comparative") {
//         // Diamond path
//         const diamondSize = 10;
//         const diamondPath = `
//           M ${nodeData.x} ${nodeData.y - diamondSize}
//           L ${nodeData.x + diamondSize} ${nodeData.y}
//           L ${nodeData.x} ${nodeData.y + diamondSize}
//           L ${nodeData.x - diamondSize} ${nodeData.y}
//           Z
//         `;
//         elementsGroup.append("path")
//           .attr("d", diamondPath)
//           .attr("fill", nodeData.color)
//           .attr("stroke", "#fff")
//           .attr("stroke-width", 1)
//           .on("click", () => {
//             setSelectedNode(nodeData);
//           });

//         if (showLabels) {
//           elementsGroup.append("text")
//             .attr("x", nodeData.x)
//             .attr("y", nodeData.y + diamondSize + 12)
//             .attr("font-size", "10px")
//             .attr("fill", "#333")
//             .attr("text-anchor", "middle")
//             .text(nodeData.label)
//             .on("click", () => {
//               setSelectedNode(nodeData);
//             });
//         }
//       }
//     });

//     // Axis label / legend
//     // Removed from here - moved to the legend component.

//     // Title
//     svg.append("text")
//       .attr("x", width / 2)
//       .attr("y", 25)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "18px")
//       .attr("font-weight", "bold")
//       .text("3D Narrative Fingerprint");

//   }, [viewAngle, tiltAngle, zoomScale, dimensions, showLabels, highlightedAxis]);

//   // Update dimensions on resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (svgRef.current && svgRef.current.parentElement) {
//         setDimensions({
//           width: svgRef.current.parentElement.clientWidth,
//           height: svgRef.current.parentElement.clientWidth * 0.75
//         });
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Mouse event handlers for 3D rotation + wheel for zoom
//   const handleMouseDown = (e) => {
//     isDraggingRef.current = true;
//     startMouseRef.current = { x: e.clientX, y: e.clientY };
//     startAnglesRef.current = { view: viewAngle, tilt: tiltAngle };
//   };
//   const handleMouseUp = () => {
//     isDraggingRef.current = false;
//   };
//   const handleMouseMove = (e) => {
//     if (!isDraggingRef.current) return;
//     const dx = e.clientX - startMouseRef.current.x;
//     const dy = e.clientY - startMouseRef.current.y;
//     setViewAngle(startAnglesRef.current.view + dx * 0.3);
//     setTiltAngle(startAnglesRef.current.tilt - dy * 0.3);
//   };
//   const handleWheel = (e) => {
//     e.preventDefault();
//     setZoomScale((old) => {
//       let newScale = old - e.deltaY * 0.001;
//       if (newScale < 0.1) newScale = 0.1;
//       if (newScale > 5) newScale = 5;
//       return newScale;
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-8">
//       {/* Main Title */}
//       <h2 className="text-3xl font-bold text-center mb-6">3D Narrative Fingerprint</h2>

//       {/* Layout: left = 3D Viz, right = Info Panel */}
//       <div className="flex flex-col md:flex-row gap-6">
        
//         {/* Main Content Box: 3D Viz + Controls */}
//         <div className="bg-white shadow-lg rounded-lg p-4 flex-1">
//           {/* Controls */}
//           <div className="mb-4 flex flex-wrap justify-center gap-4">
//             <div className="inline-block">
//               <label htmlFor="view-angle" className="block text-sm font-medium text-gray-700 mb-1">
//                 Rotation (°)
//               </label>
//               <input
//                 id="view-angle"
//                 type="range"
//                 min="0"
//                 max="360"
//                 value={viewAngle}
//                 onChange={(e) => setViewAngle(parseInt(e.target.value))}
//                 className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//               />
//               <span className="ml-2 text-sm">{viewAngle.toFixed(1)}°</span>
//             </div>
            
//             <div className="inline-block">
//               <label htmlFor="tilt-angle" className="block text-sm font-medium text-gray-700 mb-1">
//                 Tilt (°)
//               </label>
//               <input
//                 id="tilt-angle"
//                 type="range"
//                 min="0"
//                 max="90"
//                 value={tiltAngle}
//                 onChange={(e) => setTiltAngle(parseInt(e.target.value))}
//                 className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//               />
//               <span className="ml-2 text-sm">{tiltAngle.toFixed(1)}°</span>
//             </div>
            
//             <div className="inline-block flex items-end">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={showLabels}
//                   onChange={(e) => setShowLabels(e.target.checked)}
//                   className="form-checkbox h-4 w-4 text-blue-600"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Show Labels</span>
//               </label>
//             </div>
//           </div>

//             {/* Legend - Moved to top left */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 absolute top-4 left-4 z-10">
//                 <div className="p-3 bg-gray-50 rounded-lg">
//                     <h3 className="text-sm font-medium mb-2">Node Types</h3>
//                     <div className="flex items-center mb-1">
//                         <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"/>
//                         <span className="text-sm">Core Narrative Position</span>
//                     </div>
//                     <div className="flex items-center mb-1">
//                         <div className="w-4 h-4 rounded-full bg-green-600 mr-2"/>
//                         <span className="text-sm">Positive Narrative Element</span>
//                     </div>
//                     <div className="flex items-center mb-1">
//                         <div className="w-4 h-4 rounded-full bg-red-600 mr-2"/>
//                         <span className="text-sm">Negative Narrative Element</span>
//                     </div>
//                     <div className="flex items-center">
//                         <div className="w-4 h-4 transform rotate-45 bg-orange-500 mr-2"/>
//                         <span className="text-sm">Comparative Narrative</span>
//                     </div>
//                 </div>

//                 <div className="p-3 bg-gray-50 rounded-lg">
//                     <h3 className="text-sm font-medium mb-2">Node Properties</h3>
//                     <div className="flex items-center mb-1">
//                         <span className="text-sm">Size = Prominence in text</span>
//                     </div>
//                     <div className="flex items-center mb-1">
//                         <span className="text-sm">Colour intensity = Sentiment strength</span>
//                     </div>
//                     <div className="flex items-center">
//                         <span className="text-sm">Ring = Narrative closure</span>
//                     </div>
//                 </div>

//                 <div className="p-3 bg-gray-50 rounded-lg">
//                     <h3 className="text-sm font-medium mb-2">Axis Dimensions</h3>
//                     <div className="flex items-center mb-1">
//                         <div className="w-2 h-2 rounded-full bg-green-600 mr-2"/>
//                         <span className="text-sm">Environmental ↔ Economic</span>
//                     </div>
//                     <div className="flex items-center mb-1">
//                         <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"/>
//                         <span className="text-sm">Authority ↔ Accountability</span>
//                     </div>
//                     <div className="flex items-center">
//                         <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"/>
//                         <span className="text-sm">Scientific ↔ Political</span>
//                     </div>
//                 </div>
//             </div>

//           {/* 3D Visualization with Mouse Drag & Wheel Zoom */}
//           <div
//             className="mb-6 border border-gray-200 rounded-lg bg-gray-50 relative"
//             style={{ width: '100%', height: `${dimensions.height}px` }} // Extend width to container
//             onMouseDown={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             onMouseMove={handleMouseMove}
//             onWheel={handleWheel}
//           >
//             <svg
//               ref={svgRef}
//               width={dimensions.width}
//               height={dimensions.height}
//               className="w-full h-auto block"
//               style={{ 
//                 userSelect: 'none', 
//                 cursor: isDraggingRef.current ? 'grabbing' : 'grab' 
//               }}
//             />
//           </div>

//           {/* Explanation */}
//           <div className="mb-4">
//             <h2 className="text-xl font-semibold mb-2">How to Read This Visualization</h2>
//             <p className="text-sm text-gray-600">
//               This 3D visualization positions the narrative in conceptual space along three key axes:
//               Environmental-Economic, Authority-Accountability, and Scientific-Political. The core narrative
//               position (blue sphere) shows the article’s central perspective, while satellite nodes
//               represent specific narrative elements sized by prominence and coloured by sentiment.
//               Comparative positions from other sources appear as diamond shapes.
//               <br/><br/>
//               <strong>Controls:</strong> Use the sliders to rotate and tilt the view, 
//               or <strong>click‐and‐drag</strong> to freely rotate in 3D. 
//               Scroll (mouse wheel) to zoom in and out. Clicking any node shows more info in the panel on the right.
//             </p>
//           </div>

//           {/* Key Metrics */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Key Narrative Positioning Metrics</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {narrativeData.axes.map((axis, i) => (
//                 <div 
//                   key={i}
//                   className="p-3 rounded-lg border flex flex-col items-center"
//                   style={{ 
//                     backgroundColor: `${axis.color}15`,
//                     borderColor: axis.color
//                   }}
//                 >
//                   <div className="text-lg font-bold">
//                     {axis.value > 0 ? '+' : ''}{axis.value.toFixed(1)}
//                   </div>
//                   <div className="text-sm text-center">{axis.name}</div>
//                   <div className="text-xs text-center mt-1">
//                     {axis.value > 0 
//                       ? `Leans toward ${axis.positive}`
//                       : `Leans toward ${axis.negative}`
//                     }
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Legend - Removed Here, Moved Above */}


//         </div>
        
//         {/* Info Panel on the right */}
//         <div className="w-full md:w-72 flex-shrink-0 p-4 bg-white border border-gray-200 rounded-lg h-max">
//           {selectedNode ? (
//             <div>
//               <h3 className="text-lg font-medium mb-2">Node Details</h3>
//               <p className="text-sm mb-2">
//                 <strong>Label:</strong> {selectedNode.label}
//               </p>
//               {selectedNode.sentiment !== undefined && (
//                 <p className="text-sm mb-2">
//                   <strong>Sentiment:</strong> {selectedNode.sentiment.toFixed(2)}
//                 </p>
//               )}
//               {selectedNode.prominence !== undefined && (
//                 <p className="text-sm mb-2">
//                   <strong>Prominence:</strong> {selectedNode.prominence}
//                 </p>
//               )}
//               {selectedNode.closure !== undefined && (
//                 <p className="text-sm mb-2">
//                   <strong>Closure:</strong> {selectedNode.closure}
//                 </p>
//               )}
//               {selectedNode.color && (
//                 <p className="text-sm mb-2">
//                   <strong>Colour:</strong> {selectedNode.color}
//                 </p>
//               )}
//               {/* Example bullet list */}
//               <ul className="list-disc ml-5 space-y-1 text-sm mt-3">
//                 <li>Additional details can be added here.</li>
//                 <li>Use data from your structure as needed.</li>
//               </ul>
//               <button
//                 className="mt-4 px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
//                 onClick={() => setSelectedNode(null)}
//               >
//                 Close
//               </button>
//             </div>
//           ) : (
//             <div className="text-sm text-gray-600">
//               <h3 className="text-lg font-medium mb-2">No Node Selected</h3>
//               <p>Click on any node in the 3D space to see more details here.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Methodology / Explanation Box */}
//       <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
//         <h3 className="font-medium mb-2">3D Fingerprint Methodology</h3>
//         <ol className="list-decimal ml-5 space-y-1">
//           <li>Position the narrative in 3D conceptual space along three key axes of tension.</li>
//           <li>Place individual narrative elements as satellite nodes around the core position.</li>
//           <li>Represent sentiment through colour (green = positive, red = negative).</li>
//           <li>Size nodes according to their prominence in the text.</li>
//           <li>Indicate narrative closure with rings around fully resolved elements.</li>
//           <li>Compare with other narratives on the same topic (diamond shapes).</li>
//           <li>
//             <strong>Drag with mouse to rotate freely in 3D</strong>, use the sliders for 
//             manual angle control, and scroll to zoom.
//           </li>
//         </ol>
//         <p className="mt-3">
//           This 3D fingerprint creates a spatial representation of the narrative’s ideological
//           positioning and internal structure, making it possible to visually compare different
//           narratives and identify patterns across sources, topics, or time periods.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Narrative3DFingerprint;














































// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const Narrative3DFingerprint = () => {
//     const svgRef = useRef(null);

//     // Angles for 3D rotation
//     const [viewAngle, setViewAngle] = useState(45);  // Y-axis rotation
//     const [tiltAngle, setTiltAngle] = useState(30);  // X-axis tilt

//     // Store initial angles for reset button
//     const [initialViewAngle, setInitialViewAngle] = useState(45);
//     const [initialTiltAngle, setInitialTiltAngle] = useState(30);

//     // Zoom scale for 3D projection
//     const [zoomScale, setZoomScale] = useState(1);

//     // Whether to show labels on nodes
//     const [showLabels, setShowLabels] = useState(true);

//     // Which axis is highlighted (if any)
//     const [highlightedAxis, setHighlightedAxis] = useState(null);

//     // Which node is currently selected (for info panel)
//     const [selectedNode, setSelectedNode] = useState(null);

//     // Mouse-based rotation
//     const isDraggingRef = useRef(false);
//     const startMouseRef = useRef({x: 0, y: 0});
//     const startAnglesRef = useRef({view: 45, tilt: 30});

//     // SVG dimensions
//     const [dimensions, setDimensions] = useState({width: 800, height: 600});

//     // Sample data
//     const narrativeData = {
//         corePosition: [0.6, 0.3, 0.4],
//         axes: [
//             {
//                 id: "env_econ",
//                 name: "Environmental-Economic",
//                 positive: "Environmental Action",
//                 negative: "Economic Concern",
//                 value: 0.6,
//                 color: "#4CAF50"
//             },
//             {
//                 id: "auth_acc",
//                 name: "Authority-Accountability",
//                 positive: "Government Authority",
//                 negative: "Public Accountability",
//                 value: 0.3,
//                 color: "#2196F3"
//             },
//             {
//                 id: "sci_pol",
//                 name: "Scientific-Political",
//                 positive: "Scientific Consensus",
//                 negative: "Political Expediency",
//                 value: 0.4,
//                 color: "#9C27B0"
//             }
//         ],
//         narrativeElements: [
//             {
//                 id: "gov_action",
//                 label: "Government Action",
//                 position: [0.7, 0.5, 0.3],
//                 sentiment: 0.6,
//                 prominence: 0.9,
//                 closure: 1.0
//             },
//             {
//                 id: "opp_criticism",
//                 label: "Opposition Criticism",
//                 position: [0.0, 0.2, 0.0],
//                 sentiment: -0.4,
//                 prominence: 0.6,
//                 closure: 0.67
//             },
//             {
//                 id: "sci_support",
//                 label: "Scientific Support",
//                 position: [0.5, 0.1, 0.8],
//                 sentiment: 0.5,
//                 prominence: 0.7,
//                 closure: 0.67
//             },
//             {
//                 id: "econ_concern",
//                 label: "Economic Concerns",
//                 position: [-0.7, 0.2, 0.1],
//                 sentiment: -0.5,
//                 prominence: 0.5,
//                 closure: 0.67
//             },
//             {
//                 id: "climate_urgency",
//                 label: "Climate Urgency",
//                 position: [0.8, 0.0, 0.5],
//                 sentiment: 0.7,
//                 prominence: 0.8,
//                 closure: 0.67
//             },
//             {
//                 id: "public_protest",
//                 label: "Public Protest",
//                 position: [0.3, -0.6, 0.2],
//                 sentiment: 0.2,
//                 prominence: 0.4,
//                 closure: 0.33
//             },
//             {
//                 id: "impl_challenges",
//                 label: "Implementation Challenges",
//                 position: [0.4, 0.4, 0.1],
//                 sentiment: -0.2,
//                 prominence: 0.5,
//                 closure: 0.33
//             }
//         ],
//         comparativeNarratives: [
//             {
//                 id: "business_press",
//                 label: "Business Press",
//                 position: [-0.3, 0.4, 0.1],
//                 color: "#FF9800"
//             },
//             {
//                 id: "environmental_org",
//                 label: "Environmental Org",
//                 position: [0.8, -0.5, 0.6],
//                 color: "#009688"
//             },
//             {
//                 id: "scientific_journal",
//                 label: "Scientific Journal",
//                 position: [0.3, 0.2, 0.8],
//                 color: "#3F51B5"
//             }
//         ]
//     };

//     // Colour from sentiment
//     const getSentimentColor = (sentiment) => {
//         if (sentiment > 0) {
//             return d3.interpolateRgb("#FFFFFF", "#1B5E20")(sentiment);
//         } else if (sentiment < 0) {
//             return d3.interpolateRgb("#FFFFFF", "#B71C1C")(Math.abs(sentiment));
//         }
//         return "#AAAAAA";
//     };

//     // Node size from prominence
//     const getNodeSize = (prominence) => 5 + (prominence * 15);

//     // Project 3D coords to 2D
//     const project3Dto2D = (x, y, z, width, height) => {
//         const angleRad = (viewAngle * Math.PI) / 180;
//         const tiltRad = (tiltAngle * Math.PI) / 180;
//         const projectionScale = 300;

//         // Y-axis rotation
//         const rotX = x * Math.cos(angleRad) + z * Math.sin(angleRad);
//         const rotZ = -x * Math.sin(angleRad) + z * Math.cos(angleRad);

//         // X-axis tilt
//         const rotY = y * Math.cos(tiltRad) - rotZ * Math.sin(tiltRad);
//         const finalZ = y * Math.sin(tiltRad) + rotZ * Math.cos(tiltRad);

//         // perspective
//         const perspective = 1 + (finalZ * 0.3);
//         const scaledProjection = projectionScale * zoomScale;

//         const screenX = (width / 2) + (rotX * scaledProjection) / perspective;
//         const screenY = (height / 2) + (rotY * scaledProjection) / perspective;
//         return {x: screenX, y: screenY, z: finalZ};
//     };

//     // Reset View
//     const resetView = () => {
//         setViewAngle(initialViewAngle);
//         setTiltAngle(initialTiltAngle);
//         setZoomScale(1); // Reset zoom too if you like
//     };

//     // D3 drawing
//     useEffect(() => {
//         if (!svgRef.current) return;

//         const svg = d3.select(svgRef.current);
//         svg.selectAll("*").remove();

//         const width = dimensions.width;
//         const height = dimensions.height;

//         // main group
//         const mainGroup = svg.append("g").attr("class", "main-group");

//         // Axes group
//         const axesGroup = mainGroup.append("g").attr("class", "axes-group");

//         // Draw axes
//         narrativeData.axes.forEach((axis, i) => {
//             const origin2D = project3Dto2D(0, 0, 0, width, height);
//             let pos2D, neg2D;
//             if (i === 0) {
//                 pos2D = project3Dto2D(1, 0, 0, width, height);
//                 neg2D = project3Dto2D(-1, 0, 0, width, height);
//             } else if (i === 1) {
//                 pos2D = project3Dto2D(0, 1, 0, width, height);
//                 neg2D = project3Dto2D(0, -1, 0, width, height);
//             } else {
//                 pos2D = project3Dto2D(0, 0, 1, width, height);
//                 neg2D = project3Dto2D(0, 0, -1, width, height);
//             }

//             // Negative axis
//             axesGroup.append("line")
//                 .attr("x1", origin2D.x)
//                 .attr("y1", origin2D.y)
//                 .attr("x2", neg2D.x)
//                 .attr("y2", neg2D.y)
//                 .attr("stroke", axis.color)
//                 .attr("stroke-width", 1)
//                 .attr("stroke-dasharray", "5,3")
//                 .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);

//             // Negative label
//             if (showLabels) {
//                 axesGroup.append("text")
//                     .attr("x", neg2D.x)
//                     .attr("y", neg2D.y + 15)
//                     .attr("font-size", "10px")
//                     .attr("fill", axis.color)
//                     .attr("text-anchor", "middle")
//                     .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//                     .text(axis.negative);
//             }

//             // Positive axis
//             axesGroup.append("line")
//                 .attr("x1", origin2D.x)
//                 .attr("y1", origin2D.y)
//                 .attr("x2", pos2D.x)
//                 .attr("y2", pos2D.y)
//                 .attr("stroke", axis.color)
//                 .attr("stroke-width", 1.5)
//                 .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);

//             // Positive label
//             if (showLabels) {
//                 axesGroup.append("text")
//                     .attr("x", pos2D.x)
//                     .attr("y", pos2D.y - 10)
//                     .attr("font-size", "10px")
//                     .attr("fill", axis.color)
//                     .attr("text-anchor", "middle")
//                     .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
//                     .text(axis.positive);
//             }
//         });

//         // Origin
//         const origin2D = project3Dto2D(0, 0, 0, width, height);
//         mainGroup.append("circle")
//             .attr("cx", origin2D.x)
//             .attr("cy", origin2D.y)
//             .attr("r", 3)
//             .attr("fill", "#666");

//         // Project narrative elements
//         const projectedElements = narrativeData.narrativeElements.map(elem => {
//             const p = project3Dto2D(elem.position[0], elem.position[1], elem.position[2], width, height);
//             return {...elem, ...p, type: "element"};
//         }).sort((a, b) => a.z - b.z);

//         // Project core
//         const coreProjected = project3Dto2D(
//             narrativeData.corePosition[0],
//             narrativeData.corePosition[1],
//             narrativeData.corePosition[2],
//             width,
//             height
//         );
//         // We'll treat the core as a node object for consistent click logic
//         const coreNode = {
//             id: "core_node",
//             label: "Core Narrative",
//             type: "core",
//             x: coreProjected.x,
//             y: coreProjected.y,
//             z: coreProjected.z
//         };

//         // Project comparative narratives
//         const compNodes = narrativeData.comparativeNarratives.map(comp => {
//             const p = project3Dto2D(comp.position[0], comp.position[1], comp.position[2], width, height);
//             return {...comp, ...p, type: "comparative"};
//         });

//         // Combine them for easier iteration
//         const allNodes = [coreNode, ...projectedElements, ...compNodes];

//         // Draw lines from core to elements
//         const elementsGroup = mainGroup.append("g").attr("class", "narrative-elements");
//         projectedElements.forEach(elem => {
//             elementsGroup.append("line")
//                 .attr("x1", coreNode.x)
//                 .attr("y1", coreNode.y)
//                 .attr("x2", elem.x)
//                 .attr("y2", elem.y)
//                 .attr("stroke", getSentimentColor(elem.sentiment))
//                 .attr("stroke-width", 1)
//                 .attr("stroke-opacity", 0.5);
//         });

//         // Draw circles for narrative elements, diamond for comparative, big circle for core
//         allNodes.forEach(nodeData => {
//             if (nodeData.type === "core") {
//                 // Draw the big blue circle
//                 elementsGroup.append("circle")
//                     .attr("cx", nodeData.x)
//                     .attr("cy", nodeData.y)
//                     .attr("r", 20)
//                     .attr("fill", "#1565C0")
//                     .attr("stroke", "#fff")
//                     .attr("stroke-width", 2)
//                     .on("click", () => {
//                         setSelectedNode(nodeData);
//                     });
//                 elementsGroup.append("text")
//                     .attr("x", nodeData.x)
//                     .attr("y", nodeData.y + 5)
//                     .attr("text-anchor", "middle")
//                     .attr("font-size", "12px")
//                     .attr("fill", "#fff")
//                     .attr("font-weight", "bold")
//                     .text("Core")
//                     .on("click", () => {
//                         setSelectedNode(nodeData);
//                     });
//             } else if (nodeData.type === "element") {
//                 // Draw a circle
//                 elementsGroup.append("circle")
//                     .attr("cx", nodeData.x)
//                     .attr("cy", nodeData.y)
//                     .attr("r", getNodeSize(nodeData.prominence))
//                     .attr("fill", getSentimentColor(nodeData.sentiment))
//                     .attr("stroke", "#fff")
//                     .attr("stroke-width", 1)
//                     .on("click", () => {
//                         setSelectedNode(nodeData);
//                     });

//                 // If closure > 0.8, ring around node
//                 if (nodeData.closure > 0.8) {
//                     elementsGroup.append("circle")
//                         .attr("cx", nodeData.x)
//                         .attr("cy", nodeData.y)
//                         .attr("r", getNodeSize(nodeData.prominence) + 3)
//                         .attr("fill", "none")
//                         .attr("stroke", "#333")
//                         .attr("stroke-width", 1)
//                         .on("click", () => {
//                             setSelectedNode(nodeData);
//                         });
//                 }

//                 if (showLabels) {
//                     elementsGroup.append("text")
//                         .attr("x", nodeData.x)
//                         .attr("y", nodeData.y + getNodeSize(nodeData.prominence) + 10)
//                         .attr("font-size", "10px")
//                         .attr("fill", "#333")
//                         .attr("text-anchor", "middle")
//                         .text(nodeData.label)
//                         .on("click", () => {
//                             setSelectedNode(nodeData);
//                         });
//                 }
//             } else if (nodeData.type === "comparative") {
//                 // Diamond path
//                 const diamondSize = 10;
//                 const diamondPath = `
//           M ${nodeData.x} ${nodeData.y - diamondSize}
//           L ${nodeData.x + diamondSize} ${nodeData.y}
//           L ${nodeData.x} ${nodeData.y + diamondSize}
//           L ${nodeData.x - diamondSize} ${nodeData.y}
//           Z
//         `;
//                 elementsGroup.append("path")
//                     .attr("d", diamondPath)
//                     .attr("fill", nodeData.color)
//                     .attr("stroke", "#fff")
//                     .attr("stroke-width", 1)
//                     .on("click", () => {
//                         setSelectedNode(nodeData);
//                     });

//                 if (showLabels) {
//                     elementsGroup.append("text")
//                         .attr("x", nodeData.x)
//                         .attr("y", nodeData.y + diamondSize + 12)
//                         .attr("font-size", "10px")
//                         .attr("fill", "#333")
//                         .attr("text-anchor", "middle")
//                         .text(nodeData.label)
//                         .on("click", () => {
//                             setSelectedNode(nodeData);
//                         });
//                 }
//             }
//         });

//         // Title
//         svg.append("text")
//             .attr("x", width / 2)
//             .attr("y", 25)
//             .attr("text-anchor", "middle")
//             .attr("font-size", "18px")
//             .attr("font-weight", "bold")
//             .text("3D Narrative Fingerprint");

//     }, [viewAngle, tiltAngle, zoomScale, dimensions, showLabels, highlightedAxis]);

//     // Update dimensions on resize
//     useEffect(() => {
//         const handleResize = () => {
//             if (svgRef.current && svgRef.current.parentElement) {
//                 setDimensions({
//                     width: svgRef.current.parentElement.clientWidth,
//                     height: svgRef.current.parentElement.clientWidth * 0.75
//                 });
//             }
//         };
//         window.addEventListener('resize', handleResize);
//         handleResize();
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Mouse event handlers for 3D rotation + wheel for zoom
//     const handleMouseDown = (e) => {
//         isDraggingRef.current = true;
//         startMouseRef.current = {x: e.clientX, y: e.clientY};
//         startAnglesRef.current = {view: viewAngle, tilt: tiltAngle};
//     };
//     const handleMouseUp = () => {
//         isDraggingRef.current = false;
//     };
//     const handleMouseMove = (e) => {
//         if (!isDraggingRef.current) return;
//         const dx = e.clientX - startMouseRef.current.x;
//         const dy = e.clientY - startMouseRef.current.y;
//         setViewAngle(startAnglesRef.current.view + dx * 0.3);
//         setTiltAngle(startAnglesRef.current.tilt - dy * 0.3);
//     };
//     const handleWheel = (e) => {
//         e.preventDefault();
//         setZoomScale((old) => {
//             let newScale = old - e.deltaY * 0.001;
//             if (newScale < 0.1) newScale = 0.1;
//             if (newScale > 5) newScale = 5;
//             return newScale;
//         });
//     };

//     // Initialise initial Angles on first render.
//     useEffect(() => {
//         setInitialViewAngle(viewAngle);
//         setInitialTiltAngle(tiltAngle)
//     }, [])

//     return (
//         <div className="max-w-7xl mx-auto py-8">
//             {/* Main Title */}
//             <h2 className="text-3xl font-bold text-center mb-6">3D Narrative Fingerprint</h2>

//             {/* Layout: left = 3D Viz, right = Info Panel */}
//             <div className="flex flex-col md:flex-row gap-6">

//                 {/* Main Content Box: 3D Viz + Controls */}
//                 <div className="bg-white shadow-lg rounded-lg p-4 flex-1">
//                     {/* Controls */}
//                     <div className="mb-4 flex flex-wrap justify-center gap-4">
//                         <div className="inline-block">
//                             <label htmlFor="view-angle"
//                                    className="block text-sm font-medium text-gray-700 mb-1">
//                                 Rotation (°)
//                             </label>
//                             <input
//                                 id="view-angle"
//                                 type="range"
//                                 min="0"
//                                 max="360"
//                                 value={viewAngle}
//                                 onChange={(e) => setViewAngle(parseInt(e.target.value))}
//                                 className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                             />
//                             <span className="ml-2 text-sm">{viewAngle.toFixed(1)}°</span>
//                         </div>

//                         <div className="inline-block">
//                             <label htmlFor="tilt-angle"
//                                    className="block text-sm font-medium text-gray-700 mb-1">
//                                 Tilt (°)
//                             </label>
//                             <input
//                                 id="tilt-angle"
//                                 type="range"
//                                 min="0"
//                                 max="90"
//                                 value={tiltAngle}
//                                 onChange={(e) => setTiltAngle(parseInt(e.target.value))}
//                                 className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                             />
//                             <span className="ml-2 text-sm">{tiltAngle.toFixed(1)}°</span>
//                         </div>

//                         <div className="inline-block flex items-end">
//                             <label className="inline-flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     checked={showLabels}
//                                     onChange={(e) => setShowLabels(e.target.checked)}
//                                     className="form-checkbox h-4 w-4 text-blue-600"
//                                 />
//                                 <span className="ml-2 text-sm text-gray-700">Show Labels</span>
//                             </label>
//                         </div>
//                     </div>


//                     {/* 3D Visualization with Mouse Drag & Wheel Zoom */}
//                     <div
//                         className="mb-6 border border-gray-200 rounded-lg bg-gray-50 relative"
//                         style={{width: '100%', height: `${dimensions.height}px`}} // Extend width to container
//                         onMouseDown={handleMouseDown}
//                         onMouseUp={handleMouseUp}
//                         onMouseMove={handleMouseMove}
//                         onWheel={handleWheel}
//                     >
//                         {/* Legend - Moved to top left */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 absolute top-4 left-4 z-10">
//                             <div className="p-3 bg-gray-50 rounded-lg">
//                                 <h3 className="text-sm font-medium mb-2">Node Types</h3>
//                                 <div className="flex items-center mb-1">
//                                     <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"/>
//                                     <span className="text-sm">Core Narrative Position</span>
//                                 </div>
//                                 <div className="flex items-center mb-1">
//                                     <div className="w-4 h-4 rounded-full bg-green-600 mr-2"/>
//                                     <span className="text-sm">Positive Narrative Element</span>
//                                 </div>
//                                 <div className="flex items-center mb-1">
//                                     <div className="w-4 h-4 rounded-full bg-red-600 mr-2"/>
//                                     <span className="text-sm">Negative Narrative Element</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <div className="w-4 h-4 transform rotate-45 bg-orange-500 mr-2"/>
//                                     <span className="text-sm">Comparative Narrative</span>
//                                 </div>
//                             </div>

//                             <div className="p-3 bg-gray-50 rounded-lg">
//                                 <h3 className="text-sm font-medium mb-2">Node Properties</h3>
//                                 <div className="flex items-center mb-1">
//                                     <span className="text-sm">Size = Prominence in text</span>
//                                 </div>
//                                 <div className="flex items-center mb-1">
//                                     <span className="text-sm">Colour intensity = Sentiment strength</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-sm">Ring = Narrative closure</span>
//                                 </div>
//                             </div>

//                             <div className="p-3 bg-gray-50 rounded-lg">
//                                 <h3 className="text-sm font-medium mb-2">Axis Dimensions</h3>
//                                 <div className="flex items-center mb-1">
//                                     <div className="w-2 h-2 rounded-full bg-green-600 mr-2"/>
//                                     <span className="text-sm">Environmental ↔ Economic</span>
//                                 </div>
//                                 <div className="flex items-center mb-1">
//                                     <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"/>
//                                     <span className="text-sm">Authority ↔ Accountability</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"/>
//                                     <span className="text-sm">Scientific ↔ Political</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Reset Button - Top Right */}
//                         <button
//                             className="absolute top-4 right-4 z-10 px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
//                             onClick={resetView}
//                         >
//                             Reset View
//                         </button>

//                         <svg
//                             ref={svgRef}
//                             width={dimensions.width}
//                             height={dimensions.height}
//                             className="w-full h-auto block"
//                             style={{
//                                 userSelect: 'none',
//                                 cursor: isDraggingRef.current ? 'grabbing' : 'grab'
//                             }}
//                         />
//                     </div>

//                     {/* Explanation */}
//                     <div className="mb-4">
//                         <h2 className="text-xl font-semibold mb-2">How to Read This Visualization</h2>
//                         <p className="text-sm text-gray-600">
//                             This 3D visualization positions the narrative in conceptual space along three key axes:
//                             Environmental-Economic, Authority-Accountability, and Scientific-Political. The core
//                             narrative
//                             position (blue sphere) shows the article’s central perspective, while satellite nodes
//                             represent specific narrative elements sized by prominence and coloured by sentiment.
//                             Comparative positions from other sources appear as diamond shapes.
//                             <br/><br/>
//                             <strong>Controls:</strong> Use the sliders to rotate and tilt the view,
//                             or <strong>click‐and‐drag</strong> to freely rotate in 3D.
//                             Scroll (mouse wheel) to zoom in and out. Clicking any node shows more info in the panel
//                             on the right.
//                         </p>
//                     </div>

//                     {/* Key Metrics */}
//                     <div className="mb-6">
//                         <h2 className="text-xl font-semibold mb-2">Key Narrative Positioning Metrics</h2>
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                             {narrativeData.axes.map((axis, i) => (
//                                 <div
//                                     key={i}
//                                     className="p-3 rounded-lg border flex flex-col items-center"
//                                     style={{
//                                         backgroundColor: `${axis.color}15`,
//                                         borderColor: axis.color
//                                     }}
//                                 >
//                                     <div className="text-lg font-bold">
//                                         {axis.value > 0 ? '+' : ''}{axis.value.toFixed(1)}
//                                     </div>
//                                     <div className="text-sm text-center">{axis.name}</div>
//                                     <div className="text-xs text-center mt-1">
//                                         {axis.value > 0
//                                             ? `Leans toward ${axis.positive}`
//                                             : `Leans toward ${axis.negative}`
//                                         }
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>


//                 </div>

//                 {/* Info Panel on the right */}
//                 <div className="w-full md:w-72 flex-shrink-0 p-4 bg-white border border-gray-200 rounded-lg h-max">
//                     {selectedNode ? (
//                         <div>
//                             <h3 className="text-lg font-medium mb-2">Node Details</h3>
//                             <p className="text-sm mb-2">
//                                 <strong>Label:</strong> {selectedNode.label}
//                             </p>
//                             {selectedNode.sentiment !== undefined && (
//                                 <p className="text-sm mb-2">
//                                     <strong>Sentiment:</strong> {selectedNode.sentiment.toFixed(2)}
//                                 </p>
//                             )}
//                             {selectedNode.prominence !== undefined && (
//                                 <p className="text-sm mb-2">
//                                     <strong>Prominence:</strong> {selectedNode.prominence}
//                                 </p>
//                             )}
//                             {selectedNode.closure !== undefined && (
//                                 <p className="text-sm mb-2">
//                                     <strong>Closure:</strong> {selectedNode.closure}
//                                 </p>
//                             )}
//                             {selectedNode.color && (
//                                 <p className="text-sm mb-2">
//                                     <strong>Colour:</strong> {selectedNode.color}
//                                 </p>
//                             )}
//                             {/* Example bullet list */}
//                             <ul className="list-disc ml-5 space-y-1 text-sm mt-3">
//                                 <li>Additional details can be added here.</li>
//                                 <li>Use data from your structure as needed.</li>
//                             </ul>
//                             <button
//                                 className="mt-4 px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
//                                 onClick={() => setSelectedNode(null)}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="text-sm text-gray-600">
//                             <h3 className="text-lg font-medium mb-2">No Node Selected</h3>
//                             <p>Click on any node in the 3D space to see more details here.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Methodology / Explanation Box */}
//             <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
//                 <h3 className="font-medium mb-2">3D Fingerprint Methodology</h3>
//                 <ol className="list-decimal ml-5 space-y-1">
//                     <li>Position the narrative in 3D conceptual space along three key axes of tension.</li>
//                     <li>Place individual narrative elements as satellite nodes around the core position.</li>
//                     <li>Represent sentiment through colour (green = positive, red = negative).</li>
//                     <li>Size nodes according to their prominence in the text.</li>
//                     <li>Indicate narrative closure with rings around fully resolved elements.</li>
//                     <li>Compare with other narratives on the same topic (diamond shapes).</li>
//                     <li>
//                         <strong>Drag with mouse to rotate freely in 3D</strong>, use the sliders for
//                         manual angle control, and scroll to zoom.
//                     </li>
//                 </ol>
//                 <p className="mt-3">
//                     This 3D fingerprint creates a spatial representation of the narrative’s ideological
//                     positioning and internal structure, making it possible to visually compare different
//                     narratives and identify patterns across sources, topics, or time periods.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Narrative3DFingerprint;










import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Narrative3DFingerprint = () => {
    const svgRef = useRef(null);

    // Angles for 3D rotation
    const [viewAngle, setViewAngle] = useState(45);  // Y-axis rotation
    const [tiltAngle, setTiltAngle] = useState(30);  // X-axis tilt

    // Store initial angles for reset button
    const [initialViewAngle, setInitialViewAngle] = useState(45);
    const [initialTiltAngle, setInitialTiltAngle] = useState(30);

    // Zoom scale for 3D projection
    const [zoomScale, setZoomScale] = useState(1);

    // Whether to show labels on nodes
    const [showLabels, setShowLabels] = useState(true);

    // Which axis is highlighted (if any)
    const [highlightedAxis, setHighlightedAxis] = useState(null);

    // Which node is currently selected (for info panel)
    const [selectedNode, setSelectedNode] = useState(null);

    // Mouse-based rotation
    const isDraggingRef = useRef(false);
    const startMouseRef = useRef({x: 0, y: 0});
    const startAnglesRef = useRef({view: 45, tilt: 30});

    // SVG dimensions
    const [dimensions, setDimensions] = useState({width: 800, height: 600});

    // Sample data
    const narrativeData = {
        corePosition: [0.6, 0.3, 0.4],
        axes: [
            {
                id: "env_econ",
                name: "Environmental-Economic",
                positive: "Environmental Action",
                negative: "Economic Concern",
                value: 0.6,
                color: "#4CAF50"
            },
            {
                id: "auth_acc",
                name: "Authority-Accountability",
                positive: "Government Authority",
                negative: "Public Accountability",
                value: 0.3,
                color: "#2196F3"
            },
            {
                id: "sci_pol",
                name: "Scientific-Political",
                positive: "Scientific Consensus",
                negative: "Political Expediency",
                value: 0.4,
                color: "#9C27B0"
            }
        ],
        narrativeElements: [
            {
                id: "gov_action",
                label: "Government Action",
                position: [0.7, 0.5, 0.3],
                sentiment: 0.6,
                prominence: 0.9,
                closure: 1.0
            },
            {
                id: "opp_criticism",
                label: "Opposition Criticism",
                position: [0.0, 0.2, 0.0],
                sentiment: -0.4,
                prominence: 0.6,
                closure: 0.67
            },
            {
                id: "sci_support",
                label: "Scientific Support",
                position: [0.5, 0.1, 0.8],
                sentiment: 0.5,
                prominence: 0.7,
                closure: 0.67
            },
            {
                id: "econ_concern",
                label: "Economic Concerns",
                position: [-0.7, 0.2, 0.1],
                sentiment: -0.5,
                prominence: 0.5,
                closure: 0.67
            },
            {
                id: "climate_urgency",
                label: "Climate Urgency",
                position: [0.8, 0.0, 0.5],
                sentiment: 0.7,
                prominence: 0.8,
                closure: 0.67
            },
            {
                id: "public_protest",
                label: "Public Protest",
                position: [0.3, -0.6, 0.2],
                sentiment: 0.2,
                prominence: 0.4,
                closure: 0.33
            },
            {
                id: "impl_challenges",
                label: "Implementation Challenges",
                position: [0.4, 0.4, 0.1],
                sentiment: -0.2,
                prominence: 0.5,
                closure: 0.33
            }
        ],
        comparativeNarratives: [
            {
                id: "business_press",
                label: "Business Press",
                position: [-0.3, 0.4, 0.1],
                color: "#FF9800"
            },
            {
                id: "environmental_org",
                label: "Environmental Org",
                position: [0.8, -0.5, 0.6],
                color: "#009688"
            },
            {
                id: "scientific_journal",
                label: "Scientific Journal",
                position: [0.3, 0.2, 0.8],
                color: "#3F51B5"
            }
        ]
    };

    // Colour from sentiment
    const getSentimentColor = (sentiment) => {
        if (sentiment > 0) {
            return d3.interpolateRgb("#FFFFFF", "#1B5E20")(sentiment);
        } else if (sentiment < 0) {
            return d3.interpolateRgb("#FFFFFF", "#B71C1C")(Math.abs(sentiment));
        }
        return "#AAAAAA";
    };

    // Node size from prominence
    const getNodeSize = (prominence) => 5 + (prominence * 15);

    // Project 3D coords to 2D
    const project3Dto2D = (x, y, z, width, height) => {
        const angleRad = (viewAngle * Math.PI) / 180;
        const tiltRad = (tiltAngle * Math.PI) / 180;
        const projectionScale = 300;

        // Y-axis rotation
        const rotX = x * Math.cos(angleRad) + z * Math.sin(angleRad);
        const rotZ = -x * Math.sin(angleRad) + z * Math.cos(angleRad);

        // X-axis tilt
        const rotY = y * Math.cos(tiltRad) - rotZ * Math.sin(tiltRad);
        const finalZ = y * Math.sin(tiltRad) + rotZ * Math.cos(tiltRad);

        // perspective
        const perspective = 1 + (finalZ * 0.3);
        const scaledProjection = projectionScale * zoomScale;

        const screenX = (width / 2) + (rotX * scaledProjection) / perspective;
        const screenY = (height / 2) + (rotY * scaledProjection) / perspective;
        return {x: screenX, y: screenY, z: finalZ};
    };

    // Reset View
    const resetView = () => {
        setViewAngle(initialViewAngle);
        setTiltAngle(initialTiltAngle);
        setZoomScale(1); // Reset zoom too if you like
    };

    // D3 drawing
    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = dimensions.width;
        const height = dimensions.height;

        // main group
        const mainGroup = svg.append("g").attr("class", "main-group");

        // Axes group
        const axesGroup = mainGroup.append("g").attr("class", "axes-group");

        // Draw axes
        narrativeData.axes.forEach((axis, i) => {
            const origin2D = project3Dto2D(0, 0, 0, width, height);
            let pos2D, neg2D;
            if (i === 0) {
                pos2D = project3Dto2D(1, 0, 0, width, height);
                neg2D = project3Dto2D(-1, 0, 0, width, height);
            } else if (i === 1) {
                pos2D = project3Dto2D(0, 1, 0, width, height);
                neg2D = project3Dto2D(0, -1, 0, width, height);
            } else {
                pos2D = project3Dto2D(0, 0, 1, width, height);
                neg2D = project3Dto2D(0, 0, -1, width, height);
            }

            // Negative axis
            axesGroup.append("line")
                .attr("x1", origin2D.x)
                .attr("y1", origin2D.y)
                .attr("x2", neg2D.x)
                .attr("y2", neg2D.y)
                .attr("stroke", axis.color)
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", "5,3")
                .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);

            // Negative label
            if (showLabels) {
                axesGroup.append("text")
                    .attr("x", neg2D.x)
                    .attr("y", neg2D.y + 15)
                    .attr("font-size", "10px")
                    .attr("fill", axis.color)
                    .attr("text-anchor", "middle")
                    .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
                    .text(axis.negative);
            }

            // Positive axis
            axesGroup.append("line")
                .attr("x1", origin2D.x)
                .attr("y1", origin2D.y)
                .attr("x2", pos2D.x)
                .attr("y2", pos2D.y)
                .attr("stroke", axis.color)
                .attr("stroke-width", 1.5)
                .attr("stroke-opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2);

            // Positive label
            if (showLabels) {
                axesGroup.append("text")
                    .attr("x", pos2D.x)
                    .attr("y", pos2D.y - 10)
                    .attr("font-size", "10px")
                    .attr("fill", axis.color)
                    .attr("text-anchor", "middle")
                    .attr("opacity", highlightedAxis === axis.id || !highlightedAxis ? 1 : 0.2)
                    .text(axis.positive);
            }
        });

        // Origin
        const origin2D = project3Dto2D(0, 0, 0, width, height);
        mainGroup.append("circle")
            .attr("cx", origin2D.x)
            .attr("cy", origin2D.y)
            .attr("r", 3)
            .attr("fill", "#666");

        // Project narrative elements
        const projectedElements = narrativeData.narrativeElements.map(elem => {
            const p = project3Dto2D(elem.position[0], elem.position[1], elem.position[2], width, height);
            return {...elem, ...p, type: "element"};
        }).sort((a, b) => a.z - b.z);

        // Project core
        const coreProjected = project3Dto2D(
            narrativeData.corePosition[0],
            narrativeData.corePosition[1],
            narrativeData.corePosition[2],
            width,
            height
        );
        // We'll treat the core as a node object for consistent click logic
        const coreNode = {
            id: "core_node",
            label: "Core Narrative",
            type: "core",
            x: coreProjected.x,
            y: coreProjected.y,
            z: coreProjected.z
        };

        // Project comparative narratives
        const compNodes = narrativeData.comparativeNarratives.map(comp => {
            const p = project3Dto2D(comp.position[0], comp.position[1], comp.position[2], width, height);
            return {...comp, ...p, type: "comparative"};
        });

        // Combine them for easier iteration
        const allNodes = [coreNode, ...projectedElements, ...compNodes];

        // Draw lines from core to elements
        const elementsGroup = mainGroup.append("g").attr("class", "narrative-elements");
        projectedElements.forEach(elem => {
            elementsGroup.append("line")
                .attr("x1", coreNode.x)
                .attr("y1", coreNode.y)
                .attr("x2", elem.x)
                .attr("y2", elem.y)
                .attr("stroke", getSentimentColor(elem.sentiment))
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.5);
        });

        // Draw circles for narrative elements, diamond for comparative, big circle for core
        allNodes.forEach(nodeData => {
            if (nodeData.type === "core") {
                // Draw the big blue circle
                elementsGroup.append("circle")
                    .attr("cx", nodeData.x)
                    .attr("cy", nodeData.y)
                    .attr("r", 20)
                    .attr("fill", "#1565C0")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 2)
                    .on("click", () => {
                        setSelectedNode(nodeData);
                    });
                elementsGroup.append("text")
                    .attr("x", nodeData.x)
                    .attr("y", nodeData.y + 5)
                    .attr("text-anchor", "middle")
                    .attr("font-size", "12px")
                    .attr("fill", "#fff")
                    .attr("font-weight", "bold")
                    .text("Core")
                    .on("click", () => {
                        setSelectedNode(nodeData);
                    });
            } else if (nodeData.type === "element") {
                // Draw a circle
                elementsGroup.append("circle")
                    .attr("cx", nodeData.x)
                    .attr("cy", nodeData.y)
                    .attr("r", getNodeSize(nodeData.prominence))
                    .attr("fill", getSentimentColor(nodeData.sentiment))
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 1)
                    .on("click", () => {
                        setSelectedNode(nodeData);
                    });

                // If closure > 0.8, ring around node
                if (nodeData.closure > 0.8) {
                    elementsGroup.append("circle")
                        .attr("cx", nodeData.x)
                        .attr("cy", nodeData.y)
                        .attr("r", getNodeSize(nodeData.prominence) + 3)
                        .attr("fill", "none")
                        .attr("stroke", "#333")
                        .attr("stroke-width", 1)
                        .on("click", () => {
                            setSelectedNode(nodeData);
                        });
                }

                if (showLabels) {
                    elementsGroup.append("text")
                        .attr("x", nodeData.x)
                        .attr("y", nodeData.y + getNodeSize(nodeData.prominence) + 10)
                        .attr("font-size", "10px")
                        .attr("fill", "#333")
                        .attr("text-anchor", "middle")
                        .text(nodeData.label)
                        .on("click", () => {
                            setSelectedNode(nodeData);
                        });
                }
            } else if (nodeData.type === "comparative") {
                // Diamond path
                const diamondSize = 10;
                const diamondPath = `
          M ${nodeData.x} ${nodeData.y - diamondSize}
          L ${nodeData.x + diamondSize} ${nodeData.y}
          L ${nodeData.x} ${nodeData.y + diamondSize}
          L ${nodeData.x - diamondSize} ${nodeData.y}
          Z
        `;
                elementsGroup.append("path")
                    .attr("d", diamondPath)
                    .attr("fill", nodeData.color)
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 1)
                    .on("click", () => {
                        setSelectedNode(nodeData);
                    });

                if (showLabels) {
                    elementsGroup.append("text")
                        .attr("x", nodeData.x)
                        .attr("y", nodeData.y + diamondSize + 12)
                        .attr("font-size", "10px")
                        .attr("fill", "#333")
                        .attr("text-anchor", "middle")
                        .text(nodeData.label)
                        .on("click", () => {
                            setSelectedNode(nodeData);
                        });
                }
            }
        });

        // Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .attr("font-size", "18px")
            .attr("font-weight", "bold")
            .text("3D Narrative Fingerprint");

    }, [viewAngle, tiltAngle, zoomScale, dimensions, showLabels, highlightedAxis]);

    // Update dimensions on resize
    useEffect(() => {
        const handleResize = () => {
            if (svgRef.current && svgRef.current.parentElement) {
                setDimensions({
                    width: svgRef.current.parentElement.clientWidth,
                    height: svgRef.current.parentElement.clientWidth * 0.75
                });
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mouse event handlers for 3D rotation + wheel for zoom
    const handleMouseDown = (e) => {
        isDraggingRef.current = true;
        startMouseRef.current = {x: e.clientX, y: e.clientY};
        startAnglesRef.current = {view: viewAngle, tilt: tiltAngle};
    };
    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };
    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;
        const dx = e.clientX - startMouseRef.current.x;
        const dy = e.clientY - startMouseRef.current.y;
        setViewAngle(startAnglesRef.current.view + dx * 0.3);
        setTiltAngle(startAnglesRef.current.tilt - dy * 0.3);
    };
    const handleWheel = (e) => {
        e.preventDefault();
        setZoomScale((old) => {
            let newScale = old - e.deltaY * 0.001;
            if (newScale < 0.1) newScale = 0.1;
            if (newScale > 5) newScale = 5;
            return newScale;
        });
    };

    // Initialise initial Angles on first render.
    useEffect(() => {
        setInitialViewAngle(viewAngle);
        setInitialTiltAngle(tiltAngle)
    }, [])

    return (
        <div className="max-w-7xl mx-auto py-8">
            {/* Main Title */}
            <h2 className="text-3xl font-bold text-center mb-6">3D Narrative Fingerprint</h2>

            {/* Layout: left = 3D Viz, right = Info Panel */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* Main Content Box: 3D Viz + Controls */}
                <div className="bg-white shadow-lg rounded-lg p-4 flex-1">
                    {/* Controls */}
                    <div className="mb-4 flex flex-wrap justify-center gap-4">
                        <div className="inline-block">
                            <label htmlFor="view-angle"
                                   className="block text-sm font-medium text-gray-700 mb-1">
                                Rotation (°)
                            </label>
                            <input
                                id="view-angle"
                                type="range"
                                min="0"
                                max="360"
                                value={viewAngle}
                                onChange={(e) => setViewAngle(parseInt(e.target.value))}
                                className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="ml-2 text-sm">{viewAngle.toFixed(1)}°</span>
                        </div>

                        <div className="inline-block">
                            <label htmlFor="tilt-angle"
                                   className="block text-sm font-medium text-gray-700 mb-1">
                                Tilt (°)
                            </label>
                            <input
                                id="tilt-angle"
                                type="range"
                                min="0"
                                max="90"
                                value={tiltAngle}
                                onChange={(e) => setTiltAngle(parseInt(e.target.value))}
                                className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="ml-2 text-sm">{tiltAngle.toFixed(1)}°</span>
                        </div>

                        <div className="inline-block flex items-end">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showLabels}
                                    onChange={(e) => setShowLabels(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-sm text-gray-700">Show Labels</span>
                            </label>
                        </div>
                    </div>


                    {/* 3D Visualization with Mouse Drag & Wheel Zoom */}
                    <div
                        className="mb-6 border border-gray-200 rounded-lg bg-gray-50 relative"
                        style={{width: '100%', height: `${dimensions.height}px`}} // Extend width to container
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onWheel={handleWheel}
                    >

                        {/* Reset Button - Top Right */}
                        <button
                            className="absolute top-4 right-4 z-10 px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                            onClick={resetView}
                        >
                            Reset View
                        </button>

                        <svg
                            ref={svgRef}
                            width={dimensions.width}
                            height={dimensions.height}
                            className="w-full h-auto block"
                            style={{
                                userSelect: 'none',
                                cursor: isDraggingRef.current ? 'grabbing' : 'grab'
                            }}
                        />
                    </div>

                    {/* Explanation */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">How to Read This Visualization</h2>
                        <p className="text-sm text-gray-600">
                            This 3D visualization positions the narrative in conceptual space along three key axes:
                            Environmental-Economic, Authority-Accountability, and Scientific-Political. The core
                            narrative
                            position (blue sphere) shows the article’s central perspective, while satellite nodes
                            represent specific narrative elements sized by prominence and coloured by sentiment.
                            Comparative positions from other sources appear as diamond shapes.
                            <br/><br/>
                            <strong>Controls:</strong> Use the sliders to rotate and tilt the view,
                            or <strong>click‐and‐drag</strong> to freely rotate in 3D.
                            Scroll (mouse wheel) to zoom in and out. Clicking any node shows more info in the panel
                            on the right.
                        </p>
                    </div>

                    {/* Key Metrics */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Key Narrative Positioning Metrics</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {narrativeData.axes.map((axis, i) => (
                                <div
                                    key={i}
                                    className="p-3 rounded-lg border flex flex-col items-center"
                                    style={{
                                        backgroundColor: `${axis.color}15`,
                                        borderColor: axis.color
                                    }}
                                >
                                    <div className="text-lg font-bold">
                                        {axis.value > 0 ? '+' : ''}{axis.value.toFixed(1)}
                                    </div>
                                    <div className="text-sm text-center">{axis.name}</div>
                                    <div className="text-xs text-center mt-1">
                                        {axis.value > 0
                                            ? `Leans toward ${axis.positive}`
                                            : `Leans toward ${axis.negative}`
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>

                {/* Info Panel on the right */}
                <div className="w-full md:w-72 flex-shrink-0 p-4 bg-white border border-gray-200 rounded-lg h-max">
                    {selectedNode ? (
                        <div>
                            <h3 className="text-lg font-medium mb-2">Node Details</h3>
                            <p className="text-sm mb-2">
                                <strong>Label:</strong> {selectedNode.label}
                            </p>
                            {selectedNode.sentiment !== undefined && (
                                <p className="text-sm mb-2">
                                    <strong>Sentiment:</strong> {selectedNode.sentiment.toFixed(2)}
                                </p>
                            )}
                            {selectedNode.prominence !== undefined && (
                                <p className="text-sm mb-2">
                                    <strong>Prominence:</strong> {selectedNode.prominence}
                                </p>
                            )}
                            {selectedNode.closure !== undefined && (
                                <p className="text-sm mb-2">
                                    <strong>Closure:</strong> {selectedNode.closure}
                                </p>
                            )}
                            {selectedNode.color && (
                                <p className="text-sm mb-2">
                                    <strong>Colour:</strong> {selectedNode.color}
                                </p>
                            )}
                            {/* Example bullet list */}
                            <ul className="list-disc ml-5 space-y-1 text-sm mt-3">
                                <li>Additional details can be added here.</li>
                                <li>Use data from your structure as needed.</li>
                            </ul>
                            <button
                                className="mt-4 px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                                onClick={() => setSelectedNode(null)}
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-600">
                            <h3 className="text-lg font-medium mb-2">No Node Selected</h3>
                            <p>Click on any node in the 3D space to see more details here.</p>
                        </div>
                    )}

                    {/* Legend - Stacked and Reformatted */}
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Legend</h3>

                        {/* Node Types */}
                        <div className="mb-3">
                            <h4 className="text-md font-semibold mb-1">Node Types</h4>
                            <div className="flex items-center mb-1">
                                <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"/>
                                <span className="text-xs text-gray-700">Core Narrative Position</span>
                            </div>
                            <div className="flex items-center mb-1">
                                <div className="w-3 h-3 rounded-full bg-green-600 mr-2"/>
                                <span className="text-xs text-gray-700">Positive Narrative Element</span>
                            </div>
                            <div className="flex items-center mb-1">
                                <div className="w-3 h-3 rounded-full bg-red-600 mr-2"/>
                                <span className="text-xs text-gray-700">Negative Narrative Element</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 transform rotate-45 bg-orange-500 mr-2"/>
                                <span className="text-xs text-gray-700">Comparative Narrative</span>
                            </div>
                        </div>

                        {/* Node Properties */}
                        <div className="mb-3">
                            <h4 className="text-md font-semibold mb-1">Node Properties</h4>
                            <div className="flex items-center mb-1">
                                <span className="text-xs text-gray-700">Size = Prominence in text</span>
                            </div>
                            <div className="flex items-center mb-1">
                                <span className="text-xs text-gray-700">Colour intensity = Sentiment strength</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-xs text-gray-700">Ring = Narrative closure</span>
                            </div>
                        </div>

                        {/* Axis Dimensions */}
                        <div>
                            <h4 className="text-md font-semibold mb-1">Axis Dimensions</h4>
                            <div className="flex items-center mb-1">
                                <div className="w-2 h-2 rounded-full bg-green-600 mr-2"/>
                                <span className="text-xs text-gray-700">Environmental ↔ Economic</span>
                            </div>
                            <div className="flex items-center mb-1">
                                <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"/>
                                <span className="text-xs text-gray-700">Authority ↔ Accountability</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"/>
                                <span className="text-xs text-gray-700">Scientific ↔ Political</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Methodology / Explanation Box */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                <h3 className="font-medium mb-2">3D Fingerprint Methodology</h3>
                <ol className="list-decimal ml-5 space-y-1">
                    <li>Position the narrative in 3D conceptual space along three key axes of tension.</li>
                    <li>Place individual narrative elements as satellite nodes around the core position.</li>
                    <li>Represent sentiment through colour (green = positive, red = negative).</li>
                    <li>Size nodes according to their prominence in the text.</li>
                    <li>Indicate narrative closure with rings around fully resolved elements.</li>
                    <li>Compare with other narratives on the same topic (diamond shapes).</li>
                    <li>
                        <strong>Drag with mouse to rotate freely in 3D</strong>, use the sliders for
                        manual angle control, and scroll to zoom.
                    </li>
                </ol>
                <p className="mt-3">
                    This 3D fingerprint creates a spatial representation of the narrative’s ideological
                    positioning and internal structure, making it possible to visually compare different
                    narratives and identify patterns across sources, topics, or time periods.
                </p>
            </div>
        </div>
    );
};

export default Narrative3DFingerprint;









