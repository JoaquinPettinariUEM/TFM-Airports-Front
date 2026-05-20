import { Box, Container, styled } from "@mui/material";
import { useRouteStore } from "../../store/routeStore";
import { RouteHeader } from "../../components/RouteHeader/RouteHeader";
import { RouteTimeline } from "../../components/RouteTimeLine/RouteTimeLine";

function RouteDetail() {
  const { selectedRoute } = useRouteStore();

  if (!selectedRoute) {
    return null;
  }

  return (
    <PageContainer>
      <Container maxWidth="xl">
        <RouteHeader route={selectedRoute} />

        <TimelineWrapper>
          <RouteTimeline route={selectedRoute} />
        </TimelineWrapper>
      </Container>
    </PageContainer>
  );
}

const PageContainer = styled(Box)(({ theme }) => ({
  background: "radial-gradient(circle at top, #0B1B3B 0%, #030712 45%)",
  color: theme.palette.text.primary,
  paddingBlock: 48,
}));

const TimelineWrapper = styled(Box)({
  marginTop: 80,
});

export default RouteDetail;
