import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import styled, { css, withTheme } from "styled-components";
import { Clap, Boo, RightArrow } from "../utillity/Icons";
import { pulse } from "../utillity/keyframs";
import APIs from "../utillity/apis";
import CircularProgress from "@material-ui/core/CircularProgress";
import ic_cancel_white from "../../assets/icons/ic_cancel_white.svg";
import ColorHash from '../utillity/ColorHash';

const Container = styled.div`
  border: 0.2rem solid ${(props) => props.theme.lightColor};
  border-radius: 1rem;
  margin: 3rem 0;
  padding: 1.6rem;
  min-width: 27.6rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Content = styled.p`
  padding: 0 1rem;
  font-size: 2rem;
  color: ${(props) => props.theme.mainText};
  white-space: pre-line;
  overflow-wrap: break-word;
  margin: 0;
  margin-top: ${(props) => (props.typeShow === "main" ? "1rem" : 0)};
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
  margin-left: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  span {
    margin-left: 1ch;
  }
`;

const Button = styled.div`
  display: flex;
  text-align: right;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  align-self: flex-end;
  outline: none;

  span {
    margin-right: 1ch;
  }

  &:hover {
    color: #9ac1ee;
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
    width: 3.8rem;
    font-size: 2rem;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 19rem;
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
  cursor: url(${ic_cancel_white}) 205 205, auto;
`;

const Modal = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  background-color: ${(props) => props.theme.body};
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
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CancelButton = styled(ConfirmButton)`
  padding: 0.4rem 1.2rem;
  height: 3.9rem;
  font-size: 2rem;
  text-align: center;
  background-color: ${(props) => props.theme.placeholderText};
`;

const NumberAction = styled.span`
  color: ${(props) => props.color || "black"};
  white-space: nowrap;
`;

const Menu = styled.div`
  display: ${(props) => (props.openMenu ? "flex" : "none")};
  background: ${(props) => props.theme.body};
  position: absolute;
  flex-direction: column;
  text-align: center;
  border-radius: 8%;
  border: 0.2rem solid ${(props) => props.theme.lightColor};
  right: 0rem;
  transform: translate(-84%, 62%);
`;

const MenuItem = styled.div`
  padding: 1rem;
  user-select: none;
  cursor: pointer;
  color: ${(props) => props.theme.mainText};

  &:hover {
    background: ${(props) => props.theme.menuItem.hover};
    color: ${(props) => props.theme.mainText};
  }

  &:active {
    background: ${(props) => props.theme.menuItem.active};
    color: ${(props) => props.theme.mainText};
  }
`;

const ReportField = styled.textarea`
  background-color: ${(props) => props.theme.body};
  border: 0.2rem solid ${(props) => props.theme.lightColor};
  border-radius: 1rem;
  padding: 1.2rem 1.6rem;
  height: 12rem;
  width: 30rem;
  font-size: 16px;
  font-family: "Kanit", arial, sans-serif;
  resize: none;
  margin-top: 1.6rem;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  color: ${(props) => props.theme.bodyText};
  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.body};
  border: 0.2rem solid ${(props) => props.theme.lightColor};
  border-radius: 1rem;
  height: 3.4rem;
  width: 18rem;
  height: 4rem;
  margin-top: 1.2rem;
  align-self: flex-start;
  padding: 1.2rem 1.6rem;
  font-size: 16px;
  font-family: "Kanit", arial, sans-serif;

  color: ${(props) => props.theme.bodyText};
  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }
`;

const Warning = styled.div`
  color: #eb5757;
`;

const Subject = styled.div`
  font-size: 1.6rem;
  padding: 0.2rem 1.6rem;
  margin-bottom: 0.8rem;
  margin-left: 0.8rem;
  border-radius: 0.6rem;
  text-align: center;
  background: ${(props) => props.color};
  color: white;
  position: absolute;
  transform: translateY(-3.2rem);
  cursor: pointer;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 49%;
  white-space: nowrap;
  filter: brightness(${(props) => props.theme.subjectBrightness}%);

  span {
    font-weight: 400;
    margin-left: 0.2rem;
  }
`;

const CircularProgressCustom = styled(CircularProgress)`
  && {
    color: white;
  }
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
  const {
    reviewId,
    text,
    clap,
    boo,
    grade,
    author,
    createdAt,
    modal,
    back,
    typeShow,
    classId,
    classNameTH,
    theme,
  } = props;
  const [clapActioning, setClapActioning] = useState(false);
  const [booActioning, setBooActioning] = useState(false);
  const [clapAni, setClapAni] = useState(false);
  const [booAni, setBooAni] = useState(false);
  const [clapAction, setClapAction] = useState(0);
  const [booAction, setBooAction] = useState(0);
  const [prevClapAction, setPrevClapAction] = useState(0);
  const [prevBooAction, setPrevBooAction] = useState(0);
  const [menu, setMenu] = useState(false);
  const defaultAuth = {
    value: "",
    isMatch: true,
    require: false,
  };
  const defaultReportReason = {
    reason: "",
    require: false,
  }
  const [auth, setAuth] = useState(defaultAuth);
  const [reportReason, setReportReason] = useState(defaultReportReason);
  const [clapTimeId, setClapTimeId] = useState(null);
  const [booTimeId, setBooTimeId] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showReportModal, setReportModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const parseDate = (dateUTC) => {
    let date = dateUTC.split("-");
    let day = date[2].slice(0, 2);
    let month = months[parseInt(date[1]) - 1];
    let year = date[0];
    if (day[0] === "0") day = day[1];
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    modal(showReportModal);
  }, [showReportModal]);

  useEffect(() => {
    modal(showEditModal);
  }, [showEditModal]);

  const sendReport = () => {
    if (reportReason.reason.length < 10) 
      setReportReason({...reportReason, require: true})
    else {
      const report = {
        reviewId,
        classId,
        text: reportReason.reason
      }
      setIsLoadingReport(true);
      APIs.createReportReview(report, () => {
        setIsLoadingReport(false);
        closeReportModal();
      });
    }
  };

  const closeReportModal = () => {
    setReportModal(false);
    setReportReason(defaultReportReason);
  }

  const closeEditModal = () => {
    setEditModal(false);
    setAuth(defaultAuth);
  };

  const deleteReview = () => {
    if (auth.value === "") setAuth({ ...auth, require: true });
    else {
      const newAuth = { ...auth };
      const config = {
        reviewId,
        auth: auth.value,
      };
      newAuth.require = false;
      setIsLoadingDelete(true);
      APIs.deleteReviewByReviewId(config, (res) => {
        setIsLoadingDelete(false);
        if (res.data != undefined && "result" in res.data) {
          closeEditModal();
          newAuth.isMatch = true;
          back(typeShow);
        } else if ("error" in res) newAuth.isMatch = false;
        setAuth(newAuth);
      });
    }
  };

  useEffect(() => {
    if (booAction !== 0 && !clapActioning) setActionByKey("boo");
  }, [booAction]);

  useEffect(() => {
    if (clapAction !== 0 && !booActioning) setActionByKey("clap");
  }, [clapAction]);

  const handleActionClick = (key) => {
    switch (key) {
      case "clap": {
        if (!clapActioning) {
          setClapAni(true);
          setClapAction(clapAction + 1);
        }
        break;
      }
      case "boo": {
        if (!booActioning) {
          setBooAni(true);
          setBooAction(booAction + 1);
        }
        break;
      }
    }
  };

  const setActionByKey = (action) => {
    switch (action) {
      case "clap": {
        if (clapTimeId !== null) clearTimeout(clapTimeId);
        const timer = () =>
          setTimeout(() => {
            setClapActioning(true);
            APIs.putClapReviewByReviewId(
              reviewId,
              clapAction - prevClapAction,
              () => {
                setClapActioning(false);
                setPrevClapAction(clapAction);
              }
            );
            setClapTimeId(null);
          }, 1500);
        const id = timer();
        setClapTimeId(id);
        break;
      }
      case "boo": {
        if (booTimeId !== null) clearTimeout(booTimeId);
        const timer = () =>
          setTimeout(() => {
            setBooActioning(true);
            APIs.putBooReviewByReviewId(
              reviewId,
              booAction - prevBooAction,
              () => {
                setBooActioning(false);
                setPrevBooAction(booAction);
              }
            );
            setBooTimeId(null);
          }, 1500);
        const id = timer();
        setBooTimeId(id);
        break;
      }
    }
    setTimeout(() => {
      setClapAni(false);
      setBooAni(false);
    }, 500);
  };

  const handleOnchangePassword = (e) => {
    const inputAuth = { ...auth };
    if (/^[0-9]*$/.test(e.target.value)) {
      inputAuth.value = e.target.value;
    }
    setAuth(inputAuth);
  };

  const handleOnchange = (e) => {
    let value = e.target.value;
    if (/^\s/.test(value)) {
      value = "";
    }
    setReportReason({...reportReason, reason: value});
  };

  const RedirctToClassName = () => {
    if (typeof window !== "undefined")
      window.location.href = `http://marsdev31.github.io/KUclap/?classid=${classId}`;
  };

  const numberFormat = (value) => {
    let newValue = value;
    if (value >= 1000) {
      value  /= 1000
      newValue = `${value.toFixed(1)}k`;
    }
    return newValue
  }

  return (
    <Container>
      {typeShow === "main" ? (
        <Subject color={ColorHash(classId)} onClick={RedirctToClassName}>
          {classId}
          <span> | {classNameTH}</span>
        </Subject>
      ) : (
        <></>
      )}
      <Content typeShow={typeShow}> {text} </Content>
      <CardDetails>
        <Actions>
          <ButtonContainer>
            <ButtonIcon
              type="clap"
              onClick={() => handleActionClick("clap")}
              valueAction={clapAction === prevClapAction}
              clapAni={clapAni}
            >
              <Clap bgColor={theme.body} />
            </ButtonIcon>
            {clapAction === prevClapAction ? (
              <span>{numberFormat(clapAction + clap)}</span>
            ) : (
              <NumberAction color="#2f80ed">
                {`+${clapAction - prevClapAction}`}
              </NumberAction>
            )}
          </ButtonContainer>
          <ButtonContainer>
            <ButtonIcon
              type="boo"
              onClick={() => handleActionClick("boo")}
              valueAction={booAction === prevBooAction}
              booAni={booAni}
            >
              <Boo bgColor={theme.body} />
            </ButtonIcon>
            {booAction === prevBooAction ? (
              <span>{numberFormat(booAction + boo)}</span>
            ) : (
              <NumberAction color="#eb5757">
                {`+${booAction - prevBooAction}`}
              </NumberAction>
            )}
          </ButtonContainer>
        </Actions>
        <DetailContainer>
          โดย {author}
          <DetailRight>
            เกรด {grade}
            <span>{parseDate(createdAt)}</span>
          </DetailRight>
          <ButtonIcon
            type="report"
            tabIndex="0"
            onClick={() => setMenu(true)}
            onBlur={() => setMenu(false)}
          >
            <span> เพิ่มเติม </span>
            <RightArrow />
            <Menu openMenu={menu}>
              <MenuItem onClick={() => setReportModal(true)}>แจ้งลบ</MenuItem>
              <MenuItem onClick={() => setEditModal(true)}>ลบรีวิว</MenuItem>
            </Menu>
          </ButtonIcon>
        </DetailContainer>
      </CardDetails>
      <ModalBackdrop
        show={showReportModal}
        onClick={closeReportModal}
      />
      <Modal show={showReportModal}>
        เหตุผลในการแจ้งลบ
        <Warning>
          {reportReason.require ? "กรุณากรอกเหตุผลอย่างน้อย 10 ตัวอักษร" : ""}
        </Warning>
        <ReportField
          placeholder="อย่างน้อย 10 ตัวอักษร"
          value={reportReason.reason}
          onChange={(e) => handleOnchange(e)}
        />
        <ModalActions>
          <CancelButton onClick={closeReportModal}>
            ยกเลิก
          </CancelButton>
          <ConfirmButton onClick={sendReport}>
            {isLoadingReport ? <CircularProgressCustom size="3rem" /> : "แจ้งลบ"}
          </ConfirmButton>
        </ModalActions>
      </Modal>
      <ModalBackdrop show={showEditModal} onClick={closeEditModal} />
      <Modal show={showEditModal}>
        กรอกตัวเลข 4 หลักของคุณเพื่อลบรีวิว
        <Warning>
          {!auth.isMatch
            ? "ตัวเลขไม่ถูกต้อง"
            : "" || auth.require
            ? "กรุณากรอกตัวเลข"
            : ""}
        </Warning>
        <Input
          type="text"
          placeholder="ใส่ตัวเลข 4 หลัก"
          value={auth.value}
          onInput={handleOnchangePassword}
          maxLength={4}
        />
        <ModalActions>
          <CancelButton onClick={closeEditModal}>ย้อนกลับ</CancelButton>
          <ConfirmButton onClick={deleteReview}>
            {isLoadingDelete ? <CircularProgressCustom size="3rem" /> : "ลบรีวิว"}
          </ConfirmButton>
        </ModalActions>
      </Modal>
    </Container>
  );
};
export default withTheme(ReviewCard);

const ButtonIcon = styled(Button)`
  -webkit-tap-highlight-color: transparent;

  &:before {
    content: "";
    width: 5.2rem;
    height: 5.2rem;
    border-radius: 50%;
    z-index: -1;
    display: inline-block;
    transition: 0.25s ease-in;
    position: absolute;
    ${(props) =>
      props.clapAni === true
        ? css`
            animation: ${pulse("rgba(36, 87, 156, 25%)")} 0.5s ease;
          `
        : props.booAni === true
        ? css`
            animation: ${pulse("rgba(173, 66, 16, 25%)")} 0.5s ease;
          `
        : null}
  }

  &:hover:before {
    width: 5.2rem;
    height: 5.2rem;
    transform: scale(1.1);
    background: ${(props) =>
      props.type === "clap"
        ? "rgba(47, 128, 237, 9%)"
        : props.type === "boo"
        ? "rgba(241, 191, 157, 9%)"
        : props.theme.solid};
  }

  svg {
    #bg {
      /* fill: ${(props) =>
        props.valueAction === false
          ? props.type === "clap"
            ? "#9ec7ff"
            : props.type === "boo"
            ? "rgba(191, 82, 31, 50%)"
            : "white"
          : "white"}; */
      transition: all 0.2s ease-in-out;
    }
    #clap {
      fill: ${(props) => (props.valueAction === false ? "#2f80ed" : null)};
    }
    #boo {
      fill: ${(props) => (props.valueAction === false ? "#eb5757" : null)};
    }
  }

  &:hover {
    svg {
      #clap {
        fill: ${(props) =>
          props.valueAction === false ? "#2f80ed" : "#9ac1ee"};
      }
      #boo {
        fill: ${(props) =>
          props.valueAction === false ? "#eb5757" : "#eea99a"};
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
