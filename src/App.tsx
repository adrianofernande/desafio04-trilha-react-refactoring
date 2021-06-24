import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

import GlobalStyle from "./styles/global";
import { MenuProvider } from "./hooks/useMenu";

const App = () => (
  <>
    <MenuProvider>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </MenuProvider>
  </>
);

export default App;
