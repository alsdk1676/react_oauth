import React, { useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

const Layout = () => {
  // 쿼리스트링에서 토큰 분리
  const [searchParams] = useSearchParams();
  const jwtToken = searchParams.get("jwtToken") // 동시에 존재할 수 없기 때문에 따로 불러옴
  // 로컬 스토리지에 토큰이 이미 존재하는지 확인
  const localJwtToken = localStorage.getItem("jwtToken") // 동시에 존재할 수 없기 때문에 따로 불러옴

  const navigate = useNavigate();

  useEffect(() => {
    // 만약 쿼리스트링에 토큰이 있다면, 로컬스토리지에 저장
    if(jwtToken) {
      localStorage.setItem("jwtToken", jwtToken)
      navigate("/", {replace : true}) // replace : trye => 토큰 로그 남지 않음!
    }
    // 이미 로컬스토리지에 토큰을 가지고 있는 경우
    // 토큰을 통해 누군지 특정해야 함
    // 토큰이 있다면 해당 토큰으로 사용자의 정보를 요청
    if(localJwtToken){
      const getUserDatas = async () => {
        const response = await fetch("http://localhost:10000/member/profile", {
          method : "POST",
          headers : {
            "Authorization" : `Bearer ${localJwtToken}`
          }
        })

        // 토큰으로 데이터를 가져오지 못하면 <<== 토큰이 만료됐거나, 잘못된 토큰이거나
        if(!response.ok){


        }
        // 정상 응답
        // const datas = await response.json()
        // console.log(datas)
      }

      getUserDatas()
    }

  }, [localJwtToken])




  // 리덕스에 유저를 추가하는 코드
  // 토큰 정보를 확인하는 코드

  //  1) 그냥 메인으로 바로 접속한 멤버
  // 2) 로그인 이후 토큰을 들고 온 멤버
  // 3) 토큰을 로컬 스토리지에 이미 가지고 있는 멤버


  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;