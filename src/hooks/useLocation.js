// src/hooks/useLocation.js
// Privacy-first location detection: captures country/region only, never precise GPS

import { useState, useCallback } from 'react';

export function useLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationData, setLocationData] = useState(() => {
    const cached = localStorage.getItem('nexus_country');
    return cached ? JSON.parse(cached) : null;
  });

  const detectLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    // 1. Try Browser Geolocation API (user explicitly grants permission)
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 6000,
            maximumAge: 600000, // 10 minutes cache
            enableHighAccuracy: false, // Low accuracy is sufficient for country level
          });
        });

        const { latitude, longitude } = position.coords;

        // Reverse-geocode to get only Country / Region (free OSM Nominatim)
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=3&addressdetails=1`,
          { headers: { 'Accept-Language': 'en' } }
        );

        if (res.ok) {
          const data = await res.json();
          const country = data.address?.country || 'Global';
          const countryCode = (data.address?.country_code || 'UN').toUpperCase();
          const result = { country, countryCode, method: 'geolocation' };
          localStorage.setItem('nexus_country', JSON.stringify(result));
          setLocationData(result);
          setLoading(false);
          return result;
        }
      } catch (geoErr) {
        // Fall through to IP-based detection if denied or timeout
        console.warn('Geolocation unavailable or denied, falling back to IP detection:', geoErr);
      }
    }

    // 2. Fallback: Free IP-based country lookup (no GPS coordinates accessed)
    try {
      const ipRes = await fetch('https://ipapi.co/json/');
      if (ipRes.ok) {
        const data = await ipRes.json();
        const result = {
          country: data.country_name || 'Global',
          countryCode: data.country_code || 'UN',
          region: data.region || '',
          method: 'ip-context',
        };
        localStorage.setItem('nexus_country', JSON.stringify(result));
        setLocationData(result);
        setLoading(false);
        return result;
      }
    } catch (ipErr) {
      console.warn('IP location fallback also failed:', ipErr);
    }

    // Default safe fallback
    const fallback = { country: 'Global Citizen', countryCode: 'UN', method: 'default' };
    setLocationData(fallback);
    setLoading(false);
    return fallback;
  }, []);

  return {
    locationData,
    loading,
    error,
    detectLocation,
    setCountry: (country, countryCode) => {
      const data = { country, countryCode, method: 'manual' };
      localStorage.setItem('nexus_country', JSON.stringify(data));
      setLocationData(data);
    },
  };
}

export default useLocation;
