import { Box, styled } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import { routeCardThemes } from "../../theme";
import { CityImageCard } from "../CityCardImage/CityCardImage";
import { CityInfoCard } from "../CityInfoCard/CityInfoCard";
import type { EnrichedRouteDetail, Flight } from "../../types/routes";

interface RouteTimelineItemProps {
  city: EnrichedRouteDetail["citiesInfo"][number];
  flight?: Flight;
  index: number;
  isLast: boolean;
}

export function RouteTimelineItem({
  city,
  flight,
  index,
  isLast,
}: Readonly<RouteTimelineItemProps>) {
  const isEven = index % 2 === 0;
  const theme = routeCardThemes[index % routeCardThemes.length];

  return (
    <TimelineRow>
      <PanelSide align="right">
        {isEven ? (
          <CityImageCard city={city} theme={theme} isFirst={index === 0} isLast={isLast} />
        ) : (
          <CityInfoCard city={city} flight={flight} theme={theme} isLast={isLast} />
        )}
      </PanelSide>

      <CenterAxis>
        <AxisLine />
        <FlightNode mainColor={theme.mainColor} bgColor={theme.bgColor}>
          <FlightIcon />
        </FlightNode>
        <AxisLine />
      </CenterAxis>

      <PanelSide align="left">
        {isEven ? (
          <CityInfoCard city={city} flight={flight} theme={theme} isLast={isLast} />
        ) : (
          <CityImageCard city={city} theme={theme} isFirst={index === 0} isLast={isLast} />
        )}
      </PanelSide>
    </TimelineRow>
  );
}

const TimelineRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 120px 1fr",
  gap: 32,
  minHeight: 420,
});

const PanelSide = styled(Box)<{ align: "left" | "right" }>(({ align }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: align === "right" ? "flex-end" : "flex-start",
  paddingBlock: 48,
}));

const CenterAxis = styled(Box)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const AxisLine = styled(Box)(({ theme }) => ({
  width: 2,
  flex: 1,
  background: theme.palette.divider,
}));

const FlightNode = styled(Box)<{ mainColor: string; bgColor: string }>(
  ({ mainColor, bgColor }) => ({
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: bgColor,
    border: `2px solid ${mainColor}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    boxShadow: `0 0 25px ${mainColor}50`,
  })
);
