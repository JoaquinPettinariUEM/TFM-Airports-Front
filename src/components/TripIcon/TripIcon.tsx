import FlightIcon from "@mui/icons-material/Flight";
import { Box } from "@mui/material";

export function TripIcon() {
  return (
    <Box sx={{ position: "relative", width: 120, height: 64 }}>
      <svg
        width="120"
        height="64"
        viewBox="0 0 220 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 70C36 8 58 8 76 50C134 108 156 52 182 44"
          stroke="#F4B942"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />
      </svg>

      <FlightIcon
        sx={{
          position: "absolute",
          left: 86,
          top: 26,
          fontSize: 22,
          color: "#F4B942",
          transform: "rotate(24deg)",
        }}
      />
    </Box>
  );
}
