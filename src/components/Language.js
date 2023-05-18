import React, { useRef, useState } from "react";
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
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

const PaperStyles = styled(Paper)`
  background-color: #24303c;
`;

const Language = () => {
  const [open, setOpen] = useState();
  const anchorRef = useRef(null);
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

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <FlagStyles src={isEnglish ? usa : spain} alt="flag" />
        <ArrowDropDownIcon style={{ color: "white" }} />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <PaperStyles>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem onClick={changeLanguagePage}>
                    <FlagStyles src={!isEnglish ? usa : spain} alt="flag" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </PaperStyles>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default Language;
