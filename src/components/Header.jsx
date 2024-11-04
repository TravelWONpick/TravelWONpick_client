import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import linkImg from '../assets/link_img.png';
import logoImg from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(null);  

  const onChange = (key) => {
    setActiveKey(key);  
    switch (key) {
      case '1':
        navigate('/pricePick');
        break;
      case '2':
        navigate('/cardPick');
        break;
      case '3':
        navigate('/event');
        break;
      case '4':
        window.open('https://pc.wooricard.com/dcpc/yh1/fpf/fpf01/H1FPF201S00.do', '_blank', 'noopener noreferrer');
        break;
      default:
        break;
    }
  };

  // 로고 클릭 시 activeKey 초기화
  const handleLogoClick = () => {
    setActiveKey(null);
    navigate('/');
  };

  const items = [
    {
      key: '1',
      label: '특가 PICK',
      children: null,
    },
    {
      key: '2',
      label: '카드 PICK',
      children: null,
    },
    {
      key: '3',
      label: '이벤트',
      children: null,
    },
    {
      key: '4',
      label: (
        <a 
          href="https://pc.wooricard.com/dcpc/yh1/fpf/fpf01/H1FPF201S00.do" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.preventDefault()}
          className="flex items-center"
        >
          <span>해외이용의 정석</span>
          <img
            src={linkImg}
            alt="link"
            className="w-4 h-4 ml-1"
          />
        </a>
      ),
      children: null,
    },
  ];

  return (
    <div className="border-b-2 border-gray-200">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[950px]">
          <div className="flex items-center h-15 px-4">
            <div className='w-40'>
              <div onClick={handleLogoClick} className="cursor-pointer">
                <img
                  src={logoImg}
                  alt="logo"
                  style={{ width: '250px', height: 'auto'}}
                />
              </div>
            </div>

            <div className="flex justify-center w-full [&_.ant-tabs-nav]:mb-0">
              <Tabs
                activeKey={activeKey} 
                items={items}
                onChange={onChange}
                className="font-bold"
                size="large"
              />
            </div>

            <div className="w-16 text-base">
              <Link to="/login">로그인</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;