import { useEffect } from 'react';

export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const interactiveSelectors = ['input','button','textarea','label','[role="button"]','svg','path'];
      const isInteractive = interactiveSelectors.some(selector => event.target.closest(selector));
      if (ref.current && !ref.current.contains(event.target) && !isInteractive) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};
