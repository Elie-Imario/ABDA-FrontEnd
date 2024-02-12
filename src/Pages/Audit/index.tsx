import { useEffect, useState } from "react";
import BoxItem from "../../components/molecules/boxItem";
import { ActivityDb, AuditActivity } from "../../service/types/dataTypes";
import { activitiesDb, audits } from "../../service/data/mockup.data";

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

import "./audit_styles.scss";

const Audit = () => {
  //MUI table state configuration
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [ActivitiesonDb, setActivity] = useState<ActivityDb[]>(
    [] as ActivityDb[]
  );

  const [Audits, setAudit] = useState<AuditActivity[]>([] as AuditActivity[]);
  useEffect(() => {
    setActivity(activitiesDb);
    setAudit(audits);
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

  return (
    <div className="bloc-limiter">
      <div className="top-header">
        <div className="title-lead">
          <span>Audits</span>
        </div>
      </div>

      <div className="content-body no-scroll">
        <div className="content-body-header">
          <div className="box-items">
            {ActivitiesonDb.map((item, index) => {
              return (
                <BoxItem key={index} label={item.type} data={item.total} />
              );
            })}
          </div>
        </div>
        <div className="intro">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae unde
            non voluptate quis quos accusantium.
          </span>
        </div>
        <div className="content-body-body">
          <div className="list-items">
            <TableContainer component={Paper} className="no-shadow">
              <Table
                sx={{ minWidth: 500 }}
                aria-label=""
                stickyHeader
                className="table"
              >
                <TableHead className="text-center text-primary">
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Effectué par</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Matricule</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Ancien droit (Ar)</TableCell>
                    <TableCell>Nouvaeu droit (Ar)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell component="td" colSpan={5} className="bg-dark">
                        {/* <Bars
                          height="25"
                          width="25"
                          color="#adb5bd"
                          ariaLabel="bars-loading"
                          wrapperClass="loading"
                          visible={true}
                        /> */}
                      </TableCell>
                    </TableRow>
                  ) : Audits.length > 0 ? (
                    (rowsPerPage > 0
                      ? Audits.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : Audits
                    ).map((item, index) => (
                      <TableRow key={index} className="text-center">
                        <TableCell component="td" style={{ width: 100 }}>
                          AC-{item.audit_id}
                        </TableCell>
                        <TableCell component="td">
                          {item.actionType.toUpperCase()}
                        </TableCell>
                        <TableCell component="td">{item.utilisateur}</TableCell>
                        <TableCell component="td">
                          {item.editedAt.getTime().toString()}
                        </TableCell>
                        <TableCell component="td">{item.matricule}</TableCell>
                        <TableCell component="td">{item.nom}</TableCell>
                        <TableCell component="td">
                          {item.oldDroitInscription
                            ? item.oldDroitInscription
                            : "~"}
                        </TableCell>
                        <TableCell component="td">
                          {item.newDroitInscription
                            ? item.newDroitInscription
                            : "~"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="text-center text-background">
                      <TableCell component="td" colSpan={5}>
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
                      colSpan={8}
                      count={audits.length}
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
    </div>
  );
};

export default Audit;
