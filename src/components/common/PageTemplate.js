import { h } from "preact";
import { route } from "preact-router";
import { useState, useEffect, useRef, useContext } from "preact/hooks";
import Select from "react-virtualized-select";
import styled, { css, withTheme } from "styled-components";

import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import "react-virtualized/styles.css";

import { GoToTop } from "../utility/Icons";
import { ModalContext } from "../../context/ModalContext";
import { ReviewFetcherContext } from "../../context/ReviewFetcherContext";
import { SelectContext } from "../../context/SelectContext";
import baseroute from "../utility/baseroute";
import GlobalComponent from "../utility/GlobalComponent";
import Header from "./Header";
import Helmet from "./Helmet";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 86rem;
  margin: 0 auto;
  position: relative;
`;

const SelectCustom = styled(Select)`
  width: 80%;
  max-width: 58rem;
  font-size: 1.45rem;

  .Select-placeholder {
    color: #888;
    height: 5.2rem;
  }

  &,
  &.is-open,
  &.is-focused,
  &.is-focused:not(.is-open) {
    .Select-control {
      background-color: ${(props) => props.theme.body};
    }
  }
  .Select-control {
    width: 100%;
    margin: 0 auto;
    border: 0.2rem solid ${(props) => props.theme.lightColor};
    border-radius: 10px;
  }

  .Select-input {
    width: 100%;
    font-size: 16px;
  }
  .Select-input > input {
    color: ${(props) => props.theme.bodyText};
  }

  .Select-menu-outer,
  .Select-option {
    background-color: ${(props) => props.theme.body};
  }
`;

const PageTemplate = ({
  classID,
  toggleTheme,
  children,
  isFormPage,
  classes,
  content,
}) => {
  const { state: selected, dispatch: dispatchSelected } = useContext(
    SelectContext
  );
  const { state: modal } = useContext(ModalContext);

  const newEle = useRef(null);
  const [isBottomViewport, setIsBottomViewport] = useState(false);
  const { handleFetchingReviewsAndClass } = useContext(ReviewFetcherContext);

  const handleSelected = (e) => {
    if (!isFormPage) {
      handleFetchingReviewsAndClass(e.classId);
      dispatchSelected({
        type: "selected",
        value: { label: e.label, classID: e.classId },
      });
    }

    route(`${baseroute}/${e.classId}`, true);
  };

  useEffect(() => {
    if (!classID && classes.length !== 0)
      dispatchSelected({
        type: "change_label",
        value: {
          label: "ค้นหาวิชาด้วยรหัสวิชา ชื่อวิชาภาษาไทย / ภาษาอังกฤษ",
        },
      });
  }, [classes]);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.addEventListener("scroll", () => {
        const checkBottomViewport =
          window.scrollY > window.innerHeight - 100 && !isBottomViewport;
        const checkTopViewport =
          window.scrollY <= window.innerHeight - 100 && isBottomViewport;

        if (checkBottomViewport) {
          setIsBottomViewport(true);
        } else if (checkTopViewport) {
          setIsBottomViewport(false);
        }
      });
  });

  return (
    <Container name="top">
      <Helmet content={content} />
      <GlobalComponent isOverflow={modal.showModal} />
      <GoTopCustomStyle isBottomViewport={isBottomViewport} href="#top">
        <GoToTop />
      </GoTopCustomStyle>

      <Header toggleTheme={toggleTheme} />
      <SelectCustom
        name="major"
        autosize={false}
        options={classes}
        valueKey={"classId"}
        key={"classId"}
        placeholder={selected.label}
        onChange={handleSelected}
        ref={newEle}
      />
      {children}
    </Container>
  );
};

export default withTheme(PageTemplate);

const GoTopCustomStyle = styled.a`
  position: fixed;
  z-index: 2;
  right: 2.5rem;
  bottom: 2.5rem;
  cursor: pointer;
  transition: all 0.5s ease;
  -webkit-tap-highlight-color: transparent;

  ${(props) =>
    props.isBottomViewport
      ? css`
          bottom: 2.5rem;
        `
      : css`
          bottom: -10rem;
        `}
`;
