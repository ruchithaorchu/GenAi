
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { BrandProject } from '../types';

// Fix: Define IconIdentity component locally to avoid missing reference error
const IconIdentity = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;

interface BrandIdentityPageProps {
  onSave: (project: BrandProject) => void;
}

const BrandIdentityPage: React.FC<BrandIdentityPageProps> = ({ onSave }) => {
  const [keywords, setKeywords] = useState('');
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('Modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState('');


  const handleGenerateNames = async () => {
    if (!keywords) return;
    setIsGenerating(true);
    try {
      const names = await geminiService.generateBrandNames(keywords.split(','), tone);
      setResults(names);
    } catch (error) {
      console.error(error);
      alert("Failed to generate names. Check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };



 const handleSaveProject = () => {
  if (!selectedName) return;

  const newProject: BrandProject = {
    id: Math.random().toString(36).substr(2, 9),
    name: selectedName,
    description,
    keywords: keywords.split(',').map(k => k.trim()),
    tone,
    createdAt: new Date().toISOString()
  };

  // Get existing saved projects
  const existingProjects = JSON.parse(
    localStorage.getItem("brandProjects") || "[]"
  );

  // Add new project
  const updatedProjects = [...existingProjects, newProject];

  // Save back to localStorage
  localStorage.setItem("brandProjects", JSON.stringify(updatedProjects));

  alert("Project saved successfully!");
};


  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Identity Creator</h1>
        <p className="text-slate-500">Define your brand's core identity with AI.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Step 1: Concept</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Keywords (comma separated)</label>
                <input 
                  type="text" 
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g. tech, eco-friendly, fast, minimalist"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tone</label>
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                  <option>Modern</option>
                  <option>Professional</option>
                  <option>Playful</option>
                  <option>Luxury</option>
                  <option>Futuristic</option>
                </select>
              </div>
              <button 
                onClick={handleGenerateNames}
                disabled={isGenerating || !keywords}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg disabled:opacity-50 transition-all"
              >
                {isGenerating ? 'Generating...' : 'Generate Names'}
              </button>
            </div>
          </div>

          {results.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Step 2: Selection</h2>
              <div className="grid grid-cols-2 gap-2">
                {results.map((name, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedName(name)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${selectedName === name ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}


        </div>

        {/* Preview Section */}
        <div className="sticky top-8">
          <div className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl aspect-square flex flex-col items-center justify-center p-12 text-center">
  <div className="text-slate-300 flex flex-col items-center">
    <div className="w-24 h-24 border-2 border-dashed border-slate-700 rounded-full flex items-center justify-center mb-6">
      <IconIdentity />
    </div>
    <h3 className="text-3xl font-bold mb-2 tracking-tight">
      {selectedName || 'Brand Preview'}
    </h3>
    <p className="text-slate-400 text-sm max-w-xs">
      {tone} brand identity based on your selected keywords.
    </p>
  </div>
</div>
{selectedName && (
    <div className="mt-6">
      <button
        onClick={handleSaveProject}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
      >
        Save Project
      </button>
    </div>
  )}

    
          </div>
          
        </div>
      </div>
  );
};

export default BrandIdentityPage;