import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      메인 페이지
      <div>
        <Link to={"/my"}>마이페이지로 이동</Link>
      </div>
      <div>
        <Link to={"/sign-in"}>로그인</Link>
      </div>
      <div>
        <Link to={"/sign-up"}>회원가입</Link>
      </div>
    </div>
  );
};

export default Main;