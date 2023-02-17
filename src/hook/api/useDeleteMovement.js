import { useMutation } from "@tanstack/react-query";
import instance from "../../utils/axiosInstance";

const delete_movement = ({ movement_id }) =>
  instance.put("/wallet/delete_movement", {
    movement_id,
  });

const useDeleteMovement = () => {
  const mutation = useMutation(delete_movement);
  return mutation;
};

export default useDeleteMovement;
