import { Box, Chip, Typography } from "@mui/material";
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
    <Box
      sx={{
        position: "relative",
        height: "100%",
        borderRadius: "28px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        width: "100%",
      }}
    >
      <Box
        component="img"
        src={city.image}
        alt={city.name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.15))",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          p: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: theme.mainColor,
          }}
        >
          {city.name}
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.7)",
            mt: 1,
          }}
        >
          {city.country}
        </Typography>

        <Box sx={{ mt: 3 }}>
          {isFirst && (
            <Chip
              label="Starting Point"
              sx={{
                background: "rgba(16,185,129,0.2)",
                color: "#6EE7B7",
              }}
            />
          )}

          {isLast && (
            <Chip
              label="Final Destination"
              sx={{
                background: "rgba(59,130,246,0.2)",
                color: "#93C5FD",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
