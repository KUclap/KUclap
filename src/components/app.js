// import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Select from "react-virtualized-select";
import "react-virtualized-select/styles.css";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import Header from "./common/Header";
import { data as data_mock_class } from "../assets/data/class";
import ReviewCard from "./common/ReviewCard";
// Code-splitting is automated for routes
// import Home from "../routes/home";
// import Profile from "../routes/profile";

const GlobalStyles = createGlobalStyle`
    html, body {
    font-size: 62.5%; /* 10px at html, body */
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: 'Kanit', arial, sans-serif;
    font-weight: 400;
  }

  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SelectCustom = styled(Select)`
  width: 80%;
  max-width: 58rem;
  font-size: 1.25rem;

  .Select-placeholder {
    color: #666;
  }

  .Select-control {
    width: 100%;
    margin: 0 auto;
  }

  .Select-input {
    width: 100%;
  }
`;

const SubjectDetails = styled.div`
  max-width: 80%;
  margin: 2rem 0;
`;

const SubjectTitle = styled.p`
  font-size: 2rem;
`;

const Button = styled.div `
  background-color: #9BC1EE;
  color: #fff;
  padding: 0.2rem 1.8rem;
  border-radius: 0.6rem;
  font-size: 1.4rem;
  height: 2.5rem;
`;

const DetailTitle = styled.p `
  font-size: 1.8rem;
  margin: 0;
`;

const ScoreTitle = styled.p `
  font-size: 1.4rem;
  margin-right: 1.2rem;
`;

const LinearProgressCustom = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    height: 1.2rem;
    width: 45%;
    border-radius: 0.6rem;
  }

  &.MuiLinearProgress-colorPrimary {
    background-color: #F2F2F2;
  }

  & .MuiLinearProgress-barColorPrimary {
    background-image: linear-gradient(89.94deg, ${props => props.colorLeft} 0.01%, ${props => props.colorRight} 213.5%);
    border-radius: 0.6rem;
  }
`;

const ScoreBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ReviewTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.8rem;
`

const App = () => {
  const [classSelected, setClassSelected] = useState(
    "ค้นหาวิชาด้วยรหัสวิชา ชื่อวิชาภาษาไทย / ภาษาอังกฤษ"
  );
  const [score, setScore] = useState({
    work: 50,
    lesson: 75,
    teaching: 34
  });

  return (
    <Container>
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&display=swap"
        rel="stylesheet"
      />
      <GlobalStyles />
      <Header />
      <SelectCustom
        name="major"
        autosize={false}
        options={data_mock_class}
        value={classSelected}
        placeholder={classSelected}
        onChange={(e) => setClassSelected(e.label)}
      />
      <SubjectDetails>
        <SubjectTitle>{classSelected}</SubjectTitle>
        <DetailTitle>คะแนนภาพรวม</DetailTitle>
        <ScoreBar>
          <ScoreTitle>จำนวนงานและการบ้าน</ScoreTitle>
          <LinearProgressCustom variant="determinate" colorLeft="#9BC1EE" colorRight="#F0C3F7" value={score.work} />
        </ScoreBar>
        <ScoreBar>
          <ScoreTitle>ความน่าสนใจของเนื้อหา</ScoreTitle>
          <LinearProgressCustom variant="determinate" colorLeft="#A3E0B5" colorRight="#B4D9F3" value={score.lesson} />
        </ScoreBar>
        <ScoreBar>
          <ScoreTitle>การสอนของอาจารย์</ScoreTitle>
          <LinearProgressCustom variant="determinate" colorLeft="#EEA99A" colorRight="#F6DEA2" value={score.teaching} />
        </ScoreBar>
        <ReviewTitle>
          <DetailTitle>รีวิวทั้งหมด</DetailTitle>
          <Button>
            รีวิววิชานี้
          </Button>
        </ReviewTitle>
        <ReviewCard />
      </SubjectDetails>
      

    </Container>
  );
};
export default App;
