import { h } from "preact";

import { withTheme, ThemeProvider } from "styled-components";

import { ModalProvider } from "../context/ModalContext";
import { SelectProvider } from "../context/SelectContext";

const AppProvider = ({ children, theme }) => {
  return (
    <ModalProvider>
      <SelectProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SelectProvider>
    </ModalProvider>
  );
};

export default withTheme(AppProvider);
