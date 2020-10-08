import { h } from "preact";
import { route } from "preact-router";
import { useState, useEffect, useContext } from "preact/hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled, { css, withTheme } from "styled-components";

import { Clap, Boo, RightArrow, Share, Facebook, Twitter, Line, CopyLink } from "../utility/Icons";
import { getColorHash } from "../utility/helper";
import { ModalContext } from "../../context/ModalContext";
import { pulse } from "../utility/keyframs";
import { ReviewFetcherContext } from "../../context/ReviewFetcherContext";
import APIs from "../utility/apis";
import baseroute from "../utility/baseroute";
import useEngage from "../../hooks/useEngage";
import media from "styled-media-query";

import ic_cancel_white from "../../assets/icons/ic_cancel_white.svg";

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
  margin-top: ${(props) => (props.isBadge === true ? "1rem" : 0)};
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 0.7rem;
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

const SubDetail = styled.div`
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
  border: ${(props) =>
    props.theme.name === "dark" ? `0.3rem solid ${props.theme.lightColor}` : 0};
  border-radius: 10px;
  background-color: ${(props) => props.theme.body};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: ${(props) => props.type === "ShareModal" ? '0 1.2rem 2.8rem' : '2.8rem 1.2rem'};
  font-weight: 500;
  font-size: 2rem;
  line-height: 3.4rem;
  text-align: center;
  display: ${(props) => (props.show === true ? "block" : "none")};
  z-index: 1;
  max-width: 42rem;
  width: 84%;

  ${(props) => props.type === "ShareModal" ? 
    css`
      padding: 0 1.2rem 2.8rem;

      ${media.lessThan("medium") `
        top: auto;
        bottom: 0;
        transform: translate(-50%, 0);
        width: 100%;
        max-width: 100%;
        border-radius: 22px 22px 0px 0px;
        padding: 0;
        height: fit-content;
      `}
    ` : null 
    }
  `

const ModalHeader = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 1.4rem 0;
  border-bottom: 0.3rem solid ${(props) => props.theme.lightColor};
  color: ${(props) => props.theme.mainText};

  svg {
    width: 4.1rem;
    height: 4.1rem;
    margin-left: 0.6rem;

    path {
      fill: ${(props) => props.theme.mainText};
      stroke: ${(props) => props.theme.mainText};
    }
  }
`

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

const Subject = styled.h1`
  font-size: 1.6rem;
  padding: 0.2rem 1.6rem;
  margin: 0 0 0.8rem 0.8rem;
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

const ShareButton = styled.div `
  display: flex;
  align-items: center;
  border: 0.1rem solid ${(props) => props.theme.placeholderText};
  border-radius: 1.5rem;
  padding: 0 0.8rem;
  cursor: pointer;

  svg {
    margin-left: 0.3rem;
  }

  &:hover {
    color: #9ac1ee;
    border: 0.1rem solid #9ac1ee;

    svg > path {
      fill: #9ac1ee;
    }
  }
`;

const ShareSelect = styled.div`
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 3.2rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.lightColor};
  cursor: pointer;
  user-select: none;
  color: ${(props) => props.isCopied ? 'hsl(145, 63%, 42%)' : props.theme.mainText};

  svg {
    margin-right: 2.6rem;

    path {
      fill: ${(props) => props.isCopied ? 'hsl(145, 63%, 42%)' : props.theme.mainText};
    }
  }

  &:hover {
    background-color: ${(props) => props.theme.menuItem.hover};
  } 

  &:active {
    background-color: ${(props) => props.theme.menuItem.active};
  }
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
    createdAt,
    classId,
    classNameTH,
    isBadge,
    theme,
  } = props;

  const { dispatch: dispatchShowModal } = useContext(ModalContext);
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
  const [isCopied, setIsCopied] = useState(false);
  const parseDate = (dateUTC) => {
    let date = dateUTC.split("-");
    let day = date[2].slice(0, 2);
    let month = months[parseInt(date[1]) - 1];
    let year = date[0];
    if (day[0] === "0") day = day[1];
    return `${day} ${month} ${year}`;
  };

  // useEffect(() => {
  //   window.fbAsyncInit = function() {
  //     FB.init({
  //       appId      : '784451072347559',
  //       xfbml      : true,
  //       version    : 'v8.0'
  //     });
  //     FB.AppEvents.logPageView();
  //   };

  //   (function(d, s, id){
  //     let js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {return;}
  //     js = d.createElement(s); js.id = id;
  //     js.src = "https://connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));
  // }, [])

  useEffect(() => {
    // modal(showReportModal);
    dispatchShowModal({ type: "setter", value: showReportModal });
  }, [showReportModal]);

  useEffect(() => {
    // modal(showEditModal);
    dispatchShowModal({ type: "setter", value: showEditModal });
  }, [showEditModal]);

  useEffect(() => {
    // modal(showShareModal);
    dispatchShowModal({ type: "setter", value: showShareModal });
  }, [showShareModal]);

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

  const RedirctToClassName = () => {
    route(`${baseroute}/${classId}`, true);
  };

  const numberFormat = (value) => {
    let newValue = value;
    if (value >= 1000) {
      value /= 1000;
      newValue = `${value.toFixed(1)}k`;
    }
    return newValue;
  };

  const shareReview = (type) => {
    const href = `https://kuclap.com/review/${reviewId}`
    let url;
    switch(type) {
      case 'facebook':
        {
          const appId = '784451072347559';
          url = `https://www.facebook.com/dialog/share?app_id=${appId}&href=${href}&display=page`;
          window.open(url)
          break;
        }
      case 'twitter':
        {
          const tweetText = `รีวิววิชา ${classNameTH} (${classId}) #KUclap ${href}`
          const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
          window.open(url)
          break;
        }
      case 'line':
        {
          const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(href)}`
          window.open(url)
          break;
        }
      default:
        {
          const tmpTextArea = document.createElement('textarea');
          tmpTextArea.value = href;
          document.body.appendChild(tmpTextArea);
          tmpTextArea.select()
          document.execCommand("copy")
          document.body.removeChild(tmpTextArea);
          setIsCopied(true)
          setTimeout(() => {
            setIsCopied(false)
          }, 2000);
        }
    }
  }

  return (
    <Container>
      {isBadge && (
        <Subject color={getColorHash(classId)} onClick={RedirctToClassName}>
          {classId}
          <span> | {classNameTH}</span>
        </Subject>
      )}
      <Content isBadge={isBadge}> {text} </Content>
      <CardDetails>
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
        </Actions>
        <DetailContainer>
          โดย {author}
          <SubDetail>
            เกรด {grade}
            <span>{parseDate(createdAt)}</span>
          </SubDetail>
          <SubDetail>
            <ShareButton
              onClick={() => setShareModal(true)}
            >
              แชร์
              <Share />
            </ShareButton>
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
          </SubDetail>
        </DetailContainer>
      </CardDetails>
      <ModalBackdrop show={showReportModal} onClick={closeReportModal} />
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
            {isLoadingDelete ? (
              <CircularProgressCustom size="3rem" />
            ) : (
              "ลบรีวิว"
            )}
          </ConfirmButton>
        </ModalActions>
      </Modal>
      <ModalBackdrop show={showShareModal} onClick={closeShareModal} />
      <Modal show={showShareModal} type='ShareModal'>
        <ModalHeader>
          แบ่งปันรีวิว 
          <Share />
        </ModalHeader>
        <ShareSelect onClick={() => shareReview("facebook")}  >
          <Facebook />
          Facebook
        </ShareSelect>
        <ShareSelect onClick={() => shareReview("twitter")}>
          <Twitter />
          Twitter
        </ShareSelect>
        <ShareSelect onClick={() => shareReview("line")}>
          <Line />
          LINE
        </ShareSelect>
        <ShareSelect isCopied={isCopied} onClick={shareReview}>
          <CopyLink />
          {isCopied ? 'คัดลอกเรียบร้อย!' : 'คัดลอกลิงก์'}
        </ShareSelect>
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
