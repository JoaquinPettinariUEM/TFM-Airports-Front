import { Chip, styled, useTheme } from "@mui/material";
import type { ReactElement } from "react";

type Props = {
  icon?: ReactElement;
  label: string;
  bgColor?: string;
  textColor?: string;
};

const StyledChip = styled(Chip)<{ bgColor: string; textColor: string }>(
  ({ bgColor, textColor }) => ({
    backgroundColor: bgColor,
    color: textColor,
    fontWeight: 400,
    fontSize: 16,
    borderRadius: "10px",
    "& .MuiChip-icon": {
      color: textColor,
    },
  })
);

export function InfoChip({
  icon,
  label,
  bgColor,
  textColor,
}: Readonly<Props>) {
  const theme = useTheme();
  const resolvedBgColor = bgColor ?? theme.palette.background.paper;
  const resolvedTextColor = textColor ?? theme.palette.text.primary;

  return (
    <StyledChip
      avatar={icon}
      label={label}
      bgColor={resolvedBgColor}
      textColor={resolvedTextColor}
    />
  );
}
