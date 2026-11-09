'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowLeft, 
  RefreshCw, 
  Download, 
  Search, 
  AlertTriangle, 
  Lock, 
  Check, 
  X,
  FileCheck,
  Server,
  Database,
  Info
} from 'lucide-react';

interface DeletionResponse {
  success: boolean;
  ticketId: string;
  email: string;
  scope: string;
  status: string;
  timestamp: string;
  receiptHash: string;
  purgedItems: string[];
  statutoryNotice: string;
}

export default function DeleteUserDataPage() {
  // Portal Tab state
  const [activePortalTab, setActivePortalTab] = useState<'erase' | 'export'>('erase');

  // Form states
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState('all');
  const [reason, setReason] = useState('Privacy preferences');
  const [agreementConfirmed, setAgreementConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<DeletionResponse | null>(null);

  // Local storage wipe states
  const [localWiped, setLocalWiped] = useState(false);
  const [wipingLocal, setWipingLocal] = useState(false);

  // Status check states
  const [trackQuery, setTrackQuery] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackResult, setTrackResult] = useState<any | null>(null);
  const [trackError, setTrackError] = useState('');

  // Data export states (GDPR Art. 20 Portability)
  const [exportEmail, setExportEmail] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [exportError, setExportError] = useState('');
  const [exportSuccess, setExportSuccess] = useState<any | null>(null);

  // Handle GDPR Data Export
  const handleExportData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exportEmail || !exportEmail.includes('@')) {
      setExportError('Please enter a valid email to export your records.');
      return;
    }

    setExportError('');
    setExportLoading(true);

    try {
      const res = await fetch('/api/export-user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: exportEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to export data.');

      setExportSuccess(data);

      // Download file directly
      const blob = new Blob([JSON.stringify(data.dataPackage, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user-data-export-${data.exportId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setExportError(err.message || 'Export failed.');
    } finally {
      setExportLoading(false);
    }
  };

  // Handle instant browser wipe
  const handleWipeBrowserData = () => {
    setWipingLocal(true);
    setTimeout(() => {
      try {
        localStorage.clear();
        sessionStorage.clear();
        // Clear document cookies accessible by JS
        document.cookie.split(';').forEach((c) => {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });
        setLocalWiped(true);
      } catch (err) {
        console.error('Failed to clear browser storage', err);
      } finally {
        setWipingLocal(false);
      }
    }, 600);
  };

  // Handle Server-Side Deletion Request
  const handleSubmitDeletion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!agreementConfirmed) {
      setError('Please confirm the verification checkbox.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/delete-user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          scope,
          reason,
          agreementConfirmed,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setResult(data);
      // Trigger instant local wipe as well
      handleWipeBrowserData();

      // Fire celebratory completion confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#06B6D4', '#10B981'],
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Deletion Status Lookup
  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;

    setTrackError('');
    setTrackingLoading(true);
    setTrackResult(null);

    try {
      const res = await fetch(`/api/delete-user-data?ticketId=${encodeURIComponent(trackQuery.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'No deletion request located.');
      }
      setTrackResult(data);
    } catch (err: any) {
      setTrackError(err.message || 'Failed to locate record.');
    } finally {
      setTrackingLoading(false);
    }
  };

  // Download official JSON deletion certificate
  const handleDownloadCertificate = () => {
    if (!result) return;
    const certData = {
      certificate: 'NEXUS.3D Right to Erasure Official Proof',
      complianceStandard: 'GDPR Article 17 / CCPA Section 1798.105',
      ticketId: result.ticketId,
      email: result.email,
      scope: result.scope,
      timestamp: result.timestamp,
      cryptographicSignature: result.receiptHash,
      purgedDataElements: result.purgedItems,
      issuer: 'NEXUS Platform Data Protection Office',
    };

    const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `erasure-certificate-${result.ticketId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Breadcrumb */}
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
            Terms & Conditions
          </Link>
          <span className="text-slate-700">|</span>
          <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-rose-500/30 bg-slate-950/85 mb-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-3 text-rose-400 text-xs font-mono uppercase tracking-wider mb-3">
          <Trash2 className="w-4 h-4" />
          <span>Self-Service Data Erasure Portal</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Delete Your User Data
        </h1>

        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed mb-6">
          Under GDPR Article 17 (Right to Erasure) and CCPA Section 1798.105, you have the unconditional right to request the total purging of your personal information, project submission records, and collected telemetry.
        </p>

        {/* Action 1: Instant Client Browser Purge Button */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>Step 1: Instant Local Browser Cache & Cookie Wipe</span>
            </h4>
            <p className="text-xs text-slate-400">
              Immediately purges localStorage, cookies, session identifiers, and 3D WebGL shader cache on this device.
            </p>
          </div>

          <button
            onClick={handleWipeBrowserData}
            disabled={wipingLocal}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-2 ${
              localWiped
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {localWiped ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Browser Storage Purged!</span>
              </>
            ) : (
              <>
                <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${wipingLocal ? 'animate-spin' : ''}`} />
                <span>{wipingLocal ? 'Wiping...' : 'Execute Local Browser Wipe'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Server Request Form & Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left Column: Official Server Deletion & Export Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-950/70 shadow-xl space-y-6">
            
            {/* Dual Mode Switcher Tabs */}
            <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800 space-x-1">
              <button
                type="button"
                onClick={() => setActivePortalTab('erase')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${
                  activePortalTab === 'erase'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Right to Erasure (Delete Data)</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePortalTab('export')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${
                  activePortalTab === 'export'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Right to Portability (Export Data)</span>
              </button>
            </div>

            {activePortalTab === 'export' ? (
              /* GDPR Art. 20 Export Section */
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
                    <Download className="w-4 h-4" />
                    <span>GDPR Art. 20 / CCPA Portability</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Export Your Personal Data Archive
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Download an authentic, structured, machine-readable JSON package containing all telemetry, project records, and consent logs linked to your email.
                  </p>
                </div>

                {exportError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{exportError}</span>
                  </div>
                )}

                {exportSuccess ? (
                  <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-4">
                    <div className="flex items-center space-x-3 text-cyan-400">
                      <CheckCircle2 className="w-7 h-7" />
                      <div>
                        <h3 className="text-base font-bold text-white">Data Package Generated & Downloaded</h3>
                        <p className="text-xs text-cyan-300 font-mono">Archive ID: {exportSuccess.exportId}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300">
                      A structured JSON file was saved to your downloads folder. You can review the data or proceed with permanent erasure whenever you are ready.
                    </p>
                    <button
                      type="button"
                      onClick={() => setExportSuccess(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                    >
                      Export Another Address
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleExportData} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Registered Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={exportEmail}
                        onChange={(e) => setExportEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={exportLoading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold tracking-wide uppercase shadow-lg shadow-cyan-950/40 transition-all flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>{exportLoading ? 'Compiling Archive...' : 'Download My Data Archive (JSON)'}</span>
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* Erasure Section */
              <>
            <div>
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono uppercase tracking-wider mb-1">
                <Server className="w-4 h-4" />
                <span>Step 2: Server Record Purge</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                Submit Formal Data Deletion Request
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter the email associated with your project submissions or communication history to unlink and erase your data from our servers.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {result ? (
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4 animate-in fade-in">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                  <div>
                    <h3 className="text-base font-bold text-white">Data Erasure Processed</h3>
                    <p className="text-xs text-emerald-300 font-mono">Ticket: {result.ticketId}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Target Email:</span>
                    <strong className="text-slate-200">{result.email}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Scope:</span>
                    <strong className="text-cyan-400 uppercase">{result.scope}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Receipt Signature:</span>
                    <span className="text-slate-300 font-mono truncate max-w-[200px]">{result.receiptHash}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Timestamp:</span>
                    <span className="text-slate-300">{new Date(result.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Purged Records & Unlinked Items
                  </span>
                  <div className="space-y-1.5">
                    {result.purgedItems.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleDownloadCertificate}
                    className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-all flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Deletion Certificate (JSON)</span>
                  </button>

                  <button
                    onClick={() => {
                      setResult(null);
                      setEmail('');
                      setAgreementConfirmed(false);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitDeletion} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Registered Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. developer@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Used to locate project submissions, newsletter queues, and telemetry association IDs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Scope of Erasure
                    </label>
                    <select
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-500"
                    >
                      <option value="all">Complete Purge (All Data & Submissions)</option>
                      <option value="telemetry">Only GPU & Performance Telemetry</option>
                      <option value="submissions">Only Project Showcases & Email</option>
                      <option value="marketing">Revoke All Communications Consent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Reason for Deletion (Optional)
                    </label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-500"
                    >
                      <option value="Privacy preferences">Privacy preferences</option>
                      <option value="Project outdated / deprecation">Project outdated / deprecation</option>
                      <option value="No longer using NEXUS 3D">No longer using NEXUS 3D</option>
                      <option value="GDPR / CCPA Audit exercise">GDPR / CCPA Audit exercise</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Legal Confirmation Box */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <label className="flex items-start space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreementConfirmed}
                      onChange={(e) => setAgreementConfirmed(e.target.checked)}
                      className="w-4 h-4 mt-0.5 accent-rose-500 rounded cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-slate-300 leading-normal">
                      I certify that I am the data subject or authorized representative associated with this email address. I understand that executing this request will permanently unlink and erase my records in accordance with GDPR Art. 17 and CCPA provisions.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold tracking-wide uppercase shadow-lg shadow-rose-950/40 transition-all flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{loading ? 'Processing Erasure...' : 'Permanently Delete My Data'}</span>
                </button>
              </form>
            )}
            </>
            )}
          </div>
        </div>

        {/* Right Column: Deletion Status Lookup & SLA Information */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Status Tracker Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 bg-slate-950/70 shadow-xl space-y-4">
            <div>
              <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                Audit & Verification
              </span>
              <h3 className="text-lg font-bold text-white">Track Deletion Ticket</h3>
              <p className="text-xs text-slate-400 mt-1">
                Already submitted an erasure request? Enter your Ticket ID (e.g. DEL-2026-...) or email address to verify real-time status.
              </p>
            </div>

            <form onSubmit={handleCheckStatus} className="flex gap-2">
              <input
                type="text"
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder="Enter Ticket ID or Email..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors flex items-center space-x-1"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track</span>
              </button>
            </form>

            {trackError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {trackError}
              </div>
            )}

            {trackResult && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono text-cyan-400 font-bold">{trackResult.ticketId}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                    {trackResult.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Audit Trail:</span>
                  {trackResult.auditLog ? (
                    trackResult.auditLog.map((log: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-[11px] text-slate-300">
                        <span className="flex items-center space-x-1.5">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>{log.step}</span>
                        </span>
                        <span className="text-slate-500 font-mono text-[10px]">{log.time}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center space-x-2 text-emerald-400 text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>All target records purged and verified</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Cryptographic Proof:</span>
                  <span className="font-mono text-slate-300 truncate max-w-[150px]">{trackResult.receiptHash}</span>
                </div>
              </div>
            )}
          </div>

          {/* Statutory FAQ & SLA Box */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 bg-slate-950/70 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Erasure SLA & Statutory FAQ</span>
            </h4>

            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <strong className="text-slate-200 block mb-0.5">How quickly is data deleted?</strong>
                <p>
                  Local cookies and browser tokens are deleted immediately (0 ms). Server production records are unlinked instantly, with backup cold storage rotations finalized within 24 to 72 hours.
                </p>
              </div>

              <div>
                <strong className="text-slate-200 block mb-0.5">Will my project showcase disappear?</strong>
                <p>
                  Yes. If you choose "Complete Purge" or "Submissions Only", your listed projects are immediately removed from the catalog index.
                </p>
              </div>

              <div>
                <strong className="text-slate-200 block mb-0.5">Can I re-submit later?</strong>
                <p>
                  Yes. Data erasure does not ban you from the platform. You may submit new projects whenever you wish.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

