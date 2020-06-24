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
    <>
      <PageTemplate {...props}>
        <LastReview>
          <DetailTitle>รีวิวล่าสุด</DetailTitle>
          <AdaptorReviews id="adaptor">
            {reviews
              ? reviews.map(
                  (review, index) =>
                    review && (
                      <ReviewCard key={index} isBadge={true} {...review} />
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
    </>
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
