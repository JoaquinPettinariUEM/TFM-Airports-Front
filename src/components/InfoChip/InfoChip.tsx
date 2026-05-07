import { Chip } from "@mui/material";
import type { ReactElement } from "react";

type Props = {
  icon?: ReactElement;
  label: string;
  bgColor?: string;
  textColor?: string;
};

export function InfoChip({
  icon,
  label,
  bgColor = "#1F2937",
  textColor = "#F9FAFB",
}: Readonly<Props>) {
  return (
    <Chip
      avatar={icon}
      label={label}
      sx={{
        backgroundColor: bgColor,
        color: textColor,

        fontWeight: 400,
        fontSize: 16,
        borderRadius: "10px",

        "& .MuiChip-icon": {
          color: textColor,
        },
      }}
    />
  );
}
