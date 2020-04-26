import { route } from "preact-router";
import { useState, useEffect, useRef } from "preact/hooks";
import media from "styled-media-query";
import Select from "react-virtualized-select";
import styled, { css, createGlobalStyle } from "styled-components";

import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import "react-virtualized/styles.css";

import APIs from "../components/utillity/apis";
import Details from "../components/common/Detail";
import Header from "../components/common/Header";
import ReviewCard from "../components/common/ReviewCard";
import ReviewForm from "../components/common/ReviewForm";

import {
  ReviewSkeletonA,
  ReviewSkeletonB,
} from "../components/common/ReviewSkeleton";
import { GoToTop, NoMore } from "../components/utillity/Icons";

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%; /* 10px at html, body */
    scroll-behavior: smooth;
    
    ${media.lessThan("medium")`
        font-size: 55.5%; 
    `}

    ${media.lessThan("small")`
        font-size: 48.5%; 
    `}

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
    /* user-select: none;  */
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
  position: relative;
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
    font-size: 16px;
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

const ButtonLastReview = styled(Button)`
  border: 0.2rem solid #979797;
  background: transparent;
  color: #979797;
  font-size: 1.7rem;
  margin-right: 1.5rem;
`;

const ContainerBtns = styled.div`
  margin: 0;
  display: flex;
`;

const ContainerNoMore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5.2rem 0;
  /* padding: 1.2rem 1.6rem; */
  min-width: 27.6rem;
  overflow: hidden;
`;

const NoMoreCustom = styled.div`
  margin: 2.9rem auto;
`;

const App = ({ classid }) => {
  // const [tabIndex, setTabIndex] = useState(1);
  const newEle = useRef(null);
  const [goToTop, setGoToTop] = useState(false);
  const [classes, setClasses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState("main");
  const [scroll, setScroll] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [underflow, setUnderFlow] = useState(false);
  const [classSelected, setClassSelected] = useState({
    label: "กำลังโหลดข้อมูลวิชา...",
    classId: "",
  });

  const [score, setScore] = useState({
    homework: 0,
    interest: 0,
    how: 0,
  });

  const [paging, setPaging] = useState({
    page: 0,
    offset: 5,
  });

  const NavigateMain = () => {
    window.location.href = "http://marsdev31.github.io/kuclap/";
  };

  const handleNewReview = () => {
    window.scrollTo(0, 0);
    setShow("form");
    setUnderFlow(false);
  };

  const handleFormClosed = (page) => {
    setPaging({ ...paging, page: 1 });
    setShow(page);
    handleFetchingReviewsAndClass(classid);
  };

  const handleCardDeleted = (showType) => {
    console.log(showType, classid)
    
    setShow(showType);

    if(showType === "details"){
      setPaging({ ...paging, page: 1 });
      handleFetchingReviewsAndClass(classid);
    }else if(showType === "main"){
      setPaging({ ...paging, page: 0 });
      setReviews([])
      setUnderFlow(false)
      setLoadMore(true)
    }


  };

  const handleSelected = (e) => {
    setPaging({ ...paging, page: 1 });
    setShow("details");
    handleFetchingReviewsAndClass(e.classId);
    setClassSelected({ label: e.label, classId: e.classId });
    route(`${e.classId}`);
    // getFocusWithoutScrolling();
  };

  const handleFetchingReviewsAndClass = (classId) => {
    setReviews([]);
    setLoading(true);
    setUnderFlow(false);
    APIs.getReviewsByClassId(classId, 0, paging.offset, (res) => {
      if (res.data === null) {
        setUnderFlow(true);
      } else {
        setReviews(res.data);
        setUnderFlow(false);
      }
      setLoading(false);
    });

    APIs.getClassDetailByClassId(classId, (res) => {
      console.log(res.data);
      setScore({
        homework: res.data.stats.homework,
        interest: res.data.stats.interest,
        how: res.data.stats.how,
      });
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight - 100 && !goToTop) {
        setGoToTop(true);
      } else if (window.scrollY <= window.innerHeight - 100 && goToTop) {
        setGoToTop(false);
      }
    });
  });

  const getFocusWithoutScrolling = () => {
    if (
      document.activeElement &&
      document.activeElement.blur &&
      typeof document.activeElement.blur === "function"
    ) {
      document.activeElement.blur();
    }
    console.log(newEle.current);
  };

  useEffect(() => {
    getFocusWithoutScrolling();
  }, [classSelected]);

  useEffect(() => {
    console.log(classid);
    if (classid !== "main") {
      setShow("details");
      setClassSelected({ ...classSelected, classId: classid });
      APIs.getClassDetailByClassId(classid, (res) => {
        console.log(res.data);
        setScore({
          homework: res.data.stats.homework,
          interest: res.data.stats.interest,
          how: res.data.stats.how,
        });
      });
    }

    APIs.getAllClasses((res) => {
      setClasses(res.data);
      setClassSelected({
        ...classSelected,
        label: "ค้นหาวิชาด้วยรหัสวิชา ชื่อวิชาภาษาไทย / ภาษาอังกฤษ",
      });
    });

    const adaptor = document.getElementById("adaptor");
    window.addEventListener("scroll", () => {
      if (adaptor.getBoundingClientRect().bottom <= window.innerHeight) {
        if (!loading) {
          setLoadMore(true);
          setGoToTop(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!underflow && !loading && loadMore) {
      setLoading(true);
      console.log("FETCH", show, paging);
      if (show === "main" && classid === "main") {
        APIs.getLastReviews(paging.page, paging.offset, (res) => {
          console.log(res.data);
          if (!res.data && res !== []) {
            setUnderFlow(true);
          }
          setPaging({ ...paging, page: paging.page + 1 });
          setReviews((prevReview) => [...prevReview, ...res.data]);
          setLoading(false);
        });
      } else if (show === "details" || classid !== "main") {
        APIs.getReviewsByClassId(classid, paging.page, paging.offset, (res) => {
          if (!res.data && res !== []) {
            setUnderFlow(true);
          }
          setPaging({ ...paging, page: paging.page + 1 });
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
    <Container name="top">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&display=swap"
        rel="stylesheet"
      />
      <GlobalStyles overflow={scroll} />
      <GoTopCustom goToTop={goToTop} href="#top">
        <GoToTop />
      </GoTopCustom>
      <Header />
      <SelectCustom
        name="major"
        autosize={false}
        options={classes}
        valueKey={"classId"}
        key={"classId"}
        placeholder={classSelected.label}
        onChange={handleSelected}
        ref={newEle}
      />
      <SubjectTitle enable={show}>{classSelected.label}</SubjectTitle>
      <ReviewForm
        enable={show}
        back={handleFormClosed}
        modal={setScroll}
        classId={classSelected.classId || classid}
      />
      <Details score={score} enable={show} />

      <LastReview>
        {show === "main" ? (
          <DetailTitle>รีวิวล่าสุด</DetailTitle>
        ) : show === "form" ? null : (
          <ReviewTitle>
            <DetailTitle>รีวิวทั้งหมด</DetailTitle>
            <ContainerBtns>
              <ButtonLastReview onClick={NavigateMain}>
                ดูรีวิวล่าสุด
              </ButtonLastReview>
              <Button onClick={handleNewReview}>รีวิววิชานี้</Button>
            </ContainerBtns>
          </ReviewTitle>
        )}
        <AdaptorReviews id="adaptor">
          {show === "form"
            ? null
            : reviews
            ? reviews.map(
                (review, index) =>
                  review && (
                    <ReviewCard key={index} modal={setScroll} typeShow={show}  back={handleCardDeleted} {...review} />
                  )
              )
            : null}
        </AdaptorReviews>
        {show !== "form" ? (
          (loading || loadMore) && !underflow ? (
            <>
              <ReviewSkeletonA />
              <ReviewSkeletonB />
              <ReviewSkeletonA />
            </>
          ) : (
            reviews &&
            !loading && (
              <ContainerNoMore>
                <NoMoreCustom>
                  <NoMore />
                </NoMoreCustom>
                {show === "details" ? (
                  <Button onClick={handleNewReview}>เพิ่มรีวิว</Button>
                ) : null}
              </ContainerNoMore>
            )
          )
        ) : null}
      </LastReview>
    </Container>
  );
};

export default App;

const GoTopCustom = styled.a`
  position: fixed;
  z-index: 2;
  right: 1.5rem;
  bottom: 2.5rem;
  cursor: pointer;
  transition: all 0.5s ease;
  -webkit-tap-highlight-color: transparent;

  ${(props) =>
    props.goToTop
      ? css`
          bottom: 2.5rem;
        `
      : css`
          bottom: -10rem;
        `}
`;
