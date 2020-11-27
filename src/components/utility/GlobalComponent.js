import { h } from "preact";
import { useContext, useEffect, useState } from 'preact/hooks'
import { createGlobalStyle, withTheme } from "styled-components";
import { ModalContext } from "../../context/ModalContext";

const GlobalStyles = createGlobalStyle`

body {
  color: ${(props) => props.theme.bodyText || "#f5f5f5"};
  background: ${(props) => props.theme.body || "#191b1f"};
  overflow: ${(props) => (props.isOverflow === true ? "hidden" : "auto")};
} 
`;

const GlobalComponent = () => {
  const [mounted, setMounted] = useState(false)
  const { state: modal } = useContext(ModalContext);

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      { mounted && <GlobalStyles isOverflow={modal.showModal} /> } 
      {/* <GlobalStyles isOverflow={modal.showModal} />  */}
    </>
  );
};

export default withTheme(GlobalComponent);
