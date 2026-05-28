import { type ComponentProps } from "react";
import { Alert, Button, Card, Container, Divider, styled, Typography } from "@mui/material";
import { DragDropProvider } from "@dnd-kit/react";
import AddIcon from "@mui/icons-material/Add";
import BackgroundImage from "../../assets/bs_wallpaper.jpg";
import NumberField from "../../components/NumberField/NumberField";
import { DateRangeField } from "../../components/DateRangeField/DateRangeField";
import { useCreateRouteForm } from "../../hooks/useCreateRouteForm";
import { appPalette } from "../../theme";
import { SortableRoutePoint } from "./SortableRoutePoint";

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

  const routePreview = form.routePoints.map((point) => point.city?.id ?? "?").join(" -> ");

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
            <NumberField
              label="Budget"
              value={form.budget}
              defaultValue={300}
              min={0}
              max={10000}
              onValueChange={(value) => updateField("budget", value ?? 1000)}
            />
          </TopFilters>

          <Divider />

          <Typography variant="h6" color="text.secondary">
            Path preview: {routePreview}
          </Typography>

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
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
});

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
