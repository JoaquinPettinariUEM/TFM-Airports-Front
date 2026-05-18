import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <Grid
      sx={{
        minHeight: "m100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom, #0B1020, #111827)",
      }}
    >
      <Header />
      <Outlet />
    </Grid>
  );
};

export default Layout;
