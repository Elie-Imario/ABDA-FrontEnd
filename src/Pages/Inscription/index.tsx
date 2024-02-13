import { useEffect, useState } from "react";
import AddPopup from "../../components/molecules/Popup/AddPopupform";
import EditPopup from "../../components/molecules/Popup/EditPopupform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

import { Etudiant } from "../../service/types/dataTypes";
import { etudiants } from "../../service/data/mockup.data";
import "./inscription_styles.scss";

const Inscription = () => {
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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setRegistrations(etudiants);
  }, []);

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

  return (
    <>
      <div className="modal-limiter">
        {!defaultModal ? (
          <AddPopup _open={open} _setOpen={setOpen}></AddPopup>
        ) : (
          <EditPopup
            _open={open}
            _setOpen={setOpen}
            _id={registration_toEdit}
          ></EditPopup>
        )}
      </div>
      <div className="bloc-limiter">
        <div className="title-lead">
          <span>Les inscriptions</span>
        </div>
        <div className="content-body-body">
          <div className="tab-section">
            <div className={`btn-action ${open ? "hide" : ""}`}>
              <button className="btn-add" onClick={handleClickOpen}>
                <FontAwesomeIcon icon="plus" size="lg" />
              </button>
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
                    <TableCell></TableCell>
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
                  ) : Registrations.length > 0 ? (
                    (rowsPerPage > 0
                      ? Registrations.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : Registrations
                    ).map((item, index) => (
                      <TableRow key={index} className="text-center">
                        <TableCell component="td">{item.matricule}</TableCell>
                        <TableCell component="td">{item.nom}</TableCell>
                        <TableCell component="td">
                          {item.droitInscription}
                        </TableCell>
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
                                console.log("hello world");
                              }}
                            >
                              <FontAwesomeIcon icon="trash-can" size="lg" />
                            </button>
                          </div>
                        </TableCell>
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
                      count={Registrations.length}
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
