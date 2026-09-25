// src/components/sovereign/OfficeModal.jsx
// NEXUS Office Suite — Documents, Spreadsheets, Presentations

import { useState, useEffect, useRef } from 'react';
import { X, FileText, Table2, Presentation, Plus, Trash2, Download, Bold, Italic, Underline, List, Heading1, Eye, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import officeService from '@/services/officeService';
import toast from 'react-hot-toast';

export default function OfficeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('docs');

  // Documents
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const editorRef = useRef(null);

  // Spreadsheets
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [activeCell, setActiveCell] = useState(null);
  const [formulaBar, setFormulaBar] = useState('');

  // Presentations
  const [presentations, setPresentations] = useState([]);
  const [selectedPres, setSelectedPres] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (isOpen) loadAll();
  }, [isOpen]);

  async function loadAll() {
    const [d, s, p] = await Promise.all([
      officeService.getDocuments(),
      officeService.getSpreadsheets(),
      officeService.getPresentations(),
    ]);
    setDocs(d);
    setSheets(s);
    setPresentations(p);
  }

  if (!isOpen) return null;

  // ── Document Handlers ──
  const handleNewDoc = async () => {
    const doc = officeService.createDocument();
    await officeService.saveDocument(doc);
    setDocs((prev) => [doc, ...prev]);
    setSelectedDoc(doc);
    toast.success('New document created ✨');
  };

  const handleSaveDoc = async () => {
    if (!selectedDoc || !editorRef.current) return;
    const updated = { ...selectedDoc, content: editorRef.current.innerHTML };
    await officeService.saveDocument(updated);
    setSelectedDoc(updated);
    setDocs((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    toast.success('Document saved 💾');
  };

  const handleDeleteDoc = async (id) => {
    await officeService.deleteDocument(id);
    setDocs((prev) => prev.filter((d) => d.id !== id));
    if (selectedDoc?.id === id) setSelectedDoc(null);
  };

  const execCommand = (cmd, val = null) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  };

  // ── Spreadsheet Handlers ──
  const handleNewSheet = async () => {
    const sheet = officeService.createSpreadsheet();
    await officeService.saveSpreadsheet(sheet);
    setSheets((prev) => [sheet, ...prev]);
    setSelectedSheet(sheet);
    toast.success('New spreadsheet created 📊');
  };

  const handleCellChange = (key, value) => {
    if (!selectedSheet) return;
    const updated = { ...selectedSheet, cells: { ...selectedSheet.cells, [key]: value } };
    setSelectedSheet(updated);
  };

  const handleCellBlur = async () => {
    if (selectedSheet) {
      await officeService.saveSpreadsheet(selectedSheet);
      setSheets((prev) => prev.map((s) => (s.id === selectedSheet.id ? selectedSheet : s)));
    }
  };

  const getCellDisplay = (key) => {
    if (!selectedSheet) return '';
    const raw = selectedSheet.cells[key] || '';
    if (raw.startsWith('=')) return officeService.evaluateFormula(raw, selectedSheet.cells);
    return raw;
  };

  // ── Presentation Handlers ──
  const handleNewPres = async () => {
    const pres = officeService.createPresentation();
    await officeService.savePresentation(pres);
    setPresentations((prev) => [pres, ...prev]);
    setSelectedPres(pres);
    toast.success('New presentation created 🎬');
  };

  const handleSlideEdit = (field, value) => {
    if (!selectedPres) return;
    const slides = [...selectedPres.slides];
    slides[selectedPres.currentSlide] = { ...slides[selectedPres.currentSlide], [field]: value };
    setSelectedPres({ ...selectedPres, slides });
  };

  const handleAddSlide = () => {
    if (!selectedPres) return;
    const newSlide = { id: `s_${Date.now()}`, title: 'New Slide', body: '', bgColor: '#1a1a2e' };
    setSelectedPres({ ...selectedPres, slides: [...selectedPres.slides, newSlide], currentSlide: selectedPres.slides.length });
  };

  const handleSavePres = async () => {
    if (!selectedPres) return;
    await officeService.savePresentation(selectedPres);
    setPresentations((prev) => prev.map((p) => (p.id === selectedPres.id ? selectedPres : p)));
    toast.success('Presentation saved 🎯');
  };

  const colLetter = (c) => String.fromCharCode(65 + c);

  const tabs = [
    { id: 'docs', label: 'Documents', icon: FileText, color: 'text-blue-400' },
    { id: 'sheets', label: 'Spreadsheets', icon: Table2, color: 'text-green-400' },
    { id: 'slides', label: 'Presentations', icon: Presentation, color: 'text-orange-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-5xl bg-slate-900/98 border border-blue-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10">
              <FileText size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXUS Office Suite</h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-mono border border-blue-500/30">Sovereign</span>
              </div>
              <p className="text-xs text-slate-400">Documents, spreadsheets & presentations — all local</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/60 rounded-2xl border border-slate-700/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === tab.id ? 'bg-blue-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-white'
                }`}>
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-3">

          {/* ═══ DOCUMENTS TAB ═══ */}
          {activeTab === 'docs' && (
            <div className="flex gap-3 h-[60vh]">
              {/* Sidebar */}
              <div className="w-48 flex-shrink-0 space-y-2 overflow-y-auto">
                <button onClick={handleNewDoc} className="w-full py-2 rounded-xl bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30 hover:bg-blue-500/30 transition-all flex items-center justify-center gap-1.5">
                  <Plus size={14} /> New Document
                </button>
                {docs.map((doc) => (
                  <div key={doc.id} onClick={() => setSelectedDoc(doc)}
                    className={`p-2.5 rounded-xl text-xs cursor-pointer transition-all border ${
                      selectedDoc?.id === doc.id ? 'bg-blue-500/20 border-blue-500/40 text-white' : 'bg-slate-800/40 border-slate-700/40 text-slate-300 hover:border-slate-600'
                    }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold truncate flex-1">{doc.title}</span>
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteDoc(doc.id); }} className="text-slate-500 hover:text-rose-400 p-0.5">
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-500">{new Date(doc.updatedAt).toLocaleDateString()}</span>
                  </div>
                ))}
                {docs.length === 0 && <p className="text-[10px] text-slate-500 text-center py-4">No documents yet</p>}
              </div>

              {/* Editor */}
              <div className="flex-1 flex flex-col">
                {selectedDoc ? (
                  <>
                    <input type="text" value={selectedDoc.title} onChange={(e) => setSelectedDoc({ ...selectedDoc, title: e.target.value })}
                      className="bg-transparent text-white text-sm font-bold outline-none border-b border-slate-700 pb-2 mb-2" />
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 pb-2 border-b border-slate-800 mb-2">
                      <button onClick={() => execCommand('bold')} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white"><Bold size={14} /></button>
                      <button onClick={() => execCommand('italic')} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white"><Italic size={14} /></button>
                      <button onClick={() => execCommand('underline')} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white"><Underline size={14} /></button>
                      <div className="w-px h-5 bg-slate-700 mx-1" />
                      <button onClick={() => execCommand('insertUnorderedList')} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white"><List size={14} /></button>
                      <button onClick={() => execCommand('formatBlock', 'h2')} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white"><Heading1 size={14} /></button>
                      <div className="flex-1" />
                      <button onClick={handleSaveDoc} className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30 hover:bg-blue-500/30 flex items-center gap-1"><Save size={12} /> Save</button>
                      <button onClick={() => officeService.exportToMarkdown(selectedDoc)} className="px-3 py-1 rounded-lg bg-slate-700/60 text-slate-300 text-[10px] font-bold hover:bg-slate-700 flex items-center gap-1"><Download size={12} /> .MD</button>
                      <button onClick={() => officeService.exportToPDF(selectedDoc)} className="px-3 py-1 rounded-lg bg-slate-700/60 text-slate-300 text-[10px] font-bold hover:bg-slate-700 flex items-center gap-1"><Download size={12} /> PDF</button>
                    </div>
                    <div ref={editorRef} contentEditable suppressContentEditableWarning
                      dangerouslySetInnerHTML={{ __html: selectedDoc.content }}
                      className="flex-1 overflow-y-auto bg-slate-800/40 rounded-xl p-4 text-sm text-slate-200 outline-none border border-slate-700/40 focus:border-blue-500/40 min-h-[200px]"
                      style={{ whiteSpace: 'pre-wrap' }} />
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">Select or create a document</div>
                )}
              </div>
            </div>
          )}

          {/* ═══ SPREADSHEETS TAB ═══ */}
          {activeTab === 'sheets' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button onClick={handleNewSheet} className="px-3 py-1.5 rounded-xl bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30 hover:bg-green-500/30 transition-all flex items-center gap-1.5">
                  <Plus size={14} /> New Spreadsheet
                </button>
                {sheets.map((sh) => (
                  <button key={sh.id} onClick={() => setSelectedSheet(sh)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedSheet?.id === sh.id ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'bg-slate-800/40 border-slate-700/40 text-slate-400 hover:text-white'
                    }`}>
                    {sh.title}
                  </button>
                ))}
              </div>

              {selectedSheet && (
                <>
                  {/* Formula Bar */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 font-mono w-10">{activeCell ? `${colLetter(parseInt(activeCell.split('_')[1]))}${parseInt(activeCell.split('_')[0]) + 1}` : ''}</span>
                    <input type="text" value={formulaBar} onChange={(e) => { setFormulaBar(e.target.value); if (activeCell) handleCellChange(activeCell, e.target.value); }}
                      placeholder="Enter value or formula (e.g. =SUM(A1:A5))"
                      className="flex-1 bg-slate-800/60 border border-slate-700/60 rounded-lg px-3 py-1.5 text-white text-xs outline-none focus:border-green-500/60" />
                  </div>

                  {/* Grid */}
                  <div className="overflow-auto max-h-[55vh] rounded-xl border border-slate-700/40">
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr>
                          <th className="sticky top-0 bg-slate-800 border border-slate-700/60 p-1.5 text-slate-500 w-10 z-10"></th>
                          {Array.from({ length: selectedSheet.cols }).map((_, c) => (
                            <th key={c} className="sticky top-0 bg-slate-800 border border-slate-700/60 p-1.5 text-slate-400 font-mono min-w-[80px] z-10">{colLetter(c)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: selectedSheet.rows }).map((_, r) => (
                          <tr key={r}>
                            <td className="bg-slate-800/60 border border-slate-700/60 p-1.5 text-center text-slate-500 font-mono">{r + 1}</td>
                            {Array.from({ length: selectedSheet.cols }).map((_, c) => {
                              const key = `${r}_${c}`;
                              return (
                                <td key={key} className={`border border-slate-700/40 p-0 ${activeCell === key ? 'ring-2 ring-green-500/60' : ''}`}>
                                  <input type="text"
                                    value={activeCell === key ? (selectedSheet.cells[key] || '') : getCellDisplay(key)}
                                    onFocus={() => { setActiveCell(key); setFormulaBar(selectedSheet.cells[key] || ''); }}
                                    onChange={(e) => { handleCellChange(key, e.target.value); setFormulaBar(e.target.value); }}
                                    onBlur={handleCellBlur}
                                    className="w-full h-full px-1.5 py-1 bg-transparent text-white text-xs outline-none" />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              {!selectedSheet && sheets.length === 0 && <p className="text-slate-500 text-sm text-center py-8">Create your first spreadsheet</p>}
            </div>
          )}

          {/* ═══ PRESENTATIONS TAB ═══ */}
          {activeTab === 'slides' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button onClick={handleNewPres} className="px-3 py-1.5 rounded-xl bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30 hover:bg-orange-500/30 transition-all flex items-center gap-1.5">
                  <Plus size={14} /> New Presentation
                </button>
                {presentations.map((p) => (
                  <button key={p.id} onClick={() => { setSelectedPres(p); setPreviewMode(false); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedPres?.id === p.id ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' : 'bg-slate-800/40 border-slate-700/40 text-slate-400 hover:text-white'
                    }`}>
                    {p.title}
                  </button>
                ))}
              </div>

              {selectedPres && !previewMode && (
                <div className="flex gap-3 h-[55vh]">
                  {/* Slide Navigator */}
                  <div className="w-36 flex-shrink-0 space-y-2 overflow-y-auto">
                    {selectedPres.slides.map((slide, idx) => (
                      <div key={slide.id} onClick={() => setSelectedPres({ ...selectedPres, currentSlide: idx })}
                        className={`p-2 rounded-xl border cursor-pointer transition-all ${
                          selectedPres.currentSlide === idx ? 'border-orange-500/50 bg-orange-500/10' : 'border-slate-700/40 bg-slate-800/40 hover:border-slate-600'
                        }`}>
                        <div className="aspect-video rounded-lg flex items-center justify-center text-[8px] text-slate-400" style={{ backgroundColor: slide.bgColor }}>
                          <span className="text-white font-bold truncate px-1">{slide.title}</span>
                        </div>
                        <span className="text-[9px] text-slate-500 mt-1 block">Slide {idx + 1}</span>
                      </div>
                    ))}
                    <button onClick={handleAddSlide} className="w-full py-2 rounded-xl border border-dashed border-slate-600 text-slate-500 text-[10px] hover:border-orange-500/50 hover:text-orange-400 transition-all flex items-center justify-center gap-1">
                      <Plus size={10} /> Add Slide
                    </button>
                  </div>

                  {/* Slide Editor */}
                  <div className="flex-1 flex flex-col">
                    {selectedPres.slides[selectedPres.currentSlide] && (
                      <>
                        <div className="flex items-center justify-between pb-2">
                          <span className="text-xs text-slate-400 font-mono">Slide {selectedPres.currentSlide + 1} / {selectedPres.slides.length}</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setPreviewMode(true)} className="px-3 py-1 rounded-lg bg-slate-700/60 text-slate-300 text-[10px] font-bold hover:bg-slate-700 flex items-center gap-1"><Eye size={12} /> Preview</button>
                            <button onClick={handleSavePres} className="px-3 py-1 rounded-lg bg-orange-500/20 text-orange-400 text-[10px] font-bold border border-orange-500/30 hover:bg-orange-500/30 flex items-center gap-1"><Save size={12} /> Save</button>
                          </div>
                        </div>
                        <div className="flex-1 rounded-xl border border-slate-700/40 p-6 flex flex-col items-center justify-center gap-4" style={{ backgroundColor: selectedPres.slides[selectedPres.currentSlide].bgColor }}>
                          <input type="text" value={selectedPres.slides[selectedPres.currentSlide].title}
                            onChange={(e) => handleSlideEdit('title', e.target.value)}
                            className="bg-transparent text-white text-2xl font-bold text-center outline-none w-full" placeholder="Slide Title" />
                          <textarea value={selectedPres.slides[selectedPres.currentSlide].body}
                            onChange={(e) => handleSlideEdit('body', e.target.value)}
                            className="bg-transparent text-slate-300 text-sm text-center outline-none w-full resize-none" rows={4} placeholder="Slide content..." />
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <span className="text-[10px] text-slate-500">Background:</span>
                          {['#1a1a2e', '#0f172a', '#1e293b', '#312e81', '#1e1b4b', '#042f2e', '#18181b'].map((c) => (
                            <button key={c} onClick={() => handleSlideEdit('bgColor', c)}
                              className={`w-5 h-5 rounded-full border-2 transition-all ${selectedPres.slides[selectedPres.currentSlide].bgColor === c ? 'border-orange-400 scale-110' : 'border-slate-600'}`}
                              style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Preview Mode */}
              {selectedPres && previewMode && (
                <div className="h-[60vh] flex flex-col">
                  <div className="flex items-center justify-between pb-2">
                    <button onClick={() => setPreviewMode(false)} className="px-3 py-1 rounded-lg bg-slate-700/60 text-slate-300 text-[10px] font-bold hover:bg-slate-700 flex items-center gap-1"><ChevronLeft size={12} /> Edit</button>
                    <span className="text-xs text-slate-400 font-mono">{selectedPres.currentSlide + 1} / {selectedPres.slides.length}</span>
                    <div className="flex gap-2">
                      <button disabled={selectedPres.currentSlide === 0} onClick={() => setSelectedPres({ ...selectedPres, currentSlide: selectedPres.currentSlide - 1 })}
                        className="p-1.5 rounded-lg bg-slate-700/60 text-slate-300 hover:bg-slate-700 disabled:opacity-30"><ChevronLeft size={14} /></button>
                      <button disabled={selectedPres.currentSlide === selectedPres.slides.length - 1} onClick={() => setSelectedPres({ ...selectedPres, currentSlide: selectedPres.currentSlide + 1 })}
                        className="p-1.5 rounded-lg bg-slate-700/60 text-slate-300 hover:bg-slate-700 disabled:opacity-30"><ChevronRight size={14} /></button>
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl border border-slate-700/40 flex flex-col items-center justify-center gap-6 p-12" style={{ backgroundColor: selectedPres.slides[selectedPres.currentSlide]?.bgColor }}>
                    <h1 className="text-4xl font-black text-white text-center">{selectedPres.slides[selectedPres.currentSlide]?.title}</h1>
                    <p className="text-lg text-slate-300 text-center max-w-lg whitespace-pre-wrap">{selectedPres.slides[selectedPres.currentSlide]?.body}</p>
                  </div>
                </div>
              )}

              {!selectedPres && presentations.length === 0 && <p className="text-slate-500 text-sm text-center py-8">Create your first presentation</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
