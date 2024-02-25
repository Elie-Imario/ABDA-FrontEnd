import Audit from "./Pages/Audit";
import Inscription from "./Pages/Inscription";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import { SideBarWrapper, MainSide } from "./plugins/globalStyles";
import LeftSide from "./Layout/LeftSide";
import "./plugins/font-plugin-kit.js";
import "./plugins/fa-plugin-kit.js";
import "./App.scss";
import "./Pages/Pages.scss";

const Main = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/inscriptions"
            element={
              <>
                <SideBarWrapper>
                  <LeftSide />
                </SideBarWrapper>
                <MainSide className="right-side">
                  <Inscription />
                </MainSide>
              </>
            }
          />
          <Route
            path="/audits"
            element={
              <>
                <SideBarWrapper>
                  <LeftSide />
                </SideBarWrapper>
                <MainSide className="right-side">
                  <Audit />
                </MainSide>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

function App() {
  return <Main></Main>;
}

export default App;
