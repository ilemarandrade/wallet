import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import routes from "../constants/routes";
import useGetUserInformation from "../hook/api/useGetUserInformation";
import {
  getLocalStorageKey,
  removeLocalStorageKey,
  setLocalStorageKey,
} from "../utils/localstoragesKeys";
import { useQueryClient } from "@tanstack/react-query";
import useLogin from "../hook/api/useLogin";

export const UserContext = createContext();

export const useStateUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const UserProvider = ({ children }) => {
  const history = useHistory();
  const [isFetchedProfile, setFetchedProfile] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const queryClient = useQueryClient();
  const [requestTokenVerification, setRequestTokenVerification] =
    useState(false);

  const { mutate } = useLogin();
  const login = async (values) => {
    mutate(
      { ...values },
      {
        onSuccess: (data) => {
          setLocalStorageKey(data.jwt);
          toast.success("Bienvenido!");
          setIsLogged(true);
          history.push(routes.DASHBOARD);
        },
        onError: ({ message }) => {
          toast.error(message || "Ha ocurrido un error");
        },
      }
    );
  };
  const logout = () => {
    removeLocalStorageKey();
    queryClient.clear();
    history.push(routes.LOGIN);
    toast.success("Logout exitoso!");
  };
  useGetUserInformation({
    enabled: requestTokenVerification,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      setIsLogged(true);
      history.push(routes.DASHBOARD);
    },
    onError: () => {
      setIsLogged(false);
    },
    onSettled: () => {
      setFetchedProfile(true);
    },
  });
  const token = getLocalStorageKey();
  useEffect(() => {
    if (token) {
      setRequestTokenVerification(true);
    } else {
      setFetchedProfile(true);
    }
  }, [requestTokenVerification]);

  return (
    <UserContext.Provider value={{ isLogged, logout, login }}>
      {isFetchedProfile ? children : <Loading open />}
    </UserContext.Provider>
  );
};

export default UserProvider;
