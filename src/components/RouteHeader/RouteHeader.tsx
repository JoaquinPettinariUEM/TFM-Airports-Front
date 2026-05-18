import { Box, Paper, Typography } from "@mui/material";
import type { EnrichedRouteDetail } from "../../types/routes";

interface Props {
  route: EnrichedRouteDetail;
}

export function RouteHeader({ route }: Readonly<Props>) {
  return (
    <Box>
      <Typography variant="h2" sx={{ fontWeight: 700 }}>
        Full Route Details
      </Typography>

      <Typography
        sx={{
          mt: 2,
          color: "rgba(255,255,255,0.6)",
          fontSize: 20,
        }}
      >
        Every stop. Every detail.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 3,
          mt: 6,
        }}
      >
        <StatCard label="Total Price" value={`€${route.cost}`} />

        <StatCard label="Stops" value={`${route.path.length - 2}`} />

        <StatCard label="Distance" value={`${route.distance} km`} />

        <StatCard label="Score" value={`${route.score}`} />
      </Box>
    </Box>
  );
}

function StatCard({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: "24px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "white",
      }}
    >
      <Typography
        sx={{
          color: "rgba(255,255,255,0.5)",
        }}
      >
        {label}
      </Typography>

      <Typography variant="h4" sx={{ fontWeight: 700, mt: 2 }}>
        {value}
      </Typography>
    </Paper>
  );
}
