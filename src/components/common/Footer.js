import { h } from "preact";
import styled, { withTheme } from "styled-components";
import { Github } from "../utility/Icons";
import SocialIcons from './SocialIcons'

const Container = styled.footer`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 7.5rem;
  margin-bottom: 4rem;
  border-top: 0.475rem dashed ${(props) => props.theme.lightColor};
`;

const MoreProductionText = styled.p`
  color: ${(props) => props.theme.mainText};
  font-size: 1.8rem;
  margin: 2.8rem 0 0 0;
`;

const SocialText = styled(MoreProductionText)`
  font-size: 1.4rem;
  margin: 0.8rem 0 0 0;
`

const Button = styled.button`
  cursor: pointer;
  background: ${(props) => props.theme.body};
  color: #77b280;
  min-width: 27.6rem;
  font-size: 1.4rem;
  font-family: "Kanit";
  padding: 0.6rem 1.2rem;
  border: 0.35rem solid ${(props) => props.theme.lightColor};
  border-radius: 7px;
  transition: 0.25s all ease-in;
  margin: 1.4rem auto;

  span {
    color: ${(props) => props.theme.footerButtonText};
    font-size: 1.2rem;
  }

  &:hover {
    border-color: #77b280;
  }
`;

const ExternalLink = styled.a`
  margin-top: 1.5rem;
  text-decoration: none;
  color: ${(props) => props.theme.mainText};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  height: 3rem;
  line-height: 2.2rem;

  & span.img {
    margin: 0 0.8rem;
  }

  &:hover span.highlight {
    color: #2f80ed;
  }
`;

const ContainerSocial = styled.div`
  width: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.9rem;
`

const Footer = ({ theme }) => {
  return (
    <Container>
      <MoreProductionText>ผลงานอื่นๆ ของพวกเรา</MoreProductionText>
      <a
        href="https://marsdev31.github.io/KUnit/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>
          KUnit <span> | เว็บไซต์สำหรับคำนวณหน่วยกิตวิชาบูรฯ </span>
        </Button>
      </a>
    
      <SocialText>ติดตามข่าวสารจากพวกเราได้ที่</SocialText>
      <ContainerSocial>
        <SocialIcons />
      </ContainerSocial>
      <ExternalLink
        href="https://github.com/marsDev31"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="highlight">PRs Welcome&nbsp;</span> at{" "}
        <span className="img">
          <Github fill={theme.bodyText} />
        </span>
      </ExternalLink>
    </Container>
  );
};

export default withTheme(Footer);
