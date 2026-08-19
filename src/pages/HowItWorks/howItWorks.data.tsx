import type { ReactNode } from "react";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AltRouteOutlinedIcon from "@mui/icons-material/AltRouteOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { routeCardThemes } from "../../theme";

export type HowItWorksCardItem = {
  step?: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export type HowItWorksResultCard = {
  badge: string;
  accent: (typeof routeCardThemes)[number];
  price: string;
  subtitle: string;
  path: string[];
  meta: string[];
};

export type GraphNodeKind = "origin" | "best" | "candidate" | "pruned" | "destination";

export type GraphNodeItem = {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: GraphNodeKind;
};

export type GraphEdgeItem = {
  from: string;
  to: string;
  best: boolean;
};

export const exampleSearchPath = ["Madrid", "Barcelona", "Rome", "Milan"] as const;

type Translate = (key: string, values?: Record<string, string | number>) => string;

export function getProcessSteps(t: Translate): HowItWorksCardItem[] {
  return [
    {
      step: "01",
      title: t("howItWorks.processChooseTitle"),
      description: t("howItWorks.processChooseDescription"),
      icon: <FlightTakeoffOutlinedIcon />,
    },
    {
      step: "02",
      title: t("howItWorks.processDatesTitle"),
      description: t("howItWorks.processDatesDescription"),
      icon: <CalendarMonthOutlinedIcon />,
    },
    {
      step: "03",
      title: t("howItWorks.processExploreTitle"),
      description: t("howItWorks.processExploreDescription"),
      icon: <HubOutlinedIcon />,
    },
    {
      step: "04",
      title: t("howItWorks.processCompareTitle"),
      description: t("howItWorks.processCompareDescription"),
      icon: <InsightsOutlinedIcon />,
    },
  ];
}

export function getAlgorithmNotes(t: Translate): HowItWorksCardItem[] {
  return [
    {
      title: t("howItWorks.noteBudgetTitle"),
      description: t("howItWorks.noteBudgetDescription"),
      icon: <SavingsOutlinedIcon />,
    },
    {
      title: t("howItWorks.noteStopTitle"),
      description: t("howItWorks.noteStopDescription"),
      icon: <AltRouteOutlinedIcon />,
    },
    {
      title: t("howItWorks.noteDurationTitle"),
      description: t("howItWorks.noteDurationDescription"),
      icon: <ScheduleOutlinedIcon />,
    },
  ];
}

export function getResultCards(t: Translate): HowItWorksResultCard[] {
  return [
    {
      badge: t("howItWorks.badgeBestBalance"),
      accent: routeCardThemes[1],
      price: "EUR 267",
      subtitle: t("howItWorks.resultBestBalanceSubtitle"),
      path: ["Madrid", "Barcelona", "Rome", "Milan"],
      meta: [
        t("howItWorks.resultMetaFlights3"),
        t("howItWorks.resultMetaStops2"),
        t("howItWorks.resultMetaWithinBudget"),
      ],
    },
    {
      badge: t("howItWorks.badgeBestPrice"),
      accent: routeCardThemes[0],
      price: "EUR 223",
      subtitle: t("howItWorks.resultBestPriceSubtitle"),
      path: ["Madrid", "Barcelona", "Marseille", "Milan"],
      meta: [
        t("howItWorks.resultMetaFlights3"),
        t("howItWorks.resultMetaStops2"),
        t("howItWorks.resultMetaLowestCost"),
      ],
    },
    {
      badge: t("howItWorks.badgeFewerStops"),
      accent: routeCardThemes[3],
      price: "EUR 220",
      subtitle: t("howItWorks.resultFewerStopsSubtitle"),
      path: ["Madrid", "Paris", "Milan"],
      meta: [
        t("howItWorks.resultMetaFlights2"),
        t("howItWorks.resultMetaStops1"),
        t("howItWorks.resultMetaLessMoving"),
      ],
    },
  ];
}

export const graphNodes: GraphNodeItem[] = [
  { id: "MAD", label: "Madrid", x: 70, y: 180, kind: "origin" },
  { id: "BCN", label: "Barcelona", x: 210, y: 72, kind: "best" },
  { id: "MRS", label: "Marseille", x: 210, y: 288, kind: "candidate" },
  { id: "ZRH", label: "Zurich", x: 390, y: 180, kind: "candidate" },
  { id: "FCO", label: "Rome", x: 560, y: 72, kind: "best" },
  { id: "LYS", label: "Lyon", x: 560, y: 288, kind: "pruned" },
  { id: "MXP", label: "Milan", x: 700, y: 180, kind: "destination" },
];

export const graphEdges: GraphEdgeItem[] = [
  { from: "MAD", to: "BCN", best: true },
  { from: "MAD", to: "MRS", best: false },
  { from: "BCN", to: "ZRH", best: false },
  { from: "BCN", to: "FCO", best: true },
  { from: "MRS", to: "ZRH", best: false },
  { from: "ZRH", to: "MXP", best: false },
  { from: "FCO", to: "MXP", best: true },
  { from: "LYS", to: "MXP", best: false },
];

export function getGraphStats(t: Translate) {
  return [
    { value: "7", label: t("howItWorks.statCities") },
    { value: "3", label: t("howItWorks.statCandidates") },
    { value: "1", label: t("howItWorks.statSelected") },
  ] as const;
}
