
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BrandProject } from './types';

// Icons (Lucide-like SVG components)
const IconDashboard = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const IconIdentity = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
const IconStudio = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const IconInsights = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const IconAssistant = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>;

// Pages
import DashboardPage from './pages/Dashboard';
import BrandIdentityPage from './pages/BrandIdentity';
import ContentStudioPage from './pages/ContentStudio';
import InsightsPage from './pages/Insights';
import AssistantPage from './pages/Assistant';

const SidebarLink = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) => (
  <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col fixed inset-y-0 shadow-sm z-50">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">B</div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">BrandCraft</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarLink to="/" icon={<IconDashboard />} label="Dashboard" active={path === '/'} />
          <SidebarLink to="/identity" icon={<IconIdentity />} label="Brand Identity" active={path === '/identity'} />
          <SidebarLink to="/studio" icon={<IconStudio />} label="Content Studio" active={path === '/studio'} />
          <SidebarLink to="/insights" icon={<IconInsights />} label="Sentiment Analysis" active={path === '/insights'} />
          <SidebarLink to="/assistant" icon={<IconAssistant />} label="AI Assistant" active={path === '/assistant'} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
               <img src="https://picsum.photos/32/32" alt="Avatar" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Demo User</p>
              <p className="text-xs text-slate-500">Premium Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default function App() {
  const [activeProject, setActiveProject] = useState<BrandProject | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('brandcraft_active_project');
    if (saved) {
      setActiveProject(JSON.parse(saved));
    }
  }, []);

  const saveProject = (project: BrandProject) => {
    setActiveProject(project);
    localStorage.setItem('brandcraft_active_project', JSON.stringify(project));
  };

  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage project={activeProject} />} />
          <Route path="/identity" element={<BrandIdentityPage onSave={saveProject} />} />
          <Route path="/studio" element={<ContentStudioPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  );
}
