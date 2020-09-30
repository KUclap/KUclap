import { h } from "preact";
import { useContext } from "preact/hooks";
import { withTheme } from "styled-components";

import { NoMoreReview, NoReview } from "../components/utility/Icons";
import Footer from "../components/common/Footer";
import PageTemplate from "../components/common/PageTemplate";
import ReviewCard from "../components/common/ReviewCard";

import {
  ReviewSkeletonA,
  ReviewSkeletonB,
} from "../components/common/ReviewSkeleton";

import {
  ReviewFetcherContext,
  ReviewFetcherProvider,
} from "../context/ReviewFetcherContext";

import {
  DetailTitle,
  AdaptorReviews,
  LastReview,
  ContainerNoMore,
  NoMoreCustom,
} from "../components/common/FetcherComponents";

const HomePage = (props) => {
  const { reviews, loading, underflow, loadMore } = useContext(
    ReviewFetcherContext
  );

  return (
    <PageTemplate
      content={{
        title: `KUclap : เว็บไซต์ค้นหาและแบ่งปันรีวิววิชาบูรณาการ มก.`,
        description: `kuclap.com - แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`,
        image: "https://www.kuclap.com/assets/img/meta-og-image.png",
      }}
      {...props}
    >
      <LastReview>
        <DetailTitle>รีวิวล่าสุด</DetailTitle>
        <AdaptorReviews id="adaptor">
          {reviews
            ? reviews.map(
                (review, index) =>
                  review && (
                    <ReviewCard
                      key={index}
                      isBadge={true}
                      currentRoute={"HOME"}
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
      <HomePage {...props} />
    </ReviewFetcherProvider>
  );
};

export default withTheme(Interface);
