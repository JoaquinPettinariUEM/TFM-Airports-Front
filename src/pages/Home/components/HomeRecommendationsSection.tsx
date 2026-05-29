import { Box, Button, Container, Typography, styled } from "@mui/material";
import BackgroundImage from "../../../assets/bs_wallpaper.jpg";
import HeroBackdrop from "../../../assets/hero.png";
import RomeBackground from "../../../assets/rome_background.jpg";
import { appPalette } from "../../../theme";

const popularTrips = [
  {
    path: "Madrid -> Cagliari -> Milan",
    countries: "Spain, Italy",
    days: "6 days",
    stops: "2 stops",
    price: "From $259",
    image: RomeBackground,
  },
  {
    path: "Barcelona -> Rome -> Athens",
    countries: "Spain, Italy, Greece",
    days: "8 days",
    stops: "2 stops",
    price: "From $349",
    image: HeroBackdrop,
  },
  {
    path: "Paris -> Nice -> Milan",
    countries: "France, Italy",
    days: "5 days",
    stops: "1 stop",
    price: "From $219",
    image: BackgroundImage,
  },
];

export function HomeRecommendationsSection() {
  return (
    <Section>
      <Container maxWidth="xl" sx={{ py: 6, display: "grid", gap: 4 }}>
        <section>
          <SectionHeader>
            <Typography variant="h3">Popular multi-city trips</Typography>
            <Typography color="textSecondary">
              Discover real routes planned by travelers like you
            </Typography>
          </SectionHeader>

          <PopularGrid>
            {popularTrips.map((trip) => (
              <TripCard key={trip.path}>
                <TripImage src={trip.image} alt={trip.path} />
                <Box sx={{ p: 2, display: "grid", gap: 1 }}>
                  <Typography variant="h6">{trip.path}</Typography>
                  <Typography color="textSecondary">{trip.countries}</Typography>
                  <RowStats>
                    <Typography variant="body2">{trip.days}</Typography>
                    <Typography variant="body2">{trip.stops}</Typography>
                    <Typography variant="body2">{trip.price}</Typography>
                  </RowStats>
                  <Button variant="outlined">View route</Button>
                </Box>
              </TripCard>
            ))}
          </PopularGrid>
        </section>
      </Container>
    </Section>
  );
}

const Section = styled("section")({
  background: "#0B1020",
});

const SectionHeader = styled("div")({
  marginBottom: 24,
});

const PopularGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 16,
  "@media (max-width: 980px)": {
    gridTemplateColumns: "1fr",
  },
});

const TripCard = styled("article")(({ theme }) => ({
  overflow: "hidden",
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  background: appPalette.surfaceSoft,
}));

const TripImage = styled("img")({
  width: "100%",
  aspectRatio: "16/9",
  objectFit: "cover",
  display: "block",
});

const RowStats = styled("div")({
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
});
