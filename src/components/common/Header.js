import { h } from "preact";
import styled from "styled-components";

const KUclapText = styled.p`
  font-size: 6rem;
  margin-bottom: 0;
`;

const DetailKUclap = styled.h1`
  font-size: 2.5rem;
  text-transform: uppercase;
  color: #666;
  width: 80%;
  text-align: center;
  margin: 2rem;
`;

const Header = () => {
  return (
    <>
      <KUclapText>
        <b>KU</b>clap
      </KUclapText>
      <DetailKUclap>ค้นหาและแบ่งปันรีวิววิชาเรียน</DetailKUclap>
    </>
  );
};

export default Header;
