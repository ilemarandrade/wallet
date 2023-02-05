import { useMutation } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const pay = ({ amount, password, concept }) =>
  instance.put("/wallet/pay", {
    amount,
    password,
    concept,
  });

const usePay = () => {
  const mutation = useMutation(pay);
  return mutation;
};

export default usePay;
