import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import type { UseQueryResult } from "@tanstack/react-query";

type AsyncAutocompleteProps<T> = {
  label: string;
  value: T | null;
  onChange: (value: T | null) => void;
  useFetch: (query: string) => UseQueryResult<T[], Error>;
  getOptionLabel: (option: T) => string;
  isOptionEqualToValue: (option: T, value: T) => boolean;
};

export function AsyncAutocomplete<T>({
  label,
  value,
  onChange,
  useFetch,
  getOptionLabel,
  isOptionEqualToValue,
}: Readonly<AsyncAutocompleteProps<T>>) {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");

  const { data = [], isLoading } = useFetch(query);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue, reason) => {
        setInputValue(newInputValue);

        if (reason === "input") {
          setQuery(newInputValue);
        }

        if (reason === "clear") {
          setQuery("");
        }
      }}
      options={data}
      loading={isLoading}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress size={20} /> : null}
                  {params.slotProps.input.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}
