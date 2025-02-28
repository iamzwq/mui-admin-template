import { useEffect } from 'react';

const VERSION_KEY = 'app-version';
const CHECK_INTERVAL = 30 * 60 * 1000; // 30 minutes

export const useVersionChecker = () => {
  useEffect(() => {
    if (import.meta.env.PROD) {
      const fetchVersion = () => {
        fetch(`${import.meta.env.BASE_URL}version.json?t=${Date.now()}`)
          .then(res => res.json())
          .then(data => {
            const version = data?.version;
            if (!version) return;

            const localVersion = localStorage.getItem(VERSION_KEY);
            if (!localVersion) {
              localStorage.setItem(VERSION_KEY, version);
              return;
            }

            if (version !== localVersion) {
              alert('发现新版本，请刷新页面');
              localStorage.setItem(VERSION_KEY, version);
              window.location.reload();
            }
          });
      };

      const interval = setInterval(() => {
        fetchVersion();
      }, CHECK_INTERVAL);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);
};
