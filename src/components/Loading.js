import { Dialog } from "@material-ui/core";
import React from "react";
import loading from "../assets/loading.gif";

const Loading = ({ open }) => (
  <Dialog open={open}>
    <img src={loading} alt="loading" width="80" />
  </Dialog>
);

export default Loading;
