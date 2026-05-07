import { Box, Card, Chip, Divider, Stack, Typography } from "@mui/material";

import FlightIcon from "@mui/icons-material/Flight";
import WalletIcon from "@mui/icons-material/Wallet";
import StraightenIcon from "@mui/icons-material/Straighten";

import type { RouteResponse } from "../../types/routes";
import { RouteCardImage } from "../RouteCardImage/RouteCardImage";

type Props = {
  route: RouteResponse;
  previewCity: string;
};

export function RouteCard({ route, previewCity }: Readonly<Props>) {
  const departure = route.pathDetailed[0];
  const arrival = route.pathDetailed[route.pathDetailed.length - 1];

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
          {departure.city} → {arrival.city}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#9CA3AF",
            mb: 2,
          }}
        >
          Discover {previewCity} during your trip
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip icon={<WalletIcon />} label={`€${route.cost}`} />

          <Chip icon={<FlightIcon />} label={`${route.path.length - 1} flights`} />

          <Chip icon={<StraightenIcon />} label={`${route.distance} km`} />
        </Stack>

        <Divider
          sx={{
            borderColor: "#1F2937",
            mb: 2,
          }}
        />

        <Stack direction="row" spacing={1}>
          {route.pathDetailed.map(airport => (
            <Chip key={airport._id} label={airport.city} size="small" />
          ))}
        </Stack>
      </Box>
    </Card>
  );
}
