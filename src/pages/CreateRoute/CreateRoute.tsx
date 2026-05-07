import { Button, Card, Container, styled, Typography } from "@mui/material";
import BackgroundImage from "../../assets/bs_wallpaper.jpg";
import { AirportFinder } from "../../components/AirportFinder/AirportFinder";
import NumberField from "../../components/NumberField/NumberField";
import { useCreateRouteForm } from "../../hooks/useCreateRouteForm";

function CreateRoute() {
  const { form, updateField, submit } = useCreateRouteForm();

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

        <FormCard>
          <AirportFinder
            value={form.from}
            onChange={value => updateField("from", value)}
            label="Initial Airport"
          />

          <AirportFinder
            value={form.to}
            onChange={value => updateField("to", value)}
            label="Final Airport"
          />

          <NumberField
            label="Budget"
            value={form.budget}
            min={0}
            max={10000}
            onValueChange={value => updateField("budget", value ?? 1000)}
          />

          <NumberField
            label="Max main cities"
            value={form.maxStops}
            min={1}
            max={5}
            onValueChange={value => updateField("maxStops", value ?? 1)}
          />

          <Button onClick={submit} variant="contained">
            Search
          </Button>
        </FormCard>
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
    background: `linear-gradient(
      to bottom,
      rgba(2,6,23,0.65),
      rgba(2,6,23,0.85)
    )`,
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
});

const FormCard = styled(Card)({
  padding: 16,
  display: "flex",
  gap: 16,

  backdropFilter: "blur(18px)",

  background: "rgba(255,255,255,0.08)",

  border: "1px solid rgba(255,255,255,0.12)",

  boxShadow: "0 8px 32px rgba(0,0,0,0.35)",

  borderRadius: 4,
});

export default CreateRoute;
