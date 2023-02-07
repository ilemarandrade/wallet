import React from "react";
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
    label: "Date",
    id: "date",
    format: (date) => moment.unix(date).format("DD-MM-YY hh:mm"),
    minWidth: 150,
  },
  { label: "Concept", id: "concept", minWidth: 150 },
  { label: "Débito / Crédito", id: "type", minWidth: 150 },
  {
    label: "Amount",
    id: "amount",
    format: (amount) => `$${amount}`,
    minWidth: 150,
  },
  {
    label: "Remaining",
    id: "remaining_balance",
    format: (amount) => `$${amount}`,
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
  },
  pagination: {
    position: "absolute",
    bottom: "0px",
  },
});

export default function StickyHeadTable({ data }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
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
                                ? "#1ab187"
                                : "red"
                              : "",
                          }}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={classes.pagination}
      />
    </Paper>
  );
}
