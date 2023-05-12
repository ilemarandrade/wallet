import { useQuery } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const movements = ({ page, rowsPerPage, removedMoves }) =>
  instance.get(
    `/wallet/movements?page=${
      page + 1
    }&rowsPerPage=${rowsPerPage}&removedMoves=${removedMoves}`
  );

const useMovements = (config = {}) => {
  const { page, rowsPerPage, removedMoves, ...restConfig } = config;

  return useQuery({
    queryKey: ["movements"],
    queryFn: () => movements({ page, rowsPerPage, removedMoves }),
    ...restConfig,
  });
};

export default useMovements;
