import { useEffect, useState } from "react";

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // The UI remains usable when browser storage is unavailable.
    }
  }, [key, value]);

  return [value, setValue];
}

export default usePersistentState;
