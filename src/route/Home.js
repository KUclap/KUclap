import { h, Fragment } from "preact";
import { route } from "preact-router";
import { useState, useEffect, useRef } from "preact/hooks";

import Select from "react-virtualized-select";
import styled, { css, withTheme } from "styled-components";

import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import "react-virtualized/styles.css";

import baseroute from "../baseroute";
import Footer from "../components/common/Footer";
import APIs from "../components/utillity/apis";
import Details from "../components/common/Detail";
import Header from "../components/common/Header";
import ReviewCard from "../components/common/ReviewCard";
import ReviewForm from "../components/common/ReviewForm";

import GlobalStyles from "../components/utillity/GlobalStyles";

import {
  ReviewSkeletonA,
  ReviewSkeletonB,
} from "../components/common/ReviewSkeleton";
import { GoToTop, NoMoreReview, NoReview } from "../components/utillity/Icons";
import ColorHash from "../components/utillity/ColorHash";

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

  &,
  &.is-open,
  &.is-focused,
  &.is-focused:not(.is-open) {
    .Select-control {
      background-color: ${(props) => props.theme.body};
    }
  }
  .Select-control {
    width: 100%;
    margin: 0 auto;
    border: 0.2rem solid ${(props) => props.theme.lightColor};
    border-radius: 10px;
  }

  .Select-input {
    width: 100%;
    font-size: 16px;
  }
  .Select-input > input {
    color: ${(props) => props.theme.bodyText};
  }

  .Select-menu-outer,
  .Select-option {
    background-color: ${(props) => props.theme.body};
  }
`;

const SubjectTitle = styled.p`
  font-size: 2.2rem;
  margin: 3rem 6.4rem;
  min-width: 86%;
  display: ${(props) => (props.enable !== "main" ? "block" : "none")};
  color: ${(props) => props.theme.mainText};
  font-weight: 600;
  line-height: 180%;

  span {
    background: ${(props) => props.color};
    color: white;
    padding: 0.1rem 1.4rem;
    border-radius: 0.6rem;
    margin-right: 1ch;
  }
`;

const DetailTitle = styled.p`
  font-size: 2rem;
  margin: 2rem 0;
  font-weight: 600;
  color: ${(props) =>
    props.desc ? props.theme.placeholderText : props.theme.mainText};
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
  background: ${(props) => props.theme.body};
  color: #979797;
  font-size: 1.7rem;
  margin-right: 1.5rem;
  &:hover {
    background: ${(props) => props.theme.lightColor2};
  }
`;

const ContainerBtns = styled.div`
  margin: 0;
  display: flex;
`;

const ContainerNoMore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.6rem 0;
  /* padding: 1.2rem 1.6rem; */
  min-width: 27.6rem;
  overflow: hidden;
`;

const NoMoreCustom = styled.div`
  margin: 2.9rem auto;
`;

const App = ({ classid, toggleTheme }) => {
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
    if (typeof window !== "undefined")
      window.location.href = "https://marsdev31.github.io/KUclap/";
  };

  const handleNewReview = () => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    setShow("form");
    setUnderFlow(false);
  };

  const handleFormClosed = (page) => {
    setPaging({ ...paging, page: 1 });
    setShow(page);
    handleFetchingReviewsAndClass(classid);
  };

  const handleCardDeleted = (showType) => {
    setShow(showType);
    setScroll(false);
    if (showType === "details") {
      setPaging({ ...paging, page: 1 });
      handleFetchingReviewsAndClass(classid);
    } else if (showType === "main") {
      setPaging({ ...paging, page: 0 });
      setReviews([]);
      setUnderFlow(false);
      setLoadMore(true);
    }
  };

  const handleSelected = (e) => {
    setPaging({ ...paging, page: 1 });
    setShow("details");
    handleFetchingReviewsAndClass(e.classId);
    setClassSelected({ label: e.label, classId: e.classId });
    route(`${baseroute}/?classid=${e.classId}`, true);
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
      setScore({
        homework: res.data.stats.homework,
        interest: res.data.stats.interest,
        how: res.data.stats.how,
      });
    });
  };

  const getClassName = (label) => {
    const labelSplit = label.split(" ");
    let labelName = label;
    if (labelSplit.length > 1) labelSplit.shift();
    labelName = labelSplit.join(" ");
    return labelName;
  };

  useEffect(() => {
    if (typeof window !== "undefined")
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
  };

  useEffect(() => {
    getFocusWithoutScrolling();
  }, [classSelected]);

  useEffect(() => {
    if (classid !== "main") {
      setShow("details");
      setClassSelected({ ...classSelected, classId: classid });
      APIs.getClassDetailByClassId(classid, (res) => {
        setClassSelected({
          classId: res.data.classId,
          label: res.data.label,
        });
        setScore({
          homework: res.data.stats.homework,
          interest: res.data.stats.interest,
          how: res.data.stats.how,
        });
      });
    }

    APIs.getAllClasses((res) => {
      setClasses(res.data);
      if (classid === "main") {
        setClassSelected({
          ...classSelected,
          label: "ค้นหาวิชาด้วยรหัสวิชา ชื่อวิชาภาษาไทย / ภาษาอังกฤษ",
        });
      }
    });

    const adaptor = document.getElementById("adaptor");
    if (typeof window !== "undefined")
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
      if (show === "main" && classid === "main") {
        APIs.getLastReviews(paging.page, paging.offset, (res) => {
          const { data } = res;
          // if (!data && res !== []) {
          if (!data) {
            setUnderFlow(true);
          } else {
            setPaging({ ...paging, page: paging.page + 1 });
            setReviews([...reviews, ...data]);
          }
          setLoading(false);
        });
      } else if (show === "details" || classid !== "main") {
        APIs.getReviewsByClassId(classid, paging.page, paging.offset, (res) => {
          const { data } = res;
          if (!data) {
            setUnderFlow(true);
          } else {
            setPaging({ ...paging, page: paging.page + 1 });
            setReviews([...reviews, ...data]);
          }
          setLoading(false);
        });
      }
    }
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    const adaptor = document.getElementById("adaptor");
    if (typeof window !== "undefined")
      if (adaptor.clientHeight <= window.innerHeight && adaptor.clientHeight) {
        setLoadMore(true);
      }
  }, [reviews]);

  return (
    <Container name="top">
      <link
        href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <GlobalStyles overflow={scroll} />
      <GoTopCustom goToTop={goToTop} href="#top">
        <GoToTop />
      </GoTopCustom>
      <Header toggleTheme={toggleTheme} />
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
      <SubjectTitle enable={show} color={ColorHash(classSelected.classId)}>
        <span>{classSelected.classId}</span>
        {getClassName(classSelected.label)}
      </SubjectTitle>
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
                หน้าแรก
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
                    <ReviewCard
                      key={index}
                      modal={setScroll}
                      typeShow={show}
                      back={handleCardDeleted}
                      {...classSelected}
                      {...review}
                    />
                  )
              )
            : null}
        </AdaptorReviews>
        {show !== "form" ? (
          (loading || loadMore) && !underflow ? (
            <Fragment>
              <ReviewSkeletonA />
              <ReviewSkeletonB />
            </Fragment>
          ) : (
            reviews &&
            !loading &&
            underflow && (
              <Fragment>
                <ContainerNoMore>
                  <NoMoreCustom>
                    {reviews.length > 0 ? <NoMoreReview /> : <NoReview />}
                  </NoMoreCustom>
                  {show === "details" ? (
                    <Button onClick={handleNewReview}>เพิ่มรีวิว</Button>
                  ) : null}
                </ContainerNoMore>
                <Footer />
              </Fragment>
            )
          )
        ) : null}
      </LastReview>
    </Container>
  );
};

export default withTheme(App);

const GoTopCustom = styled.a`
  position: fixed;
  z-index: 2;
  right: 2.5rem;
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
