'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Send, 
  ShieldCheck, 
  CheckCircle, 
  Sparkles,
  Layers,
  Link as LinkIcon,
  Mail,
  User
} from 'lucide-react';
import Link from 'next/link';

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitProjectModal({ isOpen, onClose }: SubmitProjectModalProps) {
  const [formData, setFormData] = useState({
    projectName: '',
    developerName: '',
    email: '',
    category: '3D Web & WebGL',
    demoUrl: '',
    githubUrl: '',
    description: '',
    agreeConsent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectName || !formData.email || !formData.description) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!formData.agreeConsent) {
      setError('You must agree to the Terms of Service & Privacy Policy data collection.');
      return;
    }

    setError('');
    setSubmitted(true);

    // Fire celebratory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06B6D4', '#8B5CF6', '#10B981'],
    });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      projectName: '',
      developerName: '',
      email: '',
      category: '3D Web & WebGL',
      demoUrl: '',
      githubUrl: '',
      description: '',
      agreeConsent: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950/95 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Project Submitted!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you for showcasing with us. Your submission has been securely recorded. You will receive verification at <strong className="text-cyan-300">{formData.email}</strong>.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto">
              Want to remove your submission or erase contact info later? You can execute an instant erasure anytime on the{' '}
              <Link href="/deleteuserdata" className="text-rose-400 underline hover:text-rose-300">
                Delete User Data
              </Link>{' '}
              page.
            </div>
            <button
              onClick={resetForm}
              className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-all"
            >
              Close & Return
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                Showcase Submission
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">Submit Your 3D Project</h2>
              <p className="text-xs text-slate-400 mt-1">
                Share your interactive WebGL, AI, or Web3 project with our global engineering community.
              </p>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    placeholder="e.g. Orbital 3D Engine"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="3D Web & WebGL">3D Web & WebGL</option>
                    <option value="AI & ML">AI & Machine Learning</option>
                    <option value="DevTools">Developer Tools</option>
                    <option value="Cloud & Distributed">Cloud & Distributed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Creator / Org Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.developerName}
                      onChange={(e) => setFormData({ ...formData, developerName: e.target.value })}
                      placeholder="Jane Doe or Studio"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Contact Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Live Demo URL
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="url"
                      value={formData.demoUrl}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      placeholder="https://myproject.app"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Repository URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Project Description & 3D Specs *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your architecture, shaders, interactive mechanics, and frameworks used..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Data Collection Consent Checkbox */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeConsent}
                    onChange={(e) => setFormData({ ...formData, agreeConsent: e.target.checked })}
                    className="w-4 h-4 mt-0.5 accent-cyan-500 rounded cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-slate-300 leading-normal">
                    I acknowledge that personal information (name, email, URL) is collected to index my project. I have read and agree to the{' '}
                    <Link href="/terms" target="_blank" className="text-cyan-400 underline hover:text-cyan-300">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" target="_blank" className="text-cyan-400 underline hover:text-cyan-300">
                      Privacy Policy
                    </Link>
                    . I understand I can request full data deletion at any time via the{' '}
                    <Link href="/deleteuserdata" target="_blank" className="text-rose-400 underline hover:text-rose-300">
                      Data Deletion Portal
                    </Link>.
                  </span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-cyan-900/30 transition-all flex items-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Showcase</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

