import { styled } from "@mui/material";

type Props = {
  city: string;
};

export function RouteCardImage({ city }: Readonly<Props>) {
  return (
    <CardImage src={`${import.meta.env.VITE_API_URL}/city-images/${city}`} alt={city} />
  );
}

const CardImage = styled("img")({
  width: "100%",
  height: 220,
  objectFit: "cover",
  display: "block",
  transition: "transform 0.4s ease",
  ".MuiCard-root:hover &": {
    transform: "scale(1.04)",
  },
});
