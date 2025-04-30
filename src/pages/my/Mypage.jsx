import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {

  const navigate = useNavigate()

  // 토큰이 있을 때에만 접근할 수 있는 페이지
  const { currentUser, isLogin } = useSelector((state) => state.user)
  const {
    memberEmail,
    memberName,
    memberPicture,
    memberNickName
  } = currentUser;

  console.log("mypage currentUser", currentUser)
  console.log("mypage isLogin", isLogin)

  // useEffect(() => {
  //   if(!isLogin) {
  //     navigate("/sign-in")
  //   }
  // })

  return (
    <div>
      <p>이메일 : {memberEmail}</p>
      <p>이름 : {memberName}</p>
      <p>닉네임 : {memberNickName}</p>
    </div>
  );
};

export default Mypage;