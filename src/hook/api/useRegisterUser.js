import { useMutation } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const login = (values) =>
  instance.post("/auth/signup", { user: { ...values } });

const useRegisterUser = () => {
  const mutation = useMutation(login);
  return mutation;
};

export default useRegisterUser;
