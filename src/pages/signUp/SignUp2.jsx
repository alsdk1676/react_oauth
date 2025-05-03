import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SocialSignUp from './SocialSignUp';
import NormalSignUp from './NormalSignUp';

const SignUp = () => {
  
  const [searchParams] = useSearchParams()
  const provider = searchParams.get("provider");
  const email = searchParams.get("email");

  // 소셜 로그인 한 사용자
  if(provider && email){
    return <SocialSignUp provider={provider} email={email} />
  }else {
    return <NormalSignUp />
  }
};

export default SignUp;