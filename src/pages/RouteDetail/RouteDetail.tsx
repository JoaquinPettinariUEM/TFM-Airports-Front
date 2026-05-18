import { Box, Container } from "@mui/material";
import { useRouteStore } from "../../store/routeStore";
import { RouteHeader } from "../../components/RouteHeader/RouteHeader";
import { RouteTimeline } from "../../components/RouteTimeLine/RouteTimeLine";

function RouteDetail() {
  const { selectedRoute } = useRouteStore();

  if (!selectedRoute) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0B1B3B 0%, #030712 45%)",
        color: "white",
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <RouteHeader route={selectedRoute} />

        <Box sx={{ mt: 10 }}>
          <RouteTimeline route={selectedRoute} />
        </Box>
      </Container>
    </Box>
  );
}

export default RouteDetail;
