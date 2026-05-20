import { Box, Typography, styled } from "@mui/material";

type Props = {
  icon: React.ReactNode;
  label: string;
};

export function RouteStat({ icon, label }: Readonly<Props>) {
  return (
    <StatRow>
      {icon}

      <Typography variant="body1">{label}</Typography>
    </StatRow>
  );
}

const StatRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});
