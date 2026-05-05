import { Card, Grid, styled } from "@mui/material";
import AirportFinder from "../../components/AirportFinder/AirportFinder";

function Home() {
  return (
    <HomeComponent>
      <Card sx={{ width: "100%", height: "auto", padding: 4 }}>
        <Grid container>
          <AirportFinder />
        </Grid>
      </Card>
    </HomeComponent>
  );
}

const HomeComponent = styled("section")({
  height: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
});

export default Home;
