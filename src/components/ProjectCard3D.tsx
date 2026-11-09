'use client';

import React, { useRef, useState } from 'react';
import { ProjectItem } from '@/data/projectsData';
import { 
  Star, 
  Eye, 
  ExternalLink, 
  Github, 
  Cpu, 
  ShieldCheck, 
  Sparkles,
  Layers
} from 'lucide-react';

interface ProjectCard3DProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export default function ProjectCard3D({ project, onSelect }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10; // max 10 deg tilt
    const rY = ((x - centerX) / centerX) * 10;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Featured':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Production':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Live Beta':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
        className="glass-panel relative flex flex-col justify-between h-full rounded-2xl p-6 bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 shadow-xl hover:shadow-cyan-950/30 group"
      >
        {/* Ambient Top Glow */}
        <div
          className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${project.themeColor} opacity-10 blur-2xl group-hover:opacity-25 transition-opacity pointer-events-none`}
        />

        <div>
          {/* Header Row: Category & Badges */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
              {project.category}
            </span>
            <div className="flex items-center space-x-1.5">
              <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${getBadgeStyle(project.badge)}`}>
                {project.badge}
              </span>
            </div>
          </div>

          {/* Project Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 flex items-center justify-between">
            <span>{project.title}</span>
            <Sparkles className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100" />
          </h3>

          <p className="text-xs text-slate-300 font-medium line-clamp-1 mb-2">
            {project.tagline}
          </p>

          <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* 3D Performance Stats Strip */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] mb-4">
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mesh: <strong className="text-slate-200 font-mono">{project.engineSpecs.polygons}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>Render: <strong className="text-slate-200 font-mono">{project.engineSpecs.fpsTarget}</strong></span>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions & Data Notice */}
        <div>
          {/* Data collection disclosure tag */}
          <div className="mb-4 pt-3 border-t border-slate-800/60 flex items-center space-x-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate" title={project.dataCollectedNotice}>
              {project.dataCollectedNotice}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>{project.stars}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{project.views}</span>
              </span>
            </div>

            <button
              onClick={() => onSelect(project)}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all hover:scale-105 flex items-center space-x-1 shadow-sm"
            >
              <span>Inspect 3D Specs</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

