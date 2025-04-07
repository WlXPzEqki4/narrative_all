import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Data from March 5, 2025 intelligence report
const reportSummary = {
  date: "March 5, 2025",
  coveragePeriod: "00:00, March 4 to 00:00 March 5, 2025",
  totalConversation: {
    posts: 14000,
    engagements: 1600000,
    views: 18100000
  },
  supportingPosts: {
    percentage: 16.93,
    engagements: 277000,
    posts: 3000,
    views: 2100000
  },
  criticalPosts: {
    percentage: 3.12,
    engagements: 51000,
    posts: 701,
    views: 444000
  },
  languages: {
    English: 39.96,
    Arabic: 39.29,
    Chinese: 17.86,
    Urdu: 1.37,
    French: 1.23,
    Spanish: 0.29
  }
};

// Supporting narratives
const supportingNarratives = [
  {
    id: "s1",
    title: "Dubai's Ramadan Season Showcases Luxury Dining Experiences and Cultural Heritage",
    type: "Supporting",
    percentage: 13.37,
    metrics: {
      posts: 448,
      engagements: 48000,
      views: 751000,
      potentialHumanReach: "20.3M"
    },
    audience: {
      languages: {
        English: 48.88,
        Arabic: 28.03,
        Chinese: 21.52,
        French: 1.35,
        Urdu: 0.22
      },
      description: "Content targets both locals and tourists interested in Ramadan celebrations and dining experiences"
    },
    platforms: {
      Facebook: 26.79,
      Twitter: 25.67,
      TikTok: 25.22,
      Instagram: 20.54,
      Douyin: 1.56,
      Weibo: 0.22
    },
    botActivity: {
      accountCount: 42,
      percentage: 9.38,
      repostAverage: 81.91
    },
    engagementPerPost: 107.14,
    viewsPerPost: 1676.34,
    engagementRatio: 0.064
  },
  {
    id: "s2",
    title: "UAE Tourism Draws Global Visitors with Desert Safaris, Luxury Resorts, and Religious Travel Packages",
    type: "Supporting",
    percentage: 9.40,
    metrics: {
      posts: 1203,
      engagements: 154000,
      views: 1200000,
      potentialHumanReach: "32.5M"
    },
    audience: {
      languages: {
        Chinese: 46.69,
        English: 40.92,
        Arabic: 9.37,
        French: 2.01,
        Spanish: 0.75,
        Urdu: 0.25
      },
      description: "Content resonates strongly with international tourists, expatriates, and admirers of Dubai's royal family"
    },
    platforms: {
      Instagram: 45.64,
      Facebook: 21.86,
      Twitter: 13.55,
      TikTok: 12.30,
      Douyin: 5.07,
      Other: 1.58
    },
    botActivity: {
      accountCount: 44,
      percentage: 3.66,
      repostAverage: 74.74
    },
    engagementPerPost: 128.01,
    viewsPerPost: 997.51,
    engagementRatio: 0.128
  },
  {
    id: "s3",
    title: "UAE's Ramadan Spirit Shines Through Cultural Events and Community Initiatives",
    type: "Supporting",
    percentage: 3.03,
    metrics: {
      posts: 235,
      engagements: 50000,
      views: 86000,
      potentialHumanReach: "22.9M"
    },
    audience: {
      languages: {
        English: 65.67,
        Arabic: 27.90,
        Chinese: 3.86,
        French: 1.29,
        Urdu: 0.86,
        Spanish: 0.43
      },
      description: "Content targets business travelers, investors, and luxury tourists interested in UAE's economic development and tourism sector"
    },
    platforms: {
      Twitter: 67.23,
      Facebook: 21.28,
      Instagram: 8.51,
      TikTok: 2.55,
      Douyin: 0.43
    },
    botActivity: {
      accountCount: 36,
      percentage: 15.32,
      repostAverage: 82.60
    },
    engagementPerPost: 212.77,
    viewsPerPost: 365.96,
    engagementRatio: 0.581
  }
];

// Critical narratives
const criticalNarratives = [
  {
    id: "c1",
    title: "Dubai Prosecutors Charge Gulf Influencer with Assault, Intoxication",
    type: "Critical",
    percentage: 9.00,
    metrics: {
      posts: 143,
      engagements: 67000,
      views: 2000000,
      potentialHumanReach: "20.2M"
    },
    audience: {
      languages: {
        Arabic: 72.73,
        English: 20.98,
        Chinese: 3.50,
        Urdu: 2.10,
        French: 0.70
      },
      description: "Primarily Arabic-speaking audience interested in social media personalities and legal issues"
    },
    platforms: {
      Twitter: 67.83,
      Facebook: 11.89,
      Instagram: 10.49,
      TikTok: 9.09,
      Telegram: 0.70
    },
    botActivity: {
      accountCount: 23,
      percentage: 16.08,
      repostAverage: 66.79
    },
    engagementPerPost: 468.53,
    viewsPerPost: 13986.01,
    engagementRatio: 0.034
  },
  {
    id: "c2",
    title: "UAE Faces New Accusations of Supporting Mercenaries in Sudan Conflict",
    type: "Critical",
    percentage: 3.00,
    metrics: {
      posts: 180,
      engagements: 54000,
      views: 1500000,
      potentialHumanReach: "30M"
    },
    audience: {
      languages: {
        Arabic: 79.89,
        English: 17.32,
        Chinese: 1.68,
        Urdu: 1.12
      },
      description: "Content primarily targets Arabic-speaking audiences concerned with regional security issues and international interventions"
    },
    platforms: {
      Twitter: 72.78,
      Instagram: 11.67,
      TikTok: 7.78,
      Facebook: 7.22,
      Telegram: 0.56
    },
    botActivity: {
      accountCount: 62,
      percentage: 24.31,
      repostAverage: 77.72
    },
    engagementPerPost: 300.00,
    viewsPerPost: 8333.33,
    engagementRatio: 0.036
  },
  {
    id: "c3",
    title: "Arab Leaders Divided Over Gaza Reconstruction Plan; UAE Demands Palestinian Authority Reform",
    type: "Critical",
    percentage: 3.00,
    metrics: {
      posts: 120,
      engagements: 34000,
      views: 827000,
      potentialHumanReach: "13.4M"
    },
    audience: {
      languages: {
        Arabic: 57.50,
        English: 29.17,
        Chinese: 8.33,
        French: 3.33,
        Urdu: 1.67
      },
      description: "Political audiences interested in Middle East diplomacy and reconstruction efforts"
    },
    platforms: {
      Twitter: 64.17,
      Telegram: 19.17,
      Facebook: 9.17,
      Instagram: 3.33,
      TikTok: 2.50,
      Gab: 0.83,
      TruthSocial: 0.83
    },
    botActivity: {
      accountCount: 26,
      percentage: 21.67,
      repostAverage: 74.61
    },
    engagementPerPost: 283.33,
    viewsPerPost: 6891.67,
    engagementRatio: 0.041
  }
];

// Combined all narratives for comparison
const allNarratives = [...supportingNarratives, ...criticalNarratives];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const TYPE_COLORS = {
  Supporting: '#00C49F',
  Critical: '#FF8042'
};

// Prepare data for comparative charts
const narrativesByPercentage = allNarratives.map(n => ({
  name: n.title.length > 30 ? n.title.substring(0, 30) + '...' : n.title,
  type: n.type,
  value: n.percentage
})).sort((a, b) => b.value - a.value);

const narrativesByEngagementEfficiency = allNarratives.map(n => ({
  name: n.title.length > 30 ? n.title.substring(0, 30) + '...' : n.title,
  type: n.type,
  value: n.engagementPerPost
})).sort((a, b) => b.value - a.value);

const narrativesByBotActivity = allNarratives.map(n => ({
  name: n.title.length > 30 ? n.title.substring(0, 30) + '...' : n.title,
  type: n.type,
  value: n.botActivity.percentage
})).sort((a, b) => b.value - a.value);

// Language comparison data
const languageComparisonData = [];
['English', 'Arabic', 'Chinese', 'French', 'Urdu', 'Spanish'].forEach(language => {
  const supportingAvg = supportingNarratives
    .filter(n => n.audience.languages[language])
    .map(n => n.audience.languages[language])
    .reduce((sum, val, _, arr) => sum + val / arr.length, 0) || 0;

  const criticalAvg = criticalNarratives
    .filter(n => n.audience.languages[language])
    .map(n => n.audience.languages[language])
    .reduce((sum, val, _, arr) => sum + val / arr.length, 0) || 0;

  languageComparisonData.push({
    language,
    Supporting: parseFloat(supportingAvg.toFixed(2)),
    Critical: parseFloat(criticalAvg.toFixed(2))
  });
});

// Overview metrics for pie chart
const overviewData = [
  { name: "Supporting", value: reportSummary.supportingPosts.percentage },
  { name: "Critical", value: reportSummary.criticalPosts.percentage },
  { name: "Neutral/Other", value: 100 - reportSummary.supportingPosts.percentage - reportSummary.criticalPosts.percentage }
];

// Section component for better organization
const Section = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);

// Card component for metrics
const MetricCard = ({ title, value, color }) => (
  <div className="bg-white p-4 rounded shadow border-l-4" style={{ borderLeftColor: color }}>
    <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
    <p className="text-2xl font-bold" style={{ color }}>{value}</p>
  </div>
);

// Main dashboard component
const UAENarrativesAnalysisDashboard = () => {
  const [activeNarrative, setActiveNarrative] = useState(null);
  
  const handleNarrativeSelect = (narrative) => {
    setActiveNarrative(narrative === activeNarrative ? null : narrative);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">UAE Social Media Narratives Analysis</h1>
          <p className="text-gray-600">{reportSummary.date} | Coverage Period: {reportSummary.coveragePeriod}</p>
        </header>
        
        {/* Overview Section */}
        <Section title="Overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <MetricCard 
              title="Total Posts" 
              value={reportSummary.totalConversation.posts.toLocaleString()} 
              color="#4A90E2"
            />
            <MetricCard 
              title="Total Engagements" 
              value={reportSummary.totalConversation.engagements.toLocaleString()} 
              color="#50C878"
            />
            <MetricCard 
              title="Total Views" 
              value={reportSummary.totalConversation.views.toLocaleString()} 
              color="#F5A623"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sentiment Distribution</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={overviewData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {overviewData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? TYPE_COLORS.Supporting : index === 1 ? TYPE_COLORS.Critical : '#A9A9A9'} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Language Distribution</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.entries(reportSummary.languages).map(([lang, value]) => ({ 
                      language: lang, 
                      percentage: value 
                    }))}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                    <YAxis dataKey="language" type="category" width={80} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="percentage" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Section>
        
        {/* Narrative Comparison Section */}
        <Section title="Narrative Comparison">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Narratives by % of Conversation</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={narrativesByPercentage}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="value" name="% of Conversation">
                    {narrativesByPercentage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TYPE_COLORS[entry.type]} />
                    ))}
                  </Bar>
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Engagement Efficiency (per post)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={narrativesByEngagementEfficiency}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="value" name="Engagements per Post">
                    {narrativesByEngagementEfficiency.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TYPE_COLORS[entry.type]} />
                    ))}
                  </Bar>
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Bot-Like Activity Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={narrativesByBotActivity}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="value" name="Bot-Like Activity">
                    {narrativesByBotActivity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TYPE_COLORS[entry.type]} />
                    ))}
                  </Bar>
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Section>
        
        {/* Language Analysis Section */}
        <Section title="Language Distribution Analysis">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={languageComparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="language" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="Supporting" name="Supporting Narratives" fill={TYPE_COLORS.Supporting} />
                <Bar dataKey="Critical" name="Critical Narratives" fill={TYPE_COLORS.Critical} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
        
        {/* Narrative Browser Section */}
        <Section title="Narrative Browser">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Supporting Narratives</h3>
            <div className="space-y-2">
              {supportingNarratives.map(narrative => (
                <div 
                  key={narrative.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${activeNarrative === narrative ? 'bg-green-50 border-green-500' : 'hover:bg-gray-50'}`}
                  onClick={() => handleNarrativeSelect(narrative)}
                >
                  <h4 className="font-medium">{narrative.title}</h4>
                  <p className="text-sm text-gray-600">{narrative.percentage.toFixed(2)}% of conversation | {narrative.metrics.posts} posts | {narrative.engagementPerPost.toFixed(0)} engagements per post</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Critical Narratives</h3>
            <div className="space-y-2">
              {criticalNarratives.map(narrative => (
                <div 
                  key={narrative.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${activeNarrative === narrative ? 'bg-orange-50 border-orange-500' : 'hover:bg-gray-50'}`}
                  onClick={() => handleNarrativeSelect(narrative)}
                >
                  <h4 className="font-medium">{narrative.title}</h4>
                  <p className="text-sm text-gray-600">{narrative.percentage.toFixed(2)}% of conversation | {narrative.metrics.posts} posts | {narrative.engagementPerPost.toFixed(0)} engagements per post</p>
                </div>
              ))}
            </div>
          </div>
          
          {activeNarrative && (
            <div className="mt-6 p-6 border rounded-lg bg-gray-50">
              <h3 className="text-xl font-bold mb-4">{activeNarrative.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <MetricCard 
                  title="Posts" 
                  value={activeNarrative.metrics.posts} 
                  color="#4A90E2"
                />
                <MetricCard 
                  title="Engagements" 
                  value={activeNarrative.metrics.engagements.toLocaleString()} 
                  color="#50C878"
                />
                <MetricCard 
                  title="Views" 
                  value={activeNarrative.metrics.views.toLocaleString()} 
                  color="#F5A623"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">Audience Languages</h4>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={Object.entries(activeNarrative.audience.languages).map(([lang, value]) => ({ 
                            name: lang, 
                            value: value 
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {Object.entries(activeNarrative.audience.languages).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{activeNarrative.audience.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Platform Distribution</h4>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={Object.entries(activeNarrative.platforms).map(([platform, value]) => ({ 
                            name: platform, 
                            value: value 
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {Object.entries(activeNarrative.platforms).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded bg-white">
                  <h4 className="font-semibold mb-2">Bot Activity</h4>
                  <p><span className="font-medium">{activeNarrative.botActivity.accountCount}</span> accounts (<span className="font-medium">{activeNarrative.botActivity.percentage.toFixed(2)}%</span> of posters) were tagged as bot-like</p>
                  <p>Average of <span className="font-medium">{activeNarrative.botActivity.repostAverage.toFixed(2)}%</span> bot-like reposts supporting the narrative</p>
                </div>
                
                <div className="p-4 border rounded bg-white">
                  <h4 className="font-semibold mb-2">Engagement Metrics</h4>
                  <p><span className="font-medium">{activeNarrative.engagementPerPost.toFixed(2)}</span> engagements per post</p>
                  <p><span className="font-medium">{activeNarrative.viewsPerPost.toFixed(2)}</span> views per post</p>
                  <p><span className="font-medium">{(activeNarrative.engagementRatio * 100).toFixed(2)}%</span> engagement to view ratio</p>
                </div>
              </div>
            </div>
          )}
        </Section>
      </div>
    </div>
  );
};

export default UAENarrativesAnalysisDashboard;








