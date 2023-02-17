import { useQuery } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const check_balance = () => instance.get("/wallet/check_balance");

const useCheckBalance = (config = {}) => {
  return useQuery({
    queryKey: ["check_balance"],
    queryFn: check_balance,
    ...config,
  });
};

export default useCheckBalance;
