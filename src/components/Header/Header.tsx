import { Box, Button, Container, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderComponent>
      <Container maxWidth="lg" className="tp-header-container">
        <TitleClickArea onClick={() => navigate("/")}>
          <Typography variant="h5" className="tp-header-title">
            RouteWise
          </Typography>
        </TitleClickArea>
        <Button
          size="small"
          variant="text"
          color="secondary"
          onClick={() => navigate("/create/route")}
        >
          Create your route
        </Button>
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

const TitleClickArea = styled(Box)({
  cursor: "pointer",
});

export default Header;
