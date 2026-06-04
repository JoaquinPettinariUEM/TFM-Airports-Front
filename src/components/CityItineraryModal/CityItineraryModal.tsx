import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo, useState } from "react";
import { useGetCityItinerary } from "../../api/travelPlanApi";
import { MOCK_CITY_ITINERARY } from "../../mocks/cityItinerary.mock";
import { routeCardThemes } from "../../theme";
import type { CityItinerary, EnrichedRouteDetail } from "../../types/routes";
import {
  ActivityContent,
  ActivityHeader,
  ActivityRow,
  AiAlertSx,
  ContentGrid,
  dialogContentSx,
  dialogPaperSx,
  FlagImage,
  HeaderMain,
  HeaderRow,
  InfoIconWrap,
  InfoPill,
  ItineraryPanel,
  LeftColumn,
  MapButton,
  PanelHeader,
  PanelSmallHeader,
  PlaceholderBlock,
  PreviewPanel,
  TimeCell,
  TimelineScrollArea,
  TipsBlock,
  TopInfo,
  TypeChip,
} from "./CityItineraryModal.styles";
import {
  activityTypeStyles,
  buildBudgetValue,
  formatBestSeasonShort,
  getCountryFlagUrl,
  slugify,
} from "./CityItineraryModal.utils";

type Props = {
  open: boolean;
  onClose: () => void;
  city: EnrichedRouteDetail["citiesInfo"][number];
  suggestedDays: number;
};

type InfoPillConfig = {
  key: string;
  label: string;
  value: string;
  icon: typeof CalendarMonthOutlinedIcon;
  mainColor: string;
  bgColor: string;
};

export function CityItineraryModal({ open, onClose, city, suggestedDays }: Readonly<Props>) {
  const itineraryParams = open
    ? {
        city: city.name,
        country: city.country,
        days: suggestedDays,
      }
    : undefined;

  const { data, isLoading, isError } = useGetCityItinerary(itineraryParams);

  const fallbackItinerary = useMemo<CityItinerary>(
    () => ({
      ...MOCK_CITY_ITINERARY,
      city: city.name,
      country: city.country,
      citySlug: `${slugify(city.name)}-${slugify(city.country)}`,
      cacheKey: `${slugify(city.name)}-${slugify(city.country)}-${suggestedDays}`,
      days: suggestedDays,
      itineraryDays: MOCK_CITY_ITINERARY.itineraryDays.slice(0, suggestedDays),
    }),
    [city.country, city.name, suggestedDays],
  );

  const itinerary = data?.itinerary ?? fallbackItinerary;
  const [selectedDay, setSelectedDay] = useState(1);
  const activeDay =
    itinerary.itineraryDays.find((day) => day.day === selectedDay) ?? itinerary.itineraryDays[0];

  const infoPills: InfoPillConfig[] = [
    {
      key: "days",
      label: "Recommended days",
      value: `${suggestedDays} days`,
      icon: CalendarMonthOutlinedIcon,
      mainColor: routeCardThemes[1].mainColor,
      bgColor: routeCardThemes[1].bgColor,
    },
    {
      key: "season",
      label: "Best time to visit",
      value: formatBestSeasonShort(itinerary.bestSeason),
      icon: PlaceOutlinedIcon,
      mainColor: routeCardThemes[2].mainColor,
      bgColor: routeCardThemes[2].bgColor,
    },
    {
      key: "currency",
      label: "Currency",
      value: itinerary.currency,
      icon: PaidOutlinedIcon,
      mainColor: routeCardThemes[0].mainColor,
      bgColor: routeCardThemes[0].bgColor,
    },
    {
      key: "weather",
      label: "Average weather",
      value: itinerary.averageWeather,
      icon: WbSunnyOutlinedIcon,
      mainColor: routeCardThemes[3].mainColor,
      bgColor: routeCardThemes[3].bgColor,
    },
    {
      key: "budget",
      label: "Estimated daily budget",
      value: buildBudgetValue(itinerary),
      icon: SavingsOutlinedIcon,
      mainColor: routeCardThemes[2].mainColor,
      bgColor: routeCardThemes[2].bgColor,
    },
  ];

  const flagUrl = getCountryFlagUrl(city.country);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      slotProps={{ paper: { sx: dialogPaperSx } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <HeaderRow>
          <HeaderMain>
            {flagUrl && <FlagImage src={flagUrl} alt={`${city.country} flag`} />}
            <div>
              <Typography variant="h3">{`${city.name}, ${city.country}`}</Typography>
              <Typography color="text.secondary">{itinerary.summary}</Typography>
            </div>
          </HeaderMain>
          <IconButton onClick={onClose} aria-label="Close itinerary modal" edge="end">
            <CloseIcon />
          </IconButton>
        </HeaderRow>
      </DialogTitle>

      <DialogContent sx={dialogContentSx}>
        <TopInfo>
          {infoPills.map((pill) => (
            <InfoPill key={pill.key}>
              <InfoIconWrap mainColor={pill.mainColor} bgColor={pill.bgColor}>
                <pill.icon sx={{ color: pill.mainColor, fontSize: 20 }} />
              </InfoIconWrap>
              <div>
                <Typography variant="body2" color="text.secondary">
                  {pill.label}
                </Typography>
                <Typography variant="h6">{pill.value}</Typography>
              </div>
            </InfoPill>
          ))}
        </TopInfo>

        <Alert severity="info" sx={AiAlertSx}>
          This itinerary was generated with AI and should be reviewed before booking or planning
          around it.
        </Alert>

        <ContentGrid>
          <LeftColumn>
            <PreviewPanel>
              <Typography variant="h5">City overview</Typography>
              <Typography color="text.secondary">{itinerary.shortDescription}</Typography>

              <PlaceholderBlock>
                <Typography variant="body1">Hero image / gallery</Typography>
              </PlaceholderBlock>
            </PreviewPanel>

            <TipsBlock>
              <PanelSmallHeader>
                <TipsAndUpdatesOutlinedIcon color="primary" />
                <Typography variant="h6">Useful tips</Typography>
              </PanelSmallHeader>
              {itinerary.tips.map((tip) => (
                <Typography key={tip} color="text.secondary">
                  • {tip}
                </Typography>
              ))}
            </TipsBlock>
          </LeftColumn>

          <ItineraryPanel>
            <PanelHeader>
              <AutoAwesomeOutlinedIcon color="primary" />
              <div>
                <Typography variant="h5">Suggested itinerary</Typography>
                <Typography color="text.secondary">
                  {isLoading
                    ? "Loading itinerary..."
                    : data?.source === "database"
                      ? "Loaded from saved itinerary data."
                      : ""}
                </Typography>
              </div>
            </PanelHeader>

            <ToggleButtonGroup
              value={selectedDay}
              exclusive
              onChange={(_, value) => {
                if (value) setSelectedDay(value);
              }}
              sx={{ alignSelf: "flex-start", flexWrap: "wrap" }}
              color="primary"
            >
              {itinerary.itineraryDays.map((day) => (
                <ToggleButton
                  key={day.day}
                  value={day.day}
                  sx={{ p: "12px 40px", fontWeight: 700 }}
                >
                  {`Day ${day.day}`}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            <Divider />

            <TimelineScrollArea>
              {activeDay && (
                <>
                  <Typography variant="h6">{activeDay.title}</Typography>
                  {activeDay.activities.map((activity) => {
                    const style = activityTypeStyles[activity.type];
                    const Icon = style.icon;

                    return (
                      <ActivityRow key={`${activeDay.day}-${activity.time}-${activity.name}`}>
                        <TimeCell>{activity.time}</TimeCell>
                        <ActivityContent>
                          <ActivityHeader>
                            <Typography variant="h6">{activity.name}</Typography>
                            <TypeChip mainColor={style.mainColor} bgColor={style.bgColor}>
                              <Icon sx={{ fontSize: 14 }} />
                              {activity.type}
                            </TypeChip>
                          </ActivityHeader>
                          <Typography color="text.secondary">{activity.description}</Typography>
                        </ActivityContent>
                      </ActivityRow>
                    );
                  })}
                </>
              )}

              {isError && (
                <Alert severity="warning">
                  We could not load itinerary data from the API, so a local mock is being shown.
                </Alert>
              )}
            </TimelineScrollArea>

            <MapButton
              variant="outlined"
              endIcon={<ArrowOutwardOutlinedIcon />}
              disabled={!itinerary.mapUrl}
            >
              View on map
            </MapButton>
          </ItineraryPanel>
        </ContentGrid>
      </DialogContent>
    </Dialog>
  );
}
