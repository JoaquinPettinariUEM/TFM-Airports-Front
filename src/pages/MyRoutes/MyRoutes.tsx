import { useSearchParams } from "react-router-dom";
import { useGetRoutes } from "../../api/travelPlanApi";
import { CircularProgress } from "@mui/material";

function MyRoutes() {
  const [searchParams] = useSearchParams();
  const params = {
    from: searchParams.get("from") ?? "",
    to: searchParams.get("to") ?? "",
    budget: Number(searchParams.get("budget") ?? 500),
    maxStops: Number(searchParams.get("maxStops") ?? 2),
  };

  const { data: routes, isLoading } = useGetRoutes(params);

  if (isLoading) return <CircularProgress />;
  console.log(routes);

  return <h1>My Routes</h1>;
}

export default MyRoutes;
