// src/context/GhostModeContext.jsx
// Context provider for Ghost Stealth Privacy Shield

import { createContext, useContext, useState } from 'react';
import ghostModeService from '@/services/ghostModeService';
import toast from 'react-hot-toast';

const GhostModeContext = createContext(null);

export function GhostModeProvider({ children }) {
  const [isGhostActive, setIsGhostActive] = useState(
    ghostModeService.isGhostModeActive()
  );

  const toggleGhostMode = () => {
    const nextState = ghostModeService.toggleGhostMode();
    setIsGhostActive(nextState);
    if (nextState) {
      toast.success('👻 Ghost Stealth Shield Active — Online status & read receipts hidden');
    } else {
      toast('Ghost Stealth Shield Deactivated', { icon: '👁️' });
    }
    return nextState;
  };

  return (
    <GhostModeContext.Provider value={{ isGhostActive, toggleGhostMode }}>
      {children}
    </GhostModeContext.Provider>
  );
}

export function useGhostMode() {
  const ctx = useContext(GhostModeContext);
  if (!ctx) {
    throw new Error('useGhostMode must be used within a GhostModeProvider');
  }
  return ctx;
}
