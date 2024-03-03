import { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./buttonBox.scss";
import { AppContext } from "../../../service/context";
import { useNavigate } from "react-router-dom";

type Props = {
  icoName: string;
  buttonLabel: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  _setProcessLogout: Function;
};

export const ButtonBox: FC<Props> = ({
  icoName,
  buttonLabel,
  _setProcessLogout,
}) => {
  const navigate = useNavigate();
  const { setAppContext } = useContext(AppContext);
  const onHandleQuitClick = () => {
    _setProcessLogout(true);
    setTimeout(() => {
      sessionStorage.clear();
      setAppContext(undefined);
      _setProcessLogout(false);
      navigate("/");
    }, 500);
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
