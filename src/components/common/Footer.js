import styled from "styled-components";
import img_marsdev from "../../assets/icons/marsdev31.png";
import { Github } from "../utillity/Icons";
const Container = styled.footer`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
`;

const MoreProductionText = styled.p`
  color: #000;
  font-size: 2.6rem;
  margin: 2rem 0 0 0;
`;

const Button = styled.button`
  cursor: pointer;
  background: white;
  color: #77b280;
  min-width: 27.6rem;
  font-size: 2rem;
  font-family: "Kanit";
  padding: 1.2rem 1.6rem;
  border: 0.35rem solid #e0e0e0;
  border-radius: 7px;
  transition: 0.25s all ease-in;
  margin: 2rem auto;
  span {
    color: #121112;
    font-size: 1.6rem;
  }
  &:hover {
    border-color: #77b280;
  }
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: #000;
  font-size: 1.4rem;
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

const MarsDev = styled.img`
  width: 22px;
  height: 22px;
  maring: 0;
`;

const Footer = () => {
  return (
    <Container>
      <MoreProductionText>ผลงานอื่นๆ ของพวกเรา</MoreProductionText>
      <a
        href="https://marsdev31.github.io/KUnit/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>
          KUnit <span> | เว็บไซต์สำหรับคำนวนณหน่วยกิตวิชาบูรฯ </span>
        </Button>
      </a>
      <ExternalLink
        href="https://github.com/marsDev31"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="highlight">Welcome&nbsp;</span> to PRs at{" "}
        <span className="img">
          <Github />
        </span>
      </ExternalLink>
      <ExternalLink
        href="http://fb.com/marsDev31/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="highlight">Power&nbsp;</span> by marsdev31
        <a
          href="http://fb.com/marsDev31/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="img">
            <MarsDev src={img_marsdev} />
          </span>
        </a>
      </ExternalLink>
    </Container>
  );
};

export default Footer;
