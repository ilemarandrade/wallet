import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import styled from "styled-components";
import i18next from "../utils/traductions/i18n";
import { IconButton, Tooltip, useMediaQuery } from "@material-ui/core";
import MovementsCell from "./MovementsCell";
import { useTranslation } from "react-i18next";
import MovementDetails from "./MovementDetails";
import { useTheme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

const TableHeadStyles = styled(TableHead)(
  ({ theme }) => `
  background: ${theme.palette.primary.main};
  & th{
    background: ${theme.palette.primary.main};
    color: white;
    font-weight: 600;
  }
`
);
const columns = [
  {
    label: i18next.t("date"),
    id: "date",
    format: (date) => moment.unix(date).format("DD-MM-YY hh:mm"),
    minWidth: 150,
  },
  { label: i18next.t("forms.labels.concept"), id: "concept", minWidth: 150 },
  {
    label: i18next.t("credit_or_debit"),
    id: "type",
    minWidth: 150,
    format: (value) => i18next.t(value),
  },
  {
    label: i18next.t("forms.labels.amount"),
    id: "amount",
    format: (amount) => `$${amount}`,
    minWidth: 150,
  },
  {
    label: i18next.t("remaining"),
    id: "remaining_balance",
    format: (amount) => `$${amount}`,
  },
  {
    label: i18next.t("actions"),
    id: "actions",
  },
];
const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "500px",
    position: "relative",
  },
  container: {
    maxHeight: 440,
    minHeight: "calc(500px - 50px)",
  },
  pagination: {
    position: "absolute",
    bottom: "0px",
    background: "white",
  },
  cell: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "200px",
  },
});

export default function StickyHeadTable({ data }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [movementSelected, setMovementSelected] = useState(null);
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const theme = useTheme();
  const { t } = useTranslation();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMovementSelected = (movement) => {
    setMovementSelected(movement);
  };

  const handleCloseDetails = () => {
    setMovementSelected(null);
  };

  return (
    <>
      {!!movementSelected && (
        <MovementDetails onClose={handleCloseDetails} data={movementSelected} />
      )}
      <Paper className={classes.root}>
        {isDesktop ? (
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHeadStyles>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeadStyles>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          const isActions = column.id === "actions";
                          const isIdAmount = column.id === "amount";
                          const isAmountPositive = isIdAmount
                            ? row[column.id] > 0
                            : "";
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                color: isIdAmount
                                  ? isAmountPositive
                                    ? theme.palette.primary.main
                                    : theme.palette.error.main
                                  : "",
                              }}
                              className={classes.cell}
                            >
                              {isActions ? (
                                <>
                                  {!row.wasRemoved && (
                                    <Tooltip title={t("forms.buttons.delete")}>
                                      <IconButton
                                        onClick={() =>
                                          handleMovementSelected({
                                            ...row,
                                            shouldOnlyShowWarningDelete: true,
                                          })
                                        }
                                      >
                                        <DeleteIcon
                                          fontSize="small"
                                          htmlColor={theme.palette.error.light}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                  <Tooltip title={t("review")}>
                                    <IconButton
                                      onClick={() =>
                                        handleMovementSelected({
                                          ...row,
                                        })
                                      }
                                    >
                                      <VisibilityIcon
                                        fontSize="small"
                                        color="primary"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              ) : (
                                <Tooltip
                                  title={
                                    column.format ? column.format(value) : value
                                  }
                                  leaveTouchDelay={3000}
                                  enterTouchDelay={0}
                                  placement="bottom-start"
                                >
                                  <span>
                                    {column.format
                                      ? column.format(value)
                                      : value}
                                  </span>
                                </Tooltip>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <MovementsCell
            data={data.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            movementSelected={handleMovementSelected}
          />
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className={classes.pagination}
          labelRowsPerPage={t("row_per_page")}
        />
      </Paper>
    </>
  );
}
