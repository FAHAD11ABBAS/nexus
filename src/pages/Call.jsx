// src/pages/Call.jsx
// Full-screen WebRTC peer-to-peer audio & video call experience with recording

import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, CircleDot, Radio, ArrowLeft } from 'lucide-react';
import { getConversationById } from '@/services/chatService';
import { useWebRTC } from '@/hooks/useWebRTC';
import Avatar from '@/components/ui/Avatar';
import CallControls from '@/components/calls/CallControls';

// Format duration helper (mm:ss)
function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function Call() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const callType = searchParams.get('type') === 'voice' ? 'voice' : 'video';
  const conversation = getConversationById(id);

  const {
    localVideoRef,
    remoteVideoRef,
    isMuted,
    isVideoOff,
    isConnected,
    callDuration,
    isRecording,
    recordingSeconds,
    toggleMute,
    toggleVideo,
    flipCamera,
    startRecording,
    stopRecording,
  } = useWebRTC(callType);

  const handleEndCall = () => {
    if (isRecording) stopRecording();
    navigate(`/chat/${id}`);
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="relative h-[calc(100dvh-var(--topbar-h)-var(--bottomnav-h))] w-full bg-[#07070d] flex flex-col justify-between overflow-hidden">
      {/* ── Top Status Bar ── */}
      <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={handleEndCall}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Security & Call duration banner */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Radio size={12} className="animate-pulse text-emerald-400" />
            <span>
              {isConnected ? t('call.connected') : t('call.connecting')}
            </span>
          </div>
          <span className="text-sm font-mono font-bold text-white mt-1">
            {formatDuration(callDuration)}
          </span>
        </div>

        {/* Recording Status Indicator */}
        <div className="min-w-[40px] flex justify-end">
          {isRecording && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600/25 border border-rose-500/50 text-rose-400 text-xs font-mono animate-pulse">
              <CircleDot size={12} />
              <span>REC {formatDuration(recordingSeconds)}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Media Display ── */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* VIDEO MODE */}
        {callType === 'video' && (
          <>
            {/* Remote Video (Full-Screen background) */}
            <div className="absolute inset-0 flex items-center justify-center bg-nexus-surface">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Overlay shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
            </div>

            {/* Local Video Picture-in-Picture (PiP) */}
            <div className="absolute top-4 end-4 w-32 h-44 sm:w-40 sm:h-52 rounded-2xl overflow-hidden glass-card border border-nexus-primary/40 shadow-2xl z-20 transition-all duration-300">
              {isVideoOff ? (
                <div className="w-full h-full bg-nexus-card flex flex-col items-center justify-center p-2 text-center">
                  <Avatar name="Me" size="md" />
                  <span className="text-[10px] text-nexus-muted mt-1">
                    Camera Off
                  </span>
                </div>
              ) : (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              )}
            </div>
          </>
        )}

        {/* VOICE MODE (Or when video is disabled in audio mode) */}
        {callType === 'voice' && (
          <div className="flex flex-col items-center justify-center z-10 space-y-6">
            <div className="relative flex items-center justify-center">
              {/* Simulated audio waveform rings */}
              <div className="absolute w-48 h-48 rounded-full bg-nexus-primary/10 border border-nexus-primary/20 animate-ping opacity-60" />
              <div className="absolute w-36 h-36 rounded-full bg-nexus-secondary/15 border border-nexus-secondary/30 animate-pulse" />

              <Avatar
                src={conversation.participant.avatar}
                name={conversation.participant.name}
                size="xl"
                isOnline={true}
                className="ring-4 ring-nexus-primary/70 shadow-nexus-lg"
              />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-white">
                {conversation.participant.name}
              </h2>
              <p className="text-xs text-nexus-cyan font-mono mt-1">
                {t('call.voiceCall')} · HD Opus 48kHz
              </p>
            </div>

            {/* Simulated audio waveform visualizer bars */}
            <div className="flex items-center gap-1.5 h-8">
              {[40, 75, 100, 60, 90, 45, 80, 55, 95, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-nexus-primary to-nexus-accent rounded-full animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${(i * 0.1).toFixed(1)}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Controls ── */}
      <div className="relative z-20 p-4 pb-6 bg-gradient-to-t from-black/90 to-transparent flex justify-center">
        <CallControls
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          isRecording={isRecording}
          onToggleMute={toggleMute}
          onToggleVideo={toggleVideo}
          onFlipCamera={flipCamera}
          onToggleRecord={handleToggleRecord}
          onEndCall={handleEndCall}
          callType={callType}
        />
      </div>
    </div>
  );
}
