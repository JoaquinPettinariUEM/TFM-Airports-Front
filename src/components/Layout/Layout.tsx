import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <Grid>
      <Header />
      <Outlet />
    </Grid>
  );
};

export default Layout;
