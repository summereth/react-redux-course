import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function callback(e) {
      if (key.toLowerCase() === e.code.toLowerCase()) {
        action?.();
      }
    }
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [key, action]);
}
