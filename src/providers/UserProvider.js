import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import routes, { routesPublic } from "../constants/routes";
import useGetUserInformation from "../hook/api/useGetUserInformation";
import {
  getLocalStorageKey,
  removeLocalStorageKey,
  setLocalStorageKey,
} from "../utils/localstoragesKeys";
import { useQueryClient } from "@tanstack/react-query";
import useLogin from "../hook/api/useLogin";
import { useTranslation } from "react-i18next";
import { userLanguage } from "../utils/traductions/i18n";

export const UserContext = createContext();

export const useStateUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const UserProvider = ({ children }) => {
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();
  const lang = userLanguage();
  const history = useHistory();
  const { pathname } = useLocation();
  const [isFetchedProfile, setFetchedProfile] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [profile, setProfile] = useState({});
  const queryClient = useQueryClient();
  const isRoutePublic = Object.values(routesPublic).includes(pathname);
  const [requestTokenVerification, setRequestTokenVerification] =
    useState(false);

  const { mutate } = useLogin();

  useGetUserInformation({
    enabled: requestTokenVerification,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setIsLogged(true);
      setProfile(data.user);
      if (isRoutePublic) {
        history.push(routes.DASHBOARD);
      } else {
        history.push(pathname);
      }
    },
    onError: () => {
      setIsLogged(false);
    },
    onSettled: () => {
      setFetchedProfile(true);
    },
  });

  const login = async (values) => {
    mutate(
      { ...values },
      {
        onSuccess: (data) => {
          setLocalStorageKey(data.jwt);
          toast.success(t("toast_message.welcome"));
          setIsLogged(true);
          setRequestTokenVerification(true);
          queryClient.refetchQueries({ queryKey: ["get_user_information"] });
          history.push(routes.DASHBOARD);
        },
        onError: ({ data: { message } }) => {
          toast.error(message || `${t("toast_message.there_is_error")}`);
        },
      }
    );
  };

  const logout = () => {
    removeLocalStorageKey();
    queryClient.clear();
    setRequestTokenVerification(false);
    history.push(routes.LOGIN);
    toast.success(t("toast_message.logout_success"));
  };

  const token = getLocalStorageKey();

  useEffect(() => {
    if (token) {
      setRequestTokenVerification(true);
    } else {
      setFetchedProfile(true);
    }
  }, [requestTokenVerification, token]);

  useEffect(() => {
    changeLanguage(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLogged && isRoutePublic) {
      history.push(routes.DASHBOARD);
    }
  }, [history, isLogged, isRoutePublic]);
  return (
    <UserContext.Provider value={{ isLogged, logout, login, profile, lang }}>
      {isFetchedProfile ? children : <Loading open />}
    </UserContext.Provider>
  );
};

export default UserProvider;
