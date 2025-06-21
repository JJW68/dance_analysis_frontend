import React, { useState } from 'react';
import HomePage from './components/HomePage';
import AnalysisResults from './components/AnalysisResults';
import Analyzing from './components/Analyzing';

type AppState = 'home' | 'analyzing' | 'results';

const App = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');

  const handleBack = () => {
    setCurrentState('home');
  };

  return (
    <div className="App">
      {currentState === 'home' && <HomePage />}
      {currentState === 'analyzing' && <Analyzing />}
      {currentState === 'results' && <AnalysisResults onBack={handleBack} />}
    </div>
  );
};

export default App; 