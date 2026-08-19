import { Box, Typography, styled } from "@mui/material";
import { RouteStat } from "../RouteStats/RouteStats";
import WalletIcon from "@mui/icons-material/Wallet";
import AirlineStopsOutlinedIcon from "@mui/icons-material/AirlineStopsOutlined";
import EastIcon from "@mui/icons-material/East";
import { formatEuro } from "../../utils/format";
import { useI18n } from "../../i18n/i18nContext";

interface Props {
  from: string;
  to: string;
  budget: number;
  maxStops: number;
}

function RouteMainTitle({ from, to, budget, maxStops }: Readonly<Props>) {
  const { t } = useI18n();
  return (
    <MainTitleWrapper>
      <TitleText variant="h3">
        {from} <EastIcon fontSize="inherit" /> {to}
      </TitleText>
      <StatsRow>
        <RouteStat
          icon={<WalletIcon color="inherit" />}
          label={t("routeMainTitle.budget", { value: formatEuro(budget) })}
        />
        <RouteStat
          icon={<AirlineStopsOutlinedIcon color="inherit" />}
          label={t("routeMainTitle.stops", { count: maxStops })}
        />
      </StatsRow>
    </MainTitleWrapper>
  );
}

const MainTitleWrapper = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
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
