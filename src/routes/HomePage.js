import { h } from "preact";
import { route } from "preact-router";
import { useContext, useState } from "preact/hooks";
import styled, { withTheme } from "styled-components";
import QuestionCard from "../components/async/QuestionCard";
import RecapCard from "../components/async/RecapCard";
import ReviewCard from "../components/async/ReviewCard";
import { AdaptorReviews, ContainerNoMore, LastReview, NoMoreCustom } from "../components/common/FetcherComponents";
import Footer from "../components/async/Footer";
import MenuUnderline from "../components/common/MenuUnderline";
import PageTemplate from "../components/common/PageTemplate";
import { ReviewSkeletonA, ReviewSkeletonB } from "../components/common/ReviewSkeleton";
import { getHelmet } from "../components/utility/helmet";
import { navigateToHomePage } from "../components/utility/helper";
import { NoCard, NoMoreCard } from "../components/utility/Icons";
import { FetcherContext, FetcherProvider } from "../context/FetcherContext";

const HomeTitle = styled.div`
	width: fit-content;
`;

const HomePage = (props) => {
	const { fetchTarget, setFetchTarget } = props;
	const { reviews, loading, underflow, loadMore, questions, recaps } = useContext(FetcherContext);

	const changeTab = (target) => {
		setFetchTarget(target);
		if (target !== "review") {
			if (typeof window !== "undefined") window.scrollTo(0, 0);
			route(`?display=${target}`);
		} else {
			navigateToHomePage();
		}
	};

	return (
		<PageTemplate content={getHelmet("HOME")} {...props}>
			<LastReview>
				<HomeTitle>
					<MenuUnderline fetchTarget={fetchTarget} changeTab={changeTab} currentRoute="HOME" />
				</HomeTitle>
				{fetchTarget === "review" ? (
					<AdaptorReviews id="adaptor">
						{reviews?.map(
							(review, index) =>
								review && <ReviewCard key={index} isBadge={true} currentRoute={"HOME"} {...review} />
						)}
					</AdaptorReviews>
				) : fetchTarget === "question" ? (
					<AdaptorReviews id="adaptor-question">
						{questions?.map(
							(question, index) =>
								question && (
									<QuestionCard
										isBadge={true}
										key={index}
										questionInfo={question}
										currentRoute="HOME"
									/>
								)
						)}
					</AdaptorReviews>
				) : (
					<AdaptorReviews id="adaptor-recap">
						{recaps?.map(
							(recap, index) =>
								recap && <RecapCard isBadge={true} key={index} recapInfo={recap} currentRoute="HOME" />
						)}
					</AdaptorReviews>
				)}
				{(loading || loadMore) && !underflow ? (
					<>
						<ReviewSkeletonA />
						<ReviewSkeletonB />
					</>
				) : fetchTarget === "review" ? (
					reviews &&
					!loading &&
					underflow && (
						<>
							<ContainerNoMore>
								<NoMoreCustom>
									{reviews.length > 0 ? (
										<>
											<span id="no-more">ไม่มีรีวิวเพิ่มเติม</span>
											<NoMoreCard />
										</>
									) : (
										<>
											<span>ไม่มีรีวิว</span>
											<NoCard />
										</>
									)}
								</NoMoreCustom>
							</ContainerNoMore>
							<Footer />
						</>
					)
				) : fetchTarget === "question" ? (
					questions &&
					!loading &&
					underflow && (
						<>
							<ContainerNoMore>
								<NoMoreCustom>
									{questions.length > 0 ? (
										<>
											<span id="no-more">ไม่มีคำถามเพิ่มเติม</span>
											<NoMoreCard />
										</>
									) : (
										<>
											<span>ไม่มีคำถาม</span>
											<NoCard />
										</>
									)}
								</NoMoreCustom>
							</ContainerNoMore>
							<Footer />
						</>
					)
				) : (
					recaps &&
					!loading &&
					underflow && (
						<>
							<ContainerNoMore>
								<NoMoreCustom>
									{recaps.length > 0 ? (
										<>
											<span id="no-more">ไม่มีสรุปเพิ่มเติม</span>
											<NoMoreCard />
										</>
									) : (
										<>
											<span>ไม่มีสรุป</span>
											<NoCard />
										</>
									)}
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
	const [fetchTarget, setFetchTarget] = useState(props.matches.display || "review");

	return (
		<FetcherProvider classID={classID} fetchTarget={fetchTarget}>
			<HomePage {...props} fetchTarget={fetchTarget} setFetchTarget={setFetchTarget} />
		</FetcherProvider>
	);
};

export default withTheme(Interface);
