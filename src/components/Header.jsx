import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
      <div className="border-b-2 border-gray-400 h-16">
          <div className="flex items-center  h-full px-4">
              <div className='w-28'>
                <img className="w-20 h-10 rounded-3xl" src={"https://cdn.fnnews21.com/news/photo/202106/34075_32854_3957.png"} alt="설명 텍스트" />
              </div>

        <div className="flex space-x-36 pr-56 justify-center w-full">
          <Link to="/pricePick/" className="text-xl">특가 PICK</Link>
          <Link to="/cardPick/" className="text-xl">카드 PICK</Link>
          <Link to="/event/" className="text-xl">이벤트</Link>
          <Link to="/etc/" className="text-xl">해외이용의 정석</Link>
        </div>
              
        <div className="w-16 text-base">
            <Link to="/login">로그인</Link>
        </div>

      </div>
    </div>
  );
}

export default Header;
