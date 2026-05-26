import { useMemo, useState } from "react";

import { Box, InputAdornment, Popover, TextField, styled, useTheme } from "@mui/material";

import { DateRange } from "react-date-range";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { format } from "date-fns";

type Props = {
  startDate?: Date;
  endDate?: Date;
  onChange: (range: { startDate: Date; endDate: Date }) => void;
};
const formatDate = (date: Date) => format(date, "MMM dd");

export function DateRangeField({ startDate, endDate, onChange }: Readonly<Props>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const theme = useTheme();

  const label = useMemo(() => {
    if (!startDate) return "Select your dates";

    if (!endDate) return `${formatDate(startDate)} - End Date`;

    return `${format(startDate, "MMM dd")} - ${format(endDate, "MMM dd")}`;
  }, [startDate, endDate]);

  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        fullWidth
        value={label}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        slotProps={{
          input: {
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon />
              </InputAdornment>
            ),
          },
        }}
        label="Travel dates"
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              background: "#182232",
              borderRadius: "8px",
            },
          },
        }}
      >
        <CalendarWrapper>
          <DateRange
            editableDateInputs={false}
            showDateDisplay={false}
            showMonthAndYearPickers={false}
            minDate={new Date()}
            onChange={(item) =>
              onChange({
                startDate: item.selection.startDate ?? new Date(),
                endDate: item.selection.endDate ?? new Date(),
              })
            }
            rangeColors={[theme.palette.primary.main]}
            ranges={[
              {
                startDate,
                endDate,
                key: "selection",
              },
            ]}
          />
        </CalendarWrapper>
      </Popover>
    </>
  );
}

const CalendarWrapper = styled(Box)(({ theme }) => ({
  ".rdrCalendarWrapper": {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },

  ".rdrMonth": {
    background: theme.palette.background.paper,
  },

  ".rdrDayNumber span": {
    color: theme.palette.text.primary,
  },

  ".rdrMonthAndYearWrapper": {
    background: theme.palette.background.paper,
  },

  ".rdrWeekDay": {
    color: theme.palette.text.secondary,
  },

  ".rdrDayPassive span": {
    color: theme.palette.text.disabled,
  },

  ".rdrDefinedRangesWrapper": {
    display: "none",
  },
}));
