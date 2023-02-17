import { useQuery } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const get_user_information = () => instance.get("/auth/user_Information");

const useGetUserInformation = (config = {}) => {
  return useQuery({
    queryKey: ["get_user_information"],
    queryFn: get_user_information,
    ...config,
  });
};

export default useGetUserInformation;
