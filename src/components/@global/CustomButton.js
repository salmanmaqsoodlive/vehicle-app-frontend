import Button from "@mui/material/Button";

export default function CustomButton({ children, ...props }) {
  return (
    <Button {...props} type="contained">
      {children}
    </Button>
  );
}
