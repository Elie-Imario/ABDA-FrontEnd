import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./buttonBox.scss";

type Props = {
  icoName: string;
  buttonLabel: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onHandleClick: Function;
};

export const ButtonBox: FC<Props> = ({
  icoName,
  buttonLabel,
  onHandleClick,
}) => {
  const handleClick = () => {
    onHandleClick(buttonLabel);
  };
  return (
    <div className="sidebar-navigation-item">
      <button className="box" onClick={handleClick}>
        <FontAwesomeIcon icon={icoName} size="3x" />
      </button>
      <span className="caption">{buttonLabel}</span>
    </div>
  );
};
