import { useEffect, useState } from 'react';

const useDetectPageReload = () => {
  const [isReloaded, setIsReloaded] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('isReload', 'true');
    };

    const handleLoad = () => {
      const isReload = localStorage.getItem('isReload');
      if (isReload) {
        setIsReloaded(true);
        localStorage.removeItem('isReload');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return isReloaded;
};

export default useDetectPageReload;
