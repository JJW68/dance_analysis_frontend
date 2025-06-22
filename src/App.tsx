import { useState, useEffect, useRef } from 'react';
import HomePage from './components/HomePage';
import AnalysisResults from './components/AnalysisResults';
import Analyzing from './components/Analyzing';
import HistoryPage from './components/HistoryPage';
import { AnalysisResult } from './services/DanceAnalysisService';

type AppState = 'home' | 'analyzing' | 'results' | 'history';

const App = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);

  // Reference to store the analysis start time
  const analysisStartTimeRef = useRef<number | null>(null);
  // Maximum time to wait for analysis results (in milliseconds)
  const MAX_ANALYSIS_WAIT_TIME = 120000; // 2 minutes

  // Check for analysis results in localStorage when component mounts or state changes
  useEffect(() => {
    if (currentState === 'analyzing') {
      // Set the analysis start time when we enter analyzing state
      if (analysisStartTimeRef.current === null) {
        analysisStartTimeRef.current = Date.now();
      }
      
      // Create a polling interval to check for results
      const checkResultsInterval = setInterval(() => {
        const storedResults = localStorage.getItem('currentAnalysisResults');
        
        if (storedResults) {
          try {
            const results = JSON.parse(storedResults);
            setAnalysisResults(results);
            // Clear the stored results to avoid using stale data
            localStorage.removeItem('currentAnalysisResults');
            // Move to results state
            setCurrentState('results');
            // Clear the interval
            clearInterval(checkResultsInterval);
            // Reset the start time
            analysisStartTimeRef.current = null;
          } catch (error) {
            console.error('Error parsing analysis results:', error);
          }
        } else {
          // Check if we've been waiting too long
          const currentTime = Date.now();
          if (analysisStartTimeRef.current && (currentTime - analysisStartTimeRef.current > MAX_ANALYSIS_WAIT_TIME)) {
            // Analysis is taking too long, show an error
            console.error('Analysis timeout: Taking too long to process');
            localStorage.setItem('analysisError', 'Analysis is taking too long. Please try again with smaller videos.');
            // Go back to home
            setCurrentState('home');
            // Clear the interval
            clearInterval(checkResultsInterval);
            // Reset the start time
            analysisStartTimeRef.current = null;
          }
        }
      }, 1000); // Check every second
      
      // Clean up the interval when component unmounts or state changes
      return () => {
        clearInterval(checkResultsInterval);
      };
    } else {
      // Reset the start time when we leave analyzing state
      analysisStartTimeRef.current = null;
    }
  }, [currentState]);

  const handleUpload = () => {
    // Clear any previous errors
    localStorage.removeItem('analysisError');
    setCurrentState('analyzing');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
  };

  const handleShowHistory = () => {
    setCurrentState('history');
  };

  const appContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #f0e6ff, #ffffff)',
  };

  const defaultContainerStyle = {
      width: '100%',
  }

  return (
    <div style={currentState === 'analyzing' || currentState === 'results' ? appContainerStyle : defaultContainerStyle}>
      {currentState === 'home' && <HomePage onUpload={handleUpload} onShowHistory={handleShowHistory} />}
      {currentState === 'analyzing' && <Analyzing />}
      {currentState === 'results' && analysisResults && (
        <AnalysisResults 
          onBack={handleBackToHome} 
          analysisResults={analysisResults}
        />
      )}
      {currentState === 'history' && <HistoryPage onBack={handleBackToHome} />}
    </div>
  );
};

export default App; 