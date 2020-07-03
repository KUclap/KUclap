import styled from "styled-components";

const DetailTitle = styled.p`
  font-size: 2rem;
  margin: 2rem 0;
  font-weight: 600;
  color: ${(props) =>
    props.desc ? props.theme.placeholderText : props.theme.mainText};
  padding: ${(props) => (props.desc ? "0 1rem" : 0)};
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

const SubjectTitle = styled.h1`
  font-size: 2.2rem;
  margin: 3rem 6.4rem;
  min-width: 86%;
  color: ${(props) => props.theme.mainText};
  font-weight: 600;
  line-height: 180%;

  span {
    background: ${(props) => props.color};
    color: white;
    padding: 0.1rem 1.4rem;
    border-radius: 0.6rem;
    margin-right: 1ch;
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
