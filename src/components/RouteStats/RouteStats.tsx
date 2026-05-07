import { Box, Typography } from "@mui/material";

type Props = {
  icon: React.ReactNode;
  label: string;
};

export function RouteStat({ icon, label }: Readonly<Props>) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {icon}

      <Typography variant="body1">{label}</Typography>
    </Box>
  );
}
