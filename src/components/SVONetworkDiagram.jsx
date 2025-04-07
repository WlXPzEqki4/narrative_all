import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SVONetworkDiagram = () => {
  const svgRef = useRef(null);
  
  // Sample narrative data with explicit SVO structure
  const narrativeData = {
    nodes: [
      // Subjects
      { id: "s1", label: "Government", type: "subject" },
      { id: "s2", label: "Opposition", type: "subject" },
      { id: "s3", label: "Protesters", type: "subject" },
      { id: "s4", label: "Scientists", type: "subject" },
      { id: "s5", label: "Media", type: "subject" },
      
      // Verbs
      { id: "v1", label: "announces", type: "verb" },
      { id: "v2", label: "opposes", type: "verb" },
      { id: "v3", label: "demonstrate against", type: "verb" },
      { id: "v4", label: "supports", type: "verb" },
      { id: "v5", label: "reports on", type: "verb" },
      { id: "v6", label: "criticizes", type: "verb" },
      { id: "v7", label: "warns about", type: "verb" },
      
      // Objects
      { id: "o1", label: "new policy", type: "object" },
      { id: "o2", label: "budget cuts", type: "object" },
      { id: "o3", label: "research findings", type: "object" },
      { id: "o4", label: "public reaction", type: "object" },
      { id: "o5", label: "climate targets", type: "object" }
    ],
    links: [
      // Government announces new policy
      { source: "s1", target: "v1", label: "AGENT" },
      { source: "v1", target: "o1", label: "THEME" },
      
      // Opposition opposes new policy
      { source: "s2", target: "v2", label: "AGENT" },
      { source: "v2", target: "o1", label: "THEME" },
      
      // Opposition criticizes budget cuts
      { source: "s2", target: "v6", label: "AGENT" },
      { source: "v6", target: "o2", label: "THEME" },
      
      // Protesters demonstrate against budget cuts
      { source: "s3", target: "v3", label: "AGENT" },
      { source: "v3", target: "o2", label: "THEME" },
      
      // Scientists support research findings
      { source: "s4", target: "v4", label: "AGENT" },
      { source: "v4", target: "o3", label: "THEME" },
      
      // Scientists warn about climate targets
      { source: "s4", target: "v7", label: "AGENT" },
      { source: "v7", target: "o5", label: "THEME" },
      
      // Media reports on public reaction
      { source: "s5", target: "v5", label: "AGENT" },
      { source: "v5", target: "o4", label: "THEME" },
      
      // Media reports on research findings
      { source: "s5", target: "v5", label: "AGENT" },
      { source: "v5", target: "o3", label: "THEME" }
    ]
  };

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear any existing SVG content
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    // Dimensions for the force simulation
    const width = 800;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    
    // Create a group for the graph
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Define colour scheme for node types
    const nodeColors = {
      subject: "#4285F4", // Blue
      verb: "#EA4335",    // Red
      object: "#34A853"   // Green
    };
    
    // Define shapes for node types
    const nodeShapes = {
      subject: d3.symbol().type(d3.symbolCircle).size(500),
      verb: d3.symbol().type(d3.symbolDiamond).size(500),
      object: d3.symbol().type(d3.symbolSquare).size(500)
    };
    
    // Create force simulation
    const simulation = d3.forceSimulation(narrativeData.nodes)
      .force("link", d3.forceLink(narrativeData.links)
        .id(d => d.id)
        .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2 - margin.left, height / 2 - margin.top))
      .force("x", d3.forceX())
      .force("y", d3.forceY());
    
    // Add links (edges)
    const link = g.append("g")
      .attr("class", "links")
      .selectAll("g")
      .data(narrativeData.links)
      .enter()
      .append("g");
    
    const path = link.append("path")
      .attr("fill", "none")
      .attr("stroke", "#999")
      .attr("stroke-width", 1.5);
    
    // Add edge labels
    const edgeLabels = link.append("text")
      .attr("class", "edge-label")
      .attr("dy", -5)
      .attr("text-anchor", "middle")
      .attr("fill", "#666")
      .attr("font-size", "10px")
      .text(d => d.label);
    
    // Add nodes
    const node = g.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(narrativeData.nodes)
      .enter()
      .append("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );
    
    // Add node shapes based on type
    node.append("path")
      .attr("d", d => nodeShapes[d.type]())
      .attr("fill", d => nodeColors[d.type])
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);
    
    // Add node labels
    node.append("text")
      .attr("dy", d => d.type === "verb" ? -15 : 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#333")
      .attr("font-size", "12px")
      .text(d => d.label);

    // (Removed the old inline D3 title here to position it separately in the JSX)
    
    // Legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 150}, 60)`);
    
    const legendItems = [
      { type: "subject", label: "Subject" },
      { type: "verb", label: "Verb" },
      { type: "object", label: "Object" }
    ];
    
    legendItems.forEach((item, i) => {
      const lg = legend.append("g")
        .attr("transform", `translate(0, ${i * 30})`);
      
      lg.append("path")
        .attr("d", nodeShapes[item.type]())
        .attr("fill", nodeColors[item.type])
        .attr("stroke", "#fff");
      
      lg.append("text")
        .attr("x", 20)
        .attr("y", 5)
        .attr("font-size", "12px")
        .text(item.label);
    });
    
    // Update positions on simulation tick
    simulation.on("tick", () => {
      // Update edge paths (arcs)
      path.attr("d", d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy) * 2; // Curve the path
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      });
      
      // Update edge labels
      edgeLabels.attr("transform", d => {
        const midX = (d.source.x + d.target.x) / 2;
        const midY = (d.source.y + d.target.y) / 2;
        
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        // Adjust angle to keep text readable
        const adjustedAngle = angle > 90 || angle < -90 ? angle + 180 : angle;
        
        return `translate(${midX}, ${midY}) rotate(${adjustedAngle})`;
      });
      
      // Update nodes
      node.attr("transform", d => `translate(${d.x}, ${d.y})`);
    });
    
    // Drag behaviour
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
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Title above the diagram box */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Subject-Verb-Object Narrative Network
      </h2>
      
      {/* Diagram Box */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="relative w-full h-[600px]">
          <svg
            ref={svgRef}
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
          />
        </div>
      </div>
      
      {/* User Guide Box */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
        <h3 className="text-xl font-semibold mb-2">User Guide</h3>
        <p>
          This network diagram visualises the linguistic structure of narratives using Subject-Verb-Object (SVO) triplets. Each node represents a linguistic component:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li><span className="text-blue-600 font-medium">Blue circles</span>: Subjects (who is performing the action)</li>
          <li><span className="text-red-600 font-medium">Red diamonds</span>: Verbs (the action being performed)</li>
          <li><span className="text-green-600 font-medium">Green squares</span>: Objects (what is being affected by the action)</li>
        </ul>
        <p className="mt-2">
          The edge labels show semantic roles (AGENT = who performs the action, THEME = what receives the action).
        </p>
        <p className="mt-2">
          This visualisation helps identify key actors, common actions, and targets in news narratives, revealing patterns in how stories are structured and framed.
        </p>
      </div>
    </div>
  );
};

export default SVONetworkDiagram;
