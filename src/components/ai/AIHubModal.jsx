// src/components/ai/AIHubModal.jsx
// NEXUS AI Studio — Poly-Engine Hub, BYOK Vault, Autonomous Coding Sandbox with Live Preview, & Socratic Reasoning

import { useState } from 'react';
import {
  Sparkles, Code, Brain, Palette, Key, X, Copy, Check, Zap, Eye, ShieldCheck
} from 'lucide-react';
import nexusAIHubService, { AI_PROVIDERS } from '@/services/nexusAIHubService';
import toast from 'react-hot-toast';

export default function AIHubModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('coding'); // coding | reasoning | creative | keys
  const [selectedProvider, setSelectedProvider] = useState(nexusAIHubService.getActiveProvider());
  
  // Coding Sandbox State
  const [codePrompt, setCodePrompt] = useState('');
  const [codeLang, setCodeLang] = useState('html');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isPreviewable, setIsPreviewable] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  // Socratic Reasoning State
  const [socraticPrompt, setSocraticPrompt] = useState('');
  const [socraticResult, setSocraticResult] = useState(null);

  // Creative Studio State
  const [creativeConcept, setCreativeConcept] = useState('');
  const [creativePrompts, setCreativePrompts] = useState(null);

  // BYOK Vault State
  const [vaultKeys, setVaultKeys] = useState(nexusAIHubService.getBYOKVault());

  if (!isOpen) return null;

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    nexusAIHubService.setActiveProvider(provider.id);
    toast.success(`Active Model: ${provider.name}`);
  };

  const handleGenerateCode = (e) => {
    e.preventDefault();
    if (!codePrompt.trim()) return;

    const res = nexusAIHubService.generateCode(codePrompt, codeLang);
    setGeneratedCode(res.code);
    setIsPreviewable(res.previewable);
    setShowPreview(res.previewable);
    toast.success('Code payload generated successfully ⚡');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    toast.success('Code copied to clipboard 📋');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocraticAnalyze = (e) => {
    e.preventDefault();
    if (!socraticPrompt.trim()) return;

    const res = nexusAIHubService.generateSocraticAnalysis(socraticPrompt);
    setSocraticResult(res);
    toast.success('Socratic First-Principles Analysis Complete 🧠');
  };

  const handleGenerateCreative = (e) => {
    e.preventDefault();
    if (!creativeConcept.trim()) return;

    const res = nexusAIHubService.generateCreativePrompts(creativeConcept);
    setCreativePrompts(res);
    toast.success('Creative prompts & wireframes generated 🎨');
  };

  const handleSaveKeys = (e) => {
    e.preventDefault();
    nexusAIHubService.saveBYOKVault(vaultKeys);
    toast.success('BYOK API Keys encrypted & saved in LocalStorage 🔑');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-3xl bg-slate-900/98 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXUS AI Studio Poly-Engine</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Zero-Cost BYOK Hub
                </span>
              </div>
              <p className="text-xs text-slate-400">Autonomous Coding, Socratic Analysis & Multi-Modal Studio</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Provider Selector Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {AI_PROVIDERS.map((provider) => {
            const isSelected = selectedProvider.id === provider.id;
            const hasKey = Boolean(vaultKeys[provider.keyName]);
            return (
              <button
                key={provider.id}
                onClick={() => handleProviderSelect(provider)}
                className={`px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all border ${
                  isSelected
                    ? 'bg-slate-800 text-emerald-400 border-emerald-500 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{provider.name}</span>
                {hasKey ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" title="API Key Active" />
                ) : (
                  <span className="text-[9px] font-mono text-slate-500">(Local AI)</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/60 rounded-2xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('coding')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'coding' ? 'bg-emerald-500 text-slate-950 shadow font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code size={14} /> Autonomous Coding
          </button>
          <button
            onClick={() => setActiveTab('reasoning')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'reasoning' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Brain size={14} /> Socratic Reasoning
          </button>
          <button
            onClick={() => setActiveTab('creative')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'creative' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette size={14} /> Creative Studio
          </button>
          <button
            onClick={() => setActiveTab('keys')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'keys' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key size={14} /> BYOK Keys
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pe-1 custom-scrollbar">
          
          {/* TAB 1: Autonomous Coding Sandbox */}
          {activeTab === 'coding' && (
            <div className="space-y-4">
              <form onSubmit={handleGenerateCode} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Build an interactive glassmorphic dashboard card with button counter"
                    value={codePrompt}
                    onChange={(e) => setCodePrompt(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-2xl text-xs text-white outline-none focus:border-emerald-500"
                  />
                  <select
                    value={codeLang}
                    onChange={(e) => setCodeLang(e.target.value)}
                    className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-2xl text-xs text-white outline-none font-semibold focus:border-emerald-500"
                  >
                    <option value="html">HTML / CSS / JS</option>
                    <option value="react">React Component</option>
                    <option value="sql">SQL Schema</option>
                    <option value="js">Node / JS Routine</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <Zap size={14} /> Generate Code
                  </button>
                </div>
              </form>

              {/* Code Output Display */}
              {generatedCode && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Code size={15} className="text-emerald-400" /> Generated {codeLang.toUpperCase()} Output
                    </span>

                    <div className="flex items-center gap-2">
                      {isPreviewable && (
                        <button
                          onClick={() => setShowPreview(!showPreview)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            showPreview ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          <Eye size={13} /> {showPreview ? 'Hide Live Preview' : 'Live Preview'}
                        </button>
                      )}

                      <button
                        onClick={handleCopyCode}
                        className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition-all"
                      >
                        {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        <span>{copied ? 'Copied' : 'Copy Code'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Live HTML Preview Iframe */}
                  {showPreview && isPreviewable && (
                    <div className="rounded-2xl overflow-hidden border border-emerald-500/30 bg-white h-64 shadow-xl">
                      <iframe
                        title="NEXUS Live Code Preview"
                        srcDoc={generatedCode}
                        className="w-full h-full border-0"
                      />
                    </div>
                  )}

                  {/* Code Block */}
                  <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto max-h-64 custom-scrollbar">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Socratic Reasoning */}
          {activeTab === 'reasoning' && (
            <div className="space-y-4">
              <form onSubmit={handleSocraticAnalyze} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. Is artificial general intelligence compatible with human freedom?"
                  value={socraticPrompt}
                  onChange={(e) => setSocraticPrompt(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-2xl text-xs text-white outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-900/30"
                >
                  <Brain size={14} /> Analyze
                </button>
              </form>

              {socraticResult && (
                <div className="p-4 rounded-3xl bg-purple-950/20 border border-purple-500/30 space-y-3">
                  <h3 className="text-sm font-bold text-white">{socraticResult.title}</h3>
                  <p className="text-xs text-purple-200/90 italic bg-slate-900/60 p-3 rounded-2xl border border-purple-500/20">
                    "{socraticResult.thesis}"
                  </p>

                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Dialectical Angles</h4>
                    {socraticResult.perspectives.map((p, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs space-y-1">
                        <span className="font-bold text-white">{p.angle}</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{p.detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300">
                    <span className="font-bold">Synthesis: </span>{socraticResult.conclusion}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Creative Studio */}
          {activeTab === 'creative' && (
            <div className="space-y-4">
              <form onSubmit={handleGenerateCreative} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. Futuristic orbital solar station on Mars"
                  value={creativeConcept}
                  onChange={(e) => setCreativeConcept(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-2xl text-xs text-white outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-900/30"
                >
                  <Palette size={14} /> Craft Prompts
                </button>
              </form>

              {creativePrompts && (
                <div className="space-y-3">
                  <div className="p-4 rounded-3xl bg-slate-800/40 border border-cyan-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-cyan-400">🖼️ Midjourney / Stable Diffusion Image Prompt</h4>
                    <pre className="p-3 rounded-2xl bg-slate-950 text-xs text-slate-300 font-mono whitespace-pre-wrap">
                      {creativePrompts.imagePrompt}
                    </pre>
                  </div>

                  <div className="p-4 rounded-3xl bg-slate-800/40 border border-cyan-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-cyan-400">🎥 Sora / Runway Video Prompt</h4>
                    <pre className="p-3 rounded-2xl bg-slate-950 text-xs text-slate-300 font-mono whitespace-pre-wrap">
                      {creativePrompts.videoPrompt}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BYOK Key Vault */}
          {activeTab === 'keys' && (
            <form onSubmit={handleSaveKeys} className="space-y-4">
              <div className="p-4 rounded-3xl bg-amber-950/20 border border-amber-500/30 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <ShieldCheck size={18} /> Zero-Cost BYOK Sovereignty Vault
                </div>
                <p className="text-amber-200/80">
                  API keys are encrypted locally in your browser storage (`localStorage`). Direct connections are established straight to AI providers with zero third-party server fees.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">OpenAI API Key (GPT-4o)</label>
                  <input
                    type="password"
                    placeholder="sk-..."
                    value={vaultKeys.openai_api_key}
                    onChange={(e) => setVaultKeys({ ...vaultKeys, openai_api_key: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Anthropic API Key (Claude 3.5 Sonnet)</label>
                  <input
                    type="password"
                    placeholder="sk-ant-..."
                    value={vaultKeys.anthropic_api_key}
                    onChange={(e) => setVaultKeys({ ...vaultKeys, anthropic_api_key: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Google Gemini API Key</label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={vaultKeys.gemini_api_key}
                    onChange={(e) => setVaultKeys({ ...vaultKeys, gemini_api_key: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">DeepSeek API Key</label>
                  <input
                    type="password"
                    placeholder="sk-..."
                    value={vaultKeys.deepseek_api_key}
                    onChange={(e) => setVaultKeys({ ...vaultKeys, deepseek_api_key: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
              >
                Save Encrypted Keys to Vault
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
