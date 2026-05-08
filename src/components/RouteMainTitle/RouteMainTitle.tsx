import { Box, Typography } from "@mui/material";
import { RouteStat } from "../RouteStats/RouteStats";
import WalletIcon from "@mui/icons-material/Wallet";
import AirlineStopsOutlinedIcon from "@mui/icons-material/AirlineStopsOutlined";

interface Props {
  from: string;
  to: string;
  budget: number;
  maxStops: number;
}

function RouteMainTitle({ from, to, budget, maxStops }: Readonly<Props>) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 4 }}>
      <Typography variant="h5">{[from, to].join(" → ")}</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <RouteStat icon={<WalletIcon color="inherit" />} label={`Budget: €${budget}`} />
        <RouteStat
          icon={<AirlineStopsOutlinedIcon color="inherit" />}
          label={`Stops: ${maxStops}`}
        />
      </Box>
    </Box>
  );
}

export default RouteMainTitle;
