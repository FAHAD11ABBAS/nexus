// src/components/calls/CallControls.jsx
// Animated glassmorphism call control bar with mic, video, flip, record and hangup buttons

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  RefreshCw,
  PhoneOff,
  CircleDot,
  Square,
} from 'lucide-react';

export default function CallControls({
  isMuted,
  isVideoOff,
  isRecording,
  onToggleMute,
  onToggleVideo,
  onFlipCamera,
  onToggleRecord,
  onEndCall,
  callType = 'video',
}) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 p-3 rounded-3xl glass-dark border border-white/10 shadow-2xl backdrop-blur-2xl">
      {/* Mute Button */}
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
          isMuted
            ? 'bg-rose-500/25 border border-rose-500/50 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
            : 'bg-white/10 hover:bg-white/20 border border-white/10 text-white'
        }`}
      >
        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
      </button>

      {/* Video Toggle Button (video calls only) */}
      {callType === 'video' && (
        <button
          type="button"
          onClick={onToggleVideo}
          aria-label={isVideoOff ? 'Turn video on' : 'Turn video off'}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            isVideoOff
              ? 'bg-rose-500/25 border border-rose-500/50 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
              : 'bg-white/10 hover:bg-white/20 border border-white/10 text-white'
          }`}
        >
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>
      )}

      {/* Camera Flip Button (video calls only) */}
      {callType === 'video' && (
        <button
          type="button"
          onClick={onFlipCamera}
          aria-label="Flip camera"
          className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all active:rotate-180 duration-300"
        >
          <RefreshCw size={20} />
        </button>
      )}

      {/* MediaRecorder Call Record Button */}
      <button
        type="button"
        onClick={onToggleRecord}
        aria-label={isRecording ? 'Stop Recording' : 'Record Call'}
        title={isRecording ? 'Stop Recording' : 'Record Call (WebM)'}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
          isRecording
            ? 'bg-rose-600 border border-rose-400 text-white animate-pulse shadow-[0_0_16px_rgba(225,29,72,0.8)]'
            : 'bg-white/10 hover:bg-white/20 border border-white/10 text-nexus-cyan hover:text-white'
        }`}
      >
        {isRecording ? <Square size={18} fill="currentColor" /> : <CircleDot size={22} />}
      </button>

      {/* End Call Hangup Button */}
      <button
        type="button"
        onClick={onEndCall}
        aria-label="End call"
        className="w-14 h-12 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white flex items-center justify-center transition-all shadow-[0_0_20px_rgba(225,29,72,0.6)]"
      >
        <PhoneOff size={22} />
      </button>
    </div>
  );
}
