import { useContext, useRef, useState } from "react";
import { AppContext } from "../../service/context/index.js";
import { ButtonBox } from "./ButtonBoxItemComponent/ButtonBox.js";
import "./leftSide.scss";
import "../../plugins/fa-plugin-kit.js";
import { pageRoutes } from "../../service/data/index.js";
import { MenuItem } from "./ButtonBoxItemComponent/MenuItem.js";
import { User } from "../../service/types/dataTypes.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LeftSide = () => {
  const [connectedUser] = useState<User>(
    useContext(AppContext).UserLogContext as User
  );

  const leftSideRef = useRef<HTMLDivElement>(null);

  const [prosessLogout, setProcessLogout] = useState(false);
  const [collapse, setCollapseState] = useState(false);

  console.log(leftSideRef.current?.style);

  return (
    <div
      className={`left-side ${collapse ? "collapse" : ""}`}
      ref={leftSideRef}
    >
      {prosessLogout && (
        <div className="overlay-progress">
          <div className="wrapper">
            <FontAwesomeIcon icon="door-open" size="lg" />
          </div>
        </div>
      )}
      <div className="bloc-limiter">
        <div className="sidebar-toggle">
          <button
            type="button"
            className="navbar-toggler"
            onClick={() => setCollapseState(!collapse)}
          >
            <span className="navbar-toggler-bar bar1"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </button>
        </div>

        <div className="sidebar-navigation">
          {collapse ? (
            <div className="collapsed-sideBar-section">
              <div className="sidebar-navigation-bloc">
                <div className="sidebar-navigation-items">
                  {pageRoutes
                    .filter(
                      (pageRoute) =>
                        pageRoute.authoritiesLevel.indexOf(
                          connectedUser?.role
                        ) !== -1 && pageRoute
                    )
                    .map((item, key) => {
                      return (
                        <MenuItem
                          key={key}
                          icoName={item.icon}
                          path={item.path}
                        />
                      );
                    })}
                  <ButtonBox
                    icoName="door-open"
                    _setProcessLogout={setProcessLogout}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="sidebar-navgation-brand">
                <span className="text-uppercase">
                  Bonjour, {connectedUser?.username}
                </span>
                <span className="sub-title text-background">
                  Bienvenue sur votre espace de travail!
                </span>
              </div>
              <div className="sidebar-navigation-bloc">
                <span className="menu-category">Vos Options</span>
                <div className="sidebar-navigation-items">
                  {pageRoutes
                    .filter(
                      (pageRoute) =>
                        pageRoute.authoritiesLevel.indexOf(
                          connectedUser?.role
                        ) !== -1 && pageRoute
                    )
                    .map((item, key) => {
                      return (
                        <MenuItem
                          key={key}
                          icoName={item.icon}
                          pageName={item.label}
                          path={item.path}
                        />
                      );
                    })}
                  <ButtonBox
                    icoName="door-open"
                    buttonLabel="Quitter la session"
                    _setProcessLogout={setProcessLogout}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
