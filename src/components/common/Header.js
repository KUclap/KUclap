import { h, Fragment } from "preact";
import styled, { withTheme } from "styled-components";
import { KUClap } from "../utillity/Icons";
import ThemeToggleButton from "./ThemeToggleButton";

const KUclapText = styled.p`
  font-size: 6rem;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  cursor: pointer;
`;

const DetailKUclap = styled.span`
  font-size: 2.5rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.mainText};
  text-align: center;
  font-weight: 400;
`;

const Header = ({ theme, toggleTheme }) => {
  const NavigateMain = () => {
    if (typeof window !== "undefined")
      window.location.href = "https://marsdev31.github.io/KUclap/";
  };

  return (
    <Fragment>
      <ThemeToggleButton right onClick={toggleTheme} />
      <KUclapText onClick={NavigateMain}>
        <KUClap bgColor={theme.body} textColor={theme.bodyText} />
        <span>
          <b>KU</b>CLAP
        </span>
        <DetailKUclap>ค้นหาและแบ่งปันรีวิววิชาบูรณาการ</DetailKUclap>
      </KUclapText>
    </Fragment>
  );
};

export default withTheme(Header);
