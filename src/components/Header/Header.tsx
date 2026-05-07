import { Box, Button, Container, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderComponent>
      <Container maxWidth="lg" className="tp-header-container">
        <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
          <h1 className="tp-header-title">Travel Planner</h1>
        </Box>
        <Button size={"small"} variant="text" onClick={() => navigate("/create/route")}>
          Create your route
        </Button>
      </Container>
    </HeaderComponent>
  );
}

const HeaderComponent = styled(Box)({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  top: 0,
  paddingBottom: 10,
  width: "100%",
  zIndex: 100,
  ".tp-header-container": {
    display: "flex",
    justifyContent: "space-between",
    padding: 8,
  },
  ".tp-header-title": {
    color: "white",
  },
});

export default Header;
