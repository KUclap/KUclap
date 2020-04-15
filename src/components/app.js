// import { h } from "preact";
import { useState } from "preact/hooks";
import styled, { createGlobalStyle } from "styled-components";
import Select from "react-virtualized-select";
import "react-virtualized-select/styles.css";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import Header from "./common/Header";
import { data as data_mock_class } from "../assets/data/class";
import ReviewCard from "./common/ReviewCard";
import ReviewForm from "./common/ReviewForm";
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
    overflow: ${props => props.overflow === true ? 'hidden' : 'scroll'}
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
  max-width: 86rem;
  margin: auto;
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

const Details = styled.div`
  min-width: 86%;
  margin: 0 2.4rem;
  display: ${props => props.enable === false ? 'block' : 'none'};
`;

const SubjectTitle = styled.p`
  font-size: 2rem;
  margin: 3rem;
  min-width: 86%;
`;

const Button = styled.div `
  background-color: #2F80ED;
  color: #fff;
  padding: 0.2rem 1.8rem;
  border-radius: 0.6rem;
  font-size: 2rem;
  cursor: pointer;

  &:active {
    background-color: #2F80ED;
  }

  &:hover {
    background-color: #9AC1EE;
  }
`;

const DetailTitle = styled.p `
  font-size: 2rem;
  margin: 1.2rem 0;
  font-weight: 600;
  color: ${props => props.desc ? '#BDBDBD' : '#4F4F4F'}
`;

const ScoreTitle = styled.p `
  font-size: 1.7rem;
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

const ScoreContainter = styled.div`
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
  )
  const [score, setScore] = useState({
    work: 50,
    lesson: 75,
    teaching: 34
  });
  const [showForm, setShowForm] = useState(false)
  const [scroll, setScroll] = useState(false)

  return (
    <Container>
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&display=swap"
        rel="stylesheet"
      />
      <GlobalStyles overflow={scroll} />
      <Header />
      <SelectCustom
        name="major"
        autosize={false}
        options={data_mock_class}
        value={classSelected}
        placeholder={classSelected}
        onChange={(e) => setClassSelected(e.label)}
      />
      <SubjectTitle>{classSelected}</SubjectTitle>
      <ReviewForm enable={showForm} back={setShowForm} modal={setScroll} />
      <Details enable={showForm}>
        <ScoreContainter>
          <DetailTitle>คะแนนภาพรวม</DetailTitle>
          <DetailTitle desc>มาก</DetailTitle>
          <DetailTitle desc>น้อย</DetailTitle>
        </ScoreContainter>
        <ScoreContainter>
          <ScoreTitle>จำนวนงานและการบ้าน</ScoreTitle>
          <LinearProgressCustom variant="determinate" colorLeft="#9BC1EE" colorRight="#F0C3F7" value={score.work} />
        </ScoreContainter>
        <ScoreContainter>
          <ScoreTitle>ความน่าสนใจของเนื้อหา</ScoreTitle>
          <LinearProgressCustom variant="determinate" colorLeft="#A3E0B5" colorRight="#B4D9F3" value={score.lesson} />
        </ScoreContainter>
        <ScoreContainter>
          <ScoreTitle>การสอนของอาจารย์</ScoreTitle>
          <LinearProgressCustom variant="determinate" colorLeft="#EEA99A" colorRight="#F6DEA2" value={score.teaching} />
        </ScoreContainter>
        <ReviewTitle>
          <DetailTitle>รีวิวทั้งหมด</DetailTitle>
          <Button onClick={() => setShowForm(true)}>
            รีวิววิชานี้
          </Button>
        </ReviewTitle>
        <ReviewCard />
      </Details>
    </Container>
  );
};
export default App;
