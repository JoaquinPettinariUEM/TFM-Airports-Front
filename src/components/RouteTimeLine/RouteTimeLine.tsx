import { Box } from "@mui/material";
import type { EnrichedRouteDetail } from "../../types/routes";
import { RouteTimelineItem } from "./RouteTimeLineItem";

interface Props {
  route: EnrichedRouteDetail;
}

export function RouteTimeline({ route }: Readonly<Props>) {
  return (
    <Box>
      {route.citiesInfo.map((city, index) => {
        const flight = route.flights[index];

        return (
          <RouteTimelineItem
            key={city._id}
            city={city}
            flight={flight}
            index={index}
            isLast={index === route.citiesInfo.length - 1}
          />
        );
      })}
    </Box>
  );
}
