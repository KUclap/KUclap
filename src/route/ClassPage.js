import { h } from "preact";
import { route } from "preact-router";
import { useContext } from "preact/hooks";
import styled, { withTheme } from "styled-components";

import { NoMoreReview, NoReview } from "../components/utility/Icons";
import baseroute from "../components/utility/baseroute";
import Footer from "../components/common/Footer";
import PageTemplate from "../components/common/PageTemplate";
import ReviewCard from "../components/common/ReviewCard";

import {
  ReviewSkeletonA,
  ReviewSkeletonB,
} from "../components/common/ReviewSkeleton";

import Details from "../components/common/Detail";
import {
  navigateToHome,
  getClassName,
  getColorHash,
  getDetailFromLabel,
} from "../components/utility/helper";

import { SelectContext } from "../context/SelectContext";
import {
  ReviewFetcherProvider,
  ReviewFetcherContext,
} from "../context/ReviewFetcherContext";

import {
  DetailTitle,
  AdaptorReviews,
  LastReview,
  ContainerNoMore,
  NoMoreCustom,
  SubjectTitle,
} from "../components/common/FetcherComponents";

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
  border: 0.2rem solid hsl(0, 0%, 46%);
  background: ${(props) => props.theme.body};
  color: hsl(0, 0%, 46%);;
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

const ReviewTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.8rem;
`;

const ClassPage = (props) => {
  const { classID } = props;
  const { state: selected } = useContext(SelectContext);
  const {
    reviews,
    score,
    loading,
    underflow,
    loadMore,
    setUnderFlow,
  } = useContext(ReviewFetcherContext);

  const handleNewReview = () => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    route(`${baseroute}/form/create/${classID}`, true);
    setUnderFlow(false);
  };

  return (
    <PageTemplate
      content={{
        title: `รีวิววิชา ${getDetailFromLabel(selected.label).nameTH} ${
          getDetailFromLabel(selected.label).nameEN
        } (${getDetailFromLabel(selected.label).classID}) มก. - KUclap`,
        description: `รีวิววิชา ${selected.label} - แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`,
        image: "https://www.kuclap.com/assets/img/meta-og-image.png",
      }}
      {...props}
    >
      <SubjectTitle color={getColorHash(classID)}>
        <span>{classID}</span>
        {selected.label === "ค้นหาวิชาด้วยรหัสวิชา ชื่อวิชาภาษาไทย / ภาษาอังกฤษ"
          ? "กำลังโหลดข้อมูลวิชา..."
          : getClassName(selected.label)}
      </SubjectTitle>
      <Details score={score} />
      <LastReview>
        <ReviewTitle>
          <DetailTitle>รีวิวทั้งหมด</DetailTitle>
          <ContainerBtns>
            <ButtonLastReview onClick={navigateToHome}>
              หน้าแรก
            </ButtonLastReview>
            <Button onClick={handleNewReview}>รีวิววิชานี้</Button>
          </ContainerBtns>
        </ReviewTitle>

        <AdaptorReviews id="adaptor">
          {reviews
            ? reviews.map(
                (review, index) =>
                  review && (
                    <ReviewCard
                      key={index}
                      isBadge={false}
                      currentRoute={"CLASS"}
                      {...review}
                    />
                  )
              )
            : null}
        </AdaptorReviews>
        {(loading || loadMore) && !underflow ? (
          <>
            <ReviewSkeletonA />
            <ReviewSkeletonB />
          </>
        ) : (
          reviews &&
          !loading &&
          underflow && (
            <>
              <ContainerNoMore>
                <NoMoreCustom>
                  {reviews.length > 0 ? <NoMoreReview /> : <NoReview />}
                </NoMoreCustom>
                <Button onClick={handleNewReview}>เพิ่มรีวิว</Button>
              </ContainerNoMore>
              <Footer />
            </>
          )
        )}
      </LastReview>
    </PageTemplate>
  );
};

const Interface = (props) => {
  const { classID } = props;
  return (
    <ReviewFetcherProvider classID={classID}>
      <ClassPage {...props} />
    </ReviewFetcherProvider>
  );
};

export default withTheme(Interface);
