import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import moment from "moment";
import { useTranslation } from "react-i18next";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

const DialogStyles = styled(Dialog)`
  ${({ theme }) => `
      & .MuiDialog-paper {
        padding: 32px;
        border-radius: 32px;
        min-height: 350px;
      }
    ${theme.breakpoints.down("xs")}{
        & .MuiDialog-paper {
            width: 100%;
            margin: 0px;
            height: 70vh;
            position: absolute;
            bottom: 0px;
            border-radius: 33px 32px 0px 0px;
        }
        & h5 {
            font-weight: 600;
            margin-bottom: 2rem;
        }
        & .debit {
           color: ${theme.palette.error.main};
        }
        & p{
            word-wrap: break-word;
        }
    }
`}
`;

const ContainerItems = styled.div`
  margin-bottom: 1rem;

  & p:first-child {
    font-weight: 600;
  }
`;

const IconCloseStyles = styled(IconButton)`
  color: black;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const ButtonDelete = styled(Button)`
  background-color: ${({ theme }) => theme.palette.error.main};
  color: white;
  font-weight: 600;
  &:hover {
    background-color: ${({ theme }) => theme.palette.error.dark};
  }
`;
const WarningContainer = styled(Grid)`
  height: 100%;
  flex-grow: 1;
  ${({ theme }) => `
    & p{
        color: ${theme.palette.error.main};
        margin-bottom: 2rem;
        font-size: 1.4rem;
        white-space: pre;
    }
  `}
`;
const MovementDetails = ({ data, onClose }) => {
  const { t } = useTranslation();
  const {
    date,
    type,
    amount,
    remaining_balance,
    concept,
    shouldOnlyShowWarningDelete = false,
  } = data;
  const [showWarning, setShowWarning] = useState(shouldOnlyShowWarningDelete);
  const dataFormated = [
    {
      title: t("date"),
      value: moment.unix(date).format("DD-MM-YY hh:mm"),
      id: "date",
    },
    { title: t("forms.labels.concept"), id: "concept", value: concept },
    {
      title: t("credit_or_debit"),
      id: "type",
      value: t(type),
    },
    {
      title: t("forms.labels.amount"),
      id: "amount",
      value: `$${amount}`,
    },
    {
      title: t("remaining"),
      id: "remaining_balance",
      value: `$${remaining_balance}`,
    },
  ];
  return (
    <DialogStyles open onClose={onClose}>
      <IconCloseStyles onClick={onClose}>
        <CloseIcon />
      </IconCloseStyles>
      {showWarning ? (
        <WarningContainer container direction="column">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              width: "100%",
            }}
          >
            <Typography align="center">{t("warning_action")}</Typography>
          </Box>
          <Box sx={{ mb: 1, width: "100%" }}>
            <Button
              onClick={() =>
                shouldOnlyShowWarningDelete ? onClose() : setShowWarning(false)
              }
              color="primary"
              variant="contained"
              fullWidth
              size="small"
            >
              {t("forms.buttons.back")}
            </Button>
          </Box>
          <ButtonDelete
            onClick={() =>
              shouldOnlyShowWarningDelete ? onClose() : setShowWarning(false)
            }
            variant="contained"
            fullWidth
            size="small"
          >
            {t("forms.buttons.continue")}
          </ButtonDelete>
        </WarningContainer>
      ) : (
        <>
          <Typography color="primary" variant="h5" align="center">
            Detalles
          </Typography>
          {dataFormated.map(({ title, value, id }) => {
            const isIdAmount = id === "amount";
            const isAmountPositive = isIdAmount ? amount > 0 : "";
            return (
              <ContainerItems key={id}>
                <Typography color="primary">{title}</Typography>
                <Typography
                  className={`${
                    isIdAmount ? (isAmountPositive ? "credit" : "debit") : ""
                  }`}
                >
                  {value}
                </Typography>
              </ContainerItems>
            );
          })}
          <ButtonDelete
            startIcon={<DeleteIcon />}
            onClick={() => setShowWarning(true)}
            variant="contained"
            fullWidth
            size="small"
          >
            {t("forms.buttons.delete")}
          </ButtonDelete>
        </>
      )}
    </DialogStyles>
  );
};

export default MovementDetails;
