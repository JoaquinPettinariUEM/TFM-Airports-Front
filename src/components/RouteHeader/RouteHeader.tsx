import { Box, Paper, Typography, styled } from "@mui/material";
import type { EnrichedRouteDetail } from "../../types/routes";

interface Props {
  route: EnrichedRouteDetail;
}

export function RouteHeader({ route }: Readonly<Props>) {
  return (
    <Box>
      <HeaderTitle variant="h2">Full Route Details</HeaderTitle>

      <HeaderSubtitle>Every stop. Every detail.</HeaderSubtitle>

      <StatsGrid>
        <StatCard label="Total Price" value={`EUR ${route.cost}`} />
        <StatCard label="Stops" value={`${route.path.length - 2}`} />
        <StatCard label="Distance" value={`${route.distance} km`} />
        <StatCard label="Score" value={`${route.score}`} />
      </StatsGrid>
    </Box>
  );
}

function StatCard({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <StyledPaper elevation={0}>
      <StatLabel>{label}</StatLabel>
      <StatValue variant="h4">{value}</StatValue>
    </StyledPaper>
  );
}

const HeaderTitle = styled(Typography)({
  fontWeight: 700,
});

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  marginTop: 16,
  color: theme.palette.text.secondary,
  fontSize: 20,
}));

const StatsGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 24,
  marginTop: 48,
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: 32,
  borderRadius: "24px",
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const StatValue = styled(Typography)({
  fontWeight: 700,
  marginTop: 16,
});
