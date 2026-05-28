import { useMemo, useRef, useState } from "react";
import { Box, Divider, IconButton, styled } from "@mui/material";
import { useSortable } from "@dnd-kit/react/sortable";
import DeleteIcon from "@mui/icons-material/Delete";
import { AirportFinder } from "../../components/AirportFinder/AirportFinder";
import NumberField from "../../components/NumberField/NumberField";
import type { RoutePointInput } from "../../types/routes";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import FlightLandOutlinedIcon from "@mui/icons-material/FlightLandOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { blueCardTheme } from "../../theme";

type Props = {
  point: RoutePointInput;
  index: number;
  canRemove: boolean;
  maxStayDays: number;
  amountOfRoutes: number;
  onUpdateCity: (id: string, city: RoutePointInput["city"]) => void;
  onUpdateStayDays: (id: string, days: number) => void;
  onRemove: (id: string) => void;
};

export function SortableRoutePoint({
  point,
  index,
  canRemove,
  maxStayDays,
  amountOfRoutes,
  onUpdateCity,
  onUpdateStayDays,
  onRemove,
}: Readonly<Props>) {
  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const { isDragging } = useSortable({
    id: point.id,
    index,
    element,
    handle: handleRef,
  });

  const isFirst = useMemo(() => index === 0, [index]);
  const isLast = useMemo(() => index === amountOfRoutes - 1, [index, amountOfRoutes]);

  const getIcon = () => {
    if (isFirst) return <FlightTakeoffOutlinedIcon />;
    if (isLast) return <FlightLandOutlinedIcon />;
    else return <RoomOutlinedIcon />;
  };

  return (
    <StopRow ref={setElement} data-shadow={isDragging || undefined}>
      <HandleButton ref={handleRef} className="handle" aria-label="Drag handle" />
      <IconFlightContainer>{getIcon()}</IconFlightContainer>
      <CityInputWrap>
        <AirportFinder
          value={point.city}
          onChange={(value) => onUpdateCity(point.id, value)}
          label={`Select a city ${!isFirst && !isLast ? "(optional)" : ""}`}
        />
      </CityInputWrap>
      <Divider orientation="vertical" sx={{ margin: "0px 10px" }} />
      <DaysInputWrap>
        <NumberField
          label="Days"
          min={1}
          max={maxStayDays}
          value={point.stayDays}
          onValueChange={(value) => onUpdateStayDays(point.id, value ?? 2)}
        />
      </DaysInputWrap>
      {canRemove && <Divider orientation="vertical" sx={{ margin: "0px 10px" }} />}
      {canRemove ? (
        <IconButton
          onClick={() => onRemove(point.id)}
          aria-label="Remove city"
          color="error"
          sx={(theme) => ({
            border: `1px solid ${theme.palette.error.main}`,
            borderRadius: 1,
            width: 50,
            height: "100%",
            "&:hover": {
              backgroundColor: "rgba(239,68,68,0.12)",
            },
          })}
        >
          <DeleteIcon />
        </IconButton>
      ) : (
        <div />
      )}
    </StopRow>
  );
}

const StopRow = styled("li")(({ theme }) => ({
  display: "flex",
  gap: 8,
  alignItems: "center",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: "12px 10px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
  "&[data-shadow='true']": {
    transform: "scale(1.02)",
    backgroundColor: "rgba(255,255,255,0.10)",
    boxShadow: "0 14px 26px rgba(0, 0, 0, 0.28)",
    backdropFilter: "blur(6px)",
  },
}));

const HandleButton = styled("button")(({ theme }) => ({
  display: "flex",
  width: 50,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 6,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  cursor: "grab",
  "&.handle::before": {
    content: '""',
    display: "block",
    width: 25,
    height: 25,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z' fill='%23919eab'/%3E%3C/svg%3E\")",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  "&.handle:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  "&:focus-visible": {
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
  },
}));

const CityInputWrap = styled("div")({
  minWidth: "50%",
});

const DaysInputWrap = styled("div")({
  width: "100%",
});

const IconFlightContainer = styled(Box)({
  marginRight: 8,
  color: blueCardTheme.mainColor,
});
