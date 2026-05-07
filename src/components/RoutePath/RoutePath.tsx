import { Box, Chip } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

type Props = {
  cities: string[];
};

export function RoutePath({ cities }: Readonly<Props>) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {cities.map((city, index) => (
        <Box
          key={city}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Chip label={city} color="primary" variant="outlined" />

          {index < cities.length - 1 && <EastIcon />}
        </Box>
      ))}
    </Box>
  );
}
