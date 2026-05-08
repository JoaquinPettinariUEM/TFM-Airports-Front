import { Box, styled, Typography, Divider } from "@mui/material";
import type { PathDetailed } from "../../types/routes";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";

type Props = {
  routes: PathDetailed[];
};

export function RoutePath({ routes }: Readonly<Props>) {
  return (
    <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: 1,
          width: "100%",
        }}
      >
        {routes.map((route, index) => {
          const isLast = index === routes.length - 1;
          return (
            <Box key={route._id} sx={{ display: "flex", gap: 2, width: "100%" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <Brightness1OutlinedIcon
                  sx={{
                    fontSize: 14,
                    color: "#A78BFA",
                    paddingTop: 1,
                  }}
                />
                {!isLast && <TimelineDivider />}
              </Box>
              <Typography variant="h5" sx={{ width: 50 }}>
                {route._id}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
                <Typography variant="body1">{route.name}</Typography>
                <Typography variant="body2">
                  {route.city} - {route.country}
                </Typography>
                <Divider />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

const TimelineDivider = styled("span")({
  width: "2px",
  height: "100%",

  background: "linear-gradient(to bottom, rgba(167,139,250,0.9), rgba(167,139,250,0.1))",

  borderRadius: "999px",
});
