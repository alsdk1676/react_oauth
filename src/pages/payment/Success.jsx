import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Success = () => {

  const [searchParams] = useSearchParams();
  const [responseData, setResponsetData] = useState(null);
  const [isReqeustSent, setIsRequestSent] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const confirm = async () => {
      const requestData = {
        orderId : searchParams.get("orderId"),
        amount : searchParams.get("amount"),
        paymentKey : searchParams.get("paymentKey")
      }

      const response = await fetch("http://localhost:10000/payments/toss", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(requestData)
      })
      
      if(!datas.ok) {
        throw new Error("안타깝네요.😅")
      }

      const datas = await response.json()
      return datas
    }

    confirm()
      .then((data) => {
        console.log(data)
      })
      .catch(console.error)

  }, [navigate, isReqeustSent, searchParams])

  return (
    <div>
      결제 성공 페이지
    </div>
  );
};

export default Success;