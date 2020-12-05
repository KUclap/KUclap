import { h } from "preact";
import media from 'styled-media-query'
import styled, { withTheme } from "styled-components";

import { KUClap } from "../utility/Icons";
import { navigateToHomePage } from "../utility/helper";
import SocialIcons from './SocialIcons'
import ThemeToggleButton from "./ThemeToggleButton";

const KUclapText = styled.p`
  font-size: 4.6rem;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.5rem 0;
  cursor: pointer;
  user-select: none;

  > svg {
    width: 6.4rem;
    height: 6.4rem;
  }
`;

const DetailKUclap = styled.span`
  font-size: 1.8rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.mainText || "#4f4f4f"};
  text-align: center;
  font-weight: 400;
`;

const UtilitysContainer = styled.div`
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 1.6rem;
  left: 3rem;

  ${media.greaterThan('medium')`
    top: 1.6rem;
    right: 9rem;
    left: auto;
  `}
`



const Header = ({ theme, toggleTheme }) => {
  return (
    <>

      
      <UtilitysContainer>
       <SocialIcons />
      </UtilitysContainer>
      <ThemeToggleButton onClick={toggleTheme} right />
      <KUclapText onClick={navigateToHomePage}>
        <KUClap bgColor={theme.body} textColor={theme.bodyText} />
        <span>
          <b>KU</b>CLAP
        </span>
        <DetailKUclap>ค้นหาและแบ่งปันรีวิววิชาบูรณาการ</DetailKUclap>
      </KUclapText>
    </>
  );
};

export default withTheme(Header);
