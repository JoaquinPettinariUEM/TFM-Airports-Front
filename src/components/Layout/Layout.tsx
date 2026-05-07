import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <Grid sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Outlet />
    </Grid>
  );
};

export default Layout;
