import { Box, Button, Container, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderComponent>
      <Container maxWidth="lg" className="tp-header-container">
        <TitleClickArea onClick={() => navigate("/")}>
          <h1 className="tp-header-title">Travel Planner</h1>
        </TitleClickArea>
        <Button
          size={"small"}
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
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  zIndex: 100,
  ".tp-header-container": {
    display: "flex",
    justifyContent: "space-between",
    padding: 8,
  },
  ".tp-header-title": {
    color: theme.palette.text.primary,
  },
}));

const TitleClickArea = styled(Box)({
  cursor: "pointer",
});

export default Header;
