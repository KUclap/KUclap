import { h } from "preact";
import styled, { withTheme } from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";

const ScoreTitle = styled.p`
  font-size: 1.7rem;
  width: ${(props) => (props.score ? "0rem" : "36%")};
  color: ${(props) => (props.score ? props.theme.placeholderText : props.theme.mainText)};
`;

const LinearProgressCustom = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    height: 1.2rem;
    width: 72%;
    border-radius: 0.6rem;
    margin-left: 1rem;
  }

  &.MuiLinearProgress-colorPrimary {
    background-color: ${(props) => props.theme.lightColor2};
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

const ScoreContainter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    display: flex;
  }
`;

const ScoreBar = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => (props.title ? "55%" : "60%")};
  padding-right: ${(props) => (props.title ? "9%" : 0)};
  justify-content: ${(props) =>
    props.title ? "space-between" : "space-evenly"};
`;

const Details = styled.div`
  width: 86%;
  margin: 0 2.4rem;
  display: ${(props) => (props.enable === "details" ? "block" : "none")};
`;

const DetailTitle = styled.p`
  font-size: 2rem;
  margin: 1.2rem 0;
  font-weight: 600;
  color: ${(props) => (props.desc ? props.theme.placeholderText : props.theme.mainText)};
  padding: ${(props) => (props.desc ? "0 1rem" : "0")};
`;

const Detail = ({ score, enable }) => {
  return (
    <Details enable={enable}>
      <ScoreContainter>
        <DetailTitle>คะแนนภาพรวม</DetailTitle>
        <ScoreBar title>
          <DetailTitle desc>ไม่พอใจ</DetailTitle>
          <DetailTitle desc>พอใจ</DetailTitle>
        </ScoreBar>
      </ScoreContainter>
      <ScoreContainter>
        <ScoreTitle>จำนวนงานและการบ้าน</ScoreTitle>
        <ScoreBar>
          <LinearProgressCustom
            variant="determinate"
            colorLeft="#9BC1EE"
            colorRight="#F0C3F7"
            value={score.homework}
          />
          <ScoreTitle score>{Number(score.homework.toFixed(0))}%</ScoreTitle>
        </ScoreBar>
      </ScoreContainter>
      <ScoreContainter>
        <ScoreTitle>ความน่าสนใจของเนื้อหา</ScoreTitle>
        <ScoreBar>
          <LinearProgressCustom
            variant="determinate"
            colorLeft="#A3E0B5"
            colorRight="#B4D9F3"
            value={score.interest}
          />
          <ScoreTitle score>{Number(score.interest.toFixed(0))}%</ScoreTitle>
        </ScoreBar>
      </ScoreContainter>
      <ScoreContainter>
        <ScoreTitle>การสอนของอาจารย์</ScoreTitle>
        <ScoreBar>
          <LinearProgressCustom
            variant="determinate"
            colorLeft="#EEA99A"
            colorRight="#F6DEA2"
            value={score.how}
          />
          <ScoreTitle score>{Number(score.how.toFixed(0))}%</ScoreTitle>
        </ScoreBar>
      </ScoreContainter>
    </Details>
  );
};

export default withTheme(Detail);
