import React from "react";
import MainLayout from "../layout/MainLayout";
import useMovements from "../hook/api/useMovements";
import TableMovements from "../components/TableMovements";
import { toast } from "react-hot-toast";

function Pay() {
  const { data } = useMovements({
    onError: () => {
      toast.error("Ha ocurrido un error");
    },
  });
  return (
    <MainLayout title="Movements">
      {data && <TableMovements data={data?.movements} />}
    </MainLayout>
  );
}

export default Pay;
