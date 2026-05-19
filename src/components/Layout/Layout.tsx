import { Grid, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <LayoutStyled>
      <Header />
      <Outlet />
    </LayoutStyled>
  );
};

const LayoutStyled = styled(Grid)({
  height: "100vh",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(to bottom, #0B1020, #111827)",
});

export default Layout;
