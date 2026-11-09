'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Lock, 
  ShieldCheck, 
  ArrowLeft, 
  Database, 
  Trash2, 
  Eye, 
  Server, 
  UserCheck, 
  CheckCircle2, 
  FileText,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'collection' | 'rights' | 'cookies'>('all');
  const lastUpdated = 'November 9, 2026';

  const dataCategories = [
    {
      category: '1. Project Submission Data',
      type: 'Directly Provided',
      items: ['Developer / Creator Name', 'Contact Email Address', 'Project Repository & Live Demo URLs', 'Project Architectural Description & Tags'],
      purpose: 'To catalog, attribute, and index your 3D software submission in our public showcase.',
      retention: 'Retained until developer requests removal via the Data Deletion Portal.',
    },
    {
      category: '2. 3D WebGL GPU & Performance Telemetry',
      type: 'Automatically Collected',
      items: ['Unmasked GPU Vendor & Renderer string', 'Target frame rate (FPS) and frame drop events', 'Canvas resolution & Device Pixel Ratio', 'Shader compilation error logs'],
      purpose: 'To dynamically calibrate 3D scene polygon density, avoid browser GPU context loss, and optimize rendering efficiency.',
      retention: 'Aggregated anonymously and purged on a 30-day rolling cycle.',
    },
    {
      category: '3. Session & Interaction State',
      type: 'Client-side Storage (Cookies & LocalStorage)',
      items: ['Category filter preferences', 'Cookie consent status', '3D Scene visual mode (wireframe/solid/particle speed)', 'Recent project modal inspection events'],
      purpose: 'To preserve user interface preferences and prevent re-prompting consent banners.',
      retention: 'Persisted in local browser storage; instant wipe supported via One-Click Local Purge.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to 3D Showcase</span>
        </Link>

        <div className="flex items-center space-x-3 text-xs">
          <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <span className="text-slate-700">|</span>
          <Link
            href="/deleteuserdata"
            className="text-rose-400 hover:text-rose-300 font-medium transition-colors flex items-center space-x-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete User Data</span>
          </Link>
        </div>
      </div>

      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 bg-slate-950/80 mb-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center space-x-3 text-violet-400 text-xs font-mono uppercase tracking-wider mb-3">
          <Lock className="w-4 h-4" />
          <span>Privacy & Data Protection Framework</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Privacy Policy
        </h1>

        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed mb-6">
          We believe in radical data transparency. As an interactive 3D platform, we collect specific technical and submission data to operate smoothly. This document details precisely what we collect, our lawful basis, and how you can exercise instant erasure.
        </p>

        {/* High-priority Data Deletion CTA Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900/80 to-slate-900/80 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                Need to erase your collected data?
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">GDPR Art. 17 / CCPA</span>
              </h4>
              <p className="text-xs text-slate-400">
                You can immediately wipe local browser caches and submit a verified server purge request with a single click.
              </p>
            </div>
          </div>
          <Link
            href="/deleteuserdata"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold whitespace-nowrap shadow-md shadow-rose-950 transition-all hover:scale-105"
          >
            Go to Delete User Data
          </Link>
        </div>
      </div>

      {/* Main Privacy Policy Body */}
      <div className="space-y-8">
        
        {/* Section 1: Data Controller */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-950/60">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            <span>1. Identity of Data Controller</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The data controller responsible for the processing of user data through NEXUS.3D is the NEXUS Platform Engineering and Data Governance Division. If you have questions about our data collection practices, you may reach our Data Protection Officer (DPO) at <span className="text-cyan-400 font-mono">dpo@nexus3d.internal</span>.
          </p>
        </div>

        {/* Section 2: Detailed Breakdown of Collected User Data */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-950/60">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
            <Database className="w-5 h-5 text-violet-400" />
            <span>2. Categories of User Data We Collect</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            We explicitly inform users whenever data is collected. Below is our comprehensive registry of data categories, purposes, and retention limits:
          </p>

          <div className="space-y-4">
            {dataCategories.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/80 pb-2">
                  <h3 className="text-sm font-bold text-white">{item.category}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 self-start sm:self-auto">
                    {item.type}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 uppercase font-mono text-[10px] block mb-1">Data Elements Collected</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                      {item.items.map((i, k) => (
                        <li key={k} className="text-xs">{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-500 uppercase font-mono text-[10px] block">Processing Purpose</span>
                      <p className="text-slate-300 text-xs">{item.purpose}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase font-mono text-[10px] block">Retention Period</span>
                      <p className="text-cyan-400 text-xs font-mono">{item.retention}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Legal Basis for Processing */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-950/60">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>3. Lawful Basis for Processing (GDPR Art. 6)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="font-bold text-white mb-1">A. Explicit Consent</h4>
              <p className="text-slate-400 leading-relaxed">
                Applies to project submissions, contact emails, and voluntary telemetry tracking. Users may withdraw consent at any time.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="font-bold text-white mb-1">B. Legitimate Interests</h4>
              <p className="text-slate-400 leading-relaxed">
                Applies to anonymous GPU hardware profiling strictly necessary to prevent WebGL browser crashes and optimize shader rendering.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="font-bold text-white mb-1">C. Legal Compliance</h4>
              <p className="text-slate-400 leading-relaxed">
                Applies to retaining verifiable audit proofs of user deletion requests for regulatory transparency.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Your Statutory Rights (GDPR & CCPA) */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-950/60">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <span>4. Your Statutory Privacy Rights</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Under international privacy regulations (including GDPR Articles 15-22 and the California Consumer Privacy Act), you possess the following actionable rights:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5">Right to Erasure ("Right to be Forgotten"):</strong>
              <p className="text-slate-400">Request the irrevocable deletion of all your submitted records and telemetry.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5">Right to Access & Portability:</strong>
              <p className="text-slate-400">Obtain an exportable machine-readable JSON copy of any stored personal data.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5">Right to Rectification:</strong>
              <p className="text-slate-400">Request correction of inaccurate project details or updated email addresses.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5">Right to Non-Discrimination:</strong>
              <p className="text-slate-400">Full access to 3D showcases is never denied or restricted for exercising privacy rights.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-300">
              <span>Ready to exercise your Right to Erasure?</span>
            </div>
            <Link
              href="/deleteuserdata"
              className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-colors flex items-center space-x-1.5"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Launch Self-Service Erasure</span>
            </Link>
          </div>
        </div>

        {/* Section 5: Third-Party Disclosures & Security */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-950/60">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
            <Server className="w-5 h-5 text-indigo-400" />
            <span>5. Third-Party Sharing & Security Standards</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
            <p>
              <strong>We do not sell user data.</strong> We do not engage with third-party data brokers, ad networks, or behavioral cross-site trackers. Infrastructure subprocessors (such as edge content delivery networks) only process data under strict Data Processing Agreements (DPAs) with standard contractual clauses.
            </p>
            <p>
              All telemetry and submission records are protected with TLS 1.3 in-transit and AES-256 encryption at rest.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

