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

export const processSteps: HowItWorksCardItem[] = [
  {
    step: "01",
    title: "Choose your cities",
    description:
      "Start with origin and destination, then add the places you definitely want in between.",
    icon: <FlightTakeoffOutlinedIcon />,
  },
  {
    step: "02",
    title: "Set dates and budget",
    description:
      "Pick your travel window, total budget and how many days you want to stay in each stop.",
    icon: <CalendarMonthOutlinedIcon />,
  },
  {
    step: "03",
    title: "We explore combinations",
    description:
      "RouteWise generates and evaluates multi-city paths that match your trip constraints.",
    icon: <HubOutlinedIcon />,
  },
  {
    step: "04",
    title: "Compare the best options",
    description:
      "You get a best overall route plus alternatives optimized for price, convenience or fewer stops.",
    icon: <InsightsOutlinedIcon />,
  },
];

export const algorithmNotes: HowItWorksCardItem[] = [
  {
    title: "Budget aware",
    description: "Routes that clearly exceed the target budget are deprioritized early.",
    icon: <SavingsOutlinedIcon />,
  },
  {
    title: "Stop limit respected",
    description: "The search stays inside your allowed number of intermediate cities.",
    icon: <AltRouteOutlinedIcon />,
  },
  {
    title: "Duration matters",
    description: "Travel time and stay distribution are considered together with total price.",
    icon: <ScheduleOutlinedIcon />,
  },
];

export const resultCards: HowItWorksResultCard[] = [
  {
    badge: "Best Balance",
    accent: routeCardThemes[1],
    price: "EUR 267",
    subtitle: "The strongest mix of price, route quality and practical timing.",
    path: ["Madrid", "Barcelona", "Rome", "Milan"],
    meta: ["3 flights", "2 stops", "Within budget"],
  },
  {
    badge: "Best Price",
    accent: routeCardThemes[0],
    price: "EUR 223",
    subtitle: "The lowest total cost among the routes that still fit the trip template.",
    path: ["Madrid", "Barcelona", "Marseille", "Milan"],
    meta: ["3 flights", "2 stops", "Lowest cost"],
  },
  {
    badge: "Fewer Stops",
    accent: routeCardThemes[3],
    price: "EUR 220",
    subtitle: "A simpler route when reducing stops matters more than visiting more cities.",
    path: ["Madrid", "Paris", "Milan"],
    meta: ["2 flights", "1 stop", "Less moving"],
  },
];

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

export const graphStats = [
  { value: "7", label: "Cities considered" },
  { value: "3", label: "Valid route candidates" },
  { value: "1", label: "Best route selected" },
] as const;
