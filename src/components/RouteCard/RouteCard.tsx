import { Box, Button, Card, Chip, Divider, Stack, Typography } from "@mui/material";

import FlightIcon from "@mui/icons-material/Flight";
import StraightenIcon from "@mui/icons-material/Straighten";

import { RouteCardImage } from "../RouteCardImage/RouteCardImage";
import { InfoChip } from "../InfoChip/InfoChip";
import EastIcon from "@mui/icons-material/East";
import type { RouteListItemResponse } from "../../types/routes";

type Props = {
  route: RouteListItemResponse;
  previewCity: string;
  bestPrice: number;
  departure: string;
  arrival: string;
  airportsOfRoute: string[];
  mainColor: string;
  bgColor: string;
  viewDetailsRoute: (routes: string[]) => void;
};

export function RouteCard({
  route,
  previewCity,
  bestPrice,
  departure,
  airportsOfRoute,
  arrival,
  mainColor,
  bgColor,
  viewDetailsRoute,
}: Readonly<Props>) {
  const difference = route.cost - bestPrice;
  const stopCities = airportsOfRoute.slice(1, -1);

  const viaText =
    stopCities.length > 0 ? `Via ${stopCities.join(" & ")}` : "Direct flight";

  return (
    <Card
      sx={{
        overflow: "hidden",
        borderRadius: 1,
        backgroundColor: "#111827",
        color: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 0 0 1px ${mainColor}, 0 20px 40px rgba(0,0,0,0.35)`,
        },
      }}
    >
      <RouteCardImage city={previewCity} />

      <Box sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {departure} → {arrival}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#9CA3AF",
            mb: 2,
          }}
        >
          {viaText}
        </Typography>

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
            mb: 2,
          }}
        />
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          {route.path?.join(" → ")}
        </Typography>

        <Box sx={{ marginTop: "auto" }}>
          <Button
            variant="outlined"
            fullWidth
            endIcon={<EastIcon />}
            onClick={() => viewDetailsRoute(route.path)}
          >
            View Details
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
