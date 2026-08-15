import { Box, Button, Container, styled, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEditingRoute =
    pathname.startsWith("/searched/routes") || pathname.startsWith("/route/details");
  const isHowItWorks = pathname.startsWith("/how-it-works");

  return (
    <HeaderComponent>
      <Container maxWidth="xl" className="tp-header-container">
        <TitleClickArea onClick={() => navigate("/")}>
          <Typography variant="h5" className="tp-header-title">
            RouteWise
          </Typography>
        </TitleClickArea>
        <HeaderActions>
          <Button
            size="small"
            variant="text"
            color={isHowItWorks ? "primary" : "inherit"}
            onClick={() => navigate("/how-it-works")}
          >
            How it works
          </Button>
          <Button
            size="small"
            variant="text"
            color="secondary"
            onClick={() => navigate("/create/route")}
          >
            {isEditingRoute ? "Edit your route" : "Create your route"}
          </Button>
        </HeaderActions>
      </Container>
    </HeaderComponent>
  );
}

const HeaderComponent = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "var(--tp-header-height)",
  backgroundColor: theme.palette.background.paper,
  zIndex: 100,
  ".tp-header-container": {
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ".tp-header-title": {
    color: theme.palette.text.primary,
    fontWeight: 700,
  },
}));

const HeaderActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const TitleClickArea = styled(Box)({
  cursor: "pointer",
});

export default Header;
