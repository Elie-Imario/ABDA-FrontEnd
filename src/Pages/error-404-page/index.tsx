import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img404 from "../../assets/images/page-misc-error-light.png";
import "./erroPage_styles.scss";

export const ErrorPage = () => {
  return (
    <div>
      <div className="container-xxl container-p-y">
        <div className="error-page-wrapper">
          <h2 className="error-title-lead">Page Introuvable</h2>
          <p className="subtitle">
            Oops! 😖 La page que vous avez demandé est indisponible, veuillez
            vous connecter!.
          </p>
          <NavLink to="/" className="redirect-btn">
            Page de connexion <FontAwesomeIcon icon="sign-in" size="lg" />
          </NavLink>
          <div className="img-container">
            <img src={img404} alt="page-error" />
          </div>
        </div>
      </div>
    </div>
  );
};
