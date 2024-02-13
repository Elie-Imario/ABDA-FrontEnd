import { FC, useState } from "react";
import Box from "@mui/material/Box";
import { Modal, FormControl } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";
import "./Popup.scss";

type Props = {
  _open: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  _setOpen: Function;
};

const AddPopup: FC<Props> = ({ _open, _setOpen }) => {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const handleClose = () => {
    _setOpen(false);
  };

  const onHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.value.length <= 3) {
      event.target.value.replace(/\D/g, "") as unknown;
    } else {
      event.target.value.replace(/\d/g, "");
    }
  };

  return (
    <>
      <Modal
        style={{ position: "absolute" }}
        open={_open}
        onClose={handleClose}
        container={() => document.querySelector(".modal-limiter")}
      >
        <Box className="wrap-modal-form">
          <div className="modal-header">
            <button className="closepopup" onClick={handleClose}>
              <FontAwesomeIcon icon="times" size="lg" />
            </button>
            <span className="modal-header-title">
              Inscrire un(e) étudiant(e)
            </span>
          </div>
          <div className="registration-form">
            <FormControl fullWidth className="wrap-input100">
              <TextField
                fullWidth
                error={errorMsg ? true : false}
                helperText={
                  errorMsg ? (
                    <span className="error-msg">
                      <FontAwesomeIcon icon="exclamation-circle" size="lg" />
                      <span>{errorMsg}</span>
                    </span>
                  ) : (
                    ""
                  )
                }
                required
                label="Nom de l'Etudiant(e)"
                id="input"
                name="nom"
                className="input100"
                onChange={({ target: { value } }) => {
                  console.log(value);
                }}
              />
            </FormControl>
            <FormControl fullWidth className="wrap-input100">
              <TextField
                fullWidth
                error={errorMsg ? true : false}
                helperText={
                  errorMsg ? (
                    <span className="error-msg">
                      <FontAwesomeIcon icon="exclamation-circle" size="lg" />
                      <span>{errorMsg}</span>
                    </span>
                  ) : (
                    ""
                  )
                }
                required
                label="Matricule de l'Etudiant(e)"
                id="input"
                name="matricule"
                className="input100"
                onChange={({ target: { value } }) => {
                  console.log(value);
                }}
              />
            </FormControl>
            <FormControl fullWidth className="wrap-input100">
              <TextField
                fullWidth
                error={errorMsg ? true : false}
                helperText={
                  errorMsg ? (
                    <span className="error-msg">
                      <FontAwesomeIcon icon="exclamation-circle" size="lg" />
                      <span>{errorMsg}</span>
                    </span>
                  ) : (
                    ""
                  )
                }
                required
                label="Capacité d'acceuil"
                name="sallecapacity"
                id="input"
                className="input100"
                value={0}
                onChange={onHandleChange}
              />
            </FormControl>
            <div className="button_group">
              <button className="btn-add" type="button">
                <FontAwesomeIcon icon="check-circle" size="lg" />
                <span>Confirmer</span>
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AddPopup;
