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
import { appPalette, blueCardTheme } from "../../theme";
import { SortableRoutePoint } from "./SortableRoutePoint";
import { InfoChip } from "../../components/InfoChip/InfoChip";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function CreateRoute() {
  const {
    form,
    maxRoutePoints,
    updateField,
    addRoutePoint,
    removeRoutePoint,
    updateRoutePointCity,
    updateRoutePointStayDays,
    reorderRoutePointsByIds,
    tripDays,
    totalStayDays,
    remainingStayDays,
    isStayDaysWithinTrip,
    isFormValid,
    submit,
  } = useCreateRouteForm();

  const routePreview = form.routePoints.map((point) => ({
    id: point.id,
    label: point.city?.id ?? "?",
  }));
  return (
    <BackgroundComponent>
      <Container
        maxWidth="md"
        sx={{
          minHeight: "inherit",
          display: "flex",
          gap: 2,
          py: 4,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TitleContainer>
          <Typography variant="h2">Create your own route</Typography>
          <Typography variant="h5" color="textSecondary">
            Plan your multi-city adventure in just a few steps
          </Typography>
        </TitleContainer>

        <FormCard>
          <TopFilters>
            <DateRangeField
              startDate={form.startDate}
              endDate={form.endDate}
              onChange={({ startDate, endDate }) => {
                updateField("startDate", startDate);
                updateField("endDate", endDate);
              }}
              tripDays={tripDays}
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
            <RoutePreviewWrap>
              <Typography variant="body1" color="textSecondary">
                Path preview:
              </Typography>
              <RoutePreviewPath>
                {routePreview.map((segment, index) => (
                  <RoutePreviewSegment key={segment.id}>
                    <InfoChip
                      textColor={segment.label === "?" ? "white" : blueCardTheme.mainColor}
                      bgColor={blueCardTheme.bgColor}
                      label={segment.label}
                    />
                    {index < routePreview.length - 1 && <EastIcon fontSize="inherit" />}
                  </RoutePreviewSegment>
                ))}
              </RoutePreviewPath>
            </RoutePreviewWrap>
            <RoutePreviewWrap>
              <InfoOutlinedIcon />
              <Typography variant="body2" color="textSecondary">
                Up to 5 cities total
              </Typography>
            </RoutePreviewWrap>
          </RoutePreviewWrap>

          <DragDropProvider
            onDragOver={(event: DndDragOverEvent) => {
              const sourceId = event.operation.source?.id;
              const targetId = event.operation.target?.id;
              reorderRoutePointsByIds(
                typeof sourceId === "string" ? sourceId : undefined,
                typeof targetId === "string" ? targetId : undefined,
              );
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
          <ActionContainer>
            <Button
              onClick={addRoutePoint}
              variant="outlined"
              startIcon={<AddIcon />}
              disabled={form.routePoints.length >= maxRoutePoints}
            >
              Add city
            </Button>
            <Button
              startIcon={<SearchOutlinedIcon />}
              onClick={submit}
              variant="contained"
              disabled={!isFormValid}
            >
              Search
            </Button>
          </ActionContainer>
        </FormCard>
      </Container>
    </BackgroundComponent>
  );
}

const BackgroundComponent = styled("section")(({ theme }) => ({
  position: "relative",
  minHeight: "calc(100dvh - var(--tp-header-height))",
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
  padding: 24,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  backdropFilter: "blur(18px)",
  background: theme.palette.background.paper,
  border: `3px solid ${theme.palette.divider}`,
  boxShadow: appPalette.shadowStrong,
  borderRadius: 16,
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
  justifyContent: "space-between",
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

const TitleContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  marginBottom: 8,
});

const ActionContainer = styled(Box)({
  display: "flex",
  justifyContent: "end",
  gap: 16,
});

type DndDragOverEvent = Parameters<
  NonNullable<ComponentProps<typeof DragDropProvider>["onDragOver"]>
>[0];

export default CreateRoute;
