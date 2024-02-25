import Audit from "./Audit";
import Inscription from "./Inscription";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { SideBarWrapper, MainSide } from "../plugins/globalStyles";
import LeftSide from "../Layout/LeftSide";
import "./Pages.scss";

const PageRouter = () => {
  return (
    <>
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
    </>
  );
};

export default PageRouter;
