import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PageTitle() {
  const navigate = useNavigate();

  return (
    <TitleWrapper>
      <Typography variant="h2" className="tp-title">
        One trip, multiple cities
      </Typography>
      <Typography variant="h3" className="tp-description">
        Don't know where to start planning a trip? <br /> Plan it with us
      </Typography>
      <ActionsRow>
        <Button variant="contained" color="primary">
          See our recommendations
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/create/route")}
        >
          Plan your trip
        </Button>
      </ActionsRow>
    </TitleWrapper>
  );
}

const TitleWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
});

const ActionsRow = styled(Box)({
  display: "flex",
  gap: 16,
  marginTop: 8,
});

export default PageTitle;
