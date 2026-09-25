// src/components/career/CareerGigsModal.jsx
// Interactive Career & Free Job Gigs Board modal

import { useState } from 'react';
import { Briefcase, MapPin, Plus, X, Search, Send, CheckCircle } from 'lucide-react';
import careerService from '@/services/careerService';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import toast from 'react-hot-toast';

export default function CareerGigsModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [appliedGigs, setAppliedGigs] = useState([]);

  // Post form state
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('Remote');
  const [pay, setPay] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const categories = ['All', 'Engineering', 'Healthcare', 'Design', 'Research'];
  const gigs = careerService.getGigs(activeCategory, searchQuery);

  const handleApply = (gig) => {
    if (appliedGigs.includes(gig.id)) {
      toast.error('You have already submitted an application for this gig.');
      return;
    }
    careerService.applyToGig(gig.id);
    setAppliedGigs((prev) => [...prev, gig.id]);
    toast.success(`Application sent to ${gig.company}! 🎉`);
  };

  const handlePostGig = (e) => {
    e.preventDefault();
    if (!title || !company || !pay || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    careerService.createGig({
      title,
      company,
      location,
      pay,
      category,
      description,
      tags: [category, 'NEXUS'],
    });

    toast.success('Career Gig published successfully! 🚀');
    setShowPostForm(false);
    setTitle('');
    setCompany('');
    setPay('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900/95 border border-slate-700/80 rounded-3xl p-5 space-y-4 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Briefcase size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                NEXUS Multi-Disciplinary Career Board
              </h2>
              <p className="text-xs text-slate-400">Zero-fee global gigs, engineering, design & medical circles</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {!showPostForm ? (
          <>
            {/* Search and Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 w-full">
                <Search size={16} className="absolute start-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search gigs, skills, companies..."
                  className="w-full ps-9 pe-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={() => setShowPostForm(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex-shrink-0 shadow-lg"
              >
                <Plus size={16} />
                <span>Post a Gig</span>
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-all ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gigs List */}
            <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar">
              {gigs.map((gig) => {
                const isApplied = appliedGigs.includes(gig.id);
                return (
                  <div
                    key={gig.id}
                    className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-slate-600 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{gig.title}</h3>
                          {gig.verified && <VerifiedBadge type={gig.verificationType} size="sm" />}
                        </div>
                        <p className="text-xs text-indigo-400 font-semibold">{gig.company}</p>
                      </div>

                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                        {gig.pay}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2">{gig.description}</p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-700/40 text-[11px]">
                      <div className="flex items-center gap-3 text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-slate-400" />
                          {gig.location}
                        </span>
                        <span>•</span>
                        <span>{gig.type}</span>
                        <span>•</span>
                        <span className="text-slate-500">{gig.applicantsCount} applicants</span>
                      </div>

                      <button
                        onClick={() => handleApply(gig)}
                        disabled={isApplied}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isApplied
                            ? 'bg-emerald-600/30 text-emerald-400 cursor-default'
                            : 'bg-indigo-600/80 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <CheckCircle size={14} /> Applied
                          </>
                        ) : (
                          <>
                            <Send size={12} /> Apply Now
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Create Gig Form */
          <form onSubmit={handlePostGig} className="space-y-3 overflow-y-auto pe-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Post New Opportunity</h3>
              <button
                type="button"
                onClick={() => setShowPostForm(false)}
                className="text-xs text-indigo-400 hover:underline"
              >
                Back to Board
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Medical AI Researcher"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization *</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. HealthNexus"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Design">Design</option>
                  <option value="Research">Research</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Remote Global"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Compensation / Pay *</label>
                <input
                  type="text"
                  value={pay}
                  onChange={(e) => setPay(e.target.value)}
                  placeholder="e.g. 80k - 100k NX / Year"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description & Requirements *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe role expectations and qualifications..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Publish Gig Opportunity
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
