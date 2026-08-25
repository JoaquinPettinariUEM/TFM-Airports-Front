import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type Props = {
  label: string;
  value?: Date;
  minDate?: Date;
  onChange: (value?: Date) => void;
};

export function DatePicker({ label, value, minDate, onChange }: Readonly<Props>) {
  return (
    <MuiDatePicker
      label={label}
      format="DD/MM/YYYY"
      value={value ? dayjs(value) : null}
      minDate={minDate ? dayjs(minDate) : dayjs()}
      onChange={(nextValue) => {
        onChange(nextValue ? nextValue.toDate() : undefined);
      }}
      slotProps={{
        textField: {
          fullWidth: true,
        },
      }}
    />
  );
}
