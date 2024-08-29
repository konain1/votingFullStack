import React from 'react';

const Loader = () => {
  return (
    <div className="relative w-21 h-21">
      <div className="absolute left-1/2 bottom-0 w-16 h-16 rounded-full bg-white transform -translate-x-1/2 scale-0 animate-push"></div>
      <div className="absolute left-1/2 bottom-0 w-16 h-16 rounded-full bg-white transform -translate-x-1/2 scale-0 animate-push delay-1000"></div>
    </div>
  );
};

export default Loader;
