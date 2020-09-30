import { h } from "preact";
import { route } from "preact-router";
import { useContext, useState, useEffect } from "preact/hooks";
import styled, { withTheme } from "styled-components";

import { NoMoreReview } from "../components/utility/Icons";
import { ReviewSkeletonA } from "../components/common/ReviewSkeleton";
import APIs from "../components/utility/apis";
import baseroute from "../components/utility/baseroute";
import Details from "../components/common/Detail";
import Footer from "../components/common/Footer";
import PageTemplate from "../components/common/PageTemplate";
import ReviewCard from "../components/common/ReviewCard";

import {
  navigateToHome,
  getClassName,
  getColorHash,
  getDetailFromLabel,
} from "../components/utility/helper";

import { SelectContext } from "../context/SelectContext";
import { ReviewFetcherProvider } from "../context/ReviewFetcherContext";

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

const ReviewTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.8rem;
`;

const ReviewPage = (props) => {
  const { review, loading, isAvailable } = props;
  const { state: selected } = useContext(SelectContext);

  const handleNewReview = () => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    route(`${baseroute}/form/create/${review.classId}`, true);
    setUnderFlow(false);
  };

  return (
    <PageTemplate
      content={{
        title: `${
          isAvailable ? `${review.text} โดย ${review.author}` : "กำลังโหลดรีวิว"
        } - รีวิววิชา ${getDetailFromLabel(selected.label).nameTH} ${
          getDetailFromLabel(selected.label).nameEN
        } (${getDetailFromLabel(selected.label).classID}) มก. - KUclap`,
        description: `${
          isAvailable ? `${review.text} โดย ${review.author}` : "กำลังโหลดรีวิว"
        } - รีวิววิชา ${
          selected.label
        } - แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`,
        image: isAvailable
          ? `https://og-image.kuclap.com/${encodeURIComponent(
              review.text
            )}.png?classId=${review.classId}&classNameTH=${encodeURIComponent(
              review.classNameTH
            )}`
          : "https://kuclap.com/assets/img/meta-og-image.png",
        // format for generate og-image
        // https://og-image.kuclap.com/%E0%B8%7.png?classId=01371111&classNameTH=%E0
      }}
      isFormPage={true}
      classID={review.classId}
      {...props}
    >
      <SubjectTitle
        color={isAvailable ? getColorHash(review.classId) : "#9ac1ee"}
      >
        <span>{isAvailable ? review.classId : "000000"}</span>
        {loading
          ? "กำลังโหลดข้อมูลวิชา..."
          : isAvailable
          ? getClassName(selected.label)
          : "ไม่มีข้อมูลรีวิวในระบบ"}
      </SubjectTitle>
      <Details score={review.stats} />
      <LastReview>
        <ReviewTitle>
          <DetailTitle>รีวิวโดย {review.author}</DetailTitle>
          <ContainerBtns>
            <ButtonLastReview onClick={navigateToHome}>
              หน้าแรก
            </ButtonLastReview>
            <Button onClick={handleNewReview}>รีวิววิชานี้</Button>
          </ContainerBtns>
        </ReviewTitle>

        <AdaptorReviews id="adaptor"></AdaptorReviews>
        {loading ? (
          <ReviewSkeletonA />
        ) : isAvailable ? (
          <ReviewCard isBadge={false} currentRoute={"CLASS"} {...review} />
        ) : (
          <>
            <ContainerNoMore>
              <NoMoreCustom>
                <NoMoreReview />
              </NoMoreCustom>
            </ContainerNoMore>
          </>
        )}
        <Footer />
      </LastReview>
    </PageTemplate>
  );
};

const Interface = (props) => {
  const { reviewID } = props;
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const { dispatch: dispatchSelected } = useContext(SelectContext);

  useEffect(() => {
    setLoading(true);
    APIs.getReviewByReviewID(
      reviewID,
      (res) => {
        setLoading(false);
        setIsAvailable(true);
        APIs.getClassDetailByClassId(res.data.classId, (res) => {
          dispatchSelected({
            type: "selected",
            value: { label: res.data.label, classID: res.data.classId },
          });
        });
        setReview({
          ...res.data,
          stats: {
            homework: res.data.stats.homework * 20,
            how: res.data.stats.how * 20,
            interest: res.data.stats.interest * 20,
          },
        });
      },
      () => {
        setLoading(false);
        setIsAvailable(false);
      }
    );
  }, []);
  return (
    <ReviewFetcherProvider classID={review.classId}>
      <ReviewPage
        review={review}
        loading={loading}
        isAvailable={isAvailable}
        {...props}
      />
    </ReviewFetcherProvider>
  );
};

export default withTheme(Interface);
