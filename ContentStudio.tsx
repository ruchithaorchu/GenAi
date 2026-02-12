
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

const ContentStudioPage: React.FC = () => {
  const [type, setType] = useState('Social Media Post');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    if (!description || !audience) return;
    setIsGenerating(true);
    try {
      const content = await geminiService.generateContent(type, description, audience);
      setGeneratedContent(content);
    } catch (err) {
      console.error(err);
      alert("Error generating content.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Studio</h1>
        <p className="text-slate-500">AI-powered copywriting for every channel.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content Type</label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>Social Media Post</option>
                  <option>Ad Copy (Google/FB)</option>
                  <option>Website Hero Text</option>
                  <option>Email Newsletter</option>
                  <option>Product Description</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">What are we promoting?</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. New eco-friendly sneakers made from ocean plastic"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                <input 
                  type="text" 
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. Gen Z, Outdoor enthusiasts"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !description || !audience}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                    Writing...
                  </>
                ) : 'Generate Copy'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-3xl h-full shadow-sm overflow-hidden flex flex-col">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">{type}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigator.clipboard.writeText(generatedContent)}
                  disabled={!generatedContent}
                  className="p-2 text-slate-400 hover:text-indigo-600 transition-colors disabled:opacity-30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                </button>
              </div>
            </div>
            <div className="flex-1 p-8 overflow-y-auto">
              {isGenerating ? (
                <div className="space-y-4">
                  <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded w-2/3 animate-pulse"></div>
                </div>
              ) : generatedContent ? (
                <div className="prose prose-indigo max-w-none">
                  <p className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium">{generatedContent}</p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                  <p className="text-slate-400">Configure inputs to generate copy</p>
                </div>
              )}
            </div>
            {generatedContent && (
              <div className="bg-indigo-600 p-4 text-center">
                 <button className="text-white text-sm font-bold uppercase tracking-widest hover:underline">Apply to Brand Profile</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentStudioPage;
