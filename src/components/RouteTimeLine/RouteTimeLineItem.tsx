import { Box } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import { routeCardThemes } from "../../utils/colors";
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
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 120px 1fr",
        gap: 4,
        minHeight: 420,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", py: 6 }}
      >
        {isEven ? (
          <CityImageCard
            city={city}
            theme={theme}
            isFirst={index === 0}
            isLast={isLast}
          />
        ) : (
          <CityInfoCard city={city} flight={flight} theme={theme} isLast={isLast} />
        )}
      </Box>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 2,
            flex: 1,
            background: "rgba(255,255,255,0.1)",
          }}
        />

        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: theme.bgColor,
            border: `2px solid ${theme.mainColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            boxShadow: `0 0 25px ${theme.mainColor}50`,
          }}
        >
          <FlightIcon />
        </Box>

        <Box
          sx={{
            width: 2,
            flex: 1,
            background: "rgba(255,255,255,0.1)",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", py: 6 }}>
        {isEven ? (
          <CityInfoCard city={city} flight={flight} theme={theme} isLast={isLast} />
        ) : (
          <CityImageCard
            city={city}
            theme={theme}
            isFirst={index === 0}
            isLast={isLast}
          />
        )}
      </Box>
    </Box>
  );
}
