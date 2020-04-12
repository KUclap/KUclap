import { h } from "preact";
import { useState } from "preact/hooks";
import styled, { createGlobalStyle } from "styled-components";
import Select from "react-virtualized-select";
import "react-virtualized-select/styles.css";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import Header from "./common/Header";
import { data as data_mock_class } from "../assets/data/class";
// Code-splitting is automated for routes
// import Home from "../routes/home";
// import Profile from "../routes/profile";

const GlobalStyles = createGlobalStyle`
    html, body {
    font-size: 62.5%; /* 10px at html, body */
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: 'Kanit', arial, sans-serif;
    font-weight: 400;
  }

  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SelectCustom = styled(Select)`
  width: 80%;
  max-width: 58rem;
  font-size: 1.25rem;

  .Select-placeholder {
    color: #666;
  }

  .Select-control {
    width: 100%;
    margin: 0 auto;
  }

  .Select-input {
    width: 100%;
  }
`;

const App = () => {
  const [classSelected, setClassSelected] = useState(
    "ค้นหาวิชาด้วยรหัสวิชา ชื่อวิชาภาษาไทย / ภาษาอังกฤษ"
  );
  return (
    <Container>
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&display=swap"
        rel="stylesheet"
      />
      <GlobalStyles />
      <Header />
      <SelectCustom
        name="major"
        autosize={false}
        options={data_mock_class}
        value={classSelected}
        placeholder={classSelected}
        onChange={(e) => setClassSelected(e.label)}
      />
    </Container>
  );
};
export default App;
