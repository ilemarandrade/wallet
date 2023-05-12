import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import useMovements from "../hook/api/useMovements";
import TableMovements from "../components/TableMovements";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const MainLayoutStyles = styled(MainLayout)(
  ({ theme }) => `

  ${[theme.breakpoints.down(600)]}{
    & > div {
      min-width: 100vw;
      padding: 0px;
      margin-top: 1.5rem;
    }
  }

`
);

const CheckboxStyles = styled(FormControlLabel)(
  ({ theme }) => `
  color: white;
  margin-left: 0px;
  & svg{
    fill: ${theme.palette.primary.main};
  }
  ${[theme.breakpoints.down(600)]}{
  }

`
);

const Movements = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [seeRemovedMoves, setSeeRemovedMoves] = useState(false);

  const { data, refetch } = useMovements({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: ({ movements }) => {
      if (!movements.length) {
        toast.error(`${t("toast_message.whithout_movements")}`);
      }
    },
    onError: ({ data: { message } }) => {
      toast.error(message || `${t("toast_message.there_is_error")}`);
    },
    page,
    rowsPerPage,
    removedMoves: seeRemovedMoves,
  });

  useEffect(() => {
    refetch();
  }, [page, refetch, rowsPerPage, seeRemovedMoves]);

  useEffect(() => {
    setPage(0);
  }, [seeRemovedMoves]);

  return (
    <MainLayoutStyles title={t("services.account_movements")}>
      <CheckboxStyles
        control={
          <Checkbox
            checked={seeRemovedMoves}
            onChange={() => setSeeRemovedMoves(!seeRemovedMoves)}
            color="primary"
          />
        }
        label={t("see_removed_moves")}
      />
      <TableMovements
        data={data.movements || []}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        total={data.total}
      />
    </MainLayoutStyles>
  );
};

export default Movements;
