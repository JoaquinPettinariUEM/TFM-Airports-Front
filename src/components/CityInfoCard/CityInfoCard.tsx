import { Alert, Box, Button, Divider, Paper, Typography, styled } from "@mui/material";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { format } from "date-fns";
import { useState } from "react";
import type { EnrichedRouteDetail, Flight } from "../../types/routes";
import { CityItineraryModal } from "../CityItineraryModal/CityItineraryModal";

interface InfoProps {
  label: string;
  value: string;
}

interface CityInfoCardProps {
  city: EnrichedRouteDetail["citiesInfo"][number];
  previousFlight?: Flight;
  nextFlight?: Flight;
  theme: {
    mainColor: string;
    bgColor: string;
  };
  isFirst?: boolean;
  isLast?: boolean;
}

export function CityInfoCard({
  city,
  previousFlight,
  nextFlight,
  theme,
  isFirst,
  isLast,
}: Readonly<CityInfoCardProps>) {
  const [openItinerary, setOpenItinerary] = useState(false);

  const arrivalValue = previousFlight
    ? format(new Date(previousFlight.arrivalDate), "HH:mm MMM d")
    : "-";
  const departureValue = nextFlight
    ? format(new Date(nextFlight.departureDate), "HH:mm MMM d")
    : "-";
  const stayValue = !isFirst && !isLast && previousFlight ? `${previousFlight.stayDays} days` : "-";
  const departureFromValue = nextFlight?.from ?? "-";
  const arrivalToValue = previousFlight?.to ?? "-";
  const suggestedDays = Math.max(previousFlight?.stayDays ?? (isLast ? 2 : 1), 1);
  const showItineraryButton = !isFirst;

  return (
    <>
      <StyledPaper elevation={0}>
        <ActionsRow>
          <CityName variant="h4" mainColor={theme.mainColor}>
            {city.name}
          </CityName>
          {showItineraryButton && (
            <Button
              variant="outlined"
              startIcon={<AutoAwesomeOutlinedIcon />}
              onClick={() => setOpenItinerary(true)}
            >
              View itinerary
            </Button>
          )}
        </ActionsRow>

        <CityDescription>{city.description}</CityDescription>

        <InfoGrid>
          {isFirst ? (
            <Info label="Departure" value={departureValue} />
          ) : (
            <Info label="Arrival" value={arrivalValue} />
          )}

          {isFirst ? (
            <Info label="Airport" value={departureFromValue} />
          ) : isLast ? (
            <Info label="Airport" value={arrivalToValue} />
          ) : (
            <Info label="Stay / Departure" value={`${stayValue} · ${departureValue}`} />
          )}
        </InfoGrid>

        <ContentDivider />

        <CitySummary>{city.summary}</CitySummary>

        {!isLast && nextFlight && (
          <FlightBox mainColor={theme.mainColor} bgColor={theme.bgColor}>
            <FlightRow>
              <Typography color="text.secondary">Flight to next destination</Typography>
              <FlightDuration mainColor={theme.mainColor}>
                {Math.floor(nextFlight.durationMinutes / 60)}h {nextFlight.durationMinutes % 60}m
              </FlightDuration>
            </FlightRow>
          </FlightBox>
        )}

        {isLast && (
          <Alert
            variant="outlined"
            severity="success"
            sx={{
              mt: 4,
              borderRadius: 2,
              backgroundColor: "rgba(46, 125, 50, 0.08)",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>
              You have reached your final destination.
            </Typography>
            <Typography variant="body2">Enjoy your stay in {city.name}.</Typography>
          </Alert>
        )}
      </StyledPaper>

      <CityItineraryModal
        open={openItinerary}
        onClose={() => setOpenItinerary(false)}
        city={city}
        suggestedDays={suggestedDays}
      />
    </>
  );
}

function Info({ label, value }: Readonly<InfoProps>) {
  return (
    <Box>
      <InfoLabel>{label}</InfoLabel>
      <InfoValue variant="h5">{value}</InfoValue>
    </Box>
  );
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: 32,
  textAlign: "left",
  borderRadius: "28px",
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  backdropFilter: "blur(20px)",
  color: theme.palette.text.primary,
}));

const CityName = styled(Typography)<{ mainColor: string }>(({ mainColor }) => ({
  fontWeight: 700,
  color: mainColor,
}));

const CityDescription = styled(Typography)(({ theme }) => ({
  marginTop: 8,
  color: theme.palette.text.secondary,
}));

const InfoGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 32,
  marginTop: 40,
});

const ContentDivider = styled(Divider)(({ theme }) => ({
  marginTop: 32,
  marginBottom: 32,
  borderColor: theme.palette.divider,
}));

const CitySummary = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.8,
}));

const ActionsRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const FlightBox = styled(Box)<{ mainColor: string; bgColor: string }>(({ mainColor, bgColor }) => ({
  marginTop: 40,
  padding: 24,
  borderRadius: "20px",
  border: `1px solid ${mainColor}50`,
  background: bgColor,
}));

const FlightRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const FlightDuration = styled(Typography)<{ mainColor: string }>(({ mainColor }) => ({
  fontWeight: 700,
  color: mainColor,
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 14,
}));

const InfoValue = styled(Typography)({
  fontWeight: 700,
  marginTop: 8,
});
