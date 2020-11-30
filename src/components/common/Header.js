import { h } from "preact";
import styled, { withTheme } from "styled-components";
import media from 'styled-media-query'
import { KUClap, Facebook, Twitter } from "../utility/Icons";
import ThemeToggleButton from "./ThemeToggleButton";
import { navigateToHomePage } from "../utility/helper";

const KUclapText = styled.p`
  font-size: 4.6rem;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
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
  /* height: 2.9rem; */
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

const SocialIcon = styled.a`
  cursor: pointer;
  height: 2.4rem;
`

const Header = ({ theme, toggleTheme }) => {
  return (
    <>

      
      <UtilitysContainer>
        <SocialIcon
        href="https://fb.com/kuclap/"
        target="_blank"
        rel="noopener noreferrer">
          <Facebook />
        </SocialIcon>
        <SocialIcon
        href="https://twitter.com/KUclapOfficial"
        target="_blank"
        rel="noopener noreferrer">
          <Twitter />
        </SocialIcon>
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
