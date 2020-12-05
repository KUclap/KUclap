import styled from "styled-components";
import { Heading1 } from "./DesignSystemStyles"

const DetailTitle = styled(Heading1)`
  padding: ${(props) => (props.desc ? "0 1rem" : 0)};
  user-select: none;
`;

const AdaptorReviews = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const LastReview = styled.div`
  width: 86%;
  margin: 0 2.4rem;
`;

const ContainerNoMore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.6rem 0;
  min-width: 27.6rem;
  overflow: hidden;
`;

const NoMoreCustom = styled.div`
  margin: 2.9rem auto;
`;

const SubjectTitle = styled(Heading1)`
  margin: 0 6.4rem 1.5rem;
  min-width: 86%;
  color: ${(props) => props.theme.mainText};
  line-height: 180%;

  span {
    background: ${(props) => props.color};
    color: white;
    padding: 0.1rem 0.8rem;
    border-radius: 0.6rem;
    margin-right: 1ch;
    font-size: 1.6rem;
  }
`;

export {
  DetailTitle,
  AdaptorReviews,
  LastReview,
  ContainerNoMore,
  NoMoreCustom,
  SubjectTitle,
};
