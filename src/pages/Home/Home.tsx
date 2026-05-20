import { Container, styled } from "@mui/material";
import { appPalette } from "../../theme";
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

const HomeComponent = styled("section")(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  color: theme.palette.text.primary,
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
    background: `linear-gradient(
      to bottom,
      ${appPalette.overlayDarkSoft},
      ${appPalette.overlayDarkStrong}
    )`,
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
}));

export default Home;
