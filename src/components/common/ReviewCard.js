import styled from "styled-components";
import { Clap, Boo } from "../utillity/Icons";
import { useState, useEffect } from "preact/hooks";
import APIs from "../utillity/apis";

const Container = styled.div`
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;
  margin: 2rem 0;
  padding: 1.2rem 1.6rem;
  min-width: 27.6rem;
  overflow: hidden;
`;

const Content = styled.div`
  font-size: 2rem;
  color: #4f4f4f;
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const DetailContainer = styled.div`
  font-size: 1.6rem;
  display: flex;
  color: #828282;
  margin-top: 0.8rem;
  justify-content: space-between;
  flex-direction: column;
  align-self: center;
`;

const DetailRight = styled.div`
  display: flex;
  width: 16rem;
  white-space: nowrap;
  justify-content: space-between;
  span {
    margin-left: 1ch;
  }
`;

const Button = styled.div`
  display: flex;
  width: ${(props) => (props.type === "report" ? "6rem" : "auto")};
  text-align: right;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;

  &:hover {
    color: #9ac1ee;
    svg {
      #clap {
        fill: #9ac1ee;
      }
      #boo {
        fill: #eea99a;
      }
    }
  }

  &:active {
    svg {
      #clap {
        fill: #2f80ed;
      }
      #boo {
        fill: #eb5757;
      }
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #bdbdbd;
  margin-left: 1.4rem;

  span {
    user-select: none;
    margin-left: 0.6rem;
    width: 2.6rem;
    font-size: 2rem;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: hsla(10, 10%, 10%, 50%);
  display: ${(props) => (props.show === true ? "block" : "none")};
  z-index: 1;
  cursor: pointer;
`;

const Modal = styled.div`
  border-radius: 10px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2.8rem 1.2rem;
  font-weight: 500;
  font-size: 2rem;
  line-height: 3.4rem;
  text-align: center;
  display: ${(props) => (props.show === true ? "block" : "none")};
  z-index: 1;
  max-width: 42rem;
  width: 84%;
`;

const ModalActions = styled.div`
  align-self: center;
  padding: 1.4rem 0 0;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
`;

const ConfirmButton = styled.div`
  background-color: #eb5757;
  align-self: center;
  color: #fff;
  padding: 0.4rem 2.4rem;
  border-radius: 0.6rem;
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;
  width: 12.2rem;
  margin: 1rem 1rem;
`;

const CancelButton = styled(ConfirmButton)`
  padding: 0.4rem 1.2rem;
  font-size: 2rem;
  text-align: center;
  background-color: #bdbdbd;
`;

const months = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

const ReviewCard = (props) => {
  const { reviewId, text, clap, boo, grade, author, createdAt, modal } = props;
  const [clapAction, setClapAction] = useState(0);
  const [booAction, setBooAction] = useState(0);
  const [prevClapAction, setPrevClapAction] = useState(0);
  const [prevBooAction, setPrevBooAction] = useState(0);
  const [timeId, setTimeId] = useState({
    clap: null,
    boo: null,
  });

  const [showDialog, setDialog] = useState(false);
  const parseDate = (dateUTC) => {
    let date = dateUTC.split("-");
    let day = date[2].slice(0, 2);
    let month = months[parseInt(date[1]) - 1];
    let year = date[0];
    if (day[0] === "0") day = day[1];
    return day + " " + month + " " + year;
  };

  useEffect(() => {
    modal(showDialog);
  }, [showDialog]);

  const sendReport = () => {
    APIs.putReportReviewByReviewId(reviewId);
    setDialog(false);
  };

  useEffect(() => {
    if (booAction !== 0) setActionByKey("boo");
  }, [booAction]);

  useEffect(() => {
    if (clapAction !== 0) setActionByKey("clap");
  }, [clapAction]);

  const setActionByKey = (action) => {
    if (timeId[action] !== null) {
      clearTimeout(timeId[action]);
    }
    const timer = () =>
      setTimeout(() => {
        switch (action) {
          case "clap": {
            APIs.putClapReviewByReviewId(
              reviewId,
              clapAction - prevClapAction,
              () => {
                setPrevClapAction(clapAction);
              }
            );
            break;
          }
          case "boo": {
            APIs.putBooReviewByReviewId(
              reviewId,
              booAction - prevBooAction,
              () => {
                setPrevBooAction(booAction);
              }
            );
            break;
          }
        }
        setTimeId({ ...timeId, [action]: null });
      }, 2500);
    const id = timer();
    setTimeId({ ...timeId, [action]: id });
  };

  return (
    <Container>
      <Content> {text} </Content>
      <CardDetails>
        <DetailContainer>
          โดย {author}
          <DetailRight>
            เกรด {grade}
            <span>{parseDate(createdAt)}</span>
          </DetailRight>
          <Button type="report" onClick={() => setDialog(true)}>
            Report
          </Button>
        </DetailContainer>
        <Actions>
          <ButtonContainer>
            <Button onClick={() => setClapAction(clapAction + 1)}>
              <Clap />
            </Button>
            <span>{clapAction + clap}</span>
          </ButtonContainer>
          <ButtonContainer>
            <Button onClick={() => setBooAction(booAction + 1)}>
              <Boo />
            </Button>
            <span>{booAction + boo}</span>
          </ButtonContainer>
        </Actions>
      </CardDetails>
      <ModalBackdrop show={showDialog} onClick={() => setDialog(false)} />
      <Modal show={showDialog}>
        แจ้งลบรีวิวหรือไม่ ?
        <ModalActions>
          <CancelButton onClick={() => setDialog(false)}>ยกเลิก</CancelButton>
          <ConfirmButton onClick={sendReport}>แจ้งลบ</ConfirmButton>
        </ModalActions>
      </Modal>
    </Container>
  );
};
export default ReviewCard;
