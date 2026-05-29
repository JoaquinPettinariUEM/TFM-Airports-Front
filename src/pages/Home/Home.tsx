import { styled } from "@mui/material";
import { HomeHero } from "./components/HomeHero";
import { HomeRecommendationsSection } from "./components/HomeRecommendationsSection";

function Home() {
  return (
    <HomeComponent>
      <HomeHero />
      <HomeRecommendationsSection />
    </HomeComponent>
  );
}

const HomeComponent = styled("section")(({ theme }) => ({
  width: "100%",
  minHeight: "100%",
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default Home;
