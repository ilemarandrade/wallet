import { useMutation } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const forgotPassword = ({ email }) =>
  instance.post("/auth/forgot_password", {
    email,
  });

const useForgotPassword = () => {
  const mutation = useMutation(forgotPassword);
  return mutation;
};

export default useForgotPassword;
