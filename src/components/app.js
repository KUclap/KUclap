// import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import styled, { createGlobalStyle } from "styled-components";
import Select from "react-virtualized-select";
import "react-virtualized-select/styles.css";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import Header from "./common/Header";
import APIs from "./utillity/apis";
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
    overflow: ${(props) => (props.overflow === true ? "hidden" : "scroll")}
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
  font-size: 1.5rem;

  .Select-placeholder {
    color: #888;
    height: 5.2rem;
  }

  .Select-control {
    width: 100%;
    margin: 0 auto;
    border: 0.2rem solid #e0e0e0;
    border-radius: 10px;
  }

  .Select-input {
    width: 100%;
  }
`;

const Details = styled.div`
  width: 86%;
  margin: 0 2.4rem;
  display: ${(props) => (props.enable === "details" ? "block" : "none")};
`;

const SubjectTitle = styled.p`
  font-size: 2rem;
  margin: 3rem 6.4rem;
  min-width: 86%;
  display: ${(props) => (props.enable !== "main" ? "block" : "none")};
`;

const Button = styled.div`
  background-color: #2f80ed;
  color: #fff;
  padding: 0.2rem 1.8rem;
  border-radius: 0.6rem;
  font-size: 2rem;
  cursor: pointer;

  &:active {
    background-color: #2f80ed;
  }

  &:hover {
    background-color: #9ac1ee;
  }
`;

const DetailTitle = styled.p`
  font-size: 2rem;
  margin: 1.2rem 0;
  font-weight: 600;
  color: ${(props) => (props.desc ? "#BDBDBD" : "#4F4F4F")};
  padding: ${(props) => (props.desc ? "0 1rem" : "0")};
`;

const ScoreTitle = styled.p`
  font-size: 1.7rem;
  width: ${(props) => (props.score ? "0rem" : "36%")};
  color: ${(props) => (props.score ? "#BDBDBD" : "#4F4F4F")};
`;

const LinearProgressCustom = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    height: 1.2rem;
    width: 72%;
    border-radius: 0.6rem;
    margin-left: 1rem;
  }

  &.MuiLinearProgress-colorPrimary {
    background-color: #f2f2f2;
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

const ReviewTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.8rem;
`;

const ScoreBar = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => (props.title ? "55%" : "60%")};
  padding-right: ${(props) => (props.title ? "9%" : 0)};
  justify-content: ${(props) =>
    props.title ? "space-between" : "space-evenly"};
`;

const LastReview = styled(Details)`
  margin: 2.4rem;
  display: ${(props) => (props.enable === "main" ? "block" : "none")};
`;

const App = () => {
  const [classes, setClasses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState("main");
  const [scroll, setScroll] = useState(false);
  const [classSelected, setClassSelected] = useState(
    "ค้นหาวิชาด้วยรหัสวิชา ชื่อวิชาภาษาไทย / ภาษาอังกฤษ"
  );
  const [score] = useState({
    work: 50,
    lesson: 75,
    teaching: 34,
  });

  useEffect(() => {
    APIs.getLastReviews(5, (res) => setReviews(res.data));
    APIs.getAllClasses((res) => setClasses(res.data));
  }, []);

  useEffect(() => console.log(reviews), [reviews]);

  const handleSelected = (e) => {
    // alert(e.label);
    setClassSelected(e.label);
    setShow("details");
  };

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
        // options={data_mock_class}
        options={classes}
        valueKey={"classId"}
        key={"classId"}
        placeholder={classSelected}
        onChange={handleSelected}
      />
      <LastReview enable={show}>
        <DetailTitle>รีวิวล่าสุด</DetailTitle>
        {reviews.map((review) => (
          <ReviewCard {...review} />
        ))}
      </LastReview>
      <SubjectTitle enable={show}>{classSelected}</SubjectTitle>
      <ReviewForm enable={show} back={setShow} modal={setScroll} />
      <Details enable={show}>
        <ScoreContainter>
          <DetailTitle>คะแนนภาพรวม</DetailTitle>
          <ScoreBar title>
            <DetailTitle desc>มาก</DetailTitle>
            <DetailTitle desc>น้อย</DetailTitle>
          </ScoreBar>
        </ScoreContainter>
        <ScoreContainter>
          <ScoreTitle>จำนวนงานและการบ้าน</ScoreTitle>
          <ScoreBar>
            <LinearProgressCustom
              variant="determinate"
              colorLeft="#9BC1EE"
              colorRight="#F0C3F7"
              value={score.work}
            />
            <ScoreTitle score>{score.work}%</ScoreTitle>
          </ScoreBar>
        </ScoreContainter>
        <ScoreContainter>
          <ScoreTitle>ความน่าสนใจของเนื้อหา</ScoreTitle>
          <ScoreBar>
            <LinearProgressCustom
              variant="determinate"
              colorLeft="#A3E0B5"
              colorRight="#B4D9F3"
              value={score.lesson}
            />
            <ScoreTitle score>{score.lesson}%</ScoreTitle>
          </ScoreBar>
        </ScoreContainter>
        <ScoreContainter>
          <ScoreTitle>การสอนของอาจารย์</ScoreTitle>
          <ScoreBar>
            <LinearProgressCustom
              variant="determinate"
              colorLeft="#EEA99A"
              colorRight="#F6DEA2"
              value={score.teaching}
            />
            <ScoreTitle score>{score.teaching}%</ScoreTitle>
          </ScoreBar>
        </ScoreContainter>
        <ReviewTitle>
          <DetailTitle>รีวิวทั้งหมด</DetailTitle>
          <Button onClick={() => setShow("form")}>รีวิววิชานี้</Button>
        </ReviewTitle>
        {reviews.map((review, index) => {
          <ReviewCard key={index} {...review} />;
        })}
      </Details>
    </Container>
  );
};
export default App;
