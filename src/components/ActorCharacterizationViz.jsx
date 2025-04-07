import React, { useState } from 'react';

const ActorCharacterisationViz = () => {
  // Sample actor characterisation data extracted from the article
  const [actorData] = useState({
    actors: [
      {
        id: 1,
        name: "Government",
        mentions: 5,
        descriptors: ["sweeping", "ambitious", "significant", "committed"],
        voiceInstances: 2,
        quotes: [
          "This represents our commitment to addressing the climate crisis with the urgency it demands.",
          "We can no longer afford inaction on this critical issue."
        ],
        activeVoiceCount: 4,
        passiveVoiceCount: 1,
        relationshipToPolicy: "owner"
      },
      {
        id: 2,
        name: "Opposition",
        mentions: 3,
        descriptors: ["immediate", "emergency"],
        voiceInstances: 2,
        quotes: [
          "This rushed policy will devastate our industrial sectors and burden taxpayers with unsustainable costs.",
          "Wilson further warned about potential job losses in traditional energy sectors."
        ],
        activeVoiceCount: 3,
        passiveVoiceCount: 0,
        relationshipToPolicy: "critic"
      },
      {
        id: 3,
        name: "Protesters",
        mentions: 2,
        descriptors: ["organised", "climate activist"],
        voiceInstances: 0,
        quotes: [],
        activeVoiceCount: 1,
        passiveVoiceCount: 1,
        relationshipToPolicy: "affected party"
      },
      {
        id: 4,
        name: "Scientists",
        mentions: 3,
        descriptors: ["largely supportive", "lead", "national"],
        voiceInstances: 2,
        quotes: [
          "The proposed reductions align with what our research findings indicate is necessary.",
          "Meeting these targets will require unprecedented coordination across all sectors."
        ],
        activeVoiceCount: 2,
        passiveVoiceCount: 1,
        relationshipToPolicy: "validator"
      },
      {
        id: 5,
        name: "Industry",
        mentions: 2,
        descriptors: ["critical", "supportive of climate action"],
        voiceInstances: 1,
        quotes: [
          "While we support climate action, this implementation schedule will create substantial economic disruption."
        ],
        activeVoiceCount: 1,
        passiveVoiceCount: 0,
        relationshipToPolicy: "affected party"
      },
      {
        id: 6,
        name: "Media",
        mentions: 1,
        descriptors: ["extensive"],
        voiceInstances: 0,
        quotes: [],
        activeVoiceCount: 1,
        passiveVoiceCount: 0,
        relationshipToPolicy: "observer"
      }
    ],
    voiceExamples: [
      {
        id: 1,
        actor: "Government",
        text: "The Government announced a sweeping new climate policy yesterday.",
        voiceType: "active"
      },
      {
        id: 2,
        actor: "Government",
        text: "The proposal, unveiled during a press conference at the National Environmental Center, includes substantial investments in renewable energy.",
        voiceType: "passive"
      },
      {
        id: 3,
        actor: "Opposition",
        text: "Opposition leaders immediately opposed the plan, criticising its economic implications.",
        voiceType: "active"
      },
      {
        id: 4,
        actor: "Protesters",
        text: "Protesters demonstrated against recent budget cuts to environmental monitoring programmes.",
        voiceType: "active"
      },
      {
        id: 5,
        actor: "Protesters",
        text: "The demonstration, organised by climate activist group EarthFirst, drew approximately 2,000 participants.",
        voiceType: "passive"
      },
      {
        id: 6,
        actor: "Scientists",
        text: "Scientists from the National Climate Research Institute largely supported the government's targets.",
        voiceType: "active"
      },
      {
        id: 7,
        actor: "Industry",
        text: "Industry representatives criticised specific elements of the proposal, particularly the accelerated timeline.",
        voiceType: "active"
      }
    ]
  });

  // Actor colour mapping
  const actorColors = {
    "Government": "#4285F4", // Blue
    "Opposition": "#EA4335", // Red
    "Protesters": "#FBBC05", // Yellow
    "Scientists": "#34A853", // Green
    "Industry": "#9C27B0",   // Purple
    "Media": "#FF6D00"       // Orange
  };

  // Calculate voice ratio for the bar in each actor card
  const getVoiceRatio = (active, passive) => {
    const total = active + passive;
    return {
      active: total > 0 ? (active / total) * 100 : 0,
      passive: total > 0 ? (passive / total) * 100 : 0
    };
  };

  // Sort actors by mention count (descending)
  const sortedActors = [...actorData.actors].sort((a, b) => b.mentions - a.mentions);

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Main Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Actor Characterisation Analysis
      </h2>

      {/* Main Box */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        {/* Actor Overview with metrics */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Actor Representation Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedActors.map(actor => {
              const voiceRatio = getVoiceRatio(actor.activeVoiceCount, actor.passiveVoiceCount);

              return (
                <div
                  key={actor.id}
                  className="border rounded-lg overflow-hidden"
                  style={{ borderColor: actorColors[actor.name] }}
                >
                  {/* Actor Header */}
                  <div
                    className="p-3 text-white font-medium"
                    style={{ backgroundColor: actorColors[actor.name] }}
                  >
                    {actor.name}
                    <span className="float-right text-sm">
                      {actor.mentions} mentions
                    </span>
                  </div>

                  {/* Actor Details */}
                  <div className="p-4">
                    {/* Descriptors */}
                    <div className="mb-3">
                      <div className="text-sm font-medium mb-1">Characterised as:</div>
                      <div className="flex flex-wrap gap-1">
                        {actor.descriptors.map((descriptor, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full"
                            style={{ backgroundColor: `${actorColors[actor.name]}20` }}
                          >
                            {descriptor}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Voice metrics */}
                    <div className="mb-3">
                      <div className="text-sm font-medium mb-1">
                        Voice attribution: {actor.voiceInstances} direct quotes
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${voiceRatio.active}%`,
                            backgroundColor: actorColors[actor.name]
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <div>{actor.activeVoiceCount} active voice usages</div>
                        <div>{actor.passiveVoiceCount} passive voice usages</div>
                      </div>
                    </div>

                    {/* Relationship to policy */}
                    <div className="text-sm mb-2">
                      <span className="font-medium">Role in narrative:</span> {actor.relationshipToPolicy}
                    </div>

                    {/* Quotes if present */}
                    {actor.quotes.length > 0 && (
                      <div className="mt-2">
                        <div className="text-sm font-medium mb-1">Direct quotes:</div>
                        {actor.quotes.map((quote, index) => (
                          <div
                            key={index}
                            className="text-xs italic mb-1 p-2 rounded"
                            style={{ backgroundColor: `${actorColors[actor.name]}10` }}
                          >
                            "{quote}"
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Voice Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Active vs. Passive Voice Analysis</h3>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <p className="text-sm mb-4">
              The use of active voice (where an actor directly performs an action) versus passive voice 
              (where the action happens to someone/something) can reveal narrative emphasis and agency attribution.
            </p>
            <div className="space-y-4">
              {actorData.voiceExamples.map(example => (
                <div
                  key={example.id}
                  className="p-3 rounded-lg border-l-4"
                  style={{
                    borderColor: actorColors[example.actor],
                    backgroundColor: example.voiceType === 'active' ? '#f0f4f8' : '#f8f0f0'
                  }}
                >
                  <div className="flex justify-between mb-1">
                    <div
                      className="px-2 py-1 rounded text-white text-xs inline-block"
                      style={{ backgroundColor: actorColors[example.actor] }}
                    >
                      {example.actor}
                    </div>
                    <div className="text-xs font-medium">
                      {example.voiceType === 'active' ? '✓ Active Voice' : '○ Passive Voice'}
                    </div>
                  </div>
                  <div className="text-sm">{example.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparative Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Comparative Agency Analysis</h3>
          {/* Voice Attribution */}
          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Voice Attribution</h4>
            <div className="w-full h-8 flex rounded-lg overflow-hidden">
              {sortedActors.map(actor => (
                <div
                  key={actor.id}
                  className="h-full flex items-center justify-center text-xs text-white"
                  style={{
                    backgroundColor: actorColors[actor.name],
                    width: `${
                      (actor.voiceInstances /
                        sortedActors.reduce((sum, a) => sum + a.voiceInstances, 0)) * 100
                    }%`,
                    minWidth: actor.voiceInstances > 0 ? '40px' : '0'
                  }}
                >
                  {actor.voiceInstances > 0 ? actor.voiceInstances : ''}
                </div>
              ))}
            </div>
            <div className="text-xs text-center mt-1">Direct quotes distribution</div>
          </div>

          {/* Active Voice Usage */}
          <div>
            <h4 className="text-lg font-medium mb-2">Agency Attribution (Active Voice Usage)</h4>
            <div className="w-full h-8 flex rounded-lg overflow-hidden">
              {sortedActors.map(actor => (
                <div
                  key={actor.id}
                  className="h-full flex items-center justify-center text-xs text-white"
                  style={{
                    backgroundColor: actorColors[actor.name],
                    width: `${
                      (actor.activeVoiceCount /
                        sortedActors.reduce((sum, a) => sum + a.activeVoiceCount, 0)) * 100
                    }%`,
                    minWidth: actor.activeVoiceCount > 0 ? '40px' : '0'
                  }}
                >
                  {actor.activeVoiceCount > 0 ? actor.activeVoiceCount : ''}
                </div>
              ))}
            </div>
            <div className="text-xs text-center mt-1">Active voice usage distribution</div>
          </div>
        </div>
      </div>

      {/* User Guide (Separate Box) */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600">
        <h3 className="text-xl font-semibold mb-2">User Guide</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>
            The Actor Cards show how each actor is characterised through descriptive language, 
            voice attribution, and their role in the narrative.
          </li>
          <li>
            The Voice Analysis section highlights active vs. passive voice usage, which reveals 
            how agency is attributed in the narrative.
          </li>
          <li>
            The Comparative Analysis section shows the distribution of direct quotes and active 
            voice usage among actors, revealing whose perspective is centred.
          </li>
          <li>
            Together, these elements reveal the subtle ways that narrative choices shape our 
            perception of different actors in the story.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActorCharacterisationViz;
