import { Box } from "@mui/material";

type Props = {
  city: string;
};

export function RouteCardImage({ city }: Readonly<Props>) {
  return (
    <Box
      component="img"
      src={`${import.meta.env.VITE_API_URL}/city-images/${city}`}
      alt={city}
      sx={{
        width: "100%",
        height: 220,
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}
