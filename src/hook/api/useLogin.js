import { useMutation } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const login = ({ email, password }) =>
  instance.post("/auth/login", {
    user: {
      email,
      password,
    },
  });

const useLogin = () => {
  const mutation = useMutation(login);
  return mutation;
};

export default useLogin;
