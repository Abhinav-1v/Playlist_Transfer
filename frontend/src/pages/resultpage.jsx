import React from 'react';
import {useSelector} from 'react-redux'

const ResultPage = () => {
  
  const results=useSelector(state=>state.transferdata);

  const statusColors = {
    success: '#4CAF50', // Green
    partial: '#FF9800', // Orange
    failure: '#F44336', // Red
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Transfer Results</h1>
      {results.map((result, index) => (
        <div
          key={index}
          style={{
            border: `2px solid ${statusColors[result.status]}`,
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ color: statusColors[result.status] }}>{result.playlist}</h2>
          <p style={{ fontSize: '16px' }}>
            <strong>Status:</strong>{' '}
            <span style={{ textTransform: 'capitalize' }}>{result.status}</span>
          </p>
          {result.status === 'success' && (
            <p style={{ fontSize: '16px' }}>
              <strong>Tracks Transferred:</strong> {result.successCount} / {result.totalTracks}
            </p>
          )}
          {result.status === 'partial' && (
            <>
              <p style={{ fontSize: '16px' }}>
                <strong>Tracks Transferred:</strong> {result.successCount} / {result.totalTracks}
              </p>
              <div style={{ marginTop: '15px' }}>
                <strong>Failed Tracks:</strong>
                <ul style={{ paddingLeft: '20px' }}>
                  {result.failedTracks.map((track, trackIndex) => (
                    <li
                      key={trackIndex}
                      style={{
                        marginBottom: '10px',
                        padding: '10px',
                        backgroundColor: '#f4f4f4',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <p style={{ margin: '5px 0' }}>
                        <strong>Name:</strong> {track.name}
                      </p>
                      <p style={{ margin: '5px 0' }}>
                        <strong>Artist(s):</strong> {track.artist}
                      </p>
                      <p style={{ margin: '5px 0' }}>
                        <strong>Reason:</strong> {track.reason}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {result.status === 'failure' && (
            <p style={{ fontSize: '16px' }}>
              <strong>Error:</strong> {result.error}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultPage;
