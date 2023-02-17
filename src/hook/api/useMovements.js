import { useQuery } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const movements = () => instance.get("/wallet/movements");

const useMovements = (config = {}) => {
  return useQuery({
    queryKey: ["movements"],
    queryFn: movements,
    ...config,
  });
};

export default useMovements;
