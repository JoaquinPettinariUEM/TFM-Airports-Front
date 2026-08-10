import { Box, Typography, styled } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { type Dayjs } from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type Props = {
  startDate?: Date;
  endDate?: Date;
  tripDays: number;
  onChange: (range: { startDate: Date; endDate: Date }) => void;
};

const backgroundPaper = {
  background: "#182232",
  borderRadius: "8px",
};

export function DateRangeField({ startDate, endDate, onChange, tripDays }: Readonly<Props>) {
  const handleStartDateChange = (value: Dayjs | null) => {
    const nextStart = (value ?? dayjs()).startOf("day").toDate();
    const currentEnd = endDate ? dayjs(endDate).startOf("day") : null;
    const nextEnd =
      !currentEnd || currentEnd.isBefore(dayjs(nextStart)) ? nextStart : currentEnd.toDate();
    onChange({
      startDate: nextStart,
      endDate: nextEnd,
    });
  };

  const handleEndDateChange = (value: Dayjs | null) => {
    const baseStart = startDate ? dayjs(startDate).startOf("day") : dayjs().startOf("day");
    const selectedEnd = (value ?? baseStart).startOf("day");
    const nextEnd = selectedEnd.isBefore(baseStart) ? baseStart.toDate() : selectedEnd.toDate();
    onChange({
      startDate: baseStart.toDate(),
      endDate: nextEnd,
    });
  };

  return (
    <DateRangeWrapper>
      <TitleContainer>
        <TitleContainer>
          <CalendarMonthIcon color="primary" />
          <Typography variant="h6" color="text.secondary">
            Travel dates
          </Typography>
        </TitleContainer>
        <Typography variant="body1" color="textSecondary">
          {tripDays} trip days
        </Typography>
      </TitleContainer>
      <InputsRow>
        <DatePicker
          label={undefined}
          format="DD/MM/YYYY"
          value={startDate ? dayjs(startDate) : null}
          onChange={handleStartDateChange}
          minDate={dayjs().startOf("day")}
          slotProps={{ textField: { fullWidth: true }, popper: { sx: backgroundPaper } }}
        />
        <ArrowWrap>
          <EastIcon fontSize="inherit" />
        </ArrowWrap>
        <DatePicker
          label={undefined}
          format="DD/MM/YYYY"
          value={endDate ? dayjs(endDate) : null}
          onChange={handleEndDateChange}
          minDate={startDate ? dayjs(startDate).startOf("day") : dayjs().startOf("day")}
          slotProps={{ textField: { fullWidth: true }, popper: { sx: backgroundPaper } }}
        />
      </InputsRow>
    </DateRangeWrapper>
  );
}

const TitleContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  marginBottom: 4,
});

const DateRangeWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

const InputsRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  gap: 10,
});

const ArrowWrap = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  fontSize: 20,
}));
