import { h, Fragment } from "preact";
import styled from "styled-components";
import { KUClap } from "../utillity/Icons";

const KUclapText = styled.p`
  font-size: 6rem;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

const DetailKUclap = styled.span`
  font-size: 2.5rem;
  text-transform: uppercase;
  color: #4f4f4f;
  text-align: center;
  font-weight: 400;
`;

const Header = () => {
  return (
    <Fragment>
      <KUclapText>
        <KUClap />
        <span>
          <b>KU</b>CLAP
        </span>
        <DetailKUclap>ค้นหาและแบ่งปันรีวิววิชาเรียน</DetailKUclap>
      </KUclapText>
    </Fragment>
  );
};

export default Header;
