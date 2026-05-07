import { Card, Container, styled, Typography } from "@mui/material";
import BackgroundImage from "../../assets/bs_wallpaper.jpg";
import { useState } from "react";
import type { RouteByQueryResponse } from "../../types/routes";
import { AirportFinder } from "../../components/AirportFinder/AirportFinder";
import NumberField from "../../components/NumberField/NumberField";

function CreateRoute() {
  const [from, setFrom] = useState<RouteByQueryResponse | null>(null);
  const [to, setTo] = useState<RouteByQueryResponse | null>(null);

  return (
    <BackgroundComponent>
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2">Create your own route</Typography>

        <Card sx={{ p: 2, display: "flex", gap: 2 }}>
          <AirportFinder value={from} onChange={setFrom} label="Initial Airport" />
          <AirportFinder value={to} onChange={setTo} label="Final Airport" />
          <NumberField label={"Budget (Optional)"} min={0} max={2000} />
          <NumberField label={"Max main cities"} min={0} max={5} defaultValue={1} />
        </Card>
      </Container>
    </BackgroundComponent>
  );
}

const BackgroundComponent = styled("section")({
  height: "100vh",
  width: "100%",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  color: "white",
  ".tp-create-route-title": {
    fontSize: "80px",
    fontWeight: 700,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
});

export default CreateRoute;
