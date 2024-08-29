import React from 'react';

const ButtonComponent = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={className ? className : `font-inherit sm:text-xs text-[12px] bg-gradient-to-b from-red-400 to-red-300 text-white sm:px-5 px-2 sm:py-3 py-1 flex items-center justify-center border-none rounded-full shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl active:transform active:scale-95 active:shadow-md`}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
