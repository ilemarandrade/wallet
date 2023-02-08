import React from "react";
import MainLayout from "../layout/MainLayout";
import useMovements from "../hook/api/useMovements";
import TableMovements from "../components/TableMovements";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "../constants/routes";

function Pay() {
  const history = useHistory();
  const { t } = useTranslation();
  const { data } = useMovements({
    onSuccess: ({ movements }) => {
      if (!movements.length) {
        toast.error(`${t("toast_message.whithout_movements")}`);
        history.push(routes.DASHBOARD);
      }
    },
    onError: () => {
      toast.error(`${t("toast_message.there_is_error")}`);
    },
  });
  return (
    <>
      {data?.movements.length ? (
        <MainLayout title={t("services.account_movements")}>
          <TableMovements data={data?.movements} />
        </MainLayout>
      ) : null}
    </>
  );
}

export default Pay;
