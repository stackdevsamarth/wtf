'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ProjectItem } from '@/data/projectsData';
import { 
  X, 
  ExternalLink, 
  Github, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Activity, 
  CheckCircle2,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

const Project3DPreview = dynamic(() => import('./Project3DPreview'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 rounded-2xl bg-slate-900 flex items-center justify-center text-xs font-mono text-cyan-400">
      Loading 3D simulation...
    </div>
  ),
});

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950/95 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4 pr-8">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-400">ID: {project.id}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {project.title}
          </h2>
          <p className="text-sm text-cyan-200/90 font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Live Interactive 3D Simulation Canvas */}
        <div className="mb-6">
          <Project3DPreview
            projectId={project.id}
            themeColor={project.themeColor}
            category={project.category}
          />
        </div>

        {/* 3D Engine Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 mb-6">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Polygon Count</span>
            <div className="flex items-center space-x-1.5 text-cyan-400 font-bold font-mono text-sm">
              <Cpu className="w-4 h-4" />
              <span>{project.engineSpecs.polygons}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Draw Calls</span>
            <div className="flex items-center space-x-1.5 text-emerald-400 font-bold font-mono text-sm">
              <Activity className="w-4 h-4" />
              <span>{project.engineSpecs.drawCalls}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Target Framerate</span>
            <div className="flex items-center space-x-1.5 text-violet-400 font-bold font-mono text-sm">
              <Layers className="w-4 h-4" />
              <span>{project.engineSpecs.fpsTarget}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Shader Pipeline</span>
            <div className="text-slate-200 font-mono text-xs truncate" title={project.engineSpecs.shaderPasses}>
              {project.engineSpecs.shaderPasses}
            </div>
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="space-y-4 mb-6">
          <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400">
            System Overview & Architecture
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.fullOverview}
          </p>

          <div className="space-y-2 mt-3">
            {project.architecture.map((item, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 text-cyan-300 border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Data Collection & GDPR Statement for this project */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 mb-8 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Project Data Transparency Notice</span>
            </div>
            <Link
              href="/deleteuserdata"
              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center space-x-1 underline"
            >
              <Trash2 className="w-3 h-3" />
              <span>Data Erasure Request</span>
            </Link>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {project.dataCollectedNotice} All telemetry collected during this project preview complies with our strict privacy framework. You can purge all cached session telemetry at any time.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/80 transition-colors flex items-center space-x-2"
            >
              <Github className="w-4 h-4" />
              <span>View Repository</span>
            </a>
            <button
              onClick={() => {
                alert(`Launching 3D WebGL simulator for ${project.title}`);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-medium shadow-md shadow-cyan-900/40 transition-all flex items-center space-x-2"
            >
              <span>Launch Live Simulation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

