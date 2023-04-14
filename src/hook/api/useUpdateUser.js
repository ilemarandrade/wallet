import { useMutation } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const updateUser = ({ name, lastname, document, phone, lang }) =>
  instance.put("/auth/update_user", {
    user: {
      name,
      lastname,
      document,
      phone,
      lang,
    },
  });

const useUpdateUser = () => {
  const mutation = useMutation(updateUser);
  return mutation;
};

export default useUpdateUser;
