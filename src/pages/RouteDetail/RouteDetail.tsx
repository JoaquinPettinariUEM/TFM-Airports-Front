import { useParams } from "react-router-dom";
import { useGetRouteByKey } from "../../api/travelPlanApi";
import { useRouteStore } from "../../store/routeStore";

function RouteDetail() {
  const { airports, selectedRoute } = useRouteStore();
  const { id } = useParams();

  const { data } = useGetRouteByKey(id ?? "");
  console.log(airports, selectedRoute, data);

  return <h1>Route Detail</h1>;
}

export default RouteDetail;
