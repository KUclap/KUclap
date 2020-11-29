import { h } from "preact";
import styled, { withTheme } from "styled-components";
import { KUClap } from "../utility/Icons";
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

const Header = ({ theme, toggleTheme }) => {
  return (
    <>
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
