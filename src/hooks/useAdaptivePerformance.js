// src/hooks/useAdaptivePerformance.js
// Hook for monitoring Battery & Network conditions to dynamically adapt media streaming & performance

import { useState, useEffect } from 'react';

export function useAdaptivePerformance() {
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(true);
  const [networkType, setNetworkType] = useState('4g');
  const [isDataSaverActive, setIsDataSaverActive] = useState(() => {
    try {
      return localStorage.getItem('nexus_datasaver') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    // Battery API
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);

        const handleLevelChange = () => setBatteryLevel(Math.round(battery.level * 100));
        const handleChargingChange = () => setIsCharging(battery.charging);

        battery.addEventListener('levelchange', handleLevelChange);
        battery.addEventListener('chargingchange', handleChargingChange);
      });
    }

    // Network API
    if ('connection' in navigator) {
      const conn = navigator.connection;
      if (conn) {
        setNetworkType(conn.effectiveType || '4g');
        const handleConnectionChange = () => setNetworkType(conn.effectiveType || '4g');
        conn.addEventListener('change', handleConnectionChange);
      }
    }
  }, []);

  const toggleDataSaver = () => {
    const nextState = !isDataSaverActive;
    setIsDataSaverActive(nextState);
    try {
      localStorage.setItem('nexus_datasaver', nextState ? 'true' : 'false');
    } catch (e) {}
    return nextState;
  };

  const isBatteryLow = batteryLevel <= 20 && !isCharging;
  const isSlowNetwork = networkType === 'slow-2g' || networkType === '2g' || networkType === '3g';

  const recommendedQuality = isBatteryLow || isDataSaverActive || isSlowNetwork ? 'low' : 'high';
  const allowAutoPlay = !isBatteryLow && !isDataSaverActive;

  return {
    batteryLevel,
    isCharging,
    networkType,
    isDataSaverActive,
    isBatteryLow,
    recommendedQuality,
    allowAutoPlay,
    toggleDataSaver,
  };
}

export default useAdaptivePerformance;
