import { h } from "preact";
import { useState, useEffect} from 'preact/hooks'
import { ThemeProvider } from "styled-components";

import { ModalProvider } from "../context/ModalContext";
import { SelectProvider } from "../context/SelectContext";

const AppProvider = ({ children, theme }) => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const app = 
    <ModalProvider>
      <SelectProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SelectProvider>
    </ModalProvider>
  
  if(!mounted){
    return <div style={{visibility: 'hidden'}}>{app}</div>
  }

  return app
};

export default AppProvider;
