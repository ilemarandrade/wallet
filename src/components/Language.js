import React from "react";
import { IconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import spain from "../assets/espana.png";
import usa from "../assets/usa.png";
import styled from "styled-components";
import { setUserLanguage } from "../utils/traductions/i18n";

const FlagStyles = styled.img`
  width: 30px;
`;
const Language = ({ className }) => {
  const {
    i18n: { language },
  } = useTranslation();
  const isEnglish = language === "en";
  const changeLanguagePage = () => {
    setUserLanguage(isEnglish ? "es" : "en");
    window.location.reload();
  };

  return (
    <IconButton onClick={changeLanguagePage} className={className}>
      <FlagStyles src={!isEnglish ? usa : spain} alt="flag" />
    </IconButton>
  );
};
export default Language;
