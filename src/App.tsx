import React, { useState } from 'react';
import HomePage from './components/HomePage';
import AnalysisResults from './components/AnalysisResults';
import Analyzing from './components/Analyzing';
import HistoryPage from './components/HistoryPage';

type AppState = 'home' | 'analyzing' | 'results' | 'history';

const App = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');

  const handleUpload = () => {
    setCurrentState('analyzing');
    // Simulate analysis time
    setTimeout(() => {
      setCurrentState('results');
    }, 3000);
  };

  const handleBackToHome = () => {
    setCurrentState('home');
  };

  const handleShowHistory = () => {
    setCurrentState('history');
  };

  return (
    <div className="App">
      {currentState === 'home' && <HomePage onUpload={handleUpload} onShowHistory={handleShowHistory} />}
      {currentState === 'analyzing' && <Analyzing />}
      {currentState === 'results' && <AnalysisResults onBack={handleBackToHome} />}
      {currentState === 'history' && <HistoryPage onBack={handleBackToHome} />}
    </div>
  );
};

export default App; 