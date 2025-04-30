import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { setUser, setUserStatus } from '../../modules/user';

const Layout = () => {

  // 리덕스
  const { currentUser, isLogin } = useSelector((state) => state.user)
  const dispatch = useDispatch(); // 액션을 들고감

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
          const datas = response.json(); // try~catch로 잡은 메세지 들어옴
          // 리덕스를 초기화
          // console.log("response not ok", datas)
          dispatch(setUser({
            id : 0,
            memberEmail : "",
            memberName : "",
            memberPicture : "",
            memberNickName : "",
            memberProvider : "",
          }))
          dispatch(setUserStatus(false))

          // 로컬스토리지 토큰 삭제
          // localStorage.removeItem("jwtToken")
          localStorage.clear()
        }

        // 정상 응답
        const datas = await response.json()
        // 리덕스에 유저정보 파싱
        dispatch(setUser(datas.currentUser))
        dispatch(setUserStatus(true))
        // console.log(datas.currentUser)
      }
      getUserDatas()
    }

  }, [localJwtToken])


  // 리덕스에 유저를 추가하는 코드
  console.log("layout 리덕스 유저", currentUser)
  console.log("layout 리덕스 유저 상태", isLogin)

  // 토큰 정보를 확인하는 코드
  const handleLogout = () => {
    // localStorage.removeItem("jwtToken") // 프론트에서 저장된 토큰 지우기!
    localStorage.clear()// 프론트에서 저장된 토큰 지우기!
    dispatch(setUser({
      id : 0,
      memberEmail : "",
      memberName : "",
      memberPicture : "",
      memberNickName : "",
      memberProvider : "",
    }))
    dispatch(setUserStatus(false))
    window.location.href = "http://localhost:10000/logout" // 로그아웃 처리 끝 => 프론트에서 저장된 토큰 지우기!
  }

  //  1) 그냥 메인으로 바로 접속한 멤버
  // 2) 로그인 이후 토큰을 들고 온 멤버
  // 3) 토큰을 로컬 스토리지에 이미 가지고 있는 멤버


  return (
    <div>

      {isLogin ? <button onClick={handleLogout}>로그아웃</button> : <Link to={"/sign-in"}>로그인</Link>}

      {/* 로그아웃 처리 */}
      {/* 1) 토큰 삭제 2) 리덕스 비우기 3) 백엔드에 요청 보내기 */}
      {/* 백엔드에서 요청을 보내서 리다이렉트 => 로그아웃 버튼 눌렀을 때 Link로 페이지 이동할 필요 X */}


      <Outlet />
    </div>
  );
};

export default Layout;