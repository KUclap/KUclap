import { h } from "preact";
import { useContext } from "preact/hooks";
import styled, { withTheme } from "styled-components";

import { getHelmet } from "../components/utility/helmet";
import { NoMoreReview, NoReview, HomeIcon } from "../components/utility/Icons";
import Footer from "../components/common/Footer";
import PageTemplate from "../components/common/PageTemplate";
import ReviewCard from "../components/common/ReviewCard";

import {
  ReviewSkeletonA,
  ReviewSkeletonB,
} from "../components/common/ReviewSkeleton";

import Details from "../components/common/Detail";
import {
  navigateToHomePage,
  navigateToFormReviewPage,
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
import { PrimaryButton, SecondaryButton } from "../components/common/DesignSystemStyles";

const ButtonLastReview = styled(SecondaryButton)`
	margin-right: 1rem;
  box-shadow: inset 0 0 0 0.1rem ${props => props.theme.placeholderText};
  padding: 0.2rem 1rem;
  align-self: unset;

  svg {
    path {
      stroke: ${props => props.theme.placeholderText}
    }
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
  margin-top: 2.2rem;
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
    navigateToFormReviewPage(classID)
    setUnderFlow(false);
  };

  return (
    <PageTemplate
      content={getHelmet("CLASS", getDetailFromLabel(selected.label))}
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
            <ButtonLastReview onClick={navigateToHomePage}>
              <HomeIcon  />
            </ButtonLastReview>
            <PrimaryButton onClick={handleNewReview}>รีวิววิชานี้</PrimaryButton>
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
                <PrimaryButton onClick={handleNewReview}>เพิ่มรีวิว</PrimaryButton>
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
