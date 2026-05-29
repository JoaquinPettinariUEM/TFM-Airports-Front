import { Grid, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <LayoutStyled>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutStyled>
  );
};

const LayoutStyled = styled(Grid)({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(to bottom, var(--tp-bg-start), var(--tp-bg-end))",
});

const MainContent = styled("main")({
  flex: 1,
  minHeight: 0,
});

export default Layout;
