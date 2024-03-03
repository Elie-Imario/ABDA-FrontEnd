import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import img from "../../assets/images/Private data-amico.png";
import "./login.scss";
import {
  AuthResponse,
  User,
  UserLogin,
  errorMessage,
} from "../../service/types/dataTypes";
import { loginIntoAccount } from "../../request/auth.request";
import { AppContext } from "../../service/context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setAppContext } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [log, setLog] = useState<UserLogin>({
    userName: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setErrorMsg(null);
  }, [log]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleConnect = () => {
    if (log.userName && log.password) {
      loginIntoAccount(log)
        .then((res: AuthResponse) => {
          if (res.responseStatus === "OK") {
            const user = {
              username: res.userName,
              role: res.authorities[0].authority,
            } as User;

            sessionStorage.setItem("connectedUser", JSON.stringify(user));
            sessionStorage.setItem(
              "userjwttoken",
              JSON.stringify(res.jwtToken)
            );
            setAppContext(user);
            navigate("/inscriptions");
          } else {
            throw {
              status: res.responseStatus,
              message: res.responseMessage,
            };
          }
        })
        .catch((error: errorMessage) => {
          if (error.status) {
            setErrorMsg(error.message);
          } else {
            setErrorMsg("Impossible d'acceder aux ressources");
          }
        });
    } else {
      setErrorMsg("Veuillez remplir tous les champs!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-section">
        <div className="login-header">
          <div className="login-header-img">
            <img src={img} />
          </div>
          <div className="login100-form-title">
            <h1>Connectez vous!</h1>
            <span>Connectez vous et retrouver votre espace de travail!</span>
          </div>
        </div>
        <div className="login-wrap-form">
          <div className="login_form">
            <FormControl fullWidth className="wrap-input100">
              <TextField
                error={errorMsg ? true : false}
                fullWidth
                label="Login"
                id="input"
                className="input100"
                onChange={({ target: { value } }) => {
                  setLog({ ...log, userName: value });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon="user-circle" size="lg" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              className="wrap-input100"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Mot de Passe
              </InputLabel>
              <OutlinedInput
                error={errorMsg ? true : false}
                id="outlined-adornment-password"
                className="input100"
                type={showPassword ? "text" : "password"}
                startAdornment={
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon="key" className="m-r-5" size="lg" />
                  </InputAdornment>
                }
                onChange={({ target: { value } }) => {
                  setLog({ ...log, password: value });
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon="eye-slash" size="lg" />
                      ) : (
                        <FontAwesomeIcon icon="eye" size="lg" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Mot de Passe"
              />
            </FormControl>

            {errorMsg && (
              <div className="error-wrapper">
                <span className="error-msg">
                  <FontAwesomeIcon icon="exclamation-circle" size="lg" />
                  {errorMsg}
                </span>
              </div>
            )}

            <div
              className="container-login100-form-btn"
              onMouseUp={() => handleConnect()}
            >
              <button className="login100-form-btn" id="sign-in">
                <span>
                  <FontAwesomeIcon icon="sign-in" size="lg" /> Se connecter
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
