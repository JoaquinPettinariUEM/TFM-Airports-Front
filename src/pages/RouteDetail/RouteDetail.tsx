import { Box, Container, styled } from "@mui/material";
import { useRouteStore } from "../../store/routeStore";
import { RouteHeader } from "../../components/RouteHeader/RouteHeader";
import { RouteTimeline } from "../../components/RouteTimeLine/RouteTimeLine";
import { useSearchParams } from "react-router-dom";

function RouteDetail() {
  const { selectedRoute } = useRouteStore();
  const [searchParams] = useSearchParams();

  const budget = Number(searchParams.get("budget") ?? Number.NaN);
  const maxStops = Number(searchParams.get("maxStops") ?? Number.NaN);

  if (!selectedRoute) {
    return null;
  }

  return (
    <PageContainer>
      <Container maxWidth="xl">
        <RouteHeader
          route={selectedRoute}
          budget={Number.isFinite(budget) ? budget : undefined}
          requestedMaxStops={Number.isFinite(maxStops) ? maxStops : undefined}
        />

        <TimelineWrapper>
          <RouteTimeline route={selectedRoute} />
        </TimelineWrapper>
      </Container>
    </PageContainer>
  );
}

const PageContainer = styled(Box)(({ theme }) => ({
  background:
    "radial-gradient(circle at 10% 0%, rgba(59,130,246,0.18), transparent 28%), radial-gradient(circle at 90% 12%, rgba(139,92,246,0.2), transparent 30%), radial-gradient(circle at top, #0B1B3B 0%, #030712 45%)",
  color: theme.palette.text.primary,
  paddingBlock: 32,
}));

const TimelineWrapper = styled(Box)({
  marginTop: 40,
});

export default RouteDetail;
