import { Container, styled } from "@mui/material";
import BackgroundImage from "../../assets/rome_background.jpg";
import PageTitle from "../../components/PageTitle/PageTitle";

function Home() {
  return (
    <HomeComponent>
      <Container
        maxWidth="lg"
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <PageTitle />
      </Container>
    </HomeComponent>
  );
}

const HomeComponent = styled("section")({
  height: "100vh",
  width: "100%",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  color: "white",
  ".tp-title": {
    fontSize: "80px",
    fontWeight: 700,
  },
  ".tp-description": {
    marginTop: "32px",
    marginBottom: "16px",
    fontSize: "40px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
});

export default Home;
