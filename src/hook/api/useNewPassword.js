import { useMutation } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const newPassword = ({ password, confirmation_password, token }) =>
  instance.put("/auth/new_password", {
    password,
    confirmation_password,
    token,
  });

const useNewPassword = () => {
  const mutation = useMutation(newPassword);
  return mutation;
};

export default useNewPassword;
