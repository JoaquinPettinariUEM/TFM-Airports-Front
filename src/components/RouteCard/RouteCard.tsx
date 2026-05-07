import { Box, Card, Chip, Divider, Stack, Typography } from "@mui/material";

import FlightIcon from "@mui/icons-material/Flight";
import StraightenIcon from "@mui/icons-material/Straighten";

import type { RouteResponse } from "../../types/routes";
import { RouteCardImage } from "../RouteCardImage/RouteCardImage";
import { getAllCities } from "../../utils/cities";
import { InfoChip } from "../InfoChip/InfoChip";

type Props = {
  route: RouteResponse;
  previewCity: string;
  bestPrice: number;
  mainColor: string;
  bgColor: string;
};

export function RouteCard({
  route,
  previewCity,
  bestPrice,
  mainColor,
  bgColor,
}: Readonly<Props>) {
  const cities = getAllCities(route.pathDetailed);
  const departure = cities[0];
  const arrival = cities[route.pathDetailed.length - 1];
  const difference = route.cost - bestPrice;

  return (
    <Card
      sx={{
        overflow: "hidden",
        borderRadius: 1,
        backgroundColor: "#111827",
        color: "white",
      }}
    >
      <RouteCardImage city={previewCity} />

      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {departure} → {arrival}
        </Typography>

        {previewCity && (
          <Typography
            variant="body1"
            sx={{
              color: "#9CA3AF",
              mb: 2,
            }}
          >
            Via {previewCity}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ color: mainColor }}>
            €{route.cost}
          </Typography>
          {difference > 0 && (
            <InfoChip textColor={mainColor} bgColor={bgColor} label={`+€${difference}`} />
          )}
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip icon={<FlightIcon />} label={`${route.path.length - 1} flights`} />

          <Chip icon={<StraightenIcon />} label={`${route.distance} km`} />
        </Stack>

        <Divider
          sx={{
            borderColor: "#1F2937",
            mb: 2,
          }}
        />

        <Typography variant="body2">{route.path?.join(" → ")}</Typography>
      </Box>
    </Card>
  );
}
