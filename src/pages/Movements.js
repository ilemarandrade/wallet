import React from "react";
import MainLayout from "../layout/MainLayout";
import useMovements from "../hook/api/useMovements";
import TableMovements from "../components/TableMovements";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

function Pay() {
  const { t } = useTranslation();
  const { data } = useMovements({
    onError: () => {
      toast.error(`${t("toast_message.there_is_error")}`);
    },
  });
  return (
    <MainLayout title={t("services.account_movements")}>
      {data && <TableMovements data={data?.movements} />}
    </MainLayout>
  );
}

export default Pay;
