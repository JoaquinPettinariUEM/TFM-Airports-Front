import * as React from "react";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/**
 * This component is a placeholder for FormControl to correctly set the shrink label state on SSR.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SSRInitialFilled(_: BaseNumberField.Root.Props) {
  return null;
}
SSRInitialFilled.muiName = "Input";

export default function NumberField({
  id: idProp,
  label,
  error,
  size = "medium",
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  size?: "small" | "medium";
  error?: boolean;
}) {
  let id = React.useId();
  if (idProp) {
    id = idProp;
  }
  return (
    <BaseNumberField.Root
      {...other}
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={error}
          variant="outlined"
        >
          {props.children}
        </FormControl>
      )}
    >
      <SSRInitialFilled {...other} />
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <BaseNumberField.Input
        id={id}
        render={(props, state) => (
          <StyledOutlinedInput
            aria-describedby={`${id}-helper-text`}
            label={label}
            inputRef={props.ref}
            value={state.inputValue}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            onFocus={props.onFocus}
            slotProps={{
              input: props,
            }}
            endAdornment={
              <StyledInputAdornment position="end">
                <BaseNumberField.Increment
                  render={<IconButton size={size} aria-label="Increase" />}
                >
                  <IncrementIcon fontSize={size} />
                </BaseNumberField.Increment>

                <BaseNumberField.Decrement
                  render={<IconButton size={size} aria-label="Decrease" />}
                >
                  <DecrementIcon fontSize={size} />
                </BaseNumberField.Decrement>
              </StyledInputAdornment>
            }
          />
        )}
      />
    </BaseNumberField.Root>
  );
}

const StyledInputAdornment = styled(InputAdornment)({
  flexDirection: "column",
  maxHeight: "unset",
  alignSelf: "stretch",
  borderLeft: "1px solid",
  borderColor: "divider",
  marginLeft: 0,
  "& button": {
    paddingBlock: 0,
    flex: 1,
    borderRadius: 4,
  },
});

const StyledOutlinedInput = styled(OutlinedInput)({
  paddingRight: 0,
});

const IncrementIcon = styled(KeyboardArrowUpIcon)({
  transform: "translateY(2px)",
});

const DecrementIcon = styled(KeyboardArrowDownIcon)({
  transform: "translateY(-2px)",
});
