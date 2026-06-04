import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  IconButton,
  Skeleton,
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
  ActivityHeaderActions,
  ActivityRow,
  AiAlertSx,
  ContentGrid,
  dialogContentSx,
  dialogPaperSx,
  FlagImage,
  GalleryStrip,
  GalleryThumb,
  GalleryThumbImage,
  HeaderMain,
  HeaderRow,
  HeroImage,
  InfoIconWrap,
  InfoPill,
  ItineraryPanel,
  ItineraryPanelBox,
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
  buildGoogleMapsDayUrl,
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

  const { data, isLoading, isError, isSuccess } = useGetCityItinerary(itineraryParams);

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

  const itinerary = data?.itinerary ?? (isError ? fallbackItinerary : undefined);
  const flagUrl = getCountryFlagUrl(city.country);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      slotProps={{ paper: { sx: dialogPaperSx } }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <HeaderRow>
          <HeaderMain>
            {flagUrl && <FlagImage src={flagUrl} alt={`${city.country} flag`} />}
            <div>
              <Typography variant="h3">{`${city.name}, ${city.country}`}</Typography>
            </div>
          </HeaderMain>
          <IconButton onClick={onClose} aria-label="Close itinerary modal" edge="end">
            <CloseIcon />
          </IconButton>
        </HeaderRow>
      </DialogTitle>

      <DialogContent sx={dialogContentSx}>
        {isLoading && <ItineraryModalSkeleton />}

        {!isLoading && itinerary && (
          <Fade in={isSuccess || isError} timeout={250}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <LoadedItineraryContent itinerary={itinerary} />
            </Box>
          </Fade>
        )}
      </DialogContent>
    </Dialog>
  );
}

function LoadedItineraryContent({
  itinerary,
}: Readonly<{
  itinerary: CityItinerary;
}>) {
  const [selectedDay, setSelectedDay] = useState(itinerary.itineraryDays[0]?.day ?? 1);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    itinerary.heroImage ?? itinerary.galleryImages[0] ?? null,
  );

  const activeDay =
    itinerary.itineraryDays.find((day) => day.day === selectedDay) ?? itinerary.itineraryDays[0];
  const activeDayMapUrl = buildGoogleMapsDayUrl(activeDay?.activities ?? [], itinerary.mapUrl);

  const infoPills: InfoPillConfig[] = [
    {
      key: "days",
      label: "Recommended days",
      value: `${itinerary.days} days`,
      icon: CalendarMonthOutlinedIcon,
      mainColor: routeCardThemes[1].mainColor,
      bgColor: routeCardThemes[1].bgColor,
    },
    {
      key: "season",
      label: "Best time to visit",
      value: itinerary.bestSeason,
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

  return (
    <>
      <TopInfo>
        {infoPills.map((pill) => (
          <InfoPill key={pill.key}>
            <InfoIconWrap mainColor={pill.mainColor} bgColor={pill.bgColor}>
              <pill.icon sx={{ color: pill.mainColor, fontSize: 20 }} />
            </InfoIconWrap>
            <div>
              <Typography variant="body1" color="text.secondary">
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

            {selectedImage ? (
              <>
                <HeroImage src={selectedImage} alt={`${itinerary.city} view`} />
                {itinerary.galleryImages.length > 1 && (
                  <GalleryStrip>
                    {itinerary.galleryImages.slice(0, 4).map((image) => (
                      <GalleryThumb
                        key={image}
                        active={image === selectedImage}
                        type="button"
                        onClick={() => setSelectedImage(image)}
                      >
                        <GalleryThumbImage src={image} alt={`${itinerary.city} thumbnail`} />
                      </GalleryThumb>
                    ))}
                  </GalleryStrip>
                )}
              </>
            ) : (
              <PlaceholderBlock>
                <Typography variant="body1">No image available</Typography>
              </PlaceholderBlock>
            )}
          </PreviewPanel>

          <TipsBlock>
            <PanelSmallHeader>
              <TipsAndUpdatesOutlinedIcon color="primary" />
              <Typography variant="h6">Useful tips</Typography>
            </PanelSmallHeader>
            {itinerary.tips.map((tip) => (
              <Typography key={tip} color="text.secondary">
                {`• ${tip}`}
              </Typography>
            ))}
          </TipsBlock>
        </LeftColumn>

        <ItineraryPanel>
          <ItineraryPanelBox>
            <PanelHeader>
              <AutoAwesomeOutlinedIcon color="primary" />
              <div>
                <Typography variant="h5">Suggested itinerary</Typography>
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
                    const isClickable = Boolean(activity.moreInfoUrl);

                    return (
                      <ActivityRow
                        key={`${activeDay.day}-${activity.time}-${activity.name}`}
                        clickable={isClickable}
                        onClick={() => {
                          if (activity.moreInfoUrl) {
                            window.open(activity.moreInfoUrl, "_blank", "noopener,noreferrer");
                          }
                        }}
                      >
                        <TimeCell variant="body1">{activity.time}</TimeCell>
                        <ActivityContent>
                          <ActivityHeader>
                            <Typography variant="h6">{activity.name}</Typography>
                          </ActivityHeader>
                          <Typography color="textSecondary">{activity.description}</Typography>
                        </ActivityContent>
                        <ActivityHeaderActions>
                          <TypeChip mainColor={style.mainColor} bgColor={style.bgColor}>
                            <Icon sx={{ fontSize: 18 }} />
                            {activity.type}
                          </TypeChip>
                          {activity.moreInfoUrl && (
                            <ArrowOutwardOutlinedIcon
                              sx={{ fontSize: 18, color: "text.secondary" }}
                            />
                          )}
                        </ActivityHeaderActions>
                      </ActivityRow>
                    );
                  })}
                </>
              )}
            </TimelineScrollArea>

            <MapButton
              variant="outlined"
              endIcon={<ArrowOutwardOutlinedIcon />}
              disabled={!activeDayMapUrl}
              onClick={() => {
                if (activeDayMapUrl) {
                  window.open(activeDayMapUrl, "_blank", "noopener,noreferrer");
                }
              }}
            >
              View on map
            </MapButton>
          </ItineraryPanelBox>
        </ItineraryPanel>
      </ContentGrid>
    </>
  );
}

function ItineraryModalSkeleton() {
  return (
    <>
      <TopInfo>
        {Array.from({ length: 5 }).map((_, index) => (
          <InfoPill key={index}>
            <Skeleton variant="circular" width={40} height={40} />
            <div style={{ width: "100%" }}>
              <Skeleton variant="text" width="55%" height={20} />
              <Skeleton variant="text" width="72%" height={28} />
            </div>
          </InfoPill>
        ))}
      </TopInfo>

      <Skeleton variant="rounded" height={44} sx={{ mb: 2, borderRadius: 2 }} />

      <ContentGrid>
        <LeftColumn>
          <PreviewPanel>
            <Skeleton variant="text" width="45%" height={36} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="88%" />
            <Skeleton variant="rounded" height={260} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" height={72} sx={{ borderRadius: 2 }} />
          </PreviewPanel>

          <TipsBlock>
            <Skeleton variant="text" width="38%" height={32} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="92%" />
            <Skeleton variant="text" width="78%" />
          </TipsBlock>
        </LeftColumn>

        <ItineraryPanel>
          <ItineraryPanelBox>
            <PanelHeader>
              <AutoAwesomeOutlinedIcon color="disabled" />
              <div style={{ width: "100%" }}>
                <Skeleton variant="text" width="38%" height={36} />
                <Skeleton variant="text" width="62%" />
              </div>
            </PanelHeader>
            <Skeleton variant="rounded" height={48} width={260} sx={{ borderRadius: 2 }} />
            <Divider />
            <TimelineScrollArea>
              <Skeleton variant="text" width="28%" height={36} />
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} variant="rounded" height={74} sx={{ borderRadius: 2 }} />
              ))}
            </TimelineScrollArea>
            <Skeleton variant="rounded" height={40} sx={{ borderRadius: 2 }} />
          </ItineraryPanelBox>
        </ItineraryPanel>
      </ContentGrid>
    </>
  );
}
