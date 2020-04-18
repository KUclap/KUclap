import { useState, useEffect } from "preact/hooks";
import styled, { createGlobalStyle } from "styled-components";
import Select from "react-virtualized-select";
import "react-virtualized-select/styles.css";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import Header from "./common/Header";
import APIs from "./utillity/apis";
import ReviewCard from "./common/ReviewCard";
import ReviewForm from "./common/ReviewForm";
import Details from "./common/Detail";
// Code-splitting is automated for routes
// import Home from "../routes/home";
// import Profile from "../routes/profile";

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%; /* 10px at html, body */
  } 
  body {
    font-family: 'Kanit', arial, sans-serif;
    font-weight: 400; 
    height: auto;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: ${(props) => (props.overflow === true ? "hidden" : "auto")}
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
  margin: 0 auto;
`;

const SelectCustom = styled(Select)`
  width: 80%;
  max-width: 58rem;
  font-size: 1.45rem;

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

const SubjectTitle = styled.p`
  font-size: 2rem;
  margin: 3rem 6.4rem;
  min-width: 86%;
  display: ${(props) => (props.enable !== "main" ? "block" : "none")};
`;

const DetailTitle = styled.p`
  font-size: 2rem;
  margin: 1.2rem 0;
  font-weight: 600;
  color: ${(props) => (props.desc ? "#BDBDBD" : "#4F4F4F")};
  padding: ${(props) => (props.desc ? "0 1rem" : 0)};
`;

const AdaptorReviews = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const LastReview = styled.div`
  width: 86%;
  margin: 0 2.4rem;
`;

const ReviewTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.8rem;
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

const App = (props) => {
  const [classes, setClasses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState("main");
  const [scroll, setScroll] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [classSelected, setClassSelected] = useState({
    label: "ค้นหาวิชาด้วยรหัสวิชา ชื่อวิชาภาษาไทย / ภาษาอังกฤษ",
    classId: "",
  });

  const [score] = useState({
    work: 50,
    lesson: 75,
    teaching: 34,
  });

  useEffect(() => console.log(reviews), [reviews]);

  const handleSelected = (e) => {
    APIs.getReviewsByClassId(e.classId, (res) => setReviews(res.data));
    setClassSelected({ label: e.label, classId: e.classId });
    setShow("details");
  };

  useEffect(() => {
    APIs.getAllClasses((res) => setClasses(res.data));

    const adaptor = document.getElementById("adaptor");
    window.addEventListener("scroll", () => {
      if (adaptor.getBoundingClientRect().bottom <= window.innerHeight) {
        if (!loading) setLoadMore(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!loading && loadMore) {
      setLoading(true);
      console.log("FETCH");
      if (show === "main") {
        APIs.getLastReviews(10, (res) => {
          setReviews((prevReview) => [...prevReview, ...res.data]);
          setLoading(false);
        });
      } else if (show === "detail") {
        APIs.getReviewsByClassId(classSelected.classId, (res) => {
          setReviews((prevReview) => [...prevReview, ...res.data]);
          setLoading(false);
        });
      }
    }

    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    const adaptor = document.getElementById("adaptor");

    if (adaptor.clientHeight <= window.innerHeight && adaptor.clientHeight) {
      setLoadMore(true);
    }
  }, [reviews]);

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
        options={classes}
        valueKey={"classId"}
        key={"classId"}
        placeholder={classSelected.label}
        onChange={handleSelected}
      />
      <SubjectTitle enable={show}>{classSelected.label}</SubjectTitle>
      <ReviewForm enable={show} back={setShow} modal={setScroll} />
      <Details score={score} enable={show} />

      <LastReview>
        {show === "main" ? (
          <DetailTitle>รีวิวล่าสุด</DetailTitle>
        ) : show === "form" ? null : (
          <ReviewTitle>
            <DetailTitle>รีวิวทั้งหมด</DetailTitle>
            <Button onClick={() => setShow("form")}>รีวิววิชานี้</Button>
          </ReviewTitle>
        )}
        <AdaptorReviews id="adaptor">
          {show === "form"
            ? null
            : reviews
            ? reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))
            : "ยังไม่มีข้อมูลครับ"}
        </AdaptorReviews>
        {(loading || loadMore) && (
          <p style={{ fontSize: "30px", margin: "0" }}>LOADING...</p>
        )}
      </LastReview>
    </Container>
  );
};
export default App;
// ? () => {
//   return (
//     <>
//       {reviews.map((review, index) => (
//         <ReviewCard key={index} {...review} />
//       ))}
//       {loading ? "LODING ..." : null}
//     </>
//   );
// }
