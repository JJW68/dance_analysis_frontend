import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useWindowSize } from '../hooks/useWindowSize';

interface VideoUploadProps {
  title: string;
  description: string;
  variant: 'original' | 'cover';
}

const VideoUpload = ({ title, description, variant }: VideoUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  const isOriginal = variant === 'original';

  const cardStyle = {
    background: isOriginal 
      ? 'linear-gradient(to bottom, #EFF6FF, #FFFFFF)' 
      : 'linear-gradient(to bottom, #FAF5FF, #FFFFFF)',
    borderRadius: '1rem',
    padding: '1.5rem',
    width: isMobile ? '100%' : '400px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    textAlign: 'left' as const,
    boxSizing: 'border-box' as const,
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  };

  const iconContainerStyle = {
    marginRight: '0.75rem',
    color: isOriginal ? '#60A5FA' : '#A78BFA',
  };

  const textContainerStyle = {
    flex: 1,
  };

  const titleStyle = {
    fontWeight: 'bold',
    color: isOriginal ? '#3B82F6' : '#8B5CF6',
    margin: 0,
    fontSize: '1.125rem'
  };

  const descriptionStyle = {
    color: '#6B7280',
    margin: 0,
    fontSize: '0.875rem'
  };

  const dropzoneStyle = {
    border: `2px dashed ${isOriginal ? '#93C5FD' : '#FBCFE8'}`,
    borderRadius: '1rem',
    padding: '2rem',
    textAlign: 'center' as const,
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    marginTop: '1rem',
  };

  const dropzoneIconContainerStyle = {
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    background: isOriginal ? '#DBEAFE' : 'linear-gradient(to bottom, #F472B6, #A78BFA)',
    color: isOriginal ? '#60A5FA' : 'white',
  };

  return (
    <div style={cardStyle}>
      <header style={headerStyle}>
        <div style={iconContainerStyle}>
          <svg style={{ width: '1.5rem', height: '1.5rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <div style={textContainerStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <p style={descriptionStyle}>{description}</p>
        </div>
      </header>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <div style={dropzoneIconContainerStyle}>
          <svg style={{ width: '2rem', height: '2rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            <p style={{ fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>Drop your video here</p>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>or click to browse files</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
