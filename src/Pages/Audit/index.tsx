import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoxItem from "../../components/molecules/boxItem";
import { ActivityDb, AuditActivity } from "../../service/types/dataTypes";
import { activitiesDb, audits } from "../../service/data/mockup.data";
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
import "./audit_styles.scss";
import { getAudits } from "../../request/audit.request";

const Audit = () => {
  const { UserLogContext } = useContext(AppContext);
  const navigate = useNavigate();

  //MUI table state configuration
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [ActivitiesonDb, setActivity] = useState<ActivityDb[]>(
    [] as ActivityDb[]
  );

  const [Audits, setAudit] = useState<AuditActivity[]>([] as AuditActivity[]);

  //on userLog change to undefined
  useEffect(() => {
    if (!UserLogContext) navigate("/");
  }, [UserLogContext]);

  useEffect(() => {
    setActivity(activitiesDb);
    setLoading(true);
    getAudits(
      JSON.parse(sessionStorage.getItem("userjwttoken") as string)
    ).then((res) => {
      setAudit(res);
      setLoading(false);
    });
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
          <div className="tab-section">
            <TableContainer component={Paper} className="no-shadow">
              <Table
                sx={{ minWidth: 500 }}
                aria-label=""
                stickyHeader
                className="table"
              >
                <TableHead className="text-center text-primary">
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Matricule</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Ancien droit (Ar)</TableCell>
                    <TableCell>Nouvaeu droit (Ar)</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Effectué par</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell component="td" colSpan={7} className="bg-dark">
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
                  ) : Audits.length > 0 ? (
                    (rowsPerPage > 0
                      ? Audits.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : Audits
                    ).map((item, index) => (
                      <TableRow key={index} className="text-center">
                        <TableCell component="td">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell component="td">{item.matricule}</TableCell>
                        <TableCell component="td">{item.nom}</TableCell>
                        <TableCell component="td">
                          {item.oldDroit ? item.oldDroit : "~"}
                        </TableCell>
                        <TableCell component="td">
                          {item.newDroit ? item.newDroit : "~"}
                        </TableCell>
                        <TableCell component="td">{item.actionType}</TableCell>
                        <TableCell component="td">{item.responsable}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="text-center text-background">
                      <TableCell component="td" colSpan={7}>
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
                      colSpan={7}
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
