import { h } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled, { css, withTheme } from "styled-components";

import { Clap, Boo, Share, Recap, DownArrow, GradeCircle } from "../utility/Icons";
import { getColorHash, navigateToClassPage, navigateToReviewPage } from "../utility/helper";
import { pulse } from "../utility/keyframs";
import { ReviewFetcherContext } from "../../context/ReviewFetcherContext";
import APIs from "../utility/apis";
import useEngage from "../../hooks/useEngage";
import { PrimaryButton, SecondaryButton, ModalActions, Input, BodyMedium, BodyTiny, TextArea, BodySmall } from "./DesignSystemStyles"
import Modal from './Modal'
import ShareModal from "./ShareModal";

const Container = styled.div`
  border: 0.2rem solid ${(props) => props.theme.lightColor};
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

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 0.5rem;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  text-align: right;
  margin-left: 0.3rem;
  width: 100%;
`;

const SubDetail = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0.5rem;
  justify-content: flex-end;
  position: relative;
  user-select: none;

  button {
    margin-left: 0.3rem;
  }
`;

const Grade = styled.div`
  margin-left: 0.3rem;
  display: flex;
  font-size: 1.2rem;
  position: relative;

  span {
    color: #2F80ED;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  svg {
    display: flex;
  }
`

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
    margin-left: 0.3rem;
    width: 2.5rem;
    font-size: 1.4rem;
  }
`;

const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0.4rem 0;
  align-items: center;
`;

const ConfirmButton = styled(PrimaryButton)`
  background-color: #eb5757;
  margin: 2rem 1.6rem 0;
`;

const CancelButton = styled(SecondaryButton)`
  margin: 2rem 1.6rem 0;
  color: ${(props) => props.theme.placeholderText};
  box-shadow: inset 0 0 0 0.1rem ${(props) => props.theme.placeholderText};
`;

const NumberAction = styled.span`
  color: ${(props) => props.color || "black"};
  white-space: nowrap;
`;

const MoreButton = styled(SecondaryButton)`
  border-radius: 15rem;
  border: 0.1rem solid ${(props) => props.theme.cardDetailsText};
  box-shadow: none;
  color: ${(props) => props.theme.cardDetailsText};
  padding: ${(props) => props.fullButton ? "0 0.3rem 0 0.8rem" : 0};
  font-weight: normal;
  font-size: inherit;
`

const Menu = styled.div`
  display: ${(props) => (props.openMenu ? "flex" : "none")};
  background: ${(props) => props.theme.body};
  position: absolute;
  flex-direction: column;
  text-align: center;
  border-radius: 0.4rem;
  border: 0.1rem solid ${(props) => props.theme.cardDetailsText};
  right: 0;
  top: 0;
  margin-top: 2.8rem;
  z-index: 1;
  color: ${(props) => props.theme.cardDetailsText};
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.1);
`;

const MenuContentContainer = styled.div`
  width: 12.7rem;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  margin: 0 0.7rem;
  padding: 1rem 0;
  border-bottom: 0.1rem solid ${(props) => props.theme.placeholderText};
  cursor: default;
` 

const MenuContent = styled.div`
  display: flex;
  justify-content: space-between;
  user-select: none;

  &:not(:first-child) {
    margin-top: 0.2rem;
  }

  span:last-child {
    color: #2F80ED;
  }
`

const MenuItem = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
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

const ReportField = styled(TextArea)`
  height: 12rem;
  width: 100%;
  max-width: 30rem;
  margin-top: 1.6rem;
`;

const Warning = styled.div`
  color: #EB5757;
`;

const Subject = styled(PrimaryButton)`
  font-size: 1.4rem;
  background: ${(props) => props.color};
  position: absolute;
  transform: translateY(-2.4rem);
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 60%;
  white-space: nowrap;
  filter: ${(props) => `${props.theme.subjectBrightness}%`};
  align-self: flex-start;

  ${BodySmall} {
    margin-left: 0.4ch;
  }
`;

const CircularProgressCustom = styled(CircularProgress)`
  && {
    color: white;
  }
`;

const ButtonWithIcon = styled(SecondaryButton)`
  border: 0.1rem solid ${(props) => props.theme.cardDetailsText};
  box-shadow: none;
  border-radius: 1.5rem;
  padding: 0 0.8rem;
  color: ${(props) => props.theme.cardDetailsText};
  font-weight: normal;
  font-size: inherit;

  svg {
    margin-left: 0.3rem;

    path {
      fill: ${(props) => props.theme.cardDetailsText};
    }
  }

  ${(props) => props.type === "share" && 
    css`
      border: 0.1rem solid ${(props) => props.theme.placeholderText};
      color: ${(props) => props.theme.placeholderText};
      height: fit-content;
      padding: 0.1rem 0.8rem;

      svg {
        height: 1.6rem;
        width: 1.6rem;

        path {
          fill: ${(props) => props.theme.placeholderText};
          stroke: ${(props) => props.theme.placeholderText};
        }
      }
    `
  }

  &:hover {
    color: #9ac1ee;
    border: 0.1rem solid #9ac1ee;

    svg > path {
      fill: #9ac1ee;
    }
  }
`;

const SectionLine = styled.div`
  height: 0.1rem;
  width: 100%;
  background-color: ${(props) => props.theme.lightColor};
  margin-top: 1rem;
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
    recap,
    createdAt,
    classId,
    classNameTH,
    isBadge,
    theme,
  } = props;

  const { handleCardDeleted } = useContext(ReviewFetcherContext);
  const {
    counter: clapCounter,
    prevCounter: prevClapCounter,
    animation: clapAnimation,
    handleActionClick: handleClapActionClick,
  } = useEngage(reviewId);

  const {
    counter: booCounter,
    prevCounter: prevBooCounter,
    animation: booAnimation,
    handleActionClick: handleBooActionClick,
  } = useEngage(reviewId, APIs.putBooReviewByReviewId);

  const [menu, setMenu] = useState(false);
  const defaultAuth = {
    value: "",
    isMatch: true,
    require: false,
  };
  const defaultReportReason = {
    reason: "",
    require: false,
  };
  const [auth, setAuth] = useState(defaultAuth);
  const [reportReason, setReportReason] = useState(defaultReportReason);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showReportModal, setReportModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [showShareModal, setShareModal] = useState(false);

  const parseDate = (dateUTC) => {
    if(dateUTC){
      let date = dateUTC.split("-");
      let day = date[2].slice(0, 2);
      let month = months[parseInt(date[1]) - 1];
      let year = date[0];
      if (day[0] === "0") day = day[1];
      return `${day} ${month} ${year}`;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined"){
      const moreButton = document.getElementById(`more-button-${reviewId}`);
      document.addEventListener('click', (event) => handleOnBlurNoreBtn(moreButton, event));
    }
  })

  const handleOnBlurNoreBtn = (btn, event) => {
    let isClickInside = btn.contains(event.target);
    if (!isClickInside) {
      setMenu(false)
    }
  }

  const sendReport = () => {
    if (reportReason.reason.length < 10)
      setReportReason({ ...reportReason, require: true });
    else {
      const report = {
        reviewId,
        classId,
        text: reportReason.reason,
      };
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
  };

  const closeEditModal = () => {
    setEditModal(false);
    setAuth(defaultAuth);
  };

  const closeShareModal = () => {
    setShareModal(false);
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
          // back(typeShow);
          handleCardDeleted(currentRoute, classId);
        } else if ("error" in res) newAuth.isMatch = false;
        setAuth(newAuth);
      });
    }
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
    setReportReason({ ...reportReason, reason: value });
  };

  const numberFormat = (value) => {
    let newValue = value;
    if (value >= 1000) {
      value /= 1000;
      newValue = `${value.toFixed(1)}k`;
    }
    return newValue;
  };

  const handleOpenRecapLink = () => {
    window.open(recap);
  }

  return (
    <Container>
      {isBadge && (
        <Subject color={getColorHash(classId)} onClick={() => navigateToClassPage(classId)}>
          {classId}
          <BodySmall> | {classNameTH}</BodySmall>
        </Subject>
      )}
      <Content isBadge={isBadge}> {text} </Content>
      <CardDetails>
        <DetailContainer>
          <SubDetail>
            <BodyTiny>
              โดย {author}
            </BodyTiny>
            <Grade><span>{grade}</span><GradeCircle /></Grade>
          </SubDetail>
          <SubDetail>
            {
              recap &&
              <ButtonWithIcon onClick={handleOpenRecapLink}>
                <BodyTiny>
                  ชีทสรุป
                </BodyTiny>
                <Recap />
              </ButtonWithIcon>
            }
            <MoreButton
              type="report"
              tabIndex="0"
              id={`more-button-${reviewId}`}
              onClick={() => setMenu(true)}
              fullButton={!recap}
            >
              {
                !recap && <BodyTiny>เพิ่มเติม</BodyTiny>
              }
              <DownArrow />
              <Menu openMenu={menu}>
                <MenuContentContainer>
                  {sec !== 0 && <MenuContent><span>หมู่เรียน (เซค)</span><span>{sec}</span></MenuContent>}
                  {semester !== 0 && <MenuContent><span>ภาคเรียน</span><span>{
                  {
                    1: "ต้น",
                    2: "ปลาย",
                    3: "ฤดูร้อน"
                  }[semester]
                  }</span></MenuContent>}
                  {year !== 0 && <MenuContent><span>ปีการศึกษา</span><span>{year}</span></MenuContent>}
                  {/* {recap && <MenuContent><span>สรุปถูกดาวน์โหลด</span><span>0</span></MenuContent>} */}
                  <MenuContent><span>รีวิวเมื่อ</span><span>{parseDate(createdAt)}</span></MenuContent>
                </MenuContentContainer>
                <MenuItem onClick={() => navigateToReviewPage(reviewId)}>ดูรีวิวนี้</MenuItem>
                <MenuItem onClick={() => setReportModal(true)}>แจ้งลบ</MenuItem>
                <MenuItem onClick={() => setEditModal(true)}>ลบรีวิว</MenuItem>
              </Menu>
            </MoreButton>
          </SubDetail>
        </DetailContainer>
        <SectionLine />
        <Actions>
          <ButtonContainer>
            <ButtonIcon
              type="clap"
              onClick={() => handleClapActionClick()}
              valueAction={clapCounter === prevClapCounter}
              clapAnimation={clapAnimation}
            >
              <Clap bgColor={theme.body} />
            </ButtonIcon>
            {clapCounter === prevClapCounter ? (
              <span>{numberFormat(clapCounter + clap)}</span>
            ) : (
              <NumberAction color="#2f80ed">
                {`+${clapCounter - prevClapCounter}`}
              </NumberAction>
            )}
          </ButtonContainer>
          <ButtonContainer>
            <ButtonIcon
              type="boo"
              onClick={() => handleBooActionClick("boo")}
              valueAction={booCounter === prevBooCounter}
              booAnimation={booAnimation}
            >
              <Boo bgColor={theme.body} />
            </ButtonIcon>
            {booCounter === prevBooCounter ? (
              <span>{numberFormat(booCounter + boo)}</span>
            ) : (
              <NumberAction color="#eb5757">
                {`+${booCounter - prevBooCounter}`}
              </NumberAction>
            )}
          </ButtonContainer>
          <ButtonWithIcon
            onClick={() => setShareModal(true)}
            type="share"
          >
            <BodyTiny>
              แชร์
            </BodyTiny>
            <Share />
          </ButtonWithIcon>
        </Actions>     
      </CardDetails>
      <Modal
        showModal={showReportModal}
        closeModal={closeReportModal}
      >
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
          <CancelButton onClick={closeReportModal}>ยกเลิก</CancelButton>
          <ConfirmButton onClick={sendReport}>
            {isLoadingReport ? (
              <CircularProgressCustom size="3rem" />
            ) : (
              "แจ้งลบ"
            )}
          </ConfirmButton>
        </ModalActions>
      </Modal>
      <Modal
        showModal={showEditModal}
        closeModal={closeEditModal}
      >
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
          <CancelButton onClick={closeEditModal}>ยกเลิก</CancelButton>
          <ConfirmButton onClick={deleteReview}>
            {isLoadingDelete ? (
              <CircularProgressCustom size="3rem" />
            ) : (
              "ลบรีวิว"
            )}
          </ConfirmButton>
        </ModalActions>
      </Modal>
      <ShareModal 
        showShareModal={showShareModal}
        closeShareModal={closeShareModal}
      />
    </Container>
  );
};
export default withTheme(ReviewCard);

const ButtonIcon = styled(Button)`
  -webkit-tap-highlight-color: transparent;

  &:before {
    content: "";
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    z-index: -1;
    display: inline-block;
    transition: 0.25s ease-in;
    position: absolute;
    ${(props) =>
      props.clapAnimation === true
        ? css`
            animation: ${pulse("rgba(36, 87, 156, 25%)")} 0.5s ease;
          `
        : props.booAnimation === true
        ? css`
            animation: ${pulse("rgba(173, 66, 16, 25%)")} 0.5s ease;
          `
        : null}
  }

  &:hover:before {
    width: 3rem;
    height: 3rem;
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
