
import React from 'react';
import { BrandProject } from '../types';
import { Link } from 'react-router-dom';

interface DashboardProps {
  project: BrandProject | null;
}

const DashboardPage: React.FC<DashboardProps> = ({ project }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back,</h1>
          <p className="text-slate-500">Manage your active brand profile and AI assets.</p>
        </div>
        <Link 
          to="/identity" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm"
        >
          {project ? 'Update Brand' : 'Create Brand'}
        </Link>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-indigo-600 font-bold text-3xl mb-1">{project ? 'Active' : 'None'}</div>
          <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">Brand Status</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-purple-600 font-bold text-3xl mb-1">{project ? '12' : '0'}</div>
          <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">Generated Assets</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-emerald-600 font-bold text-3xl mb-1">{project ? '98%' : '--'}</div>
          <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">Market Sentiment</div>
        </div>
      </section>

      <h2 className="text-xl font-bold text-slate-900 mb-6">Your Active Brand Profile</h2>
      
      {!project ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No active brand profile</h3>
          <p className="text-slate-500 max-w-xs mx-auto mb-8">Set up your brand identity using the Identity Creator to unlock all features.</p>
          <Link to="/identity" className="text-indigo-600 font-bold hover:underline">Get Started &rarr;</Link>
        </div>
      ) : (
        <div className="max-w-xl">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
            <div className="h-64 bg-slate-900 relative overflow-hidden flex items-center justify-center">
              {project.logoUrl ? (
                <img src={project.logoUrl} alt={project.name} className="max-h-full max-w-full object-contain p-8" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-700">
                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{project.name}</h3>
                  <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase rounded-full">Active Profile</span>
                </div>
                <Link to="/identity" className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </Link>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">{project.description}</p>
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-400 w-24 uppercase tracking-wider">Tone:</span>
                  <span className="text-sm text-slate-700 font-medium">{project.tone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-bold text-slate-400 w-24 uppercase tracking-wider">Focus:</span>
                  <div className="flex flex-wrap gap-2 flex-1">
                    {project.keywords.map((k, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded">{k}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                <Link to="/studio" className="flex-1 bg-indigo-600 text-white text-center py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors">Go to Studio</Link>
                <Link to="/insights" className="flex-1 border border-slate-200 text-slate-600 text-center py-2.5 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors">Analytics</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
