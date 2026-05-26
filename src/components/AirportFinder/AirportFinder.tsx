import { useAirportSearch } from "../../api/travelPlanApi";
import type { RouteByQueryResponse } from "../../types/routes";
import { AsyncAutocomplete } from "../AsyncAutocomplete/AsyncAutocomplete";

interface Props {
  value: RouteByQueryResponse | null;
  onChange: (v: RouteByQueryResponse | null) => void;
  label: string;
}

export function AirportFinder({ value, onChange, label = "Airports" }: Readonly<Props>) {
  return (
    <AsyncAutocomplete<RouteByQueryResponse>
      label={label}
      value={value}
      onChange={onChange}
      useFetch={useAirportSearch}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(a, b) => a.label === b.label}
    />
  );
}
