import { Box, Chip, Typography, styled } from "@mui/material";
import type { EnrichedRouteDetail } from "../../types/routes";

interface CityImageCardProps {
  city: EnrichedRouteDetail["citiesInfo"][number];
  theme: {
    mainColor: string;
    bgColor: string;
  };
  isFirst?: boolean;
  isLast?: boolean;
}

export function CityImageCard({
  city,
  theme,
  isFirst,
  isLast,
}: Readonly<CityImageCardProps>) {
  return (
    <ImageCard>
      <CityImage src={city.image} alt={city.name} />
      <ImageOverlay />

      <OverlayContent>
        <CityTitle variant="h3" mainColor={theme.mainColor}>
          {city.name}
        </CityTitle>
        <CountryText>{city.country}</CountryText>

        <ChipsRow>
          {isFirst && <StartingChip label="Starting Point" />}
          {isLast && <FinalChip label="Final Destination" />}
        </ChipsRow>
      </OverlayContent>
    </ImageCard>
  );
}

const ImageCard = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100%",
  borderRadius: "28px",
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
  width: "100%",
}));

const CityImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const ImageOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.15))",
});

const OverlayContent = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  padding: 32,
});

const CityTitle = styled(Typography)<{ mainColor: string }>(({ mainColor }) => ({
  fontWeight: 700,
  color: mainColor,
}));

const CountryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: 8,
}));

const ChipsRow = styled(Box)({
  marginTop: 24,
});

const StartingChip = styled(Chip)(({ theme }) => ({
  background: "rgba(16,185,129,0.2)",
  color: theme.palette.success.light,
}));

const FinalChip = styled(Chip)(({ theme }) => ({
  background: "rgba(59,130,246,0.2)",
  color: theme.palette.info.light,
}));
