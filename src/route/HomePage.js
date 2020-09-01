import { h, Fragment } from "preact";
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
    <Fragment>
      <PageTemplate
        content={{
          title: `KUclap : เว็บไซต์ค้นหาและแบ่งปันรีวิววิชาบูรณาการ มก.`,
          description: `kuclap.com - แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`,
          image: "https://kuclap.com/assets/img/meta-og-image.png",
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
                </ContainerNoMore>
                <Footer />
              </Fragment>
            )
          )}
        </LastReview>
      </PageTemplate>
    </Fragment>
  );
};

const Interface = (props) => {
  const { classID } = props;
  return (
    <Fragment>
      <ReviewFetcherProvider classID={classID}>
        <HomePage {...props} />
      </ReviewFetcherProvider>
    </Fragment>
  );
};

export default withTheme(Interface);
