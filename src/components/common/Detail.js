import { h } from "preact";
import styled, { withTheme } from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Heading2 } from "./DesignSystemStyles";
import { baby_blue, columbia_blue, cosmos_pink, sea_pink, turquoise_green, yellow } from "./Colors";

const ScoreTitle = styled.div`
  font-size: 1.4rem;
  width: 40%;
  color: ${(props) => props.theme.mainText};
`;

const LinearProgressCustom = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    height: 0.8rem;
    width: 72%;
    border-radius: 0.6rem;
    margin-left: 1rem;
  }

  &.MuiLinearProgress-colorPrimary {
    background-color: ${(props) => props.theme.lightBackground};
  }

  & .MuiLinearProgress-barColorPrimary {
    background-image: linear-gradient(
      89.94deg,
      ${(props) => props.colorLeft} 0.01%,
      ${(props) => props.colorRight} 213.5%
    );
    border-radius: 0.6rem;
  }
`;

const Percent = styled.div`
  font-size: 1rem;
  width: 0;
  color: ${(props) => props.theme.subText};
`

const ScoreContainter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:first-child) {
    margin-top: 1.4rem;
  }

  span {
    display: flex;
  }
`;

const Details = styled.div`
  width: 86%;
  margin: 0 2.4rem;
`;

const ScoreBar = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => (props.title ? "55%" : "60%")};
  padding-right: ${(props) => (props.title ? "9%" : 0)};
  justify-content: ${(props) =>
    props.title ? "space-between" : "space-evenly"};

  ${Heading2} {
    padding-left: 1rem;
  }
`;

const Detail = ({ score }) => {
  return (
    <Details>
      <ScoreContainter>
        <Heading2>คะแนนภาพรวม</Heading2>
        <ScoreBar title>
          <Heading2 desc>ไม่พอใจ</Heading2>
          <Heading2 desc>พอใจ</Heading2>
        </ScoreBar>
      </ScoreContainter>
      <ScoreContainter>
        <ScoreTitle>จำนวนงานและการบ้าน</ScoreTitle>
        <ScoreBar>
          <LinearProgressCustom
            variant="determinate"
            colorLeft={baby_blue}
            colorRight={cosmos_pink}
            value={score ? score.homework : 0}
          />
          <Percent>
            {score ? Number(score.homework.toFixed(0)) : 0}%
          </Percent>
        </ScoreBar>
      </ScoreContainter>
      <ScoreContainter>
        <ScoreTitle>ความน่าสนใจของเนื้อหา</ScoreTitle>
        <ScoreBar>
          <LinearProgressCustom
            variant="determinate"
            colorLeft={turquoise_green}
            colorRight={columbia_blue}
            value={score ? score.interest : 0}
          />
          <Percent>
            {score ? Number(score.interest.toFixed(0)) : 0}%
          </Percent>
        </ScoreBar>
      </ScoreContainter>
      <ScoreContainter>
        <ScoreTitle>การสอนของอาจารย์</ScoreTitle>
        <ScoreBar>
          <LinearProgressCustom
            variant="determinate"
            colorLeft={sea_pink}
            colorRight={yellow}
            value={score ? score.how : 0}
          />
          <Percent>
            {score ? Number(score.how.toFixed(0)) : 0}%
          </Percent>
        </ScoreBar>
      </ScoreContainter>
    </Details>
  );
};

export default withTheme(Detail);
