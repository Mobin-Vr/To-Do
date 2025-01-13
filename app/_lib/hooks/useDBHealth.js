import { useEffect, useState } from 'react';
import { checkDatabaseHealth } from '../healthCheck';
import { HEALTH_CHECK_TIMER } from '../utils';

export default function useDBHealth() {
   const [lastOnline, setLastOnline] = useState(null);
   const [isOnline, setIsOnline] = useState(true); // for data base conection
   const [isConnected, setIsConnected] = useState(navigator.onLine); // for internet conection

   useEffect(() => {
      function updateConnectionStatus() {
         setIsConnected(navigator.onLine);
      }

      window.addEventListener('online', updateConnectionStatus);
      window.addEventListener('offline', updateConnectionStatus);

      return () => {
         window.removeEventListener('online', updateConnectionStatus);
         window.removeEventListener('offline', updateConnectionStatus);
      };
   }, []);

   useEffect(() => {
      const interval = setInterval(async () => {
         if (isConnected) {
            const result = await checkDatabaseHealth();
            setIsOnline(result.online);
            if (result.online) setLastOnline(new Date());
         } else {
            setIsOnline(false);
         }
      }, HEALTH_CHECK_TIMER * 1000);

      return () => clearInterval(interval);
   }, [isConnected]);

   return { isOnline, lastOnline, isConnected };
}
