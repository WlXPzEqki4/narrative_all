import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3'; // Import D3

const InteractiveConceptMap = () => {
    const [filterThreshold, setFilterThreshold] = useState(0);
    const [groupingMode, setGroupingMode] = useState('category');
    const [showRelationLabels, setShowRelationLabels] = useState(true);
    const [selectedConcept, setSelectedConcept] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const svgRef = useRef(null);
    const [dimensions, setDimensions] = useState({width: 800, height: 500});

    // Comprehensive data structure for concept map visualization
    const conceptData = {
        // Primary concepts extracted from the article
        concepts: [
            {
                id: "climate_policy",
                label: "Climate Policy",
                category: "policy",
                type: "concrete",
                frequency: 8,
                paragraphs: [1, 2, 3, 5, 6, 7, 8],
                sentiment: 0.4,
                centrality: 0.9,
                description: "The government's plan to reduce carbon emissions by 60% before 2035"
            },
            {
                id: "carbon_reduction",
                label: "Carbon Reduction",
                category: "environmental",
                type: "goal",
                frequency: 3,
                paragraphs: [1],
                sentiment: 0.6,
                centrality: 0.7,
                description: "The target of 60% reduction in carbon emissions by 2035"
            },
            {
                id: "renewable_energy",
                label: "Renewable Energy",
                category: "environmental",
                type: "solution",
                frequency: 2,
                paragraphs: [1],
                sentiment: 0.7,
                centrality: 0.6,
                description: "Investments in renewable energy sources as part of the policy"
            },
            {
                id: "fossil_subsidies",
                label: "Fossil Fuel Subsidies",
                category: "economic",
                type: "policy",
                frequency: 1,
                paragraphs: [1],
                sentiment: -0.2,
                centrality: 0.5,
                description: "Government subsidies for fossil fuels to be phased out"
            },
            {
                id: "climate_crisis",
                label: "Climate Crisis",
                category: "environmental",
                type: "framing",
                frequency: 1,
                paragraphs: [2],
                sentiment: -0.6,
                centrality: 0.6,
                description: "Framing of climate change as an urgent crisis requiring action"
            },
            {
                id: "economic_impact",
                label: "Economic Impact",
                category: "economic",
                type: "consequence",
                frequency: 4,
                paragraphs: [3, 7],
                sentiment: -0.7,
                centrality: 0.8,
                description: "Potential economic consequences of the climate policy"
            },
            {
                id: "industrial_sectors",
                label: "Industrial Sectors",
                category: "economic",
                type: "stakeholder",
                frequency: 1,
                paragraphs: [3],
                sentiment: -0.3,
                centrality: 0.5,
                description: "Industries potentially affected by the policy"
            },
            {
                id: "taxpayer_burden",
                label: "Taxpayer Burden",
                category: "economic",
                type: "consequence",
                frequency: 1,
                paragraphs: [3],
                sentiment: -0.8,
                centrality: 0.4,
                description: "Potential costs to taxpayers from the policy"
            },
            {
                id: "job_losses",
                label: "Job Losses",
                category: "economic",
                type: "consequence",
                frequency: 1,
                paragraphs: [3],
                sentiment: -0.9,
                centrality: 0.5,
                description: "Potential job losses in traditional energy sectors"
            },
            {
                id: "scientific_consensus",
                label: "Scientific Consensus",
                category: "scientific",
                type: "validation",
                frequency: 2,
                paragraphs: [5],
                sentiment: 0.6,
                centrality: 0.7,
                description: "Scientific agreement on necessary climate action"
            },
            {
                id: "implementation_challenges",
                label: "Implementation Challenges",
                category: "practical",
                type: "obstacle",
                frequency: 2,
                paragraphs: [5, 7],
                sentiment: -0.4,
                centrality: 0.6,
                description: "Practical challenges in implementing the climate policy"
            },
            {
                id: "public_opinion",
                label: "Public Opinion",
                category: "social",
                type: "response",
                frequency: 2,
                paragraphs: [6],
                sentiment: 0.0,
                centrality: 0.5,
                description: "Public reaction to the climate policy announcement"
            }
        ],

        // Relationships between concepts
        relationships: [
            {source: "climate_policy", target: "carbon_reduction", type: "includes", strength: 0.9},
            {source: "climate_policy", target: "renewable_energy", type: "promotes", strength: 0.8},
            {source: "climate_policy", target: "fossil_subsidies", type: "phases out", strength: 0.7},
            {source: "climate_policy", target: "economic_impact", type: "creates", strength: 0.8},
            {source: "climate_crisis", target: "climate_policy", type: "motivates", strength: 0.7},
            {source: "economic_impact", target: "industrial_sectors", type: "affects", strength: 0.8},
            {source: "economic_impact", target: "taxpayer_burden", type: "includes", strength: 0.7},
            {source: "economic_impact", target: "job_losses", type: "includes", strength: 0.7},
            {source: "scientific_consensus", target: "climate_policy", type: "supports", strength: 0.8},
            {source: "climate_policy", target: "implementation_challenges", type: "faces", strength: 0.7},
            {source: "climate_policy", target: "public_opinion", type: "influences", strength: 0.6},
            {source: "carbon_reduction", target: "scientific_consensus", type: "aligns with", strength: 0.7}
        ],

        // Stakeholder positions on key concepts
        stakeholderPositions: [
            {stakeholder: "Government", concept: "climate_policy", position: 0.9, confidence: 0.9},
            {stakeholder: "Government", concept: "carbon_reduction", position: 0.9, confidence: 0.9},
            {stakeholder: "Government", concept: "economic_impact", position: 0.3, confidence: 0.6},

            {stakeholder: "Opposition", concept: "climate_policy", position: -0.7, confidence: 0.8},
            {stakeholder: "Opposition", concept: "economic_impact", position: -0.9, confidence: 0.9},
            {stakeholder: "Opposition", concept: "taxpayer_burden", position: -0.9, confidence: 0.9},
            {stakeholder: "Opposition", concept: "job_losses", position: -0.9, confidence: 0.9},

            {stakeholder: "Scientists", concept: "climate_policy", position: 0.8, confidence: 0.9},
            {stakeholder: "Scientists", concept: "carbon_reduction", position: 0.9, confidence: 0.9},
            {stakeholder: "Scientists", concept: "implementation_challenges", position: -0.5, confidence: 0.7},
            {stakeholder: "Scientists", concept: "scientific_consensus", position: 0.9, confidence: 0.9},

            {stakeholder: "Industry", concept: "climate_policy", position: -0.3, confidence: 0.7},
            {stakeholder: "Industry", concept: "economic_impact", position: -0.9, confidence: 0.9}
        ],

        // Concept categories for grouping
        categories: [
            {id: "policy", label: "Policy", color: "#4285F4"},
            {id: "environmental", label: "Environmental", color: "#34A853"},
            {id: "economic", label: "Economic", color: "#FBBC05"},
            {id: "social", label: "Social", color: "#EA4335"},
            {id: "scientific", label: "Scientific", color: "#9C27B0"},
            {id: "political", label: "Political", color: "#00BCD4"},
            {id: "practical", label: "Practical", color: "#FF9800"}
        ],

        // Concept type groups - another way to categorize
        types: [
            {id: "concrete", label: "Concrete Policy", color: "#1E88E5"},
            {id: "goal", label: "Goal/Target", color: "#43A047"},
            {id: "solution", label: "Solution", color: "#26A69A"},
            {id: "consequence", label: "Consequence", color: "#E53935"},
            {id: "stakeholder", label: "Stakeholder", color: "#8E24AA"},
            {id: "response", label: "Response", color: "#FB8C00"},
            {id: "validation", label: "Validation", color: "#039BE5"},
            {id: "obstacle", label: "Obstacle", color: "#F4511E"},
            {id: "framing", label: "Framing", color: "#6D4C41"},
            {id: "policy", label: "Policy Element", color: "#00ACC1"}
        ]
    };

    // Effect to filter and process the data based on the threshold
    useEffect(() => {
        // Filter relationships based on strength threshold
        const filteredRelationships = conceptData.relationships.filter(
            rel => rel.strength >= filterThreshold
        );

        // Get concepts that appear in filtered relationships
        const activeConcepts = new Set();
        filteredRelationships.forEach(rel => {
            activeConcepts.add(rel.source);
            activeConcepts.add(rel.target);
        });

        // Filter concepts to only those in active relationships
        const filteredConcepts = conceptData.concepts.filter(
            concept => activeConcepts.has(concept.id)
        );

        // Simple force-directed layout calculation
        // Place nodes in a circle initially
        const nodeCount = filteredConcepts.length;
        const radius = Math.min(dimensions.width, dimensions.height) * 0.35;
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;

        // Position nodes in a circle
        const positionedNodes = filteredConcepts.map((concept, index) => {
            const angle = (index / nodeCount) * 2 * Math.PI;
            return {
                ...concept,
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle)
            };
        });

        // Create links with references to the actual node objects
        const positionedLinks = filteredRelationships.map(rel => {
            const source = positionedNodes.find(node => node.id === rel.source);
            const target = positionedNodes.find(node => node.id === rel.target);
            return {
                ...rel,
                source,
                target
            };
        });

        setNodes(positionedNodes);
        setLinks(positionedLinks);
    }, [filterThreshold, dimensions]);

    // Effect to handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (svgRef.current) {
                const width = svgRef.current.parentElement.clientWidth;
                const height = Math.min(600, window.innerHeight * 0.7);
                setDimensions({width, height});
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Get node color based on grouping mode
    const getNodeColor = (node) => {
        // Highlight if selected
        if (selectedConcept && (node.id === selectedConcept ||
            links.some(link =>
                (link.source.id === selectedConcept && link.target.id === node.id) ||
                (link.target.id === selectedConcept && link.source.id === node.id)
            ))) {
            return "#ff9900"; // Highlight color
        }

        // Normal coloring based on grouping mode
        if (groupingMode === 'category') {
            const category = conceptData.categories.find(cat => cat.id === node.category);
            return category ? category.color : "#ccc";
        } else if (groupingMode === 'type') {
            const type = conceptData.types.find(t => t.id === node.type);
            return type ? type.color : "#ccc";
        } else if (groupingMode === 'sentiment') {
            return node.sentiment > 0
                ? `rgb(0, ${Math.floor(150 + node.sentiment * 105)}, 0)`
                : `rgb(${Math.floor(150 + Math.abs(node.sentiment) * 105)}, 0, 0)`;
        } else {
            return "#ccc";
        }
    };

    // Get node size based on centrality
    const getNodeSize = (node) => {
        return 10 + (node.centrality * 20);
    };

    // Get link width based on strength
    const getLinkWidth = (link) => {
        return 1 + (link.strength * 4);
    };

    // Handle node selection
    const handleNodeClick = (node) => {
        setSelectedConcept(selectedConcept === node.id ? null : node.id);
    };

    // Get stakeholder positions for the selected concept
    const getStakeholderPositions = () => {
        if (!selectedConcept) return [];

        return conceptData.stakeholderPositions.filter(
            pos => pos.concept === selectedConcept
        );
    };

    const stakeholderPositions = getStakeholderPositions();
    const selectedNode = selectedConcept ? nodes.find(n => n.id === selectedConcept) : null;

    // Legend items based on grouping mode
    let legendItems = [];
    if (groupingMode === 'category') {
        legendItems = conceptData.categories;
    } else if (groupingMode === 'type') {
        legendItems = conceptData.types;
    } else if (groupingMode === 'sentiment') {
        legendItems = [
            {id: "positive", label: "Positive Sentiment", color: "#1B5E20"},
            {id: "neutral", label: "Neutral Sentiment", color: "#9E9E9E"},
            {id: "negative", label: "Negative Sentiment", color: "#B71C1C"}
        ];
    }

    return (
        <div className="max-w-7xl mx-auto py-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Interactive Concept Map</h1>

                {/* Controls */}
                <div className="mb-4 flex flex-wrap justify-between items-center">
                    <div className="flex flex-wrap gap-4 items-center mb-2">
                        <div>
                            <label htmlFor="filter-threshold"
                                   className="block text-sm font-medium text-gray-700 mb-1">
                                Relationship Strength Filter
                            </label>
                            <input
                                id="filter-threshold"
                                type="range"
                                min="0"
                                max="0.9"
                                step="0.1"
                                value={filterThreshold}
                                onChange={(e) => setFilterThreshold(parseFloat(e.target.value))}
                                className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="ml-2 text-sm">{filterThreshold.toFixed(1)}</span>
                        </div>

                        <div>
                            <label htmlFor="grouping-mode"
                                   className="block text-sm font-medium text-gray-700 mb-1">
                                Grouping Mode
                            </label>
                            <select
                                id="grouping-mode"
                                value={groupingMode}
                                onChange={(e) => setGroupingMode(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                            >
                                <option value="category">Category</option>
                                <option value="type">Type</option>
                                <option value="sentiment">Sentiment</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showRelationLabels}
                                    onChange={(e) => setShowRelationLabels(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-sm text-gray-700">Show Labels</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Main visualization */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4 relative"
                     style={{height: `${dimensions.height}px`, width: '100%'}}>
                    <svg
                        ref={svgRef}
                        width={dimensions.width}
                        height={dimensions.height}
                        className="w-full h-full"
                    >
                        {/* Links */}
                        {links.map((link, index) => (
                            <g key={`link-${index}`}>
                                <line
                                    x1={link.source.x}
                                    y1={link.source.y}
                                    x2={link.target.x}
                                    y2={link.target.y}
                                    stroke="#999"
                                    strokeWidth={getLinkWidth(link)}
                                    opacity={0.7}
                                />
                                {showRelationLabels && (
                                    <text
                                        x={(link.source.x + link.target.x) / 2}
                                        y={(link.source.y + link.target.y) / 2 - 5}
                                        textAnchor="middle"
                                        fontSize="10px"
                                        fill="#666"
                                    >
                                        {link.type}
                                    </text>
                                )}
                            </g>
                        ))}

                        {/* Nodes */}
                        {nodes.map((node) => (
                            <g
                                key={node.id}
                                transform={`translate(${node.x}, ${node.y})`}
                                onClick={() => handleNodeClick(node)}
                                style={{cursor: 'pointer'}}
                            >
                                <circle
                                    r={getNodeSize(node)}
                                    fill={getNodeColor(node)}
                                    stroke="#fff"
                                    strokeWidth="2"
                                />
                                <text
                                    dy=".35em"
                                    textAnchor="middle"
                                    fontSize="12px"
                                    fill="#333"
                                    fontWeight={selectedConcept === node.id ? "bold" : "normal"}
                                >
                                    {node.label}
                                </text>
                                <title>{node.description}</title>
                            </g>
                        ))}
                    </svg>

                    {/* Stakeholder positions panel */}
                    {selectedNode && stakeholderPositions.length > 0 && (
                        <div
                            className="absolute right-4 top-4 bg-white p-3 rounded shadow-md border border-gray-200"
                            style={{width: '250px'}}
                        >
                            <h3 className="font-medium mb-2">Stakeholder Positions: {selectedNode.label}</h3>
                            {stakeholderPositions.map((pos, i) => (
                                <div key={i} className="mb-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm">{pos.stakeholder}</span>
                                        <span
                                            className={`text-xs ${pos.position > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {pos.position > 0 ? '+' : ''}{pos.position.toFixed(1)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                        <div
                                            className={`h-2 rounded-full ${pos.position > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                            style={{
                                                width: `${Math.abs(pos.position) * 100}%`,
                                                marginLeft: pos.position < 0 ? `${100 - Math.abs(pos.position) * 100}%` : '0'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium mb-2">Legend</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {legendItems.map((item) => (
                            <div key={item.id} className="flex items-center">
                                <div
                                    className="w-4 h-4 rounded-full mr-2"
                                    style={{backgroundColor: item.color}}
                                ></div>
                                <span className="text-sm">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info panel for selected concept */}
                {selectedNode && (
                    <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                        <h3 className="font-medium mb-2">Selected Concept: {selectedNode.label}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm mb-1"><span
                                    className="font-medium">Category:</span> {selectedNode.category}</p>
                                <p className="text-sm mb-1"><span className="font-medium">Type:</span> {selectedNode.type}</p>
                                <p className="text-sm mb-1"><span className="font-medium">Sentiment:</span> {selectedNode.sentiment.toFixed(2)}</p>
                                <p className="text-sm mb-1"><span className="font-medium">Centrality:</span> {selectedNode.centrality.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm mb-1"><span className="font-medium">Mentions:</span> {selectedNode.frequency}</p>
                                <p className="text-sm mb-1"><span
                                    className="font-medium">Paragraphs:</span> {selectedNode.paragraphs.join(', ')}</p>
                                <p className="text-sm mb-2"><span className="font-medium">Description:</span></p>
                                <p className="text-sm italic bg-gray-50 p-2 rounded">{selectedNode.description}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Methodology */}
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                    <h3 className="font-medium mb-2">About This Visualization</h3>
                    <p className="mb-2">
                        This concept map extracts key concepts and relationships from the article "GOVERNMENT UNVEILS
                        AMBITIOUS CLIMATE TARGETS AMID MIXED REACTIONS"
                        to create a network representation of the narrative's conceptual structure.
                    </p>
                    <p className="mb-1">
                        Key features of this visualization:
                    </p>
                    <ul className="list-disc ml-5 space-y-1 mb-2">
                        <li>Node size represents concept centrality (importance in the narrative)</li>
                        <li>Node color represents category, type, or sentiment based on selected grouping</li>
                        <li>Line thickness indicates relationship strength between concepts</li>
                        <li>Click on nodes to see detailed information and stakeholder positions</li>
                        <li>Filter relationships by strength to focus on stronger connections</li>
                    </ul>
                    <p>
                        This interactive visualization helps identify key narrative elements, concept relationships,
                        and stakeholder positions across different aspects of the climate policy discussion.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InteractiveConceptMap;







