import { h } from "preact";
import { useContext } from "preact/hooks";
import { withTheme } from "styled-components";

import { getHelmet } from "../components/utility/helmet";
import { NoMoreReview, NoReview } from "../components/utility/Icons";
import Footer from "../components/common/Footer";
import PageTemplate from "../components/common/PageTemplate";
import ReviewCard from "../components/common/ReviewCard";

import {
  ReviewSkeletonA,
  ReviewSkeletonB,
} from "../components/common/ReviewSkeleton";

import {
  DetailTitle,
  AdaptorReviews,
  LastReview,
  ContainerNoMore,
  NoMoreCustom,
} from "../components/common/FetcherComponents";
import { FetcherContext, FetcherProvider } from "../context/FetcherContext";

const HomePage = (props) => {
  const { reviews, loading, underflow, loadMore } = useContext(
    FetcherContext
  );

  return (
    <PageTemplate
      content={getHelmet("HOME")}
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
    <FetcherProvider classID={classID} fetchTarget="review">
      <HomePage {...props} />
    </FetcherProvider>
  );
};

export default withTheme(Interface);
