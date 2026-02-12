
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { SentimentResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const InsightsPage: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);

  const handleAnalyze = async () => {
    if (!feedback) return;
    setIsAnalyzing(true);
    try {
      const data = await geminiService.analyzeSentiment(feedback);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const COLORS = {
    Positive: '#10b981',
    Neutral: '#f59e0b',
    Negative: '#ef4444'
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Sentiment Insights</h1>
        <p className="text-slate-500">Understand how the world perceives your brand.</p>
      </header>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-10">
        <label className="block text-lg font-bold text-slate-800 mb-4">Analyze Brand Feedback</label>
        <div className="flex gap-4">
          <textarea 
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Paste customer reviews, tweets, or survey responses here..."
            className="flex-1 px-4 py-3 border border-slate-200 rounded-2xl h-32 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !feedback}
            className="bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Main Card */}
          <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
             <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-6">Overall Sentiment</h3>
             <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
                <div 
                  className="text-4xl font-black" 
                  style={{ color: COLORS[result.label as keyof typeof COLORS] }}
                >
                  {result.score}%
                </div>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                  <circle 
                    cx="80" cy="80" r="70" fill="none" 
                    stroke={COLORS[result.label as keyof typeof COLORS]} 
                    strokeWidth="10" 
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * result.score) / 100}
                    strokeLinecap="round"
                  />
                </svg>
             </div>
             <div className="px-4 py-1.5 rounded-full font-bold text-sm bg-slate-100 mb-4" style={{ color: COLORS[result.label as keyof typeof COLORS] }}>
               {result.label} Sentiment
             </div>
             <p className="text-slate-500 text-sm italic">"{result.summary}"</p>
          </div>

          {/* Breakdown Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="text-slate-800 font-bold mb-6">Emotional Breakdown</h3>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Trust', value: result.breakdown.trust },
                    { name: 'Excitement', value: result.breakdown.excitement },
                    { name: 'Satisfaction', value: result.breakdown.satisfaction }
                  ]} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Trust</div>
                  <div className="text-lg font-bold text-slate-800">{result.breakdown.trust}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Excitement</div>
                  <div className="text-lg font-bold text-slate-800">{result.breakdown.excitement}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Satisfaction</div>
                  <div className="text-lg font-bold text-slate-800">{result.breakdown.satisfaction}%</div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsPage;
