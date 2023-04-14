import React from "react";
import { IconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import spain from "../assets/espana.png";
import usa from "../assets/usa.png";
import styled from "styled-components";
import { setUserLanguage } from "../utils/localstoragesKeys";
import useUpdateUser from "../hook/api/useUpdateUser";
import { useStateUser } from "../providers/UserProvider";

const FlagStyles = styled.img`
  width: 30px;
`;
const Language = ({ className }) => {
  const { isLogged } = useStateUser();
  const { mutate } = useUpdateUser();
  const {
    i18n: { language },
  } = useTranslation();
  const isEnglish = language === "en";
  const newLanguages = isEnglish ? "es" : "en";

  const changeLanguagePage = () => {
    setUserLanguage(newLanguages);
    if (isLogged) {
      mutate(
        { lang: newLanguages },
        {
          onSuccess: () => {
            window.location.reload();
          },
        }
      );
    } else {
      window.location.reload();
    }
  };

  return (
    <IconButton onClick={changeLanguagePage} className={className}>
      <FlagStyles src={!isEnglish ? usa : spain} alt="flag" />
    </IconButton>
  );
};

export default Language;
