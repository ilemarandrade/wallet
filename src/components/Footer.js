import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ minHeight: 10, color: "white" }}>
      <Typography align="center">{t("footer")}</Typography>
    </Box>
  );
};

export default Footer;
