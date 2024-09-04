import React from 'react';

function Card(props) {
  return (
    <div className="relative w-[300px] h-[384px] flex flex-col items-center rounded-[20px] bg-white shadow-lg">
      {/* Card Image */}
      <div className="h-[192px] w-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full rounded-t-[20px]" width="100%">
          {/* Add your SVG content here */}
          <rect fill="#ffffff" width="540" height="450"></rect>
          <defs>
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
              <stop offset="0" stopColor="#ffffff"></stop>
              <stop offset="1" stopColor="#FC726E"></stop>
            </linearGradient>
            <pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250" x="0" y="0" viewBox="0 0 1080 900">
              {/* Add your pattern elements here */}
            </pattern>
          </defs>
          <rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect>
          <rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect>
        </svg>
      </div>

      {/* Avatar */}
      <div className="absolute w-[114px] h-[114px] bg-white rounded-full flex justify-center items-center top-[calc(50%-57px)] shadow-md">
        <img src={props.profileImage} alt="" className="w-[100px] h-[100px] rounded-full object-cover" />
      </div>

      {/* Title */}
      <div className="mt-[60px] font-medium text-[18px] text-black">
        {props.name}
      </div>

      {/* Subtitle */}
      <div className="mt-2 font-normal text-[15px] text-gray-500">
        {props.email}
      </div>
      <div className="mt-1 font-normal text-[8px] text-gray-500">
        {props.email}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex space-x-2">
        <button
          className={`w-[76px] h-[31px] border-2 rounded-[4px] font-bold text-[11px] uppercase transition-all duration-300 ${
            props.Voted ? 'bg-red-500 text-white border-red-500 hover:bg-red-700' : 'bg-green-500 text-white border-blue-300 hover:bg-blue-500'
          }`}
        >
          {props.role}
        </button>
        {
            props.role != 'admin' ? 
          <button className="w-[76px] h-[31px] border-2 border-black rounded-[4px] font-bold text-[11px] text-white bg-black uppercase transition-all duration-300 hover:bg-white hover:text-black">
          Button
        </button> : ''
        }
        
      </div>
    </div>
  );
}

export default Card;
