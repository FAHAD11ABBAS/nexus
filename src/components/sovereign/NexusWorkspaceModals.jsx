// src/components/sovereign/NexusWorkspaceModals.jsx
// NEXUS Communication & Workspace Suite — NEXOS Mail, NEXOS Meet, NEXOS Cloud Drive Modal

import { useState, useEffect } from 'react';
import { Mail, Video, HardDrive, Plus, X, Send, Check, ShieldCheck, Copy, Mic, MicOff, VideoOff, ScreenShare } from 'lucide-react';
import nexusWorkspaceService from '@/services/nexusWorkspaceService';
import toast from 'react-hot-toast';

export default function NexusWorkspaceModals({ isOpen, onClose, initialTab = 'mail' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // mail | meet | drive
  
  // Mail State
  const [mails, setMails] = useState(nexusWorkspaceService.getMails());
  const [selectedMail, setSelectedMail] = useState(mails[0] || null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeRecipient, setComposeRecipient] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  // Meet State
  const [inCall, setInCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  // Drive State
  const [files, setFiles] = useState(nexusWorkspaceService.getDriveFiles());
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleMailUpdate = () => setMails([...nexusWorkspaceService.getMails()]);
    const handleDriveUpdate = () => setFiles([...nexusWorkspaceService.getDriveFiles()]);

    window.addEventListener('nexus_mail_updated', handleMailUpdate);
    window.addEventListener('nexus_drive_updated', handleDriveUpdate);
    return () => {
      window.removeEventListener('nexus_mail_updated', handleMailUpdate);
      window.removeEventListener('nexus_drive_updated', handleDriveUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const handleSelectMail = (mail) => {
    setSelectedMail(mail);
    nexusWorkspaceService.markAsRead(mail.id);
  };

  const handleSendMailSubmit = (e) => {
    e.preventDefault();
    if (!composeRecipient.trim()) return;

    nexusWorkspaceService.sendMail({
      recipient: composeRecipient,
      subject: composeSubject,
      body: composeBody,
    });

    setShowCompose(false);
    setComposeRecipient('');
    setComposeSubject('');
    setComposeBody('');
    toast.success('Message sent via NEXOS Encrypted Mail 📧');
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    nexusWorkspaceService.uploadDriveFile(newFileName, newFileContent);
    setNewFileName('');
    setNewFileContent('');
    toast.success('Asset uploaded to NEXOS Cloud Drive 💾');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900/98 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <Mail size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXUS Communication & Workspace Suite</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  user@nexusmail.com
                </span>
              </div>
              <p className="text-xs text-slate-400">Decentralized Mail, WebRTC Meet & Sovereign Cloud Drive</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/60 rounded-2xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('mail')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'mail' ? 'bg-emerald-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail size={14} /> NEXOS Mail
          </button>
          <button
            onClick={() => setActiveTab('meet')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'meet' ? 'bg-indigo-600 text-white shadow font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video size={14} /> NEXOS Meet (WebRTC)
          </button>
          <button
            onClick={() => setActiveTab('drive')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'drive' ? 'bg-purple-600 text-white shadow font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <HardDrive size={14} /> NEXOS Cloud Drive
          </button>
        </div>

        {/* Tab 1: NEXOS Mail */}
        {activeTab === 'mail' && (
          <div className="flex-1 flex gap-4 overflow-hidden">
            {/* Mail List */}
            <div className="w-72 border-r border-slate-800 pe-3 space-y-2 overflow-y-auto custom-scrollbar flex-shrink-0">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inbox</h3>
                <button
                  onClick={() => setShowCompose(true)}
                  className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold flex items-center gap-1 border border-emerald-500/30"
                >
                  <Plus size={12} /> Compose
                </button>
              </div>

              {mails.map((m) => {
                const isSelected = selectedMail?.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleSelectMail(m)}
                    className={`w-full text-start p-3 rounded-2xl border transition-all space-y-1 ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500/50 shadow-md shadow-emerald-950/20'
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{m.senderName}</span>
                      {!m.isRead && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                    </div>
                    <p className="text-xs font-semibold text-slate-300 truncate">{m.subject}</p>
                    <p className="text-[10px] text-slate-500 truncate">{m.preview}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Mail Detail */}
            {selectedMail ? (
              <div className="flex-1 p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedMail.subject}</h3>
                    <p className="text-xs text-slate-400">From: <strong className="text-emerald-400">{selectedMail.sender}</strong></p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{new Date(selectedMail.timestamp).toLocaleString()}</span>
                </div>

                <pre className="text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed">
                  {selectedMail.body}
                </pre>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
                Select a message to view
              </div>
            )}
          </div>
        )}

        {/* Tab 2: NEXOS Meet (WebRTC P2P Room) */}
        {activeTab === 'meet' && (
          <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
            {!inCall ? (
              <div className="p-8 text-center bg-slate-900/40 rounded-3xl border border-indigo-500/30 space-y-4 max-w-md mx-auto my-auto">
                <div className="w-14 h-14 mx-auto rounded-3xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-2xl font-bold">
                  🎥
                </div>
                <h3 className="text-base font-bold text-white">NEXOS WebRTC P2P Video Meeting</h3>
                <p className="text-xs text-slate-400">Zero time limits, encrypted P2P mesh audio & HD video streams.</p>
                <button
                  onClick={() => setInCall(true)}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-900/40"
                >
                  Start Encrypted P2P Meeting Room
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col space-y-3">
                <div className="flex-1 grid grid-cols-2 gap-3 bg-black rounded-3xl p-3 border border-indigo-500/40 relative">
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl">🧑‍💻</span>
                    <span className="absolute bottom-2 start-2 text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded-md">You (Host)</span>
                  </div>
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl">🤖</span>
                    <span className="absolute bottom-2 start-2 text-[10px] font-mono text-indigo-400 bg-black/60 px-2 py-0.5 rounded-md">Remote Peer Node</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-2xl flex items-center justify-center gap-3">
                  <button onClick={() => setIsMicOn(!isMicOn)} className={`p-3 rounded-xl text-white ${isMicOn ? 'bg-slate-800' : 'bg-rose-600'}`}>
                    {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
                  </button>
                  <button onClick={() => setIsVideoOn(!isVideoOn)} className={`p-3 rounded-xl text-white ${isVideoOn ? 'bg-slate-800' : 'bg-rose-600'}`}>
                    {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
                  </button>
                  <button onClick={() => toast.success('Screen Sharing Active')} className="p-3 rounded-xl bg-slate-800 text-white">
                    <ScreenShare size={16} />
                  </button>
                  <button onClick={() => setInCall(false)} className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs">
                    End Call
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: NEXOS Cloud Drive */}
        {activeTab === 'drive' && (
          <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
            <form onSubmit={handleUploadFile} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Asset name (e.g. quantum-data.json)"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-purple-500 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 shadow-md"
              >
                <Plus size={14} /> Upload Asset
              </button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-2 pe-1 custom-scrollbar">
              {files.map((f) => (
                <div key={f.id} className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <HardDrive size={18} className="text-purple-400" />
                    <div>
                      <p className="font-bold text-white font-mono">{f.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{f.size} · Updated {new Date(f.updatedAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <button onClick={() => { navigator.clipboard.writeText(f.content); toast.success('Content copied!'); }} className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                    <Copy size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Compose Mail */}
        {showCompose && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-3 animate-fade-in">
            <form onSubmit={handleSendMailSubmit} className="w-full max-w-md bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 space-y-3 shadow-2xl text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Compose Encrypted Mail</h3>
                <button type="button" onClick={() => setShowCompose(false)} className="text-slate-400 hover:text-white"><X size={16} /></button>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">To</label>
                <input
                  type="email"
                  required
                  placeholder="recipient@nexusmail.com"
                  value={composeRecipient}
                  onChange={(e) => setComposeRecipient(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Subject line"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Message Body</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type message content..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowCompose(false)} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold">Send Mail</button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
