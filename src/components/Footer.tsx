'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Box, 
  ShieldCheck, 
  Lock, 
  Trash2, 
  FileText, 
  Globe, 
  ArrowUpRight,
  Database,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 relative z-10">
      {/* Pre-footer Data Assurance Banner */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-slate-900/50 via-slate-900/90 to-slate-900/50 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                User Data Transparency & Privacy First
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  Compliant
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                We collect minimal project telemetry, session preferences, and optional submission records. You retain 100% ownership and can erase all stored data at any time.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <Link
              href="/privacy"
              className="text-xs px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700/60 flex items-center justify-center space-x-1 flex-1 md:flex-initial"
            >
              <span>Privacy Policy</span>
            </Link>
            <Link
              href="/deleteuserdata"
              className="text-xs px-4 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-colors border border-rose-500/40 flex items-center justify-center space-x-1.5 flex-1 md:flex-initial shadow-sm shadow-rose-950 font-medium"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Delete User Data</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Box className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-wider">
                NEXUS<span className="text-cyan-400">.3D</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An interactive 3D WebGL showroom engineered to feature cutting-edge open-source software, high-performance web applications, and experimental graphics pipelines.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>WebGL 2.0 / Three.js Accelerated</span>
            </div>
          </div>

          {/* Col 2: Showcase Discovery */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Explore Projects
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="/#projects" className="hover:text-cyan-400 transition-colors flex items-center justify-between">
                  <span>Interactive 3D Demos</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-cyan-400 transition-colors flex items-center justify-between">
                  <span>AI & Machine Learning</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-cyan-400 transition-colors flex items-center justify-between">
                  <span>Web3 & Distributed Systems</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-cyan-400 transition-colors flex items-center justify-between">
                  <span>DevTools & CLI Utility</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Governance */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Legal & Compliance
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Terms & Conditions (T&C)</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Privacy Policy (GDPR / CCPA)</span>
                </Link>
              </li>
              <li>
                <Link href="/deleteuserdata" className="text-rose-400/90 hover:text-rose-300 font-medium transition-colors flex items-center space-x-1.5">
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Delete User Data (Self-Serve)</span>
                </Link>
              </li>
              <li>
                <a href="#cookie-settings" onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('open-cookie-banner'));
                  }
                }} className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Cookie & Telemetry Preferences</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Data Rights & DPO Contact */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Data Rights & Erasure
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Exercise your legal right to erasure (GDPR Art. 17) or request proof of data purge directly through our automated portal.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1.5 text-slate-300">
              <div className="flex items-center text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                <span>Instant Browser Cache Wipe</span>
              </div>
              <div className="flex items-center text-cyan-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                <span>Automated Database Deletion</span>
              </div>
              <p className="text-slate-500 pt-1 border-t border-slate-800">
                DPO Contact: <span className="text-slate-300 font-mono">dpo@nexus3d.internal</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} NEXUS 3D Showcase. All rights reserved. Built with WebGL, Three.js & Next.js.</p>
          <div className="flex items-center space-x-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/deleteuserdata" className="hover:text-rose-400 transition-colors">Delete Data</Link>
            <span className="text-slate-700">|</span>
            <span className="flex items-center space-x-1 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Systems Nominal</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

