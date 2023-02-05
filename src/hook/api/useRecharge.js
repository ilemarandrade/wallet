import { useMutation } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const recharge = ({ amount, password, concept }) =>
  instance.put("/wallet/recharge", {
    amount,
    password,
    concept,
  });

const useRecharge = () => {
  const mutation = useMutation(recharge);
  return mutation;
};

export default useRecharge;
