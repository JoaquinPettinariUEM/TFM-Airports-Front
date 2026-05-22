import { Box, Typography, styled } from "@mui/material";
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
    <MainTitleWrapper>
      <Typography variant="h5">{[from, to].join(" - ")}</Typography>
      <StatsRow>
        <RouteStat
          icon={<WalletIcon color="inherit" />}
          label={`Budget: EUR ${budget}`}
        />
        <RouteStat
          icon={<AirlineStopsOutlinedIcon color="inherit" />}
          label={`Stops: ${maxStops}`}
        />
      </StatsRow>
    </MainTitleWrapper>
  );
}

const MainTitleWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  paddingBottom: 32,
});

const StatsRow = styled(Box)({
  display: "flex",
  gap: 16,
});

export default RouteMainTitle;
