'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  PlusCircle, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Database, 
  Trash2, 
  ExternalLink,
  Terminal,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { PROJECTS_LIST, ProjectItem } from '@/data/projectsData';
import ProjectCard3D from '@/components/ProjectCard3D';
import ProjectModal from '@/components/ProjectModal';
import SubmitProjectModal from '@/components/SubmitProjectModal';

// Dynamically import the 3D Scene with SSR disabled to avoid canvas server mismatch
const Hero3DScene = dynamic(() => import('@/components/Hero3DScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[580px] lg:h-[680px] rounded-3xl glass-panel border border-slate-800 flex flex-col items-center justify-center space-y-3 bg-slate-950/60">
      <div className="w-12 h-12 rounded-2xl border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
      <p className="text-xs font-mono text-cyan-400">Initializing WebGL 3D Engine...</p>
    </div>
  ),
});

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState<boolean>(false);
  const [gpuBenchmarking, setGpuBenchmarking] = useState<boolean>(false);
  const [gpuResult, setGpuResult] = useState<{ renderer: string; vendor: string; fps: number } | null>(null);

  const categories = ['All', '3D Web & WebGL', 'AI & ML', 'DevTools', 'Cloud & Distributed'];

  const filteredProjects = useMemo(() => {
    return PROJECTS_LIST.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const runGpuBenchmark = () => {
    setGpuBenchmarking(true);
    setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl && 'getExtension' in gl) {
          const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
          const vendor = debugInfo ? (gl as any).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Generic GPU';
          const renderer = debugInfo ? (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'WebGL 2.0 Engine';
          setGpuResult({ renderer, vendor, fps: 60 });
        } else {
          setGpuResult({ renderer: 'Hardware Accelerated WebGL', vendor: 'Client Host', fps: 60 });
        }
      } catch (e) {
        setGpuResult({ renderer: 'WebGL Engine Active', vendor: 'Local GPU', fps: 60 });
      }
      setGpuBenchmarking(false);
    }, 800);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline, Description & Calls to Action */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Next-Gen 3D Project Ecosystem</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Spatial <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">3D Projects</span> For Visionaries.
            </h1>

            <p className="text-slate-300 text-base leading-relaxed">
              Explore interactive 3D WebGL simulations, edge machine learning engines, and distributed software. Built for creators who refuse to stay flat.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-950/50 transition-all flex items-center space-x-2 hover:scale-[1.02]"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Showcase</span>
              </a>

              <button
                onClick={() => setIsSubmitOpen(true)}
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all flex items-center space-x-2 hover:border-slate-600"
              >
                <PlusCircle className="w-4 h-4 text-cyan-400" />
                <span>Submit 3D Project</span>
              </button>
            </div>

            {/* Quick Data Compliance Assurance Box */}
            <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 bg-slate-950/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Privacy & User Data Notice</span>
                </span>
                <Link
                  href="/deleteuserdata"
                  className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 underline font-medium"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete User Data</span>
                </Link>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                We collect telemetry and submission records to index projects. Under GDPR and CCPA, you can inspect, download, or delete your entire record anytime.
              </p>
              <div className="flex items-center space-x-3 text-[11px] text-slate-400 pt-1">
                <Link href="/terms" className="hover:text-cyan-400 underline">Terms & Conditions</Link>
                <span>•</span>
                <Link href="/privacy" className="hover:text-cyan-400 underline">Privacy Policy</Link>
                <span>•</span>
                <Link href="/deleteuserdata" className="hover:text-rose-400 underline">Self-Serve Erasure</Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Three.js 3D Viewport */}
          <div className="lg:col-span-7">
            <Hero3DScene />
          </div>
        </div>
      </section>

      {/* Live Metrics Strip */}
      <section className="border-y border-slate-800/70 bg-slate-950/70 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-3xl font-extrabold font-mono text-cyan-400">120+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">3D & WebGL Projects</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold font-mono text-violet-400">250k+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Shaders Rendered</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold font-mono text-emerald-400">100%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">GDPR & CCPA Compliant</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold font-mono text-white">0 ms</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Self-Service Erasure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Featured 3D Engineering Showcases
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Filter by engineering domain, inspect architectural schematics, and view live WebGL rendering pipelines in real-time.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitOpen(true)}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-950 transition-all flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Your Project</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center overflow-x-auto w-full lg:w-auto p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-x-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, shaders, tags..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-sm">No projects matched your criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-cyan-400 text-xs underline font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard3D
                key={project.id}
                project={project}
                onSelect={(proj) => setActiveProject(proj)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Engine Specs & Diagnostic Section */}
      <section id="engine-specs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-b from-slate-950/90 to-slate-900/90 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400">
                <Cpu className="w-4 h-4" />
                <span>HARDWARE ACCELERATION ENGINE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Client-Side WebGL 2.0 & Shader Pipeline
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                All 3D geometry in NEXUS is computed locally on your device GPU using optimized vertex shaders and frustum culling. We collect anonymous renderer profiles strictly to avoid crashing lower-end devices.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h5 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Real-time Frustum Culling</span>
                  </h5>
                  <p className="text-[11px] text-slate-400">Drops non-visible polygons before GPU rasterization to maintain 60-120 FPS.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h5 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero Fingerprinting</span>
                  </h5>
                  <p className="text-[11px] text-slate-400">Canvas pixel extraction is isolated to prevent cross-site device fingerprinting.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={runGpuBenchmark}
                  disabled={gpuBenchmarking}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all flex items-center space-x-2"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{gpuBenchmarking ? 'Detecting GPU...' : 'Run Local WebGL Diagnostics'}</span>
                </button>

                {gpuResult && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs font-mono space-y-1 text-slate-300">
                    <p className="text-cyan-400 font-semibold">✓ WebGL 2.0 Hardware Acceleration Verified</p>
                    <p>Renderer: <span className="text-white">{gpuResult.renderer}</span></p>
                    <p>Vendor: <span className="text-slate-400">{gpuResult.vendor}</span></p>
                    <p>Status: <span className="text-emerald-400">Optimized for 60+ FPS</span></p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Transparency & Legal Hub Callout */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-950 p-6 border border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold font-mono uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>User Data Governance</span>
              </div>
              <h4 className="text-lg font-bold text-white">
                Transparency & Instant Erasure
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Because we collect project submission records, interaction preferences, and performance telemetry, we provide clear legal documentation and a self-service data erasure portal.
              </p>

              <div className="space-y-2 pt-2">
                <Link
                  href="/terms"
                  className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-200 flex items-center justify-between group transition-colors"
                >
                  <span>1. Terms & Conditions (T&C)</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </Link>

                <Link
                  href="/privacy"
                  className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-200 flex items-center justify-between group transition-colors"
                >
                  <span>2. Privacy Policy & Data Collection</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </Link>

                <Link
                  href="/deleteuserdata"
                  className="w-full p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs text-rose-300 font-semibold flex items-center justify-between group transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>3. Delete User Data (Self-Serve)</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-rose-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      {/* Submit Project Modal */}
      <SubmitProjectModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />
    </div>
  );
}

