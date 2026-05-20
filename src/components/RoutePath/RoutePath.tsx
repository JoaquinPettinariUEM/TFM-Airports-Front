import { Box, styled, Typography, Divider } from "@mui/material";
import type { AirportResponse } from "../../types/routes";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";

type Props = {
  routes: AirportResponse[];
};

export function RoutePath({ routes }: Readonly<Props>) {
  return (
    <RoutePathContainer>
      <RoutePathColumn>
        {routes.map((route, index) => {
          const isLast = index === routes.length - 1;
          return (
            <RouteRow key={route._id}>
              <TimelineNodeColumn>
                <PointIcon />
                {!isLast && <TimelineDivider />}
              </TimelineNodeColumn>
              <CodeText variant="h5">{route._id}</CodeText>
              <RouteTextColumn>
                <Typography variant="body1">{route.name}</Typography>
                <Typography variant="body2">
                  {route.city} - {route.country}
                </Typography>
                <Divider />
              </RouteTextColumn>
            </RouteRow>
          );
        })}
      </RoutePathColumn>
    </RoutePathContainer>
  );
}

const RoutePathContainer = styled(Box)({
  display: "flex",
  gap: 16,
  width: "100%",
});

const RoutePathColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 8,
  width: "100%",
});

const RouteRow = styled(Box)({
  display: "flex",
  gap: 16,
  width: "100%",
});

const TimelineNodeColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const PointIcon = styled(Brightness1OutlinedIcon)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.primary.light,
  paddingTop: 8,
}));

const CodeText = styled(Typography)({
  width: 50,
});

const RouteTextColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  flex: 1,
});

const TimelineDivider = styled("span")(({ theme }) => ({
  width: "2px",
  height: "100%",
  background: `linear-gradient(to bottom, ${theme.palette.primary.light}, transparent)`,
  borderRadius: "999px",
}));
