import { type ComponentProps } from "react";
import { Alert, Box, Button, Card, Container, Divider, styled, Typography } from "@mui/material";
import { DragDropProvider } from "@dnd-kit/react";
import AddIcon from "@mui/icons-material/Add";
import EastIcon from "@mui/icons-material/East";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BackgroundImage from "../../assets/bs_wallpaper.jpg";
import NumberField from "../../components/NumberField/NumberField";
import { DateRangeField } from "../../components/DateRangeField/DateRangeField";
import { useCreateRouteForm } from "../../hooks/useCreateRouteForm";
import { appPalette, routeCardThemes } from "../../theme";
import { SortableRoutePoint } from "./SortableRoutePoint";
import { InfoChip } from "../../components/InfoChip/InfoChip";

function CreateRoute() {
  const {
    form,
    maxRoutePoints,
    updateField,
    addRoutePoint,
    removeRoutePoint,
    updateRoutePointCity,
    updateRoutePointStayDays,
    reorderRoutePointsById,
    tripDays,
    totalStayDays,
    remainingStayDays,
    isStayDaysWithinTrip,
    isFormValid,
    submit,
  } = useCreateRouteForm();

  const routePreview = form.routePoints.map((point) => point.city?.id ?? "?");

  return (
    <BackgroundComponent>
      <Container
        maxWidth="md"
        sx={{
          height: "100%",
          display: "flex",
          gap: 2,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2">Create your own route</Typography>

        <FormCard>
          <TopFilters>
            <DateRangeField
              startDate={form.startDate}
              endDate={form.endDate}
              onChange={({ startDate, endDate }) => {
                updateField("startDate", startDate);
                updateField("endDate", endDate);
              }}
            />
            <Divider orientation="vertical" />
            <BudgetFieldWrap>
              <FilterLabel>
                <MonetizationOnOutlinedIcon color="primary" />
                <Typography variant="h6">Budget</Typography>
              </FilterLabel>
              <NumberField
                label={undefined}
                value={form.budget}
                defaultValue={300}
                min={0}
                max={10000}
                onValueChange={(value) => updateField("budget", value ?? 1000)}
              />
            </BudgetFieldWrap>
          </TopFilters>

          <Divider />

          <RoutePreviewWrap>
            <Typography variant="body1" color="text.secondary">
              Path preview:
            </Typography>
            <RoutePreviewPath>
              {routePreview.map((segment, index) => (
                <RoutePreviewSegment key={`${segment}-${index}`}>
                  <InfoChip
                    textColor={segment === "?" ? "white" : routeCardThemes[3].mainColor}
                    bgColor={routeCardThemes[3].bgColor}
                    label={segment}
                  />
                  {index < routePreview.length - 1 && <EastIcon fontSize="inherit" />}
                </RoutePreviewSegment>
              ))}
            </RoutePreviewPath>
          </RoutePreviewWrap>

          <DragDropProvider
            onDragEnd={(event: DndDragEndEvent) => {
              const sourceId = event.operation.source?.id;
              const targetId = event.operation.target?.id;
              if (typeof sourceId === "string" && typeof targetId === "string") {
                reorderRoutePointsById(sourceId, targetId);
              }
            }}
          >
            <StopsList>
              {form.routePoints.map((point, index) => (
                <SortableRoutePoint
                  key={point.id}
                  point={point}
                  index={index}
                  amountOfRoutes={form.routePoints.length}
                  canRemove={form.routePoints.length > 2}
                  maxStayDays={Math.max(1, point.stayDays + remainingStayDays)}
                  onUpdateCity={updateRoutePointCity}
                  onUpdateStayDays={updateRoutePointStayDays}
                  onRemove={removeRoutePoint}
                />
              ))}
            </StopsList>
          </DragDropProvider>

          {!isStayDaysWithinTrip && (
            <Alert severity="error" variant="outlined">
              Total trip days: {tripDays} | Assigned stay days: {totalStayDays} (assigned days
              cannot exceed total trip days).
            </Alert>
          )}

          <Button
            onClick={addRoutePoint}
            variant="outlined"
            startIcon={<AddIcon />}
            disabled={form.routePoints.length >= maxRoutePoints}
          >
            Add city
          </Button>
          <Divider />
          <Button onClick={submit} variant="contained" disabled={!isFormValid}>
            Search
          </Button>
        </FormCard>
      </Container>
    </BackgroundComponent>
  );
}

const BackgroundComponent = styled("section")(({ theme }) => ({
  height: "100%",
  width: "100%",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  color: theme.palette.text.primary,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: `linear-gradient(
      to bottom,
      ${appPalette.overlayDarkSoft},
      ${appPalette.overlayDarkStrong}
    )`,
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
}));

const FormCard = styled(Card)(({ theme }) => ({
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  backdropFilter: "blur(18px)",
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: appPalette.shadowStrong,
  borderRadius: 4,
}));

const TopFilters = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr auto 240px",
  gap: 32,
});

const BudgetFieldWrap = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

const FilterLabel = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 4,
});

const RoutePreviewWrap = styled("div")({
  display: "flex",
  gap: 16,
  alignItems: "center",
});

const RoutePreviewPath = styled("div")(({ theme }) => ({
  marginTop: 4,
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: theme.palette.text.primary,
  flexWrap: "wrap",
}));

const RoutePreviewSegment = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: theme.palette.text.secondary,
  fontSize: 18,
}));

const StopsList = styled("ul")({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  listStyle: "none",
  margin: 0,
  padding: 0,
});

type DndDragEndEvent = Parameters<
  NonNullable<ComponentProps<typeof DragDropProvider>["onDragEnd"]>
>[0];

export default CreateRoute;
