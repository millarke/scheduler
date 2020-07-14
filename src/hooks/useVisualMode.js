import { useState } from 'react';

//////// OLD wrong but passed first test

// export default function useVisualMode(initial) {
//   const modeObj = {}
  
//   modeObj.mode = initial;

//   return modeObj;
// }

//////// CURRENT

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
      console.log(tempHistory);
      setMode(tempHistory[tempHistory.length - 1]);
    }
  };

  return { mode, transition, back };
};