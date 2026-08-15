import { styled } from "@mui/material";
import { useRef } from "react";
import { HomeHero } from "./components/HomeHero";
import { HomeHowItWorksPreview } from "./components/HomeHowItWorksPreview";
import { HomeRecommendationsSection } from "./components/HomeRecommendationsSection";

function Home() {
  const recommendationsRef = useRef<HTMLElement | null>(null);

  const scrollToRecommendations = () => {
    recommendationsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <HomeComponent>
      <HomeHero onSeeRecommendations={scrollToRecommendations} />
      <HomeRecommendationsSection sectionRef={recommendationsRef} />
      <HomeHowItWorksPreview />
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
