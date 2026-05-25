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
        const previousFlight = route.flights[index - 1];
        const nextFlight = route.flights[index];

        return (
          <RouteTimelineItem
            key={city._id}
            city={city}
            previousFlight={previousFlight}
            nextFlight={nextFlight}
            index={index}
            isLast={index === route.citiesInfo.length - 1}
            isFirst={index === 0}
          />
        );
      })}
    </Box>
  );
}
