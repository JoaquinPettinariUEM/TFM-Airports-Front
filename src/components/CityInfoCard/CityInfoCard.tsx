import { Box, Divider, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import type { EnrichedRouteDetail, Flight } from "../../types/routes";

interface InfoProps {
  label: string;
  value: string;
}

interface CityInfoCardProps {
  city: EnrichedRouteDetail["citiesInfo"][number];
  flight?: Flight;
  theme: {
    mainColor: string;
    bgColor: string;
  };
  isLast?: boolean;
}

export function CityInfoCard({
  city,
  flight,
  theme,
  isLast,
}: Readonly<CityInfoCardProps>) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        p: 4,
        borderRadius: "28px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: theme.mainColor,
        }}
      >
        {city.name}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {city.description}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 4,
          mt: 5,
        }}
      >
        <Info
          label="Arrival"
          value={flight ? format(new Date(flight.arrivalDate), "HH:mm") : "-"}
        />

        <Info label="Stay" value={flight ? `${flight.stayDays} days` : "-"} />
      </Box>

      <Divider
        sx={{
          my: 4,
          borderColor: "rgba(255,255,255,0.08)",
        }}
      />

      <Typography
        sx={{
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.8,
        }}
      >
        {city.summary}
      </Typography>

      {!isLast && flight && (
        <Box
          sx={{
            mt: 5,
            p: 3,
            borderRadius: "20px",
            border: `1px solid ${theme.mainColor}50`,
            background: theme.bgColor,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="rgba(255,255,255,0.7)">
              Flight to next destination
            </Typography>

            <Typography
              sx={{
                fontWeight: 700,
                color: theme.mainColor,
              }}
            >
              {Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

function Info({ label, value }: Readonly<InfoProps>) {
  return (
    <Box>
      <Typography
        sx={{
          color: "rgba(255,255,255,0.5)",
          fontSize: 14,
        }}
      >
        {label}
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
        {value}
      </Typography>
    </Box>
  );
}
