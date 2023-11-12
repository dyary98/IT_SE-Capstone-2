import React from 'react';

const CardSkeleton = () => {
  const skeletonStyle = {
    backgroundColor: '#ddd',
    borderRadius: '4px',
    minHeight: '200px',
    minWidth: '150px',
    margin: '1rem',
    display: 'inline-block',
    animation: 'pulse 1s infinite ease-in-out',
    '@keyframes pulse': {
      '0%': { backgroundColor: '#eee' },
      '50%': { backgroundColor: '#ddd' },
      '100%': { backgroundColor: '#eee' },
    },
  };

  return <div style={skeletonStyle} />;
};

const CardsLoader = ({ count }) => {
  return (
    <div>
      {Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CardsLoader;
