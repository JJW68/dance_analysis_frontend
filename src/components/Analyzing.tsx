import React from 'react';

const Analyzing = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center' as const,
        borderRadius: '1.5rem',
        width: '100%',
        maxWidth: '420px',
        boxSizing: 'border-box' as const,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    };

    const spinnerStyle = {
        width: '60px',
        height: '60px',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        borderTop: '4px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '2rem',
    };

    const titleStyle = {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        margin: '0 0 1rem 0',
    };

    const subtitleStyle = {
        fontSize: '1.1rem',
        opacity: 0.9,
        margin: '0 0 0.5rem 0',
    };

    const progressStyle = {
        width: '300px',
        height: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginTop: '2rem',
    };

    const progressBarStyle = {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '4px',
        animation: 'progress 2s ease-in-out infinite',
    };

    const keyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes progress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
    `;

    return (
        <div style={containerStyle}>
            <style>{keyframes}</style>
            <div style={spinnerStyle}></div>
            <h1 style={titleStyle}>Analyzing Your Dance</h1>
            <p style={subtitleStyle}>Our AI is processing your video...</p>
            <p style={{ opacity: 0.7, margin: 0 }}>This may take a few moments</p>
            <div style={progressStyle}>
                <div style={progressBarStyle}></div>
            </div>
        </div>
    );
};

export default Analyzing; 