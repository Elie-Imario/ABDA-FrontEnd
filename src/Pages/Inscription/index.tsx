import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPopup from "../../components/molecules/Popup/AddPopupform";
import EditPopup from "../../components/molecules/Popup/EditPopupform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../../service/context";

//Material Ui Table
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Bars } from "react-loader-spinner";

import { Etudiant, RegistrationResponse } from "../../service/types/dataTypes";
import {
  deleteInscription,
  getAllInscriptions,
} from "../../request/inscription.request";
import { ToastContainer, toast } from "react-toastify";
import "./inscription_styles.scss";
import "react-toastify/dist/ReactToastify.css";

const Inscription = () => {
  const { UserLogContext } = useContext(AppContext);
  const navigate = useNavigate();
  //MUI table state configuration
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [defaultModal, setDefaultModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [registration_toEdit, setRegistrationId] = useState<number | undefined>(
    0
  );
  const [Registrations, setRegistrations] = useState<Etudiant[]>(
    [] as Etudiant[]
  );

  //on userLog change to undefined
  useEffect(() => {
    if (!UserLogContext) navigate("/");
  }, [UserLogContext]);

  useEffect(() => {
    setLoading(true);
    getAllInscriptions(
      JSON.parse(sessionStorage.getItem("userjwttoken") as string)
    ).then((res) => {
      setRegistrations(res);
      setLoading(false);
    });
  }, []);

  const RegistrationsSort = Registrations.sort((a, b) =>
    a.inscriptionId > b.inscriptionId ? -1 : 1
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = () => {
    setDefaultModal(false);
    setOpen(true);
  };

  const OpenEditModal = (id: number) => {
    setRegistrationId(id);
    setDefaultModal(true);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Retirer l'inscription de l'etudiant(e) ?")) {
      deleteInscription(
        id,
        JSON.parse(sessionStorage.getItem("userjwttoken") as string)
      ).then((res: RegistrationResponse) => {
        if (res.responseStatus === "NO_CONTENT") {
          setRegistrations(
            Registrations.filter((item) => item.inscriptionId != id)
          );
          const currentItems = Registrations.filter(
            (item) => item.inscriptionId != id
          ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
          currentItems.length > 0
            ? setPage(page)
            : setPage(page > 0 ? page - 1 : page);
          toastifySuccess(res.responseMessage);
        }
      });
    }
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
      {UserLogContext?.role === "ROLE_USER" && (
        <div className="modal-limiter">
          {!defaultModal ? (
            <AddPopup
              _open={open}
              _inscriptions={Registrations}
              _setOpen={setOpen}
            ></AddPopup>
          ) : (
            <EditPopup
              _open={open}
              _id={registration_toEdit as number}
              _inscriptions={Registrations}
              _setOpen={setOpen}
            ></EditPopup>
          )}
        </div>
      )}
      <div className="bloc-limiter">
        <div className="title-lead">
          <span>Les inscriptions</span>
        </div>
        {UserLogContext?.role === "ROLE_USER" && (
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastStyle={{
              marginTop: 30,
              borderRadius: 9,
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 500,
              fontSize: 12,
              color: "#6c757d",
            }}
          />
        )}
        <div className="content-body-body">
          <div className="tab-section">
            <div className="table-list-header">
              {UserLogContext?.role === "ROLE_USER" && (
                <div className="btn-action">
                  <button
                    type="button"
                    className="btn btn-add"
                    onClick={handleClickOpen}
                  >
                    <FontAwesomeIcon icon="plus" size="lg" />
                  </button>
                </div>
              )}
            </div>
            <TableContainer component={Paper} className="no-shadow">
              <Table
                sx={{ minWidth: 500 }}
                aria-label=""
                stickyHeader
                className="table"
              >
                <TableHead className="text-center text-primary">
                  <TableRow>
                    <TableCell>Matricule</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Droit d'inscripttion (Ar)</TableCell>
                    {UserLogContext?.role === "ROLE_USER" && (
                      <TableCell></TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell component="td" colSpan={4} className="bg-dark">
                        <Bars
                          height="25"
                          width="25"
                          color="#adb5bd"
                          ariaLabel="bars-loading"
                          wrapperClass="loading"
                          visible={true}
                        />
                      </TableCell>
                    </TableRow>
                  ) : RegistrationsSort.length > 0 ? (
                    (rowsPerPage > 0
                      ? RegistrationsSort.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : RegistrationsSort
                    ).map((item, index) => (
                      <TableRow key={index} className="text-center">
                        <TableCell component="td">{item.matricule}</TableCell>
                        <TableCell component="td">{item.nom}</TableCell>
                        <TableCell component="td">
                          {item.droitInscription}
                        </TableCell>
                        {UserLogContext?.role === "ROLE_USER" && (
                          <TableCell component="td">
                            <div className="btn_action_group">
                              <button
                                className="btn-action"
                                onClick={() => {
                                  OpenEditModal(item.inscriptionId);
                                }}
                              >
                                <FontAwesomeIcon icon="edit" size="lg" />
                              </button>
                              <button
                                className="btn-action"
                                onClick={() => {
                                  handleDelete(item.inscriptionId);
                                }}
                              >
                                <FontAwesomeIcon icon="trash-can" size="lg" />
                              </button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="text-center text-background">
                      <TableCell component="td" colSpan={4}>
                        Aucune information disponible
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "Tout", value: -1 },
                      ]}
                      colSpan={4}
                      count={RegistrationsSort.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage="Lignes par page"
                      SelectProps={{
                        inputProps: {
                          "aria-label": "Lignes par page",
                        },
                        native: true,
                      }}
                      labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} sur ${count}`
                      }
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inscription;
