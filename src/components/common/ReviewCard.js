import { h } from "preact";
import styled, { withTheme } from "styled-components";

import APIs from "../utility/apis";
import { getColorHash, navigateToClassPage } from "../utility/helper";
import CardActions from "./CardActions";
import CardDetails from "./CardDetails";
import { BodyMedium, BodySmall, Subject } from "./DesignSystemStyles";

const Container = styled.div`
	border: 0.2rem solid ${(props) => props.theme.borderColor};
	border-radius: 1rem;
	margin: 3rem 0;
	padding: 1rem 1.6rem 0.3rem;
	display: flex;
	flex-direction: column;
`;

const Content = styled(BodyMedium)`
	white-space: pre-line;
	overflow-wrap: break-word;
	margin-top: ${(props) => (props.isBadge === true ? "1.1rem" : 0)};
`;

const CardDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
	margin-top: 0.5rem;
`;

const SectionLine = styled.div`
	height: 0.1rem;
	width: 100%;
	background-color: ${(props) => props.theme.borderColor};
	margin-top: 1rem;
`;

const ReviewCard = (props) => {
	const {
		currentRoute,
		reviewId,
		text,
		clap,
		boo,
		grade,
		author,
		sec,
		semester,
		year,
		recapId,
		createdAt,
		classId,
		classNameTH,
		isBadge,
		theme,
	} = props;

	return (
		<Container>
			{isBadge && (
				<Subject color={getColorHash(classId)} onClick={() => navigateToClassPage(classId)}>
					{classId}
					<BodySmall as="span"> | {classNameTH}</BodySmall>
				</Subject>
			)}
			<Content isBadge={isBadge}> {text} </Content>
			<CardDetailsContainer>
				<CardDetails
					currentRoute={currentRoute}
					reviewId={reviewId}
					classId={classId}
					grade={grade}
					author={author}
					sec={sec}
					semester={semester}
					year={year}
					recapId={recapId}
					createdAt={createdAt}
				/>
				<SectionLine />
				<CardActions
					clap={clap}
					boo={boo}
					classNameTH={classNameTH}
					classId={classId}
					reviewId={reviewId}
					updateBoo={APIs.putBooReviewByReviewId}
					theme={theme}
				/>
			</CardDetailsContainer>
		</Container>
	);
};
export default withTheme(ReviewCard);
