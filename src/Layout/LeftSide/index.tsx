import { useContext } from "react";
import { AppContext } from "../../service/context/index.js";
import { ButtonBox } from "./ButtonBoxItemComponent/ButtonBox.js";
import "./leftSide.scss";
import "../../plugins/fa-plugin-kit.js";
import { PageName, pageRoutes } from "../../service/data/index.js";
import { MenuItem } from "./ButtonBoxItemComponent/MenuItem.js";

const LeftSide = () => {
  const { UserLogContext } = useContext(AppContext);
  const onHandleQuitClick = () => {};
  return (
    <div className="left-side">
      <div className="bloc-limiter">
        <div className="sidebar-toggle">
          <button type="button" className="navbar-toggler">
            <span className="navbar-toggler-bar bar1"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </button>
        </div>

        <div className="sidebar-navigation">
          <div className="sidebar-navgation-brand">
            <span className="text-uppercase">
              Bonjour, {UserLogContext?.username}
            </span>
            <span className="sub-title text-background">
              Bienvenue sur votre espace de travail!
            </span>
          </div>
          <div className="sidebar-navigation-bloc">
            <span className="menu-category">Vos Options</span>
            <div className="sidebar-navigation-items">
              {pageRoutes.map((item, key) => {
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
                onHandleClick={onHandleQuitClick} //mbola dinihina
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
