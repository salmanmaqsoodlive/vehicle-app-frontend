import Card from "@mui/material/Card";

export default function CustomCard({ children }) {
  return <Card className="w-2/6 m-5 p-5">{children}</Card>;
}
