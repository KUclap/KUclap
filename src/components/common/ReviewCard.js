import { useState, useEffect, useCallback } from "preact/hooks";
import styled from "styled-components";
import { Clap, Boo, RightArrow } from "../utillity/Icons";
import APIs from "../utillity/apis";
import CircularProgress from "@material-ui/core/CircularProgress";

const Container = styled.div`
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;
  margin: 2rem 0;
  padding: 1.6rem;
  min-width: 27.6rem;
  overflow: hidden;
`;

const Content = styled.p`
  padding: 0 1rem;
  font-size: 2rem;
  color: #4f4f4f;
  white-space: pre-line;
  overflow-wrap: break-word;
  margin: 0;
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 0.6rem;
`;

const DetailContainer = styled.div`
  font-size: 1.6rem;
  display: flex;
  color: #828282;
  justify-content: space-between;
  flex-direction: column;
  align-self: flex-end;
  text-align: right;
`;

const DetailRight = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  span {
    margin-left: 1ch;
  }
`;

const Button = styled.div`
  display: flex;
  width: ${(props) => (props.type === "report" ? "8rem" : "auto")};
  text-align: right;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  align-self: flex-end;
  outline: none;

  &:hover {
    color: #9ac1ee;
    svg {
      #clap {
        fill: #9ac1ee;
      }
      #boo {
        fill: #eea99a;
      }
      #arrow {
        fill: #9ac1ee;
        stroke: #9ac1ee;
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
  justify-content: space-between;
  width: 19.4rem;
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
  position: fixed;
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
  height: 3.9rem;
  border-radius: 0.6rem;
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;
  width: 12.2rem;
  margin: 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CancelButton = styled(ConfirmButton)`
  padding: 0.4rem 1.2rem;
  height: 3.9rem;
  font-size: 2rem;
  text-align: center;
  background-color: #bdbdbd;
`;

const Menu = styled.div`
  display: ${props => props.openMenu ? 'flex' : 'none'};
  background: white;
  position: absolute;
  flex-direction: column;
  text-align: center;
  border-radius: 8%;
  border: 0.2rem solid #e0e0e0;
  right: 0rem;
  transform: translate(-84%, 62%);
`

const MenuItem = styled.div`
  padding: 1rem;
  user-select: none;
  cursor: pointer;
  color: #4f4f4f;

  &:hover {
    background: hsl(212, 71%, 95%);
    color: #4f4f4f;
  }

  &:active {
    background: hsl(214, 84%, 90%);
    color: #4f4f4f;
  }
`

const Input = styled.input`
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;
  height: 3.4rem;
  width: 16rem;
  height: 4rem;
  margin-top: 1.2rem;
  align-self: flex-start;
  padding: 1.2rem 1.6rem;
  font-size: 16px;
  font-family: "Kanit", arial, sans-serif;

  &::placeholder {
    color: #bdbdbd;
  }
`;

const Warning = styled.div`
  /* display: ${props => props.match || !props.require ? 'none' : 'block'}; */
  color: #eb5757;
`

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
  const { reviewId, text, clap, boo, grade, author, createdAt, modal, back, typeShow } = props;
  const [clapAction, setClapAction] = useState(0);
  const [booAction, setBooAction] = useState(0);
  const [prevClapAction, setPrevClapAction] = useState(0);
  const [prevBooAction, setPrevBooAction] = useState(0);
  const [menu, setMenu] = useState(false);
  const defaultAuth = {
    value: '',
    isMatch: true,
    require: false,
  }
  const [auth, setAuth] = useState(defaultAuth);
  const [timeId, setTimeId] = useState({
    clap: null,
    boo: null,
  });
  const [isLoading, setIsLoading] = useState(false)
  const [showReport, setReport] = useState(false);
  const [showEdit, setEdit] = useState(false);
  const parseDate = (dateUTC) => {
    let date = dateUTC.split("-");
    let day = date[2].slice(0, 2);
    let month = months[parseInt(date[1]) - 1];
    let year = date[0];
    if (day[0] === "0") day = day[1];
    return day + " " + month + " " + year;
  };

  useEffect(() => {
    modal(showReport);
  }, [showReport]);

  const sendReport = () => {
    APIs.putReportReviewByReviewId(reviewId);
    setReport(false);
  };

  const closeEdit = () => {
    setEdit(false);
    setAuth(defaultAuth);
  }

  const deleteReview = () => {
    if (auth.value === "") setAuth({...auth, require: true})
    else {
      const newAuth = {...auth}
      const config = {
        reviewId: reviewId,
        auth: auth.value
      }
      newAuth.require = false;
      setIsLoading(true)
      APIs.deleteReviewByReviewId(config, (res) => {
        setIsLoading(false)
        if (res.data != undefined && 'result' in res.data) { 
          closeEdit()
          newAuth.isMatch = true
          back(typeShow)
        }
        else if ('error' in res) newAuth.isMatch = false;
        setAuth(newAuth)
      });
    }
  }

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

  const onInput = (e) => {
    const inputAuth = { ...auth }
    if (/^[0-9]*$/.test(e.target.value)) {
      inputAuth.value = e.target.value  
    }
    setAuth(inputAuth)
  }

  return (
    <Container>
      <Content> {text} </Content>
      <CardDetails>
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
        <DetailContainer>
          โดย {author}
          <DetailRight>
            เกรด {grade}
            <span>{parseDate(createdAt)}</span>
          </DetailRight>
          <Button type="report" tabIndex="0" onClick={() => setMenu(true)} onBlur={() => setMenu(false)}>
            เพิ่มเติม
            <RightArrow />
            <Menu openMenu={menu}>
              <MenuItem onClick={() => setReport(true)}>แจ้งลบ</MenuItem>
              <MenuItem onClick={() => setEdit(true)}>แก้ไข</MenuItem>
            </Menu>
          </Button> 
        </DetailContainer>
      </CardDetails>
      <ModalBackdrop show={showReport} onClick={() => setReport(false)} />
      <Modal show={showReport}>
        แจ้งลบรีวิวหรือไม่ ?
        <ModalActions>
          <CancelButton onClick={() => setReport(false)}>ยกเลิก</CancelButton>
          <ConfirmButton onClick={sendReport}>แจ้งลบ</ConfirmButton>
        </ModalActions>
      </Modal>
      <ModalBackdrop show={showEdit} onClick={() => setEdit(false)} />
      <Modal show={showEdit}>
        กรอกรหัสนิสิต 4 ตัวท้ายเพื่อแก้ไข
        <Warning>{ !auth.isMatch ? 'รหัสไม่ถูกต้อง' : '' || auth.require ?  'กรุณากรอกรหัส' : ''}</Warning>
        <Input
          type='text'
          placeholder="ใส่รหัส 4 หลัก"
          value={auth.value}
          onInput={onInput}
          maxLength={4}
        />
        <ModalActions>
          <CancelButton onClick={() => closeEdit()}>ย้อนกลับ</CancelButton>
          <ConfirmButton onClick={deleteReview}>{isLoading ? <CircularProgress color="white" size="3rem" />:"ลบรีวิว" }</ConfirmButton>
        </ModalActions>
      </Modal>
    </Container>
  );
};
export default ReviewCard;
