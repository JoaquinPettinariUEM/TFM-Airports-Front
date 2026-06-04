import type { CityItinerary } from "../types/routes";

export const MOCK_CITY_ITINERARY: CityItinerary = {
  city: "Rome",
  country: "Italy",
  citySlug: "rome-italy",
  cacheKey: "rome-italy-3",
  days: 3,
  summary:
    "Rome blends history, art, iconic squares, and unforgettable food in a city that rewards exploring on foot.",
  shortDescription:
    "A high-density city break packed with ancient landmarks, lively neighborhoods, and memorable meals.",
  budgetLevel: "Moderate",
  estimatedDailyBudget: {
    min: 80,
    max: 120,
    currency: "EUR",
  },
  currency: "Euro (EUR)",
  bestSeason: "Apr/Sep",
  averageWeather: "18C - 28C",
  heroImage: null,
  galleryImages: [],
  tips: [
    "Wear comfortable shoes for long walking days.",
    "Book major attractions in advance.",
    "Leave time for a slow lunch in Trastevere.",
  ],
  itineraryDays: [
    {
      day: 1,
      title: "Ancient Rome",
      activities: [
        {
          time: "09:00",
          name: "Colosseum",
          description: "Start the trip with one of the city's most iconic ancient landmarks.",
          type: "History",
          mapQuery: "Colosseum Rome",
          moreInfoUrl: "https://en.wikipedia.org/wiki/Colosseum",
        },
        {
          time: "11:30",
          name: "Roman Forum",
          description: "Walk through the ruins of ancient Rome's political and civic center.",
          type: "History",
          mapQuery: "Roman Forum Rome",
          moreInfoUrl: "https://en.wikipedia.org/wiki/Roman_Forum",
        },
        {
          time: "14:00",
          name: "Trastevere",
          description: "Enjoy lunch and a neighborhood stroll in one of Rome's food favorites.",
          type: "Gastronomy",
          mapQuery: "Trastevere Rome",
          moreInfoUrl: "https://en.wikipedia.org/wiki/Trastevere",
        },
      ],
    },
    {
      day: 2,
      title: "Squares and Fountains",
      activities: [
        {
          time: "10:00",
          name: "Trevi Fountain",
          description: "Visit early to enjoy one of Rome's must-see landmarks with fewer crowds.",
          type: "Must-see",
          mapQuery: "Trevi Fountain Rome",
          moreInfoUrl: "https://en.wikipedia.org/wiki/Trevi_Fountain",
        },
        {
          time: "12:30",
          name: "Piazza Navona",
          description:
            "Slow down for coffee and a walk through one of Rome's most elegant squares.",
          type: "Culture",
          mapQuery: "Piazza Navona Rome",
          moreInfoUrl: "https://en.wikipedia.org/wiki/Piazza_Navona",
        },
      ],
    },
    {
      day: 3,
      title: "Vatican Day",
      activities: [
        {
          time: "09:30",
          name: "Vatican Museums",
          description: "Spend the morning with major art collections and landmark gallery spaces.",
          type: "Culture",
          mapQuery: "Vatican Museums",
          moreInfoUrl: "https://en.wikipedia.org/wiki/Vatican_Museums",
        },
        {
          time: "13:00",
          name: "St. Peter's Basilica",
          description: "Close the trip at one of the most recognizable sites in the city.",
          type: "Must-see",
          mapQuery: "St. Peter's Basilica",
          moreInfoUrl: "https://en.wikipedia.org/wiki/St._Peter%27s_Basilica",
        },
      ],
    },
  ],
  historicalInfoUrl: "https://en.wikipedia.org/wiki/Rome",
  mapUrl: "https://www.google.com/maps/dir/Colosseum+Rome/Roman+Forum+Rome/Trastevere+Rome",
  sourceModel: "mock",
  promptVersion: "v1",
};
