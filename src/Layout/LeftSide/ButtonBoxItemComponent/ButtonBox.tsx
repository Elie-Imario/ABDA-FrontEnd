import { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./buttonBox.scss";
import { AppContext } from "../../../service/context";

type Props = {
  icoName: string;
  buttonLabel: string;
};

export const ButtonBox: FC<Props> = ({ icoName, buttonLabel }) => {
  const { setAppContext } = useContext(AppContext);
  const onHandleQuitClick = () => {
    sessionStorage.clear();
    setAppContext(undefined);
  };
  return (
    <div className="sidebar-navigation-item">
      <button className="box" onClick={onHandleQuitClick}>
        <FontAwesomeIcon icon={icoName} size="3x" />
      </button>
      <span className="caption">{buttonLabel}</span>
    </div>
  );
};
