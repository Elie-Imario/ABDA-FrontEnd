import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Modal, FormControl } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";
import {
  getRegistrationById,
  updateRegister,
} from "../../../../request/inscription.request";
import {
  Etudiant,
  RegistrationResponse,
} from "../../../../service/types/dataTypes";
import { toast } from "react-toastify";
import "../Popup.scss";

type Props = {
  _open: boolean;
  _id: number;
  _inscriptions: Etudiant[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  _setOpen: Function;
};

const EditPopup: FC<Props> = ({ _open, _inscriptions, _id, _setOpen }) => {
  const [Registration, setRegistration] = useState<Etudiant>({} as Etudiant);
  const [DefaultRegistration, setDefaultRegistration] = useState<Etudiant>(
    {} as Etudiant
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    getRegistrationById(
      _id as number,
      JSON.parse(sessionStorage.getItem("userjwttoken") as string)
    ).then((res: Etudiant) => {
      setRegistration({
        inscriptionId: res.inscriptionId,
        nom: res.nom,
        matricule: res.matricule,
        droitInscription: res.droitInscription,
      });

      setDefaultRegistration({
        inscriptionId: res.inscriptionId,
        nom: res.nom,
        matricule: res.matricule,
        droitInscription: res.droitInscription,
      });
    });
  }, [_id]);

  const handleClose = () => {
    if (
      Registration.nom !== DefaultRegistration.nom ||
      Registration.matricule !== DefaultRegistration.matricule ||
      Registration.droitInscription !== DefaultRegistration.droitInscription
    ) {
      getRegistrationById(
        _id as number,
        JSON.parse(sessionStorage.getItem("userjwttoken") as string)
      ).then((res: Etudiant) => {
        setRegistration({
          inscriptionId: res.inscriptionId,
          nom: res.nom,
          matricule: res.matricule,
          droitInscription: res.droitInscription,
        });
      });
    }
    _setOpen(false);
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
    updateRegister(
      _id,
      Registration,
      JSON.parse(sessionStorage.getItem("userjwttoken") as string)
    ).then((res: RegistrationResponse) => {
      if (res.responseStatus === "OK") {
        const Obj = _inscriptions.findIndex(
          (item) => item.inscriptionId === _id
        );
        _inscriptions[Obj].nom = Registration.nom;
        _inscriptions[Obj].matricule = Registration.matricule;
        _inscriptions[Obj].droitInscription = Registration.droitInscription;
      }
      handleClose();
      toastifySuccess(res.responseMessage);
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
      {Registration && (
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
                Modifier l' étudiant(e) {Registration?.matricule}
              </span>
            </div>
            <div className="registration-edit-form">
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
                  value={Registration.nom ? Registration.nom : ""}
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
                  value={Registration.matricule ? Registration.matricule : ""}
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
                  label="Capacité d'acceuil"
                  name="sallecapacity"
                  id="input"
                  className="input100"
                  value={
                    Registration.droitInscription
                      ? Registration.droitInscription
                      : 0
                  }
                  onChange={onHandleChange}
                />
              </FormControl>
              <div className="button_group">
                <button
                  className="btn-edit"
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
                  <FontAwesomeIcon icon="save" size="lg" />
                  <span>Enregistrer</span>
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default EditPopup;
