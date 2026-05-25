import { Box, Typography, styled } from "@mui/material";
import { RouteStat } from "../RouteStats/RouteStats";
import WalletIcon from "@mui/icons-material/Wallet";
import AirlineStopsOutlinedIcon from "@mui/icons-material/AirlineStopsOutlined";
import EastIcon from "@mui/icons-material/East";
import { formatEuro } from "../../utils/format";

interface Props {
  from: string;
  to: string;
  budget: number;
  maxStops: number;
}

function RouteMainTitle({ from, to, budget, maxStops }: Readonly<Props>) {
  return (
    <MainTitleWrapper>
      <TitleText variant="h3">
        {from} <EastIcon fontSize="inherit" /> {to}
      </TitleText>
      <StatsRow>
        <RouteStat icon={<WalletIcon color="inherit" />} label={`Budget: ${formatEuro(budget)}`} />
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
  paddingBottom: 24,
});

const TitleText = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontWeight: 700,
});

const StatsRow = styled(Box)({
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
});

export default RouteMainTitle;
