'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Cookie, Check, X, Trash2 } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    performance3D: true,
    analytics: false,
  });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user previously made a decision
    const consent = localStorage.getItem('nexus_consent_status');
    if (!consent) {
      // Delay slightly for natural feel
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }

    // Listener for footer button "Cookie & Telemetry Preferences"
    const handleReopen = () => setVisible(true);
    window.addEventListener('open-cookie-banner', handleReopen);
    return () => window.removeEventListener('open-cookie-banner', handleReopen);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('nexus_consent_status', 'accepted_all');
    localStorage.setItem('nexus_telemetry_allowed', 'true');
    setVisible(false);
  };

  const handleDeclineNonEssential = () => {
    localStorage.setItem('nexus_consent_status', 'essential_only');
    localStorage.setItem('nexus_telemetry_allowed', 'false');
    setVisible(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('nexus_consent_status', JSON.stringify(preferences));
    localStorage.setItem('nexus_telemetry_allowed', String(preferences.analytics));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom duration-300">
      <div className="glass-panel bg-slate-950/95 border border-cyan-500/30 rounded-2xl p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl">
        <div className="flex items-start space-x-3.5 mb-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                Privacy & Data Telemetry Choice
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-900/60 text-cyan-300 font-mono">
                  Consent Control
                </span>
              </h3>
              <button
                onClick={() => setVisible(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-xs"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              We collect user telemetry and GPU hardware profiles to optimize 3D WebGL rendering, frame rates, and project bookmarks. You have complete legal control over your data.
            </p>
          </div>
        </div>

        {showDetails && (
          <div className="my-3 pt-3 border-t border-slate-800 text-xs space-y-2.5">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div>
                <p className="font-semibold text-slate-200">Essential Engine Cookies</p>
                <p className="text-[11px] text-slate-400">Strictly required for rendering session & security tokens.</p>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">Required</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div>
                <p className="font-semibold text-slate-200">3D WebGL Performance Telemetry</p>
                <p className="text-[11px] text-slate-400">FPS tracking, WebGL context loss recovery, and shader cache.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.performance3D}
                onChange={(e) => setPreferences({ ...preferences, performance3D: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div>
                <p className="font-semibold text-slate-200">Showcase Interaction Analytics</p>
                <p className="text-[11px] text-slate-400">Anonymous project click rates and category filtering metrics.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-[11px]">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-cyan-400 hover:text-cyan-300 underline font-medium"
            >
              {showDetails ? 'Hide Details' : 'Configure Toggles'}
            </button>
            <span className="text-slate-600">•</span>
            <Link href="/privacy" className="text-slate-400 hover:text-slate-200 underline">
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/deleteuserdata" className="text-rose-400 hover:text-rose-300 font-medium underline flex items-center gap-1">
              <Trash2 className="w-3 h-3" />
              <span>Delete Data</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {showDetails ? (
              <button
                onClick={handleSaveCustom}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-all"
              >
                Save Preferences
              </button>
            ) : (
              <>
                <button
                  onClick={handleDeclineNonEssential}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all border border-slate-700"
                >
                  Essential Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-medium shadow-md shadow-cyan-900/40 transition-all flex items-center space-x-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Accept All</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

