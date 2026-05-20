import { Button, Card, Container, styled, Typography } from "@mui/material";
import BackgroundImage from "../../assets/bs_wallpaper.jpg";
import { AirportFinder } from "../../components/AirportFinder/AirportFinder";
import NumberField from "../../components/NumberField/NumberField";
import { useCreateRouteForm } from "../../hooks/useCreateRouteForm";
import { DateRangeField } from "../../components/DateRangeField/DateRangeField";
import { appPalette } from "../../theme";

function CreateRoute() {
  const { form, updateField, submit } = useCreateRouteForm();

  return (
    <BackgroundComponent>
      <Container
        maxWidth="md"
        sx={{
          height: "100%",
          display: "flex",
          gap: 2,
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

          <DateRangeField
            startDate={form.startDate}
            endDate={form.endDate}
            onChange={({ startDate, endDate }) => {
              updateField("startDate", startDate);
              updateField("endDate", endDate);
            }}
          />

          <NumberField
            label="Budget"
            value={form.budget}
            defaultValue={300}
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

const BackgroundComponent = styled("section")(({ theme }) => ({
  height: "100%",
  width: "100%",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  color: theme.palette.text.primary,
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
      ${appPalette.overlayDarkSoft},
      ${appPalette.overlayDarkStrong}
    )`,
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
}));

const FormCard = styled(Card)(({ theme }) => ({
  padding: 16,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 16,

  backdropFilter: "blur(18px)",

  background: theme.palette.background.paper,

  border: `1px solid ${theme.palette.divider}`,

  boxShadow: appPalette.shadowStrong,

  borderRadius: 4,
}));

export default CreateRoute;
