// src/components/ai/NexusAiAssistantModal.jsx
// Embedded AI Co-Pilot & Content Assistant Modal

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Bot,
  MessageSquare,
  FileText,
  Wand2,
  Copy,
  Check,
  Send,
  Hash,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import aiAssistantService from '@/services/aiAssistantService';

export default function NexusAiAssistantModal({
  isOpen,
  onClose,
  contextText,
  onSelectReply,
}) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('replies'); // 'replies' | 'summary' | 'caption'
  const [inputCaption, setInputCaption] = useState(contextText || '');
  const [enhancedResult, setEnhancedResult] = useState('');

  if (!isOpen) return null;

  const smartReplies = aiAssistantService.draftSmartReply(contextText);
  const chatSummary = aiAssistantService.summarizeChat([1, 2, 3]);

  const handleEnhance = (vibe) => {
    const result = aiAssistantService.enhanceCaption(inputCaption, vibe);
    setEnhancedResult(result);
    toast.success('AI Caption Enhanced ✨');
  };

  const handleCopyResult = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(t('common.copied'));
  };

  const handleSelectReplyOption = (replyText) => {
    if (onSelectReply) {
      onSelectReply(replyText);
    } else {
      handleCopyResult(replyText);
    }
    if (onClose) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="NEXUS AI Co-Pilot" maxWidth="max-w-md">
      <div className="space-y-4">
        {/* Header Hero Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-nexus-bg border border-nexus-primary/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-nexus-gradient flex items-center justify-center text-white flex-shrink-0 shadow-nexus-sm">
            <Bot size={22} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>NEXUS Intelligence Co-Pilot</span>
              <span className="badge text-[9px]">v2.0 AI</span>
            </h3>
            <p className="text-[11px] text-nexus-muted">
              Smart reply drafting, chat summarization & caption generator
            </p>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-1.5 p-1 glass-card rounded-2xl border border-nexus-border/60">
          <button
            onClick={() => setActiveTab('replies')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === 'replies'
                ? 'bg-nexus-gradient text-white shadow-nexus-sm'
                : 'text-nexus-muted hover:text-white'
            }`}
          >
            <MessageSquare size={13} />
            <span>Smart Replies</span>
          </button>

          <button
            onClick={() => setActiveTab('caption')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === 'caption'
                ? 'bg-nexus-gradient text-white shadow-nexus-sm'
                : 'text-nexus-muted hover:text-white'
            }`}
          >
            <Wand2 size={13} />
            <span>Caption Enhancer</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === 'summary'
                ? 'bg-nexus-gradient text-white shadow-nexus-sm'
                : 'text-nexus-muted hover:text-white'
            }`}
          >
            <FileText size={13} />
            <span>Summary</span>
          </button>
        </div>

        {/* Tab 1: Smart Replies */}
        {activeTab === 'replies' && (
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-nexus-dim uppercase tracking-wider px-1">
              Contextual Smart Options:
            </p>
            <div className="space-y-2">
              {smartReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectReplyOption(reply)}
                  className="w-full p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/60 hover:border-nexus-primary text-xs font-medium text-white text-start transition-all hover:bg-nexus-surface flex items-center justify-between group"
                >
                  <span className="pe-2">{reply}</span>
                  <Send size={13} className="text-nexus-cyan opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Caption Enhancer */}
        {activeTab === 'caption' && (
          <div className="space-y-3">
            <textarea
              value={inputCaption}
              onChange={(e) => setInputCaption(e.target.value)}
              placeholder="Enter your post thought or video caption..."
              rows={3}
              className="w-full p-3 rounded-2xl bg-nexus-surface border border-nexus-border text-xs text-white placeholder-nexus-dim outline-none focus:border-nexus-primary resize-none"
            />

            <div className="flex gap-2">
              <button
                onClick={() => handleEnhance('cyberpunk')}
                className="flex-1 py-2 rounded-xl bg-nexus-surface border border-nexus-border hover:border-nexus-secondary text-nexus-secondary text-xs font-bold transition-all"
              >
                🌌 Cyberpunk Vibe
              </button>
              <button
                onClick={() => handleEnhance('decentralized')}
                className="flex-1 py-2 rounded-xl bg-nexus-surface border border-nexus-border hover:border-nexus-cyan text-nexus-cyan text-xs font-bold transition-all"
              >
                ⚡ Web3 Tech
              </button>
            </div>

            {enhancedResult && (
              <div className="p-3 rounded-2xl bg-nexus-primary/20 border border-nexus-secondary/40 text-xs text-white space-y-2 animate-fade-in">
                <p className="leading-relaxed">{enhancedResult}</p>
                <button
                  onClick={() => handleSelectReplyOption(enhancedResult)}
                  className="w-full py-1.5 rounded-xl bg-nexus-gradient text-white text-xs font-bold shadow-nexus-sm flex items-center justify-center gap-1.5"
                >
                  <Check size={13} />
                  <span>Use This Caption</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Summary */}
        {activeTab === 'summary' && (
          <div className="p-3.5 rounded-2xl bg-nexus-surface/50 border border-nexus-border/60 text-xs text-white space-y-2">
            <p className="leading-relaxed text-nexus-text">{chatSummary}</p>
            <button
              onClick={() => handleCopyResult(chatSummary)}
              className="px-3 py-1.5 rounded-xl border border-nexus-border text-nexus-muted hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Copy size={13} />
              <span>Copy Summary</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
