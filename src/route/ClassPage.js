import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import styled, { withTheme } from "styled-components";

import { getHelmet } from "../components/utility/helmet";
import { NoMoreCard, NoCard } from "../components/utility/Icons";
import Footer from "../components/common/Footer";
import PageTemplate from "../components/common/PageTemplate";
import ReviewCard from "../components/common/ReviewCard";
import QuestionCard from "../components/common/QuestionCard";

import { ReviewSkeletonA, ReviewSkeletonB } from "../components/common/ReviewSkeleton";

import Details from "../components/common/Detail";
import {
	// navigateToHomePage,
	navigateToFormReviewPage,
	getClassName,
	getColorHash,
	getDetailFromLabel,
} from "../components/utility/helper";

import { SelectContext } from "../context/SelectContext";

import {
	AdaptorReviews,
	LastReview,
	ContainerNoMore,
	NoMoreCustom,
	SubjectTitle,
} from "../components/common/FetcherComponents";
import { PrimaryButton } from "../components/common/DesignSystemStyles";
import QuestionModal from "../components/common/QuestionModal";
import { FetcherContext, FetcherProvider } from "../context/FetcherContext";
import { route } from "preact-router";
import RecapCard from "../components/common/RecapCard";
import NavigationBar from "../components/common/NavigationBar";
import media from "styled-media-query";
import MenuUnderline from "../components/common/MenuUnderline";

const Button = styled.div`
	background-color: #2f80ed;
	color: #fff;
	padding: 0.3rem 1.8rem;
	border-radius: 0.4rem;
	font-size: 1.6rem;
	display: flex;
	align-items: center;
	cursor: pointer;
	white-space: nowrap;
`;

// const ButtonLastReview = styled(SecondaryButton)`
// 	margin-right: 1rem;
// 	box-shadow: inset 0 0 0 0.1rem ${(props) => props.theme.subText};
// 	padding: 0.2rem 1rem;
// 	align-self: unset;

// 	svg {
// 		path {
// 			stroke: ${(props) => props.theme.subText};
// 		}
// 	}

// 	&:hover {
// 		background: ${(props) => props.theme.lightBackground};
// 	}
// `;

const ContainerBtns = styled.div`
	margin: 0;
	display: flex;
	
	${media.lessThan('410px')`
		display: none;
	`}
`;

const ReviewTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 2.2rem;
`;

const ClassPage = (props) => {
	const { classID, fetchTarget, setFetchTarget } = props;
	const { state: selected } = useContext(SelectContext);
	const { reviews, score, loading, underflow, loadMore, setUnderFlow, questions, recaps } = useContext(FetcherContext);
	const [showQuestionModal, setQuestionModal] = useState(false);

	const handleNewReview = () => {
		navigateToFormReviewPage(classID);
		setUnderFlow(false);
	};

	const changeTab = (target) => {
		setFetchTarget(target);
		if (target !== "review") {
			route(`/${classID}?display=${target}`);
		} else {
			route(`/${classID}`);
		}
	};

	return (
		<PageTemplate content={getHelmet("CLASS", getDetailFromLabel(selected.label))} {...props}>
			<SubjectTitle color={getColorHash(classID)}>
				<span>{classID}</span>
				{selected.label === "ค้นหาวิชาด้วยรหัสวิชา ชื่อวิชาภาษาไทย / ภาษาอังกฤษ"
					? "กำลังโหลดข้อมูลวิชา..."
					: getClassName(selected.label)}
			</SubjectTitle>
			<Details score={score} />
			<LastReview>
				<ReviewTitle>
					<MenuUnderline fetchTarget={fetchTarget} changeTab={changeTab} />
					<ContainerBtns>
						{/* <ButtonLastReview onClick={navigateToHomePage}>
							<HomeIcon />
						</ButtonLastReview> */}
						{(fetchTarget === "review" || fetchTarget === "recap") ? (
							<Button onClick={handleNewReview}>รีวิววิชานี้</Button>
						) : (
							<Button onClick={() => setQuestionModal(true)}>ถามคำถาม</Button>
						)}
					</ContainerBtns>
				</ReviewTitle>
				{
					showQuestionModal && 
					<QuestionModal
						classID={classID}
						className={selected.label}
						showQuestionModal={showQuestionModal}
						setQuestionModal={setQuestionModal}
					/>
				}
				{fetchTarget === "review" ? (
					<AdaptorReviews id="adaptor">
						{reviews?.map(
							(review, index) =>
								review && <ReviewCard key={index} isBadge={false} currentRoute={"CLASS"} {...review} />
						)}
					</AdaptorReviews>
				) : fetchTarget === "question" ? (
					<AdaptorReviews id="adaptor-question">
						{questions?.map(
							(question, index) => question && <QuestionCard key={index} questionInfo={question} currentRoute="CLASS" />
						)}
					</AdaptorReviews>
				) : (
					<AdaptorReviews id="adaptor-recap">
						{recaps?.map(
							(recap, index) => recap && <RecapCard key={index} recapInfo={recap} currentRoute="CLASS" />
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
									{reviews.length > 0 ? 
										<>
											<span id="no-more">ไม่มีรีวิวเพิ่มเติม</span>
											<NoMoreCard /> 
										</> :
										<>
											<span>ไม่มีรีวิว</span>
											<NoCard />
										</>
									}
								</NoMoreCustom>
								<PrimaryButton onClick={handleNewReview}>เพิ่มรีวิว</PrimaryButton>
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
									{questions.length > 0 ? 
										<>
											<span id="no-more">ไม่มีคำถามเพิ่มเติม</span>
											<NoMoreCard /> 
										</>
										: 
										<>
											<span>ไม่มีคำถาม</span>
											<NoCard />
										</>
									}
								</NoMoreCustom>
								<PrimaryButton onClick={() => setQuestionModal(true)}>ถามคำถาม</PrimaryButton>
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
									{recaps.length > 0 ? 
										<>
											<span id="no-more">ไม่มีสรุปเพิ่มเติม</span>
											<NoMoreCard /> 
										</>
										: 
										<>
											<span>ไม่มีสรุป</span>
											<NoCard />
										</>
									}
								</NoMoreCustom>
								<PrimaryButton onClick={handleNewReview}>เพิ่มรีวิว</PrimaryButton>
							</ContainerNoMore>
							<Footer />
						</>
					)
				)}
			</LastReview>
			<NavigationBar tab={fetchTarget} classID={classID} askQuestion={() => setQuestionModal(true)} />
		</PageTemplate>
	);
};

const Interface = (props) => {
	const { classID } = props;
	const [fetchTarget, setFetchTarget] = useState(props.matches.display || "review");

	return (
		<FetcherProvider classID={classID} fetchTarget={fetchTarget}>
			<ClassPage {...props} fetchTarget={fetchTarget} setFetchTarget={setFetchTarget} />
		</FetcherProvider>
	);
};

export default withTheme(Interface);
