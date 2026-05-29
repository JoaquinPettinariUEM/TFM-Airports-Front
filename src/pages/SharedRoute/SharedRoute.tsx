import { Alert, Box, CircularProgress, Container, styled, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetSharedRoute } from "../../api/travelPlanApi";
import { RouteHeader } from "../../components/RouteHeader/RouteHeader";
import { RouteTimeline } from "../../components/RouteTimeLine/RouteTimeLine";

function SharedRoute() {
  const { shareId } = useParams();
  const { data, isLoading, isError } = useGetSharedRoute(shareId);

  if (isLoading) {
    return (
      <PageContainer>
        <Container maxWidth="md">
          <Centered>
            <CircularProgress />
            <Typography>Loading shared route...</Typography>
          </Centered>
        </Container>
      </PageContainer>
    );
  }

  if (isError || !data?.route) {
    return (
      <PageContainer>
        <Container maxWidth="md">
          <Alert severity="warning">This shared route was not found or has expired.</Alert>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container maxWidth="xl">
        <RouteHeader
          route={data.route}
          budget={data.budget}
          requestedMaxStops={data.requestedMaxStops}
        />

        <TimelineWrapper>
          <RouteTimeline route={data.route} />
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

const Centered = styled(Box)({
  minHeight: 240,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 12,
});

export default SharedRoute;
