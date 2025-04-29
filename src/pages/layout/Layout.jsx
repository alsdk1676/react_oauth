import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  // 리덕스에 유저를 추가하는 코드
  // 토큰 정보를 확인하는 코드
  
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;