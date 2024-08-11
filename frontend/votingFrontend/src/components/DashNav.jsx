import React, { useState } from 'react';

function DashNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`bg-[#64020e] flex flex-col  py-8 gap-1 ${isOpen ? 'h-[100vh] absolute' : 'h-10'} sm:h-10 w-full items-center sm:flex-row justify-around sm:justify-around text-[lightgrey]  transition-all duration-500 ease-in-out`}>
      <h2 className='font-stonewalls left-2 top-5'>Logo</h2>
      <button 
        className='sm:hidden text-white absolute right-2 top-5' 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg className='w-6 h-6 ' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
        </svg>
      </button>
      <div className={`flex flex-col sm:flex-row gap-1 sm:gap-20 px-10  ${isOpen ? 'flex' : 'hidden'} sm:flex sm:h-auto transition-all duration-500 ease-in-out`}>
        <h4 className='sm:text-lg border-b-4 border-transparent hover:border-[green] hover:text-white transition-all duration-500'>Dashboard</h4>
        <h4 className='sm:text-lg border-b-4 border-transparent hover:border-[green] hover:text-white transition-all duration-500'>Market</h4>
        <h4 className='sm:text-lg border-b-4 border-transparent hover:border-[green] hover:text-white transition-all duration-500'>Portfolio</h4>
        <h4 className='sm:text-lg border-b-4 border-transparent hover:border-[green] hover:text-white transition-all duration-500'>Terminal</h4>
      </div>
      <div className={`flex sm:flex-row gap-1 sm:gap-5 font-stonewalls ${isOpen ? 'flex' : 'hidden'} sm:flex transition-all duration-500 ease-in-out`}>
        <h3 className='sm:text-[12px] text-[10px] '>Support 24/7</h3>
        <p className='sm:text-[16px] text-[14px]'>7250999999</p>
      </div>
      <div className={`flex justify-center sm:flex-row gap-10 sm:gap-5 w-full sm:w-auto ${isOpen ? 'flex' : 'hidden'} sm:flex transition-all duration-500 ease-in-out`}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
    </nav>
  );
}

export default DashNav;
