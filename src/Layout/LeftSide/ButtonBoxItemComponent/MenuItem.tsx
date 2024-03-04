import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./buttonBox.scss";

type Props = {
  icoName: string;
  pageName?: string;
  path: string;
};

export const MenuItem: FC<Props> = ({ icoName, pageName, path }) => {
  return (
    <div className="sidebar-navigation-item">
      <NavLink
        to={path}
        className={(navData) => (navData.isActive ? "box active" : "box")}
      >
        <FontAwesomeIcon icon={icoName} size="3x" />
      </NavLink>
      <span className="caption">{pageName}</span>
    </div>
  );
};
