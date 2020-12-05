import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import styled, { withTheme } from "styled-components";
import { DoneGreen } from "../utility/Icons";
import { Backdrop } from "./DesignSystemStyles"
import "animate.css";

const Card = styled.div`
  width: 370px;
  background: transparent;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
`;

const Thankyou = styled.p`
  color: #77b28f;
  font-size: 2.6rem;
  font-weight: 600;
  white-space: nowrap;
  text-align: center;
  margin-bottom: 0.3rem;
  color: #a3e0b5;
`;

const TextCount = styled.p`
  color: white;
  font-size: 2rem;
  white-space: nowrap;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  color: white;
  font-size: 1.8rem;
  white-space: nowrap;
  margin-bottom: 2rem;
`;

const AlertComponent = (props) => {
  const [count, setCount] = useState(5);
  const saveCallback = useRef();

  const handleClose = () => {
    props.Close();
  };

  function callbackCount() {
    setCount(count - 1);
    if (count === 0) {
      handleClose();
    }
  }

  useEffect(() => {
    saveCallback.current = callbackCount;
  });

  useEffect(() => {
    function tick() {
      saveCallback.current();
    }

    const timing = setInterval(tick, 1000);
    return () => clearInterval(timing);
  }, []);
  
  return (
    <>
      <Backdrop show={true} onClick={handleClose} />
      <Card onClick={handleClose}>
        <span className="bounceIn">
          <DoneGreen />
        </span>
        <Thankyou>ขอบคุณสำหรับข้อมูลเพิ่มเติมครับ/ค่ะ</Thankyou>
        <TextCount>จะปิดหน้านี้ในอีก {count} วินาที</TextCount>
        <Text>( จิ้มเบาๆ หนึ่งครั้งเพื่อปิด )</Text>
      </Card>
    </>
  );
};

export default withTheme(AlertComponent);
