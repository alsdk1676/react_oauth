import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, replace, useNavigate } from 'react-router-dom';

const AuthLayout = () => {

  // 로그인이 되어야 되는 페이지에서 
  // 로그인 안 된 유저가 접근하지 못하게 하는 것

  // const { isLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken")

  useEffect(() => {
    if(!jwtToken) {
      navigate("/sign-in", { replace : true })
    }
  }, [])

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;