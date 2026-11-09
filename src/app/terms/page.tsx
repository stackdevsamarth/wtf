'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  Calendar, 
  Download, 
  Lock, 
  Trash2, 
  CheckCircle2,
  AlertCircle,
  Search
} from 'lucide-react';

export default function TermsPage() {
  const [filterQuery, setFilterQuery] = useState('');
  const lastUpdated = 'November 9, 2026';

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms & Eligibility',
      content: `By accessing, browsing, interacting with 3D WebGL scenes, or submitting projects through NEXUS.3D ("the Platform", "we", "us", or "our"), you ("User", "Developer", or "Visitor") acknowledge that you have read, understood, and agreed to be legally bound by these Terms and Conditions ("Terms"). If you do not agree with any provision of these Terms, you must discontinue accessing the platform and exercise your right to request deletion of any previously stored user data via our Self-Service Data Erasure Portal.`,
    },
    {
      id: 'data-collection-consent',
      title: '2. User Data Collection & Processing Agreement',
      content: `In operating an interactive 3D showcase, we collect both actively provided user data (such as project submissions, contact emails, and developer handles) and passive telemetry data (including WebGL GPU profiles, screen resolutions, shader compilation logs, and frame rate metrics). 

By using the Platform, you grant us explicit consent to collect, aggregate, and process this information strictly in accordance with our Privacy Policy. We do not sell, rent, or trade your personal data to third parties. Furthermore, in accordance with applicable data privacy regulations including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), you retain perpetual rights to withdraw consent and trigger immediate data purge via our Delete User Data portal.`,
    },
    {
      id: 'submissions-ip',
      title: '3. Intellectual Property Rights & Project Submissions',
      content: `Creators and developers retain full ownership, copyright, and intellectual property rights in and to any project code, assets, 3D models, or descriptions submitted to NEXUS.3D. 

By submitting a project, you grant us a worldwide, non-exclusive, royalty-free license to host, render, display, index, and preview your project solely for the purposes of platform demonstration, search indexing, and developer community showcasing. You represent and warrant that your submissions do not infringe upon any third-party intellectual property, patent, trademark, or trade secret rights.`,
    },
    {
      id: 'acceptable-use',
      title: '4. Acceptable Use Policy & Platform Security',
      content: `Users agree not to misuse the Platform. Prohibited conduct includes, but is not limited to:
• Submitting malicious WebGL shaders, compute kernels, or scripts engineered to trigger GPU denial-of-service or browser crashes;
• Reverse engineering, scraping, or mass harvesting developer profiles and contact data without authorization;
• Transmitting deceptive, defamatory, or unlawful payloads;
• Attempting to circumvent access controls, rate limits, or telemetry opt-out mechanisms.

Violation of these guidelines may result in immediate revocation of showcase listings and administrative blocking.`,
    },
    {
      id: 'hardware-disclaimer',
      title: '5. WebGL 2.0 Device Compatibility & Warranty Disclaimer',
      content: `The 3D interactive graphics rendered on this platform rely upon client-side hardware acceleration and modern WebGL 2.0 / WebGPU implementations. The Platform is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. 

We do not guarantee that the 3D scenes will render error-free across all hardware architectures, legacy mobile GPUs, or deprecated browsers. Users are encouraged to run the integrated WebGL diagnostic tool on the homepage to assess hardware compatibility.`,
    },
    {
      id: 'limitation-liability',
      title: '6. Limitation of Liability',
      content: `To the maximum extent permitted by applicable law, in no event shall NEXUS.3D, its operators, affiliates, or contributors be held liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from:
• The use or inability to use the 3D interactive features or platform;
• Any unauthorized access to or alteration of your user submissions or telemetry data;
• Hardware strain, driver crashes, or temporary performance degradation arising from 3D WebGL rendering.`,
    },
    {
      id: 'data-deletion-rights',
      title: '7. Right to Erasure & Termination of Service',
      content: `Users have the unilateral right to terminate their interaction with the Platform and request complete deletion of their stored user data at any time. 

You may initiate this process directly by visiting the Delete User Data page (/deleteuserdata). Erasure requests trigger an automated purge of session identifiers, cached GPU profiles, and submitted project listings, followed by issuance of a verifiable cryptographic deletion receipt.`,
    },
    {
      id: 'modifications-governing',
      title: '8. Modifications to Terms & Governing Law',
      content: `We reserve the right to revise these Terms periodically to reflect updates in platform functionality, 3D rendering standards, or data protection laws. Any material revisions will be accompanied by an updated "Last Updated" timestamp and an in-app notice. 

These Terms shall be governed by and construed in accordance with the applicable laws of the jurisdiction in which the platform operators are established, without regard to conflict of law principles.`,
    },
    {
      id: 'contact-dpo',
      title: '9. Legal Contact & Data Protection Officer',
      content: `For legal notices, inquiries regarding these Terms, or formal correspondence concerning data protection rights, please contact our designated compliance team:
• Legal Department: legal@nexus3d.internal
• Data Protection Officer (DPO): dpo@nexus3d.internal
• Physical/Notice Address: NEXUS.3D Operations, Data Governance Division`,
    },
  ];

  const filteredSections = sections.filter(
    (s) =>
      s.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to 3D Showcase</span>
        </Link>

        <div className="flex items-center space-x-3 text-xs">
          <Link
            href="/privacy"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Privacy Policy
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

      {/* Hero Header */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 bg-slate-950/80 mb-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center space-x-3 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
          <FileText className="w-4 h-4" />
          <span>Legal Agreement & Governance</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Terms & Conditions of Service
        </h1>

        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed mb-6">
          These Terms govern your use of the NEXUS 3D platform, our interactive WebGL rendering services, project showcase catalog, and explicit user data collection procedures.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-4 border-t border-slate-800/80">
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Last Updated: <strong className="text-slate-200">{lastUpdated}</strong></span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Includes User Data Collection Provisions</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center space-x-1.5">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>GDPR Art. 17 Erasure Supported</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Table of Contents & Clauses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Table of Contents Sticky Sidebar */}
        <div className="lg:col-span-4 order-2 lg:order-1">
          <div className="glass-panel sticky top-24 rounded-2xl p-5 border border-slate-800/80 bg-slate-950/70 space-y-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
              Table of Contents
            </h3>

            {/* Quick search inside terms */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search clauses..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <nav className="space-y-1 text-xs">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-900/60 transition-colors truncate"
                >
                  {section.title}
                </a>
              ))}
            </nav>

            {/* Direct Erasure Link Box */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <p className="text-[11px] text-slate-400">
                Want to withdraw consent or erase all collected user data?
              </p>
              <Link
                href="/deleteuserdata"
                className="w-full px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Open Data Deletion Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Clauses List */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
          {filteredSections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="glass-panel scroll-mt-24 rounded-2xl p-6 sm:p-7 border border-slate-800/80 bg-slate-950/60 hover:border-slate-700/80 transition-colors"
            >
              <h2 className="text-lg font-bold text-white mb-3 flex items-center justify-between">
                <span>{section.title}</span>
              </h2>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-2">
                {section.content}
              </div>
            </div>
          ))}

          {filteredSections.length === 0 && (
            <div className="p-8 text-center glass-panel rounded-2xl border border-slate-800 text-slate-400 text-xs">
              No clauses matched "{filterQuery}".
            </div>
          )}

          {/* Bottom Confirmation Box */}
          <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Full User Data Control Guaranteed</p>
                <p className="text-[11px] text-slate-300">You may inspect or purge any collected project telemetry at any time.</p>
              </div>
            </div>
            <Link
              href="/deleteuserdata"
              className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Manage / Delete My Data
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

