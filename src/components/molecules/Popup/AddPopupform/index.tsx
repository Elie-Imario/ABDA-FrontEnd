import { FC, useState } from "react";
import Box from "@mui/material/Box";
import { Modal, FormControl } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";
import {
  Etudiant,
  Registration,
  RegistrationResponse,
} from "../../../../service/types/dataTypes";
import { register } from "../../../../request/inscription.request";
import "../Popup.scss";
import { toast } from "react-toastify";

type Props = {
  _open: boolean;
  _inscriptions: Etudiant[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  _setOpen: Function;
};

const AddPopup: FC<Props> = ({ _open, _inscriptions, _setOpen }) => {
  const [Registration, setRegistration] = useState<Registration>({
    nom: "",
    matricule: "",
    droitInscription: 0,
  });

  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleClose = () => {
    _setOpen(false);
    setRegistration({ nom: "", matricule: "", droitInscription: 0 });
  };

  const onHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.value.length <= 6) {
      const targetValue = event.target.value.replace(/\D/g, "");
      const value = targetValue ? Number.parseInt(targetValue) : 0;
      setRegistration({ ...Registration, droitInscription: value });
    } else {
      event.target.value.replace(/\d/g, "");
    }
  };

  const sumbitForm = () => {
    register(
      Registration,
      JSON.parse(sessionStorage.getItem("userjwttoken") as string)
    ).then((res: RegistrationResponse) => {
      if (res.responseStatus === "CREATED") {
        _inscriptions.push(res.inscription);
        handleClose();
        toastifySuccess(res.responseMessage);
      }
    });
  };

  const toastifySuccess = (msg: string) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
                  setRegistration({ ...Registration, nom: value });
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
                  setRegistration({ ...Registration, matricule: value });
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
                label="Droit d'inscription (Ar)"
                name="droit"
                id="input"
                className="input100"
                value={Registration.droitInscription}
                onChange={onHandleChange}
              />
            </FormControl>
            <div className="button_group">
              <button
                className="btn-add"
                type="button"
                onClick={sumbitForm}
                disabled={
                  Registration.nom &&
                  Registration.matricule &&
                  Registration.droitInscription
                    ? false
                    : true
                }
              >
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
