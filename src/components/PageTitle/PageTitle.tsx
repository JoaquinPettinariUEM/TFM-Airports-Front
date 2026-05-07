import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PageTitle() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" className="tp-title">
        One trip, multiple cities
      </Typography>
      <Typography variant="h3" className="tp-description">
        Don't know where to start planning a trip? <br /> Plan it with us
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
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
      </Box>
    </Box>
  );
}

export default PageTitle;
