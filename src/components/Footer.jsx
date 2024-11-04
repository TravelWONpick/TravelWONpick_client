import React from 'react';
import logoImg from '../assets/pop_logo_rm.png';

const Footer = () => {
  return (
    <div className="flex justify-center w-full bg-gray-100">
      <div className="w-full max-w-[950px] h-[120px] py-8">
        <div className="flex items-start px-4">
          <img 
            src={logoImg} 
            alt="WON 픽 로고" 
            className="w-[50px] h-[50px] mr-4 ml-4 mt-1"
          />
          <div className="flex flex-col">
            <div className="text-sm mb-1">트래블 WON 픽</div>
            <div className="text-xs text-gray-500 mb-1">김상민 부준혁 박장우 곽병찬 이연희</div>
            <div className="flex items-center text-xs text-gray-500">
              <span>Powered by</span>
              <a 
                href="https://github.com/TravelWONpick" 
                target="_blank"  // 새 탭에서 열기 위한 속성 추가
                rel="noopener noreferrer"  // 보안을 위한 속성 추가
                className="ml-1 underline hover:text-blue-500 cursor-pointer"
              >
                TravelWONpick
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;