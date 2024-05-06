import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";

const LoaderContainer = styled("div")(({ fullScreen }) => ({
  position: fullScreen ? "fixed" : "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: fullScreen ? "100vh" : "auto",
  width: fullScreen ? "100vw" : "auto",
  backgroundColor: fullScreen
    ? "rgba(255, 255, 255, 0.8)"
    : "rgba(255, 255, 255, 0.8)",
}));

const Loader = ({ fullScreen = true }) => {
  return (
    <LoaderContainer fullScreen={fullScreen}>
      <CircularProgress />
    </LoaderContainer>
  );
};

export default Loader;
