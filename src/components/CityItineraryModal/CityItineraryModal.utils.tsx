import type { SvgIconComponent } from "@mui/icons-material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import type { CityItinerary, CityItineraryCategory } from "../../types/routes";
import { appPalette, routeCardThemes } from "../../theme";

export type ActivityTypeStyle = {
  mainColor: string;
  bgColor: string;
  icon: SvgIconComponent;
};

export const activityTypeStyles: Record<CityItineraryCategory, ActivityTypeStyle> = {
  History: {
    mainColor: routeCardThemes[1].mainColor,
    bgColor: routeCardThemes[1].bgColor,
    icon: AccountBalanceOutlinedIcon,
  },
  Gastronomy: {
    mainColor: routeCardThemes[2].mainColor,
    bgColor: routeCardThemes[2].bgColor,
    icon: RestaurantOutlinedIcon,
  },
  Culture: {
    mainColor: routeCardThemes[3].mainColor,
    bgColor: routeCardThemes[3].bgColor,
    icon: PublicOutlinedIcon,
  },
  "Must-see": {
    mainColor: appPalette.textPrimary,
    bgColor: appPalette.borderSoft,
    icon: StarBorderOutlinedIcon,
  },
  Nature: {
    mainColor: routeCardThemes[0].mainColor,
    bgColor: routeCardThemes[0].bgColor,
    icon: ParkOutlinedIcon,
  },
};

export function buildBudgetValue(itinerary: CityItinerary) {
  const symbol =
    itinerary.estimatedDailyBudget.currency === "EUR"
      ? "EUR"
      : itinerary.estimatedDailyBudget.currency;

  if (itinerary.estimatedDailyBudget.min == null || itinerary.estimatedDailyBudget.max == null) {
    return itinerary.budgetLevel;
  }

  return `${symbol} ${itinerary.estimatedDailyBudget.min}-${itinerary.estimatedDailyBudget.max}`;
}

export function getCountryFlagUrl(country: string) {
  const code = countryToIso[country.trim().toLowerCase()];
  return code ? `https://flagcdn.com/w40/${code.toLowerCase()}.png` : null;
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const countryToIso: Record<string, string> = {
  italy: "IT",
  spain: "ES",
  france: "FR",
  germany: "DE",
  portugal: "PT",
  greece: "GR",
  austria: "AT",
  switzerland: "CH",
  belgium: "BE",
  netherlands: "NL",
  "united kingdom": "GB",
  ireland: "IE",
  czechia: "CZ",
  "czech republic": "CZ",
  hungary: "HU",
  poland: "PL",
  denmark: "DK",
  turkey: "TR",
  morocco: "MA",
};
