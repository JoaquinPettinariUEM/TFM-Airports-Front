import { useParams, useSearchParams } from "react-router-dom";
import { useGetRouteByKey } from "../../api/travelPlanApi";

function RouteDetail() {
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const paramsToQuery = {
    pathKey: id ?? "",
    tripDays: searchParams.get("tripDays") ?? "",
    startDate: searchParams.get("startDate") ?? "",
    budget: Number(searchParams.get("budget") ?? 500),
    maxStops: Number(searchParams.get("maxStops") ?? 2),
  };

  const { data } = useGetRouteByKey(paramsToQuery);
  console.log(data);

  return <h1>Route Detail</h1>;
}

export default RouteDetail;
