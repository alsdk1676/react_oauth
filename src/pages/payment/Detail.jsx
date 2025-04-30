import React from 'react';
import PaymentButton from './PaymentButton';
import { useSelector } from 'react-redux';

const Detail = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { memberEmail, memberName } = currentUser;

  const productName = "노트북"
  const productPrice = 200000

  return (
    <div>
      <p>현재 사용자 : {memberEmail}</p>

      <div>
        <p>결제 상품 : {productName}</p>
        <p>결제 가격 : {productPrice}</p>
      </div>


      <PaymentButton 
        productPrice = {productPrice}
        orderName = {productName}
        customerName = {memberName}
        customerEmail = {memberEmail}
      />
    </div>
  );
};

export default Detail;