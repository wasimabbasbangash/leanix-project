import { useEffect, useState } from 'react';

const useDetectPageReload = () => {
  const [isReloaded, setIsReloaded] = useState(false);

  useEffect(() => {
    // Handler to set a flag in localStorage before the page unloads
    const handleBeforeUnload = () => {
      localStorage.setItem('isReload', 'true');
    };

    // Handler to check the flag in localStorage when the page loads
    const handleLoad = () => {
      const isReload = localStorage.getItem('isReload');
      if (isReload) {
        setIsReloaded(true); // Set the state to true if the page was reloaded
        localStorage.removeItem('isReload');
      }
    };

    // Add event listeners for beforeunload and load events
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return isReloaded; // Return the state indicating if the page was reloaded
};

export default useDetectPageReload;
