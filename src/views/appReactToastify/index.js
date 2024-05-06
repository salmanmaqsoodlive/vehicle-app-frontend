import { useEffect } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../../redux/toastReducer";

const ToastifyWrapper = styled(Box)(({ theme }) => {
  return {
    "& .Toastify__toast": {
      minBlockSize: 55,
      borderRadius: "5px",
      padding: theme.spacing(1.5, 2.5),
      backgroundColor: "white",
      /*  boxShadow:
        settings.skin === "bordered" ? "none" : "var(--mui-customShadows-md)",
      border:
        settings.skin === "bordered" && `1px solid ${theme.palette.divider}`, */
      "&:not(.custom-toast)": {
        "& .Toastify__toast-body": {
          color: "var(--mui-palette-text-primary)",
        },
        "&.Toastify__toast--success": {
          "& .Toastify__toast-icon svg": {
            fill: "var(--mui-palette-success-main)",
          },
        },
        "&.Toastify__toast--error": {
          "& .Toastify__toast-icon svg": {
            fill: "var(--mui-palette-error-main)",
          },
        },
        "&.Toastify__toast--warning": {
          "& .Toastify__toast-icon svg": {
            fill: "var(--mui-palette-warning-main)",
          },
        },
        "&.Toastify__toast--info": {
          "& .Toastify__toast-icon svg": {
            fill: "var(--mui-palette-info-main)",
          },
        },
      },
    },
    "& .Toastify__toast-body": {
      margin: 0,
      lineHeight: 1.46667,
      fontSize: theme.typography.body1.fontSize,
    },
    "& .Toastify__toast-icon": {
      marginRight: theme.spacing(3),
      height: 20,
      width: 20,
      "& .Toastify__spinner": {
        margin: 3,
        height: 14,
        width: 14,
      },
    },
    "& .Toastify__close-button": {
      color: "var(--mui-palette-text-primary)",
    },
  };
});

const toastOptions = {
  position: "top-center",
  autoClose: 3000,
};

const AppReactToastify = (props) => {
  const { boxProps, ...rest } = props;
  const notifications = useSelector(
    (state) => state?.toastReducer?.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.forEach((notification) => {
      toast(notification.message, { type: notification.type });
      dispatch(removeToast(notification.id));
    });
  }, [notifications]);

  return (
    <ToastifyWrapper {...boxProps}>
      <ToastContainer {...toastOptions} />
    </ToastifyWrapper>
  );
};

export default AppReactToastify;
