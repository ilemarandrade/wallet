import React from "react";
import { IconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import spain from "../assets/espana.png";
import usa from "../assets/usa.png";
import styled from "styled-components";

const FlagStyles = styled.img`
  width: 30px;
`;
const Language = ({ className }) => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  const isEnglish = language === "en";
  const changeLanguagePage = () => {
    changeLanguage(isEnglish ? "es" : "en");
  };
  return (
    <IconButton onClick={changeLanguagePage} className={className}>
      <FlagStyles src={!isEnglish ? usa : spain} alt="flag" />
    </IconButton>
  );
};
export default Language;