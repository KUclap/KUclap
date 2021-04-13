import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import styled, { css, withTheme } from "styled-components";

import { getHelmet } from "../components/utility/helmet";
import { NoMoreReview, NoReview, HomeIcon } from "../components/utility/Icons";
import Footer from "../components/common/Footer";
import PageTemplate from "../components/common/PageTemplate";
import ReviewCard from "../components/common/ReviewCard";
import QuestionCard from "../components/common/QuestionCard";

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
	DetailTitle,
	AdaptorReviews,
	LastReview,
	ContainerNoMore,
	NoMoreCustom,
	SubjectTitle,
} from "../components/common/FetcherComponents";
import { PrimaryButton, SecondaryButton } from "../components/common/DesignSystemStyles";
import QuestionModal from "../components/common/QuestionModal";
import { FetcherContext, FetcherProvider } from "../context/FetcherContext";
import { route } from "preact-router";

const Button = styled.div`
  background-color: #2f80ed;
  color: #fff;
  padding: 0.3rem 1.8rem;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const ButtonLastReview = styled(SecondaryButton)`
	margin-right: 1rem;
	box-shadow: inset 0 0 0 0.1rem ${props => props.theme.subText};
	padding: 0.2rem 1rem;
	align-self: unset;

	svg {
		path {
		stroke: ${props => props.theme.subText}
		}
	}

	&:hover {
		background: ${(props) => props.theme.lightBackground};
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

const TabTitle = styled(DetailTitle)`
	padding: 0 1rem;
    cursor: pointer;
	color: ${props => props.isActive ? props.theme.mainText : "#BFBFBF"};
`

const SectionTabButton = styled.div`
	position: relative;
`

const TabLine = styled.div`
  width: 100%;
  height: 3px;
  border-radius: 50px;
  background-color: ${props => props.theme.borderColor};
  position: absolute;
  
  &:last-child {
	background-color: #2f80ed;
	transition: all 0.3s ease-in-out;
	${props => props.underlineAt === "review" ? css`
		width: 10.4rem;
		left: 0;
	` : css`
		width: 12.6rem;
		left: 4.8rem;
	`}
  }
`

const ClassPage = (props) => {
  const { classID, fetchTarget, setFetchTarget } = props;
  const { state: selected } = useContext(SelectContext);
  const {
    reviews,
    score,
    loading,
    underflow,
    loadMore,
    setUnderFlow,
	questions
  } = useContext(FetcherContext)
  const [showQuestionModal, setQuestionModal] = useState(false)

  const handleNewReview = () => {
    navigateToFormReviewPage(classID)
    setUnderFlow(false);
  };

  const changeTab = (target) => {
	setFetchTarget(target)
	if (target !== "review") {
		route(`/${classID}?display=${target}`)
	} else {
		route(`/${classID}`)
	}
  }

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
			<SectionTabButton>
				<TabTitle as="button" isActive={fetchTarget === "review"} onClick={() => changeTab("review")}>
					{fetchTarget === "review" ? "รีวิวทั้งหมด" : "รีวิว"}
				</TabTitle>
				<TabTitle as="button" isActive={fetchTarget === "question"} onClick={() => changeTab("question")}>
					{fetchTarget === "question" ? "คำถามทั้งหมด" : "คำถาม"}
				</TabTitle>
				<TabLine />
				<TabLine underlineAt={fetchTarget} />
			</SectionTabButton>
			<ContainerBtns>
				<ButtonLastReview onClick={navigateToHomePage}>
				<HomeIcon  />
				</ButtonLastReview>
				{
					fetchTarget === "review" ?
					<Button onClick={handleNewReview}>รีวิววิชานี้</Button> 
					: <Button onClick={() => setQuestionModal(true)}>ถามคำถาม</Button>
				}
			</ContainerBtns>
        </ReviewTitle>
		<QuestionModal 
			classID={classID}
			className={selected.label}
			showQuestionModal={showQuestionModal}
			setQuestionModal={setQuestionModal}
		/>
		{ fetchTarget === "review" ?
			<AdaptorReviews id="adaptor">
				{reviews?.map(
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
				}
			</AdaptorReviews> :
			<AdaptorReviews id="adaptor-question">
				{questions?.map(
					(question, index) => 
						question && (
							<QuestionCard 
								key={index}
								questionInfo={question}
							/>
						)
					)
				}
			</AdaptorReviews>
		}
        {(loading || loadMore) && !underflow ? (
          <>
            <ReviewSkeletonA />
            <ReviewSkeletonB />
          </>
        ) : (fetchTarget === "review" ? (
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
        ) : (questions &&
			!loading &&
			underflow && (
			<>
				<ContainerNoMore>
				<NoMoreCustom>
					{questions.length > 0 ? <NoMoreReview /> : <NoReview />}
				</NoMoreCustom>
				<PrimaryButton onClick={handleNewReview}>ถามคำถาม</PrimaryButton>
				</ContainerNoMore>
				<Footer />
			</>
			)
		))}
      </LastReview>
    </PageTemplate>
  );
};

const Interface = (props) => {
	const { classID } = props;
	const [fetchTarget, setFetchTarget] = useState(props.matches.display || "review")

	return (
		<FetcherProvider classID={classID} fetchTarget={fetchTarget}>
			<ClassPage {...props} fetchTarget={fetchTarget} setFetchTarget={setFetchTarget} />
		</FetcherProvider>
	);
};

export default withTheme(Interface);
