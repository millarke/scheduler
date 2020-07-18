import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(tempMode, replace = false) {
    if (replace) {
      const tempHistory = history.slice(0, history.length - 1);
      setHistory([...tempHistory, tempMode]);
    } else {
      setHistory(prev => [...prev, tempMode])
    }
    setMode(tempMode)
  }
  function back() {

    if (history.length > 1) {
      const tempHistory = [...history];
      tempHistory.pop();
      setHistory(tempHistory);
      setMode(tempHistory[tempHistory.length - 1]);
    }
  };

  return { mode, transition, back };
};