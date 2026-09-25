// src/components/privacy/DecoyPanicModal.jsx
// Decoy Emergency Panic Screen — Field Defense Mode
// Replaces real application interface with clean decoy screen (Notes/Calculator) upon coercion

import { useState, useEffect } from 'react';
import { Lock, Unlock, FileText, Calculator, ShieldCheck, Key } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DecoyPanicModal({ isPanicActive, onDeactivatePanic }) {
  const [passcode, setPasscode] = useState('');
  const [activeDecoyApp, setActiveDecoyApp] = useState('notes'); // notes | calculator
  const [notes, setNotes] = useState([
    { id: '1', title: 'Grocery List', body: 'Milk, eggs, organic apples, green tea.' },
    { id: '2', title: 'Meeting Reminders', body: 'Sync with design team at 3:00 PM.' },
    { id: '3', title: 'Reading List', body: 'The Art of Computer Programming Vol 1.' },
  ]);
  const [selectedNote, setSelectedNote] = useState(notes[0]);

  // Calculator State
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcPrev, setCalcPrev] = useState(null);
  const [calcOp, setCalcOp] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Hotkey: Cmd+Shift+P or Ctrl+Shift+P to trigger panic mode anywhere
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('nexus_toggle_panic'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isPanicActive) return null;

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    if (passcode === '1234' || passcode === '0000') {
      toast.success('Panic defense deactivated — returning to NEXUS Sovereign Workspace 🛡️');
      setPasscode('');
      onDeactivatePanic();
    } else {
      toast.error('Invalid Emergency PIN code');
      setPasscode('');
    }
  };

  const handleCalcNum = (num) => {
    if (calcDisplay === '0') setCalcDisplay(String(num));
    else setCalcDisplay(calcDisplay + num);
  };

  const handleCalcOp = (op) => {
    setCalcPrev(parseFloat(calcDisplay));
    setCalcOp(op);
    setCalcDisplay('0');
  };

  const handleCalcEquals = () => {
    if (!calcOp || calcPrev === null) return;
    const curr = parseFloat(calcDisplay);
    let result = 0;
    if (calcOp === '+') result = calcPrev + curr;
    if (calcOp === '-') result = calcPrev - curr;
    if (calcOp === '×') result = calcPrev * curr;
    if (calcOp === '÷') result = curr !== 0 ? calcPrev / curr : 0;
    setCalcDisplay(String(result));
    setCalcOp(null);
    setCalcPrev(null);
  };

  return (
    <div className="fixed inset-0 z-9999 bg-slate-950 text-slate-100 flex flex-col font-sans select-none animate-fade-in">
      
      {/* Top Decoy Header Bar */}
      <div className="h-12 border-b border-slate-800 bg-slate-900 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveDecoyApp('notes')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeDecoyApp === 'notes' ? 'bg-slate-800 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText size={14} /> System Notes
            </button>
            <button
              onClick={() => setActiveDecoyApp('calculator')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeDecoyApp === 'calculator' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator size={14} /> Utility Calculator
            </button>
          </div>
        </div>

        {/* Secret Unlock Button */}
        <form onSubmit={handleUnlockSubmit} className="flex items-center gap-2">
          <input
            type="password"
            maxLength={4}
            placeholder="PIN"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-16 px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-center text-white outline-none focus:border-emerald-500 font-mono"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            title="Deactivate Decoy Vault"
          >
            <Unlock size={14} />
          </button>
        </form>
      </div>

      {/* Main Decoy Body */}
      {activeDecoyApp === 'notes' ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Notes Sidebar */}
          <div className="w-64 border-r border-slate-800 bg-slate-900/50 p-3 space-y-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Quick Notes</h2>
            {notes.map((note) => (
              <button
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`w-full text-left p-2.5 rounded-xl text-xs space-y-1 transition-all ${
                  selectedNote?.id === note.id ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="font-bold truncate">{note.title}</div>
                <div className="text-[11px] text-slate-400 truncate">{note.body}</div>
              </button>
            ))}
          </div>

          {/* Note View */}
          <div className="flex-1 p-6 space-y-4">
            <input
              type="text"
              value={selectedNote?.title || ''}
              onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
              className="text-xl font-bold bg-transparent outline-none w-full text-white"
            />
            <textarea
              value={selectedNote?.body || ''}
              onChange={(e) => setSelectedNote({ ...selectedNote, body: e.target.value })}
              rows={12}
              className="w-full bg-transparent text-sm text-slate-300 outline-none resize-none"
            />
          </div>
        </div>
      ) : (
        /* Utility Calculator Decoy */
        <div className="flex-1 flex items-center justify-center p-6 bg-slate-950">
          <div className="w-72 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-right font-mono text-2xl text-white overflow-hidden">
              {calcDisplay}
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => setCalcDisplay('0')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-rose-400">C</button>
              <button onClick={() => setCalcDisplay(String(-parseFloat(calcDisplay)))} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-300">+/-</button>
              <button onClick={() => handleCalcOp('%')} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-300">%</button>
              <button onClick={() => handleCalcOp('÷')} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-white">÷</button>

              {[7, 8, 9].map((n) => (
                <button key={n} onClick={() => handleCalcNum(n)} className="p-3 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-sm font-bold text-white">{n}</button>
              ))}
              <button onClick={() => handleCalcOp('×')} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-white">×</button>

              {[4, 5, 6].map((n) => (
                <button key={n} onClick={() => handleCalcNum(n)} className="p-3 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-sm font-bold text-white">{n}</button>
              ))}
              <button onClick={() => handleCalcOp('-')} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-white">-</button>

              {[1, 2, 3].map((n) => (
                <button key={n} onClick={() => handleCalcNum(n)} className="p-3 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-sm font-bold text-white">{n}</button>
              ))}
              <button onClick={() => handleCalcOp('+')} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-white">+</button>

              <button onClick={() => handleCalcNum(0)} className="col-span-2 p-3 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-sm font-bold text-white">0</button>
              <button onClick={() => !calcDisplay.includes('.') && setCalcDisplay(calcDisplay + '.')} className="p-3 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-sm font-bold text-white">.</button>
              <button onClick={handleCalcEquals} className="p-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold text-white">=</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
