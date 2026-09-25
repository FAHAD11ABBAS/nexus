// src/components/omniverse/NexusAcademyModal.jsx
// NEXUS Academy — Open University LMS, Quizzes & Verifiable Graduation Certificate Generator Modal

import { useState } from 'react';
import { GraduationCap, Award, CheckCircle2, Play, Search, X, ShieldCheck, Sparkles, FileText } from 'lucide-react';
import nexusAcademyService, { COURSES_CATALOG } from '@/services/nexusAcademyService';
import toast from 'react-hot-toast';

export default function NexusAcademyModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('courses'); // courses | certs
  const [selectedCourse, setSelectedCourse] = useState(COURSES_CATALOG[0]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  const [progress, setProgress] = useState(nexusAcademyService.getProgress());

  if (!isOpen) return null;

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setQuizAnswer(null);
    setQuizSubmitted(false);
    setIsPassed(false);
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (quizAnswer === null) return;

    setQuizSubmitted(true);
    if (quizAnswer === selectedCourse.quiz.correctAnswer) {
      setIsPassed(true);
      const cert = nexusAcademyService.issueCertificate(selectedCourse.title);
      setProgress(nexusAcademyService.getProgress());
      toast.success(`Congratulations! Graduation Certificate ${cert.hash} issued! 📜✨`);
    } else {
      setIsPassed(false);
      toast.error('Incorrect option. Review course materials and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900/98 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXUS Academy & Open University</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Verifiable LMS
                </span>
              </div>
              <p className="text-xs text-slate-400">Free interactive courses, code playgrounds & verifiable certificates</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'courses' ? 'bg-emerald-500 text-slate-950 font-extrabold shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap size={14} /> Course Catalog
          </button>

          <button
            onClick={() => setActiveTab('certs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'certs' ? 'bg-amber-500 text-slate-950 font-extrabold shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Award size={14} /> My Certificates ({progress.certificates.length})
          </button>
        </div>

        {activeTab === 'courses' ? (
          <div className="flex-1 flex gap-4 overflow-hidden">
            
            {/* Course List */}
            <div className="w-72 border-r border-slate-800 pe-3 space-y-2 overflow-y-auto custom-scrollbar flex-shrink-0">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Courses</h3>
              {COURSES_CATALOG.map((course) => {
                const isSelected = selectedCourse?.id === course.id;
                return (
                  <button
                    key={course.id}
                    onClick={() => handleSelectCourse(course)}
                    className={`w-full text-start p-3 rounded-2xl border transition-all space-y-1 ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500/50 shadow-md shadow-emerald-950/20'
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{course.iconEmoji}</span>
                      <span className="text-xs font-bold text-white truncate">{course.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2">{course.description}</p>
                    <span className="inline-block text-[9px] font-mono text-emerald-400 pt-1">{course.level} · {course.duration}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Course Workspace */}
            {selectedCourse && (
              <div className="flex-1 flex flex-col space-y-4 overflow-y-auto pe-1 custom-scrollbar">
                
                {/* Course Banner */}
                <div className="p-4 rounded-3xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{selectedCourse.iconEmoji}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                      {selectedCourse.level}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{selectedCourse.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedCourse.description}</p>
                </div>

                {/* Modules Checklist */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FileText size={14} className="text-emerald-400" /> Syllabus Modules
                  </h4>
                  <div className="space-y-1.5">
                    {selectedCourse.modules.map((m) => (
                      <div key={m.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{m.title}</span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 size={12} /> Passed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Graduation Quiz */}
                <form onSubmit={handleQuizSubmit} className="p-4 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Award size={15} /> Final Certification Quiz
                  </h4>
                  <p className="text-xs text-white font-semibold">{selectedCourse.quiz.question}</p>

                  <div className="space-y-2">
                    {selectedCourse.quiz.options.map((opt, idx) => (
                      <label
                        key={idx}
                        className={`w-full p-3 rounded-2xl border text-xs font-semibold flex items-center gap-3 cursor-pointer transition-all ${
                          quizAnswer === idx ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name="quiz"
                          checked={quizAnswer === idx}
                          onChange={() => setQuizAnswer(idx)}
                          className="accent-emerald-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20"
                  >
                    Submit Quiz & Issue Certificate
                  </button>

                  {quizSubmitted && isPassed && (
                    <div className="p-3 rounded-2xl bg-emerald-900/40 border border-emerald-500 text-xs text-emerald-300 font-bold text-center">
                      🎓 PASS! Certificate Issued to Local Vault!
                    </div>
                  )}
                </form>

              </div>
            )}

          </div>
        ) : (
          /* Certificates List */
          <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar">
            {progress.certificates.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs bg-slate-800/30 rounded-3xl border border-slate-800">
                No certificates earned yet. Complete course quizzes to issue graduation certificates!
              </div>
            ) : (
              progress.certificates.map((cert) => (
                <div key={cert.id} className="p-5 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                      <Award size={18} /> Official Graduation Certificate
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{cert.hash}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{cert.courseTitle}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
                    <span>Issued To: <strong className="text-emerald-400">{cert.studentName}</strong></span>
                    <span>Date: {cert.issueDate}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
