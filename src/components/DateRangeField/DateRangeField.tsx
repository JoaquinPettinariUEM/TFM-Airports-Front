import { useMemo, useState } from "react";

import { Box, InputAdornment, Popover, TextField, styled } from "@mui/material";

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
        onClick={e => setAnchorEl(e.currentTarget)}
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
      >
        <CalendarWrapper>
          <DateRange
            editableDateInputs={false}
            showDateDisplay={false}
            onChange={item =>
              onChange({
                startDate: item.selection.startDate ?? new Date(),
                endDate: item.selection.endDate ?? new Date(),
              })
            }
            rangeColors={["#A855F7"]}
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

const CalendarWrapper = styled(Box)({
  ".rdrCalendarWrapper": {
    background: "#111827",
    color: "white",
  },

  ".rdrMonth": {
    background: "#111827",
  },

  ".rdrDayNumber span": {
    color: "white",
  },

  ".rdrMonthAndYearWrapper": {
    background: "#111827",
  },

  ".rdrWeekDay": {
    color: "#9CA3AF",
  },

  ".rdrDayPassive span": {
    color: "#6B7280",
  },

  ".rdrDefinedRangesWrapper": {
    display: "none",
  },
});
